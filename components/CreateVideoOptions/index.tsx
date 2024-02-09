"use client"

import SectionTitle from '@/components/Common/SectionTitle';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import {    Button  } from "@/components/mtexport";

const VideoOptions = ()  => {


  const createVideo = () => {
    window.location.href = '/create-video';
};

const gotoAI = () => {
    window.location.href = '/create-video-ai-url';
};


    return (
<div className="flex flex-col items-center justify-center">

                                
<div className="container">
          <SectionTitle
            title="Let's Get Started"
            paragraph="Simple Ways to Create Viral Videos Fast. Choose which works best for you."
            center
            mb="60px"
          />

          <div className="flex flex-cols text-center items-center justify-center ">
            <div className="w-full bg-gray-200 rounded-lg p-2 m-5">
                <div>
                    <div className="flex  justify-center items-center mb-5">
                    
                    <h3 className=" text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                        Video Editor
                    </h3>
                    
                    </div>
                    <p className="text-base font-medium leading-relaxed text-black">
                        Use our scene editor to quickly create your own videos. <br></br>
                    
                    </p>
                    <div className="flex items-center justify-center">   
                     <Button className=" justify-center m-3 flex items-center " color="blue" size="sm" onClick={createVideo}>
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create New Video
                    </Button>      
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-200 rounded-lg p-2 m-5">
                <div >
                <div className="flex  justify-center items-center mb-5">
                    
                    <h3 className="text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                        URL to Video powered by AI
                    </h3>
                    </div>
                    <p className="pr-[10px] text-black font-medium leading-relaxed ">
                        Just give us a URL and we will do all the work.  
                     
                    </p>
                    <div className="flex items-center justify-center">   
                     <Button className=" justify-center m-3 flex items-center " color="blue" size="sm" onClick={gotoAI}>
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> AI URL to Video
                    </Button>      
                    </div>    
                </div>
            </div>
          </div>



  </div>
  </div>
  
    )
}

export default VideoOptions