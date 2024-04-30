// blogRoutes.js
const express = require('express');
const { object, string } = require('zod');
const { authMiddleware } = require('../middleware');
const { Blog, User } = require('../db');
const multer = require('multer');
const { S3Client,PutObjectCommand,  GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require('dotenv')
const crypto = require('crypto');

dotenv.config();


const router = express.Router();

router.use(express.json());

const blogSchema = object({
    caption: string(),
    content: string(),
    published: string().optional(),
});
const updateSchema = object({
    caption: string().optional(),
    content: string().optional(),
    published: string().optional(),
});

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

router.post('/',upload.single('image'), authMiddleware, async (req, res) => {
    try {
        const body= req.body;
        // url find
        // image-handler04
        const file = req.file
        const imageName = generateFileName();
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(params)
        await s3.send(command)

        if (!body || !body.caption) {
            res.status(400).json({ error: "Caption is required in the request body" });
            return;
        }
    
        const response = {
            caption: body.caption,
            content: imageName,
            published: body.published
        }
        const { success, data, error } = blogSchema.safeParse(response);
        if (!success) {
            res.status(400).json({ error: error });
            return;
        }
        const d = new Date();
        let dinank = d.toString().split(" ")[1] + " " +d.toString().split(" ")[2] + " " + d.toString().split(" ")[3];
        const author = await User.findOne({_id: req.authorId});
        const result = await Blog.create({
            ...data,
            publishedDate: dinank,
            authorId: req.authorId,
            author:{
                name: author.name
            }
        });
        res.status(200).json({ response: "Post uploaded" });
    } catch (error) {
        console.error("Error posting blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update blog route
router.put('/', authMiddleware, async (req, res) => {
    try {
        const body = req.body;
        const { success } = updateSchema.safeParse(body);
        if (!success) {
            res.status(400).json({ error: error });
            return;
        }

        await Blog.updateOne(
            { _id: body.id },
            {
                caption: body.caption,
                content: body.content,
                published: body.published 
            }
        );
        res.status(200).json({ response: "Post updated" });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/bulk',authMiddleware, async (req, res) => {
    try {

        const blogs = await Blog.find({ published: true })
        const data = [];
        for(const blog of blogs){

            const getObjectParams = {
                Bucket: bucketName,
                Key: blog.content
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 60 });
            let like = "false";
            for(let i = 0 ; i < blog.like.length ; i++){
                if(blog.like[i].authorId === req.authorId){
                    like = "true"
                }
            }
            data.push({data:blog, imageUrl:url, likeStatus:like});
        }

        res.status(200).json({ response: data });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/author', authMiddleware, async (req, res) => {
    try {
        const blogs = await Blog.find({authorId : req.authorId , published:true })
        const data = [];
        for(const blog of blogs){

            const getObjectParams = {
                Bucket: bucketName,
                Key: blog.content
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 60 });
            let like = "false";
            for(let i = 0 ; i < blog.like.length ; i++){
                if(blog.like[i].authorId === req.authorId){
                    like = "true"
                }
            }
            data.push({data:blog, imageUrl:url, likeStatus:like});
        }

        res.status(200).json({ response: data });
    } catch (error) {
        console.error("Error fetching author's blogs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/draft', authMiddleware, async (req, res) => {
    try {
        const authorId = req.authorId;
        
        const blogs = await Blog.find({ authorId: authorId, published: false })
            
        const data = [];
        for(const blog of blogs){

            const getObjectParams = {
                Bucket: bucketName,
                Key: blog.content
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 60 });
            data.push({data:blog, imageUrl:url});
        }
        res.status(200).json({ response: data });

    } catch (error) {
        console.error("Error fetching draft blogs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findOne({ _id: blogId });

        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        const data = [];
        const getObjectParams = {
            Bucket: bucketName,
            Key: blog.content
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 60 });
        let like = "false";
        for(let i = 0 ; i < blog.like.length ; i++){
            if(blog.like[i].authorId === req.authorId){
                like = "true"
            }
        }
        data.push({data:blog, imageUrl:url, likeStatus:like});


        res.status(200).json({ response: data });

    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findOne({_id:blogId});
        if(!blog){
            res.json({response:"post not found"});
            return; 
        }
        const params = {
            Bucket: bucketName,
            Key: blog.content,
        }

        const command = new DeleteObjectCommand(params) 
        await s3.send(command)

        await Blog.deleteOne({ _id: blogId });
        res.status(200).json({ response: "Blog deleted" });
    } catch (error) {
        console.error("Error deleting blog by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put('/comment', authMiddleware, async(req, res)=>{
    try{
        const authorId = req.authorId;
        const commentPerson = await User.findOne({_id: authorId});
        const body = req.body;
        const data = {
            authorId : authorId,
            authorName : commentPerson.name,
            comment : body.comment
        }
        await Blog.updateOne(
            { _id: body.id},
            {$push:{comment: data}}
        )
        res.status(200).json({response:"comment uploded"})
    }catch (error) {
        console.error("Error in like:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.put('/like', authMiddleware, async(req, res)=>{
    try{
        const authorId = req.authorId;
        const likePerson = await User.findOne({_id: authorId});
        const body = req.body;
        const data = {
            authorId : authorId,
            auhtorName : likePerson.name,
        }
        await Blog.findByIdAndUpdate(
            { _id: body.id},
            {$push: { like: data }}
        )
        res.status(200).json({response:"liked"})
    }catch (error) {
        console.error("Error in like:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
router.delete('/like/:id', authMiddleware, async(req, res)=>{
    try{
        const blogId = req.params.id;
        const authorId = req.authorId;
        const likePerson = await User.findOne({_id: authorId});
        const data = {
            authorId : authorId,
            auhtorName : likePerson.name,
        }
        await Blog.findByIdAndUpdate(
            { _id: blogId},
            {$pull:{ like: data }}
        )
        res.status(200).json({response:"disliked"})
    }catch (error) {
        console.error("Error in like:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


module.exports = router;

// const page = parseInt(req.query.page) || 1;
        // const pageSize = parseInt(req.query.pageSize) || 10;
        // const skip = (page - 1) * pageSize;

// .skip(skip)
            // .limit(pageSize)
            // .toArray();