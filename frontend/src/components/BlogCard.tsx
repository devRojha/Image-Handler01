import { Link, useNavigate } from "react-router-dom"
import { Avataar } from "./Avataar"
import axios from "axios";
import { BackendUrl } from "../config";
import { AiOutlineLike } from "react-icons/ai";
 
interface BlogCardProps {
    id: string,
    authorName: string,
    caption: string,
    publishedDate: string,
    forYou: boolean,
    imageUrl: string,
    likeStatus: string,
    like:[],
    comment:[],
    setlikeChange: any
}

 export const BlogCard = ({authorName, caption, publishedDate , id, forYou, imageUrl, likeStatus, comment, like, setlikeChange}: BlogCardProps)=>{
    const navigate = useNavigate();
    const DeleteData = ()=>{
        axios.delete(`${BackendUrl}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("authorization") 
            }
        })
        .then(res => {
            console.log(res.data)
            setTimeout(()=>{
                navigate("/blogs")
            },1000);
            navigate("/delete")
        });
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
            likeStatus = "true"
            setlikeChange("true")
        }
        else if(likeStatus == "true"){
            axios.delete(`${BackendUrl}/api/v1/blog/like/${id}`,{
                headers:{
                    Authorization: localStorage.getItem("authorization") 
                }
            })
            likeStatus = "false"
            setlikeChange("true")
        }
    }

    return(
        <div className="flex justify-center w-full">
            <div className="flex flex-col pt-2 pb-2 w-[60%] cursor-pointer">
                <div className="flex justify-center w-full">
                    <div className="flex flex-col">
                        <Link   to={`/blog/${id}`}>
                            <div className="max-sm:text-sm mb-2">
                                <Avataar authorName={authorName}/>
                                {authorName+" | "} <span className="text-slate-500 ">{publishedDate}</span>
                            </div>
                            <div className="font-bold text-2xl text-black">
                                <img className="h-100 w-96 flex justify-center rounded-lg bg-cover" src={imageUrl} />
                            </div>
                            <div className="text-slate-700 mt-2 ml-2">
                                {caption}
                            </div>
                        </Link>
                            <div className="mb-2 text-slate-400 font-semibold text-sm">
                                <div className="flex space-x-2 mt-2">
                                    <button onClick={LikeLogic} className={`${(likeStatus == "true")?"text-red-400":"text-black"} text-2xl`}><AiOutlineLike /></button>
                                    <div className="flex flex-col justify-center">{like.length} likes |</div>
                                    <div className="flex flex-col justify-center">{comment.length} comments</div>
                                </div>
                            </div>
                        <div className={`${(forYou)? "flex": "hidden"}`}>
                            <button onClick={DeleteData} className={`border p-2 m-2 ml-0 rounded-lg bg-red-500 text-white hover:bg-red-800 active:text-black`}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className={`${(forYou)? "flex": "hidden"} justify-center border border-slate-200`}></div>
            </div>
        </div>
    )
 }
