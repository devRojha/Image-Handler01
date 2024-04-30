import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../config";
import axios from "axios";
import { BlogsSkaleton } from "../components/Skeleton";
import { DraftCard } from "../components/DraftCard";
import { PostBar } from "../components/PostBar";

interface Blog{
    data:{
        _id:string,
        authorId:string,
        content: string,
        caption: string,
        published: string,
        publishedDate: string,
        author: {
            name: string,
        }
    },
    imageUrl:string
}

export const Draft = ()=>{
    const [blogs , setBlogs] = useState<Blog[]| null>(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const token  = localStorage.getItem("authorization");
        if(!token){
            navigate("/")
        }
    },[localStorage.getItem("authorization")])

    useEffect(()=>{
        axios(`${BackendUrl}/api/v1/blog/draft`,{
            headers:{
                Authorization: localStorage.getItem("authorization")
            }
        }) 
            .then(res => {
                setBlogs(res.data.response);
            })
    },[])

    if(!blogs){
        return(
            <div className="flex justify-center w-full">
                <div className="flex flex-col w-full">
                    <PostBar />
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
            <PostBar />
            {blogs.map(blog=> { 
                return(<DraftCard
                        key={blog.data._id}
                        id={blog.data._id}
                        authorName={blog.data.author.name || "Anonyous"}
                        caption = {blog.data.caption}
                        imageUrl={blog.imageUrl}
                        publishedDate={(blog.data.publishedDate == "false")?"04/10/2003" : blog.data.publishedDate}
                    />
                )
            })}
        </div>
    </div>
    )
}
