"use client"

import Breadcrumb from "@/components/Common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/mtexport";
import { RemotionUserVideoDef } from '@/remotion-video/types/uservideodef';
import Image from "next/image";
import { useState,useContext } from "react";
import { redirect, useRouter } from "next/navigation";
import { AI_COST } from "@/utils/ledgerutil";
import { Checkbox } from "@/components/ui/checkbox"
import {DataContext} from '@/components/DataProvider';
import OutOfCreditsAlertAI from "@/components/Common/OutOfCreditsAlertAI";



export const CreateVideoURL = ({loggedIn}:{loggedIn:boolean}) => {
    const player: React.CSSProperties = {
        width: "80%",
      };

      const router = useRouter();

      const [url,setUrl] = useState("");
      const [image,setImage] = useState("");
      const [usertip,setUsertip] = useState("");
      const [status, setStatus] = useState("");
      const [duration, setDuration] = useState("");
      const [bgmusic,setBgmusic] = useState(false);
      const [isOutOfCredits,setIsOutOfCredits] =  useState(false);

      const [error, setError] = useState("");

      const [genButton, setGenButton] = useState("Generate Video");
      const{userCredits,updateCreditsContext} = useContext(DataContext);


      const submitURL = async () => { 
        if (!loggedIn){
            router.push('/signin');
            return;
        }
        setError("");
        setGenButton("Generating...");
        setStatus("Reading Your Webpage With Our AI.")
        setTimeout(() => {
            if (!error){
                setStatus("Using AI to Generate Video")
            }
            
        }, 3000);
        const valresponse = await fetch("/api/aiurltovideo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url:url,
                image:image,
                usertip:usertip,
                duration:duration,
                bgmusic
            })
        });
        window.gtag('event', 'createAIvideo');
        setStatus("");
        setGenButton("Generate Video");
        if (valresponse.status==200){
            const resp = await valresponse.json();
            console.log("Response "+JSON.stringify(resp));
            if (resp.id){
                await updateCreditsContext();
                router.push('/create-video?fromAI=true&videoid='+resp.id);
                //redirect('/create-video?videoid='+resp.id);
            }
        } else if (valresponse.status==400){
            const resp = await valresponse.json();
            const err = resp.error;
            if (err=="MISSING_IMG"){
                setError("Could not find an image for the video.  Please enter one above.");
            } else {
                setError("An error occured duringn our AI processing.  This happens with AI.  Feel free to try again.");
            }
        }else if(valresponse.status==410){
            setStatus("");

            setIsOutOfCredits(true);
            //router.push('/buycredits');
        }
         else {
            setError("An error occured duringn our AI processing.  This happens with AI.  Feel free to try again.");
        }
      }

 

    return (
        <>
        <Breadcrumb
        pageName="Create Video By URL"
        description=""
        />
        {isOutOfCredits && (
      <OutOfCreditsAlertAI  onClose={() => setIsOutOfCredits(false)}/>
      )}   

        <div className='container py-5 my-2 lg:py-10 lg:my-10 '>
            <div className='flex'>
                <div className='w-full lg:w-3/4 mr-2 lg:mr-10'>
                    <h1 className="text-3xl text-primary font-bold">URL to Video (Using AI) { (loggedIn?'':' - Get Started for FREE!')} </h1>
                    <h2 className="mb-5 mt-3">Just give us a URL to one of your pages and our AI will create you a video.</h2>
                    <div className="flex flex-col items-end">
                        <Input className="w-full mr-5 mb-5" color="blue" required name="url" value={url} onChange={(e)=>setUrl(e.target.value)} 
                                label="Enter URL" crossOrigin={undefined} />
                        <div className="mt-5 w-full text-gray-600">
                            <span>While not required answering any of these questions will help our AI build you the best video possible.</span>
                        </div>
                        <div className="mt-5 w-full">
                        <Input className="w-full" color="blue" name="image" value={image} onChange={(e)=>setImage(e.target.value)} 
                                label="Suggest An Image(Optional)" crossOrigin={undefined} />
                       </div>
                       <div className="mt-5 w-full">
                        <Input className="w-full" color="blue" name="usertip" value={usertip} onChange={(e)=>setUsertip(e.target.value)} 
                                label="What would you like us to focus on?(Optional)" crossOrigin={undefined} />
                       </div>
                       <div className="mt-5 w-full">
                        <Input className="w-full" color="blue" name="duration" value={duration} onChange={(e)=>setDuration(e.target.value)} 
                                label="How long do you want the video to be, in seconds?(Optional)" crossOrigin={undefined} />
                       </div>
                       <div className="mt-5 w-full text-gray-600">
                       <div className="flex space-x-2">
                        <Checkbox className="text-black" id="bgmusic" checked={bgmusic} onCheckedChange={(isChecked) => setBgmusic((isChecked.valueOf()==true?true:false))}/>
                        <div className="grid gap-1.5 leading-none">
                            <label
                            htmlFor="bgmusis"
                            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            Add Background Music?
                            </label>
                            <p className="text-sm text-muted-foreground">
                            If not you can always add music when you upload to Tik Tok or Instagram.
                            </p>
                        </div>
                        </div>
                        </div>
                        <Button onClick={() => submitURL()} className="mt-5 w-1/2 lg:w-1/4 bg-primary hover:hover:bg-primary/80 text-white font-bold py-2 px-4 rounded">
                            <div className="grid grid-cols-2 justify-center items-center">
                                <div className=""><p className="text-left">{genButton} </p> </div>
                                <div className="">
                                    <div className="grid grid-cols-2 justify-center items-center">
                                        <div className="text-right">1</div>
                                        <div><Image width={30} height={30} src="/images/token.png" alt="Token"/></div>
                                    </div>
                                </div>
                            </div>
                        </Button>
                      
                        { status && (
                        <div className="flex mt-8 w-full items-center justify-center">
                            <Image src="/images/ai-anim.gif" alt="Loading" height={100} width={100}/>
                            <h3 className="text-2xl text-primary">{status}</h3>
                        </div>
                        )}
                       { error && (
                        <div className="flex mt-8 w-full items-center justify-center">                           
                            <h3 className="text-2xl text-red-600">{error}</h3>
                        </div>
                        )}
                    </div>
                </div>
      
            </div>
        </div>
        </>
    )

}