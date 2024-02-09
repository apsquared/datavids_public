"use client"
import { RemotionUserVideoDef } from '@/remotion-video/types/uservideodef';
import { sampleUserVideoDef1 } from '@/remotion-video/samples/default';
import { useState } from 'react';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { Player } from "@remotion/player";
import { MyComposition } from "@/remotion-video/Composition";
import { useEffect } from 'react';
import JsonEditor from './editor';
import { useRouter } from 'next/navigation';
import { dataVidIntro } from './datavidintro';

export const CreateVideoJSON = () => {

    const router = useRouter();

    const [inputPropsObj,setInputPropsObj] = useState<RemotionUserVideoDef>(dataVidIntro);
    const [inputProps,setInputProps]=useState(JSON.stringify(dataVidIntro));
    const [durationInSec,setDurationInSec] = useState(dataVidIntro.durationSec);
    const [buttonLabel, setButtonLabel] = useState("Render Video");

    const player: React.CSSProperties = {
        width: "80%",
      };

     useEffect(() => {
        console.log("Input Props changed");
      },[inputPropsObj]);

    function onJSONChange(json: any){
      console.log("change "+JSON.stringify(json));
      setDurationInSec(json.durationSec);
      setInputPropsObj(json);
    }

    const submitVideo = async () => {
        setButtonLabel("Submitting for Render...");
        const valresponse = await fetch("/api/createvideorequest", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({uservid:inputPropsObj})
          });
          if (valresponse.status==200){
            console.log("RESP:"+JSON.stringify(await valresponse.json()))
            // tell it to process the queue (this may be removed in future)
            const qresp = await fetch("/api/processqueue");
            if (qresp.status==200){
              //we re good to redirect you
              router.push("/view-my-requests");
            } else {
              //show error
              console.log("ERROR IN PROCESS QUEUE "+qresp.status);
            }
      
          } else {
            console.log("ERROR RESP "+valresponse.status);
          }
      

    }
      
    //https://github.com/felipecarrillo100/react-jsoneditor-wrapper
    return (
        <>
        <Breadcrumb
        pageName="Create Video JSON"
        description=""
        />
        <div className='container py-10 my-10 '>
            <div className='flex'>
                <div className='w-3/4'>
                <JsonEditor initialJson={inputProps} onJsonUpdate={onJSONChange} />
                </div>
                <div className='pl-2 w-1/4 flex flex-col justify-start items-center'>
                    <button onClick={() => submitVideo()} className="bg-primary hover:hover:bg-primary/80 text-white font-bold py-2 px-4 rounded mb-3">
                        {buttonLabel}
                    </button>
                    
                    <Player
                        component={MyComposition}
                        inputProps={{videoDef:inputPropsObj}}
                        durationInFrames={durationInSec*30}
                        fps={30}
                        compositionHeight={1920}
                        compositionWidth={1080}
                        style={player}
                        controls
                        loop
                    />
                </div>
            </div>
            
        </div>
        </>
    )
} 