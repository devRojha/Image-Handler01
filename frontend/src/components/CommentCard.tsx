import { Avataar } from "./Avataar"

interface CommentData {
    authorName:string,
    comment:string
}

export const CommentCard = ({authorName , comment}: CommentData) =>{
    return (
        <div className="flex flex-col shadow mt-2 p-2 rounded-lg">
        <div className=" flex mb-1">
            <div className="mr-1 "><Avataar authorName={authorName}/></div>
            <div>
                <div className="flex flex-col justify-center font-semibold text-1xl h-8">{authorName}</div>
                <div className="text-slate-400 text-1xl">{comment}</div>
            </div> 
        </div>
        <div className="flex">
        </div>
    </div>
    )
}

   