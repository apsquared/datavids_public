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
import { Video } from "remotion";
import { UserDetails } from "@/types/userdetails";
import { AddToGallery } from "./addtogallery";

const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
        label: "Saved",
        value:  VideoStatus.SAVED,
    },
    {
        label: "Queued",
        value:  VideoStatus.QUEUED,
    },
    {
      label: "In-Progress",
      value:  VideoStatus.INPROGRESS,
    },
    {
        label: "Error",
        value: VideoStatus.ERROR,
    },
    {
      label: "Completed",
      value: VideoStatus.COMPLETE,
    },
  ];

  const TABLE_HEAD = ["Name", "Status", "Last Update", "Rendered On", "Action"];

  const getVidStatus = async (id:string) => {
    const valresponse = await fetch("/api/getlambdastatus?id="+id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (valresponse.status==200){
        console.log("RESP:"+JSON.stringify(await valresponse.json()))
      } else {
        console.log("RESP "+valresponse.status);
      }
  }

  const RequestTable = ({results,userDetails}:{results:UserVideoRequest[],userDetails:UserDetails | null}) => {

        const [allResults, setAllResults] = useState(results);
        const [vidResults, setVidResults] = useState(results);
        const [showAddToGallery, setShowAddToGallery] = useState(false);
        const [addToGalleryVidUrl, setAddToGalleryVidUrl] = useState("");
        const [currentTabIndex, setCurrentTabIndex] = useState(0);


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

        const filterResults = (filterType:any) => {
            //console.log("here "+filterType)
            if (filterType == "all"){
                setVidResults(allResults);
            } else {
                const results = allResults.filter(r => r.status == filterType);
                setVidResults(results);
            }
        }

        const createVideo = () => {
            window.location.href = '/create-video';
        };

        useEffect(() => {
            const interval = setInterval(() => {

                const promises = results.map(item =>{
                    if (item.status != VideoStatus.COMPLETE && item.status != VideoStatus.ERROR){
                        return fetch(`/api/getlambdastatus?id=${item._id}`).then(response => response.json())                   
                    } else {
                        return Promise.resolve(item);
                    }
                });
          
                Promise.all(promises).then(newData => setVidResults(newData.map(item => (item.respObj ? item.respObj : item))));
            }, 10000); // Polls every 10 seconds
        
            // Cleanup function to clear the interval when the component unmounts
            return () => clearInterval(interval);
          }, []); // Empty dependency array means this effect runs once when the component mounts, and not again
        
        if (!results || results.length ==0){
            return (<><div>No Requests Found</div></>)
        }

        return (
            <>
            <AddToGallery videourl={addToGalleryVidUrl} setOpen={setShowAddToGallery} open={showAddToGallery}/>
            <Card className="w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-6">
                <div>
                <Typography variant="h5" color="blue-gray">
                Video Creation Requests
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Check the status of your videos.
                </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          

                <Button className="flex items-center gap-3" color="blue" size="sm" onClick={createVideo}>
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create New Video
                </Button>

                </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <Tabs value={currentTabIndex} className="w-full md:w-max" onChange={filterResults}>
                <TabsHeader >
                    {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value} onClick={()=>filterResults(value)}>
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                    ))}
                </TabsHeader>
                </Tabs>
                <div className="w-full md:w-72">
                <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined} />
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
                {vidResults.map(({ _id,videoDef, status, updateTime,completionTime,videoUrl,percComplete,errorMsg }, index) => {
                    const isLast = index === vidResults.length - 1;
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
                            <a href={'/create-video?videoid='+_id}> {(status==VideoStatus.COMPLETE ? 'Clone' : 'Edit')} </a>
                            {status==VideoStatus.COMPLETE && (
                               <> &nbsp;|&nbsp;
                            <a download="out.mp4" href={videoUrl}>Download</a> 
                            </>
                            )}
                            
                            {userDetails?.role=="ADMIN" && status==VideoStatus.COMPLETE && (
                                <>&nbsp;|&nbsp;
                            <button onClick={(e)=>addToGallery(videoUrl)} >
                            Add to Gallery
                            </button>
                            </>
                            )
                            }
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
export default RequestTable