import { useEffect, useState } from "react"
import axios from "axios";
import { BackendUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";   
import { BlogBar } from "../components/BlogBar";
import { Avataar } from "../components/Avataar";
import { BlogSkaleton } from "../components/BlogSkeleton";
import { AiOutlineLike } from "react-icons/ai";
import { CommentCard } from "../components/CommentCard";


interface BlogType {
    data:{
        _id:string,
        authorId:string,
        content: string,
        caption: string,
        published: string,
        publishedDate: string,
        like:{
            authorId : string,
            auhtorName: string
        }[],
        comment:{
            authorId:string,
            authorName:string,
            comment:string,
        }[],
        author: {
            name: string,
        }
    },
    imageUrl: string,
    likeStatus:string
}

export const Blog = ()=>{
    const[blog , setBlog] = useState <BlogType[] | null>(null);
    const [commentData , setCommentData] = useState("");
    const[likeStatus, setLikeStatus] = useState("false")
    const[commentPush, setCommentPush] = useState(false);
    const { id } = useParams<{ id: string }>(); // Get id from URL
    const navigate = useNavigate();
    let i = 0;
    useEffect(()=>{
        const token  = localStorage.getItem("authorization");
        if(!token){
            navigate("/")
        }
    },[localStorage.getItem("authorization")])
    useEffect(()=>{
        axios(`${BackendUrl}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("authorization") || ""
            }
        })
        .then(res => {setBlog(res.data.response);setLikeStatus(res.data.response[0].likeStatus);console.log(res.data.response);})
        
    },[likeStatus, commentPush])
    
    const CommentGo = ()=>{
        if(commentData.length > 0){
            axios.put(`${BackendUrl}/api/v1/blog/comment`,{
                id:id,
                comment: commentData
            },{
                headers:{
                    Authorization: localStorage.getItem("authorization") || ""
                }
            })
            setCommentData("");
            setCommentPush(!commentPush);
        }
    }

    const LikeLogic = ()=>{
        if(likeStatus == "false"){
            axios.put(`${BackendUrl}/api/v1/blog/like`,{
                id:id
            },{
                headers:{
                    Authorization: localStorage.getItem("authorization") 
                }
            })
            setLikeStatus("true");
        }
        else if(likeStatus == "true"){
            axios.delete(`${BackendUrl}/api/v1/blog/like/${id}`,{
                headers:{
                    Authorization: localStorage.getItem("authorization") 
                }
            })
            setLikeStatus("false");
        }
    }
    if(!blog){
        return(
            <BlogSkaleton />
        )
    }
    return(
        <div className="p-2">
            <BlogBar />
            <div className="flex">
                <div className="mr-3 mt-1"><Avataar authorName={blog[0].data.author.name || "Anynomous"}/></div>
                    <div className="flex flex-col">
                        <div className="font-bold text-2xl">{blog[0].data.author.name || "Anynomous"}</div>
                    </div>
            </div>
            <div className="grid max-md:grid-cols-1 grid-cols-4 min-h-screen">
                <div className="col-span-3">
                    <div className="flex flex-col p-4">
                        <div className="text-3xl font-bold mb-2">{blog[0].data.caption}</div>
                        <div className="text-md font-semibold mb-3 text-slate-400">Published on {blog[0].data.publishedDate}</div>
                        <div className="font-bold text-2xl text-black">
                                <img className="flex justify-center rounded-lg bg-cover" src={blog[0].imageUrl} />
                        </div>
                        <div className="flex space-x-2 mt-2">
                            <button onClick={LikeLogic} className={`${(blog[0].likeStatus == "false")?"text-black":"text-red-400"} text-2xl`}><AiOutlineLike /></button>
                            <div>{blog[0].data.like.length} likes</div>
                            <div>{blog[0].data.comment.length} comments</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 p-4 border-l flex flex-col">
                    <div className="font-semibold text-slate-500 mb-4">comment</div>
                    <div className="max-lg:flex-col max-lg:space-y-2 flex mb-4">
                        <textarea className="h-12 p-2 border mr-2" placeholder="comment" onChange={(e)=> setCommentData(e.target.value)}/>
                        <div>
                            <button onClick={CommentGo} className="bg-blue-400 hover:bg-blue-600 border rounded-lg p-2">Comment</button>
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col-reverse justify-center">
                        {blog[0].data.comment.map(response=>{
                            return(
                                <CommentCard 
                                    key={i++}
                                    authorName = {(response.authorName)}
                                    comment = {response.comment}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}