"use client"

import { UserVideoRequest, VideoStatus } from "@/types/uservideoreq";
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
} from "@/components/mtexport";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { color } from "@material-tailwind/react/types/components/alert";
import { useEffect, useState } from "react";
import { AddToGallery } from "./addtogallery";


  const TABLE_HEAD = ["Name", "Status", "Last Update", "Rendered On", "Userid","Action"];

  
  const VidList = ({vidList}:{vidList:UserVideoRequest[]}) => {

        const [allResults, setAllResults] = useState(vidList);
        const [showAddToGallery, setShowAddToGallery] = useState(false);
        const [addToGalleryVidUrl, setAddToGalleryVidUrl] = useState("");
     



        const addToGallery = (url:any) =>{
            console.log("Add to gallery called "+url);
            setAddToGalleryVidUrl(url);
            setShowAddToGallery(true);
            /*fetch("/api/addtogallery", {
              method: "POST",
              body:JSON.stringify({url:url})
            })
              .then((res) => res.json())
              .then((data) => console.log("done adding to gallery"));
              */
      
          }

        return (
            <>
                        <AddToGallery videourl={addToGalleryVidUrl} setOpen={setShowAddToGallery} open={showAddToGallery}/>

            <Card className="w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-6">
                <div>
                <Typography variant="h5" color="blue-gray">
                Video List 
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Check the status of your videos.
                </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

                </div>
            </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head, index) => (
                    <th
                        key={head}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                        {head}{" "}
                        {index !== TABLE_HEAD.length - 1 && (
                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {allResults.map(({ _id,videoDef, status, updateTime,completionTime,videoUrl,userid,percComplete,errorMsg }, index) => {
                    const isLast = index === allResults.length - 1;
                    const name = videoDef.videoname;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";


                    let statusLabel = "Queued";
                    let statusColor:color = "orange"
                    if (status == VideoStatus.INPROGRESS){
                        statusLabel = "In-Progress"
                        statusColor = "blue-gray"
                    } else if (status == VideoStatus.COMPLETE){
                        statusLabel = "Completed"
                        statusColor = "green"

                    } else if (status == VideoStatus.ERROR){
                        statusLabel = "Error"
                        statusColor = "red"
                    } else if (status == VideoStatus.SAVED){
                        statusLabel = "Saved"
                        statusColor = "indigo"
                    }

                    return (
                    <tr key={_id}>
                        <td className={classes}>
                        <div className="flex items-center gap-3">
                            
                            <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {name}
                            </Typography>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                            >
                                {videoDef.description} - {_id}
                            </Typography>
                            </div>
                        </div>
                        </td>
                        <td className={classes}>
                        <div className="flex flex-col">
                            
                            <Chip
                            variant="ghost"
                            size="sm"
                            value={statusLabel}
                            color={statusColor}
                            />
                            { percComplete && percComplete>0 &&(
                                <>
                                   <span>{Math.round(percComplete*100)}%</span> 
                                </>
                            ) }

                            { errorMsg &&  (
                                <>
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild className="text-right">
                                    <span className="underline text-xs">Details</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                    <p>{errorMsg}</p>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                                </>
                            ) }
                      
                       
                        </div>
                        </td>

                        <td className={classes}>
                        <div className="w-max">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {updateTime ? updateTime.toLocaleString() : ''}
                        </Typography>
                        </div>
                        </td>

                        <td className={classes}>
                        <div className="w-max">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {completionTime ? completionTime.toLocaleString() : ''}
                        </Typography>
                        </div>
                        </td>

                        <td className={classes}>
                        <div className="w-max">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {userid}
                        </Typography>
                        </div>
                        </td>
                        <td className={classes}>
                        <div className="w-max">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {status!=VideoStatus.COMPLETE && (
                        <><a href={'/create-video?videoid='+_id}> View</a>
                        </>
                        )}
                            {status==VideoStatus.COMPLETE && (
                               <> 
                            <a download="out.mp4" href={videoUrl}>Download</a> 
                            &nbsp;|&nbsp;
                            <button onClick={(e)=>addToGallery(videoUrl)} >
                            Add to Gallery
                            </button>
                            </>
                            )}
                            
                        
                        </Typography>
                        </div>
                        </td>

                    </tr>
                    );
                })}
                </tbody>
            </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            {/*  
            <Typography variant="small" color="blue-gray" className="font-normal">
                Page 1 of 10
            </Typography>
            <div className="flex gap-2">
                <Button variant="outlined" color="blue-gray" size="sm">
                Previous
                </Button>
                <Button variant="outlined" color="blue-gray" size="sm">
                Next
                </Button>
            </div>
            */}
            <p></p>
            </CardFooter>
        </Card>
        </>
        )
}
export default VidList