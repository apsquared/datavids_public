'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserVideoRequest } from "@/types/uservideoreq"
import { useEffect } from "react"



export function MyVideoComboBox({videos,defaultVideo,setCallback}:{videos:UserVideoRequest[],defaultVideo?:string,setCallback: (data: string) => void;}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  useEffect(() => {
    console.log("new value"+value);
    const vid = value.split("||")[0];
    setCallback(vid);
  },[value]);

  useEffect(() => {
    if (defaultVideo){
      setValue(defaultVideo);
    }
  },[]);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-blue-gray-200 text-blue-gray-500"
        >
          {value
            ? videos.find((v) => value.startsWith(v._id as string))?.videoDef.videoname
            : "Select Video..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0"> 
        <Command className="w-full">
          <CommandInput placeholder="Search Video..." />
          <CommandEmpty>No Video found.</CommandEmpty>
          <CommandGroup className="w-full">
            {videos.map((v) => (
              <CommandItem
                key={`${v._id}||${v.videoDef.videoname}`}
                value={`${v._id}||${v.videoDef.videoname}`}
                onSelect={(currentValue) => {
                  console.log(currentValue);
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === `${v._id}||${v.videoDef.videoname}` ? "opacity-100" : "opacity-0"
                  )}
                />
                <div>
                {v.videoDef.videoname} - <span className="text-gray-600 text-sm">{v.videoDef.description}</span>
                <br/><span className="text-gray-600 text-xs">{v._id}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
