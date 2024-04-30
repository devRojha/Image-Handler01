import { useNavigate } from "react-router-dom"
import { Avataar } from "./Avataar"
import { MdAddPhotoAlternate } from "react-icons/md";

export const BlogsBar = ({setForYou}:{setForYou:any})=>{ 
    const navigate = useNavigate();
    const name = localStorage.getItem("name") || "";
    if(!name){
        navigate("/")
    }

    return(
        <div className="flex justify-center w-full mt-8 mb-8">
            <div className="max-sm:text-[14px] max-sm:font-bold flex justify-between max-sm:w-[100%] w-[60%] shadow-lg rounded-md h-12 pl-4">
                <div className="space-x-4 pl-4 h-full flex">
                    <button onClick={()=>{navigate("/blog/post")}}  className="h-full border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600 text-2xl"><MdAddPhotoAlternate /></button>
                    <button onClick={()=>setForYou(false)} className="h-full border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600 text-1xl">All</button>
                    <button onClick={()=>setForYou(true)} className="h-full border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600 text-1xl">Your</button>
                </div>
                <div className="flex justify-center space-x-3">
                    <button onClick={()=>{
                        localStorage.clear();
                        navigate("/");
                        }} className="hover:text-blue-600">Log Out</button>
                    <div className="flex flex-col justify-center">
                        <Avataar 
                            authorName={name}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}