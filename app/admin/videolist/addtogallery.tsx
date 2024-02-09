
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"


 export const AddToGallery = ({videourl,open,setOpen}:{videourl:string,open:boolean,setOpen:((open: boolean) => void) | undefined}) => {

    const [name,setName]=useState("");
    const [link,setLink]=useState("");
    const [description,setDescription]=useState("");

    const saveToGallery = () =>{
        if (!videourl){
            alert("Error adding to gallery");
            return
        }
        fetch("/api/addtogallery", {
            method: "POST",
            body:JSON.stringify({url:videourl,name:name,link:link,description:description})
          })
            .then((res) => res.json())
            .then((data) => {
                console.log("done adding to gallery");
                if (setOpen)
                    setOpen(false);
            });
    }

    return (
        <>
      <Dialog open={open}  onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add to Gallery</DialogTitle>
          <DialogDescription>
            Add this video to our DataVids gallery.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              required={true}
              id="name"
              value={name}
              className="col-span-3"
              onChange={((e)=>{setName(e.target.value)})}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input
              id="desc"
              className="col-span-3"
              onChange={((e)=>{setDescription(e.target.value)})}
              value={description}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              id="link"
              className="col-span-3"
              onChange={((e)=>{setLink(e.target.value)})}
              value={link}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="text-white" onClick={(e)=>saveToGallery()}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </>
    )
  }

