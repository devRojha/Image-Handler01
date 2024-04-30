
import { BlogsBar } from "../components/BlogsBar"
import { BlogCard } from "../components/BlogCard"
import { BlogsSkaleton } from "../components/Skeleton"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { BackendUrl } from "../config"

interface Blog{
    data:{
        _id:string,
        authorId:string,
        content: string,
        caption: string,
        published: string,
        publishedDate: string,
        like:[]
        comment:[]
        author: {
            name: string,
        }
    },
    imageUrl: string,
    likeStatus:string
}

export const Blogs= ()=>{
    const [forYou , setForYou] = useState(false);
    const [blogs , setBlogs] = useState<Blog[]| null>(null);
    const [likeChange , setlikeChange] = useState("false");
    useEffect(()=>{
        setTimeout(()=>{
            if(forYou == false){
                axios(`${BackendUrl}/api/v1/blog/bulk`,{
                    headers:{
                        Authorization: localStorage.getItem("authorization")
                    }
                }) 
                    .then(res => {
                        setBlogs(res.data.response);
                    })
            }
            else{
                axios(`${BackendUrl}/api/v1/blog/author`,{
                    headers:{
                        Authorization: localStorage.getItem("authorization")
                    }
                }) 
                    .then(res => {
                        setBlogs(res.data.response);
                    })
            }
        },300)
    },[forYou, likeChange])
    const navigate = useNavigate();
    useEffect(()=>{
        const token  = localStorage.getItem("authorization");
        if(!token){
            navigate("/")
        }
    },[localStorage.getItem("authorization")])
    if(!blogs){
        return(
            <div className="flex justify-center w-full">
                <div className="flex flex-col w-full">
                    <BlogsBar  setForYou={setForYou}/>
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                </div>
            </div>
        )
    }
    return(
        <div className="flex justify-center w-full">
            <div className="flex flex-col w-full">
                <BlogsBar  setForYou={setForYou}/>
                {blogs.map(blog=> { 
                    return(<BlogCard 
                            forYou={forYou}
                            key={blog.data._id}
                            id={blog.data._id}
                            authorName={blog.data.author.name || "Anonyous"}
                            caption = {blog.data.caption}
                            imageUrl={blog.imageUrl}
                            publishedDate={blog.data.publishedDate}
                            like={blog.data.like}
                            comment={blog.data.comment}
                            likeStatus={blog.likeStatus}
                            setlikeChange={setlikeChange}
                        />
                    )
                })}
            </div>
        </div>
    )
}



