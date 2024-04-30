import { Link, useNavigate } from "react-router-dom"
import { Avataar } from "./Avataar"
import axios from "axios"
import { BackendUrl } from "../config"
import { AiOutlineLike } from "react-icons/ai"
 
interface BlogCardProps {
    id: string,
    authorName: string,
    caption: string,
    imageUrl: string,
    publishedDate: string,
}

 export const DraftCard = ({authorName, caption, imageUrl, publishedDate , id}: BlogCardProps)=>{
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
                navigate("/draft")
            },1000);
            navigate("/delete")
        });
    }
    const Published = ()=>{
        axios.put(`${BackendUrl}/api/v1/blog`, {
            id: id,
            published: "true"
        },{
            headers:{
                Authorization: localStorage.getItem("authorization"),
            }
        })
        .then(response => {
            console.log(response.data);
            setTimeout(()=>{
                navigate("/draft")
            },1000);
            navigate("/publish")
        })
        .catch(error => {
            // Handle error
            console.error("Error publishing:", error);
        });
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
                            <div className="text-slate-700 mt-2">
                                {caption}
                            </div>
                        </Link>
                        <div className="mb-2 text-slate-400 font-semibold text-sm">
                                <div className="flex space-x-2 mt-2">
                                    <button onClick={()=>alert("Publish First")} className="text-black text-2xl"><AiOutlineLike /></button>
                                    <div>0 likes</div>
                                    <div>0 comments</div>
                                </div>
                            </div>
                        <div className="flex">
                            <button onClick={Published} className="border p-2 m-2 ml-0 rounded-lg bg-green-500 text-white hover:bg-green-800 active:text-black">Publish</button>
                            <button onClick={DeleteData} className="border p-2 m-2 rounded-lg bg-red-500 text-white hover:bg-red-800 active:text-black">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
 }

 