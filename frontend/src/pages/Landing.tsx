import { LandingBar } from "../components/LandingBar"





export const Landing= ()=>{
    return(
        <div className="flex justify-center h-screen bg-slate-300 w-full">
            <div className="flex flex-col w-full">
                <LandingBar />
                <div className=" flex justify-center mt-40 text-6xl font-bold">WELCOME</div>
                <div className=" flex justify-center mt-10 text-6xl font-bold">TO</div>
                <div className="text-red-400 flex justify-center mt-10 text-6xl font-bold">IMAGE</div>
                <div className="text-blue-400 flex justify-center mt-10 text-6xl font-bold">HANDLER</div>
            </div>
        </div>
    )
}
