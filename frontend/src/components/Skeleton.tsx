

export const BlogsSkaleton = ()=>{
    return(
            <div role="status" className="flex justify-center w-full cursor-pointer">
                <div className="flex justify-center w-full">
            <div className="flex flex-col pt-2 pb-2 w-[60%] cursor-pointer">
                <div className="flex justify-center w-full">
                <div className="flex flex-col pt-2 pb-2 w-[60%]">
                    <div className="">
                        <div className="flex mr-2 ">
                            <svg className="w-8 mb-2 h-8 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                            <div className="flex flex-col justify-center font-bold text-2xl text-black w-full">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5 max-w-[200px]"></div>
                            </div>
                        </div>
                        <div className="h-96 bg-gray-200 rounded-lg max-w-[330px] mb-2.5"></div>
                    </div>
                    <div className="font-bold text-2xl text-black">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5 max-w-[300px]"></div>
                    </div>
                    <div className="font-bold text-2xl text-black">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5 max-w-[100px]"></div>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
    )
}