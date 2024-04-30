import { Avataar } from "./Avataar"
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
export const BlogBar = ()=>{
    const navigate = useNavigate();
    const name = localStorage.getItem("name") || "";
    if(!name){
        navigate("/")
    }
    return(
        <div className="flex justify-center w-full  mb-8">
            <div className="flex justify-between w-full shadow-lg rounded-md h-12 d space-x-4 pl-4">
                <div className="h-full flex justify-center space-x-4 pl-4">
                    <div className="h-full flex flex-col justify-center">
                        <button onClick={()=>{navigate("/blogs")}} className="flex justify-center p-2 font-bold text-1xl h-8 w-8 text-white bg-slate-500 hover:bg-slate-800 active:text-black rounded-full"><FaHome /></button>
                    </div>
                    <div className="h-full flex flex-col justify-center">
                        <div  className="flex justify-center">
                            <div className="w-6 h-6 bg-black rounded-full mr-[1px] border"></div>
                            <div className="w-4 h-6 bg-black rounded-full  mr-[1px]"></div>
                            <div className="w-2 h-6 bg-black rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 text-slate-600">
                    <button onClick={()=>{
                        localStorage.clear();
                        navigate("/");
                        }} className="active:text-blue-600 border-slate-500 active:border-blue-600 active:border-b hover:border-b">Log Out</button>
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