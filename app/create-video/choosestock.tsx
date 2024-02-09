import * as React from "react"
import Image from "next/image";
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query" 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DVVideoResult } from "@/utils/pexels"
import { useEffect } from "react";
import Video from "@/components/Video";




export function ChooseStock({open,setOpen,setSelection}: {open:boolean,setOpen:((open: boolean) => void) | undefined,setSelection:((item: string) => void) | undefined}) {

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [searchTerm,setSearchTerm] = React.useState("");
  const [results, setResults] = React.useState<DVVideoResult[]>();
  const [errorMsg,setErrorMsg] = React.useState("");
  const [previewing, setPreviewing] = React.useState("");

  function selectItem(item:string){
    if (setSelection)
       setSelection(item);
    if (setOpen)
       setOpen(false);
  }

  useEffect(() => {
    if (open){
        setSearchTerm("");
        setResults([]);
    }

  }, [open]);
  
    async function callSearch(){

        if (!searchTerm){
            alert("Please enter a search term.");
            return;
        }
        const qresp = await fetch("/api/pexels?query=" + searchTerm);
        if (qresp.status == 200) {
          const obj = await qresp.json();
          if (obj.results && obj.results.length>0){
            const resultList:DVVideoResult[] = obj.results as DVVideoResult[];
            console.log("Setting results "+resultList.length);
            setResults(resultList);
          } else {
            //no results found
            setErrorMsg("No Results Found.  Try another term.");
            setResults([]);   
          }
        } else {
            //error
            setResults([]);
            setErrorMsg("An error occured "+qresp.status)
        }


    }

function ProfileForm({ className }: React.ComponentProps<"div">) {
    return (
        <>
        <div className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
            <Label htmlFor="searchterm">Search Term</Label>
            <Input type="text" id="searchterm" onChange={(e)=>{setSearchTerm(e.target.value)}} value={searchTerm} autoFocus={true}/>
        </div>
        <Button className="text-white" onClick={(e)=>callSearch()}>Search</Button>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 w-full mt-2 pr-2 pl-2">
            {((results && results.length>0) ?  <>
                { 
                   results.map((r,index) => {
                    return (
                    <div key={index} onMouseEnter={(e)=>{setPreviewing(r.videoLink)}} onMouseLeave={(e)=>{setPreviewing("")}} onClick={(e)=>selectItem(r.videoLink)}>
                        { (previewing && previewing==r.videoLink) ? 

                        <video autoPlay>
                        <source src={r.videoLink} type="video/mp4"/>
                        Your browser does not support the video tag.
                        </video>
                       :
                       <img src={r.image} alt="result" className="w-full cursor-pointer" />
                    
                        }
                    </div>
                    )
                })
                }
             </> :  
                <>
                <div className="text-red-600 text-lg col-span-3 lg:col-span-6">{errorMsg}</div>
                </>
            )
            }
        </div>
        </>
    )
}

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="w-1/2 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Find Stock Videos</DialogTitle>
            <DialogDescription>
              Search for stock videos that will complement your video. <br/>Hover to preview. Click to select.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Find Stock Videos</DrawerTitle>
          <DrawerDescription>
          Search for stock videos that will complement your video. <br/>
          Hover to preview. Click to select.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
 