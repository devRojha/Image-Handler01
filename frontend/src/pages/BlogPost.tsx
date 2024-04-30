import { useEffect, useState } from "react"
import { PostBar } from "../components/PostBar"
import axios from "axios";
import { BackendUrl } from "../config";
import { useNavigate } from "react-router-dom";


export const BlogPost = ()=>{
    const [caption , setCaption] = useState("");
    const [file, setFile] = useState <File | undefined>();
    const [publish , setPublish] = useState(true);

    const navigate = useNavigate();
    useEffect(()=>{
        const token  = localStorage.getItem("authorization");
        if(!token){
            navigate("/")
        }
    },[localStorage.getItem("authorization")])
    
    const submit = async (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!caption || !file) {
            alert("Please provide both a title and a file.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("caption", caption);
        formData.append("published", publish.toString());
        try {
            const response = await axios.post(
                `${BackendUrl}/api/v1/blog`,
                formData,
                {
                    headers: {
                        Authorization: localStorage.getItem("authorization"),
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log(response.data);
            alert("Post " + (publish ? "Published" : "Saved"));
        } catch (error) {
            console.error("Error publishing:", error);
            alert("An error occurred while publishing the post.");
        }
    };

    return(
        <div>
            <PostBar  />
            <div  className="flex justify-center">
                <form onSubmit={submit} className="flex flex-col justify-center w-[80%]">
                    <input onChange={e => setFile(e.target.files?.[0])} type="file" accept="image/*"></input>
                    <textarea onChange={(e)=>{setCaption(e.target.value)}}  placeholder="Post" className="border h-28 m-4 text-2xl focus:outline-none p-2"></textarea>
                    <div>
                        <input type="checkbox" name="" id="" onClick={()=> setPublish(!publish)}/>
                        <div>click for save the post</div>
                    </div>
                    <div className="flex">
                        <div className={`${(publish)?"flex":"hidden"}`}>
                            <button type="submit" className={`hover:bg-green-800 active:text-slate-500 border rounded-2xl p-6 flex flex-col justify-center bg-green-600 h-8 text-white w-28 mt-4 mb-8 ml-4`}>Publish</button>
                        </div>
                        <div className={`${(publish)?"hidden":"flex"}`}>
                            <button type="submit" className={`hover:bg-slate-800 active:text-slate-500 border rounded-2xl p-6 flex flex-col justify-center bg-slate-600 h-8 text-white w-28 mt-4 mb-8 ml-4`}><span className="flex justify-center w-full">Save</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}