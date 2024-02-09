import { FontDef } from "@/remotion-video/types/uservideodef";
import { ChangeEvent, useEffect, useState } from "react";
import Sketch from '@uiw/react-color-sketch';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Input,Select, Option } from "@material-tailwind/react";
import { getValidFonts } from "@/remotion-video/common/FontFactory";
import { getDefaultItemNameFont } from "@/app/create-video/defaults";

//https://uiwjs.github.io/react-color/#/sketch
 
export const FontDefInput = ({
    inputFontDef,
    label,
    fontFieldName,
    setFunc,
    itemIndex,
  }: {
    inputFontDef: FontDef | undefined;
    label: string;
    fontFieldName:string,
    setFunc:(fontFieldName:string, font: FontDef,itemIndex?:number) => void;
    itemIndex?:number;
  }) => {

    if (!inputFontDef){
        inputFontDef = getDefaultItemNameFont();
    }

    
    const [fd,setFd] = useState(inputFontDef);

    useEffect(() => {
       if (itemIndex){
        setFunc(fontFieldName,fd,itemIndex);
       } else {
        setFunc(fontFieldName,fd);
       } 
      },[fd]);



    const setFontName = (val:string) => {
        console.log("setFontName" +val);
        setFd({...fd,fontname:val});
    }

    const handleFontSize = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        if (/^\d*$/.test(inputValue)){
            let val = parseInt(inputValue,10);
            if (val >0 && val<200){
                setFd({...fd,fontsize:val});
            }
            
        }
    }

    return ( 
        <>
        <div className="flex flex-col xl:flex-row items-start  space-x-0 space-y-2 xl:space-y-0 xl:space-x-2">
        <Select className="shrink bg-white" color="blue" label="Font" 
                        onChange={(e) => setFontName( e as string ) } value={fd.fontname.toLowerCase()}>

                        {getValidFonts().map((fnt, index) => {
                            return (
                                <Option key={fnt} value={fnt}>{capitalizeFirstLetter(fnt)}</Option>   
                        )})}                                                
        </Select>
        <div className="flex-none">
          <div className="flex flex-row space-x-2">
        <Popover>
            <PopoverTrigger className="flex-none"> 
                <div className="flex items-center space-x-2">   
                    <span className="bg-primary text-white items-start text-sm p-1 rounded-md">Font Color</span>
                    <div className={`w-8 h-8 border-2 mr-2`} style={{backgroundColor:fd.fontcolor}}></div>
                </div>
            </PopoverTrigger>
            <PopoverContent>       
            
                <Sketch
                style={{ marginLeft: 20 }}
                color={fd.fontcolor}
                disableAlpha={false}
                onChange={(color) => {
                    setFd({...fd,fontcolor:color.hex});
                 }}></Sketch>
            
                </PopoverContent>
        </Popover> 
        <Popover >
            <PopoverTrigger className="flex-none"> 
                <div className="flex items-center space-x-2">   
                    <span className="bg-primary text-white items-start text-sm p-1 rounded-md">BG Color</span>
                    <div className={`w-8 h-8 border-2 mr-2`} style={{backgroundColor:fd.bgcolor}}></div>
                </div>
            </PopoverTrigger>
            <PopoverContent>       
            
                <Sketch
                style={{ marginLeft: 20 }}
                color={fd.bgcolor}
                disableAlpha={false}
                onChange={(color) => {
                    setFd({...fd,bgcolor:color.hexa});
                }}></Sketch>
            
                </PopoverContent>
        </Popover>
        </div>
        </div>
        <div className="shrink">
            <Input color="blue"  className="bg-white" required name="fontsize" label="Font Size" onChange={(event) => handleFontSize(event)} value={fd.fontsize} crossOrigin={undefined}/>
        </div>
        </div>
        </>
    )
  }

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}