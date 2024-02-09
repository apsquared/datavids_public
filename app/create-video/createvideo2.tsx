"use client"
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useContext, useEffect, useRef, useState } from "react";
import { Input, Select, Option,Textarea } from "@/components/mtexport";
import { getDefaultItemDetails } from './defaults'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { Player } from "@remotion/player";
import { MyComposition } from "@/remotion-video/Composition";
import { sampleUserVideoDef1 } from "@/remotion-video/samples/default";
import { RemotionUserVideoDef, ItemDetails, VideoBody, VideoType, VideoTypeSchema, FontDef, ValidImageEffects, ImageEffect, ValidTextTypes, TextTypes, TextTypeEnum, ValidTextLocations, TextLocationTypes } from "@/remotion-video/types/uservideodef";
import { FontDefInput } from "@/components/Common/FontDefInput";
import FieldGroup from "@/components/Common/FieldGroup";
import {  VOICELIST } from "@/remotion-video/common/tts/ttsclient";
import Image from "next/image";
import { PostAIModal } from "@/components/Common/PostAIModal";
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { UserVideoRequest } from "@/types/uservideoreq";
import { ValidBGAudioOptions } from "@/remotion-video/types/bgaudio";
import LoadingOverlay from "@/components/Common/LoadingOverlay";
import { DataContext } from "@/components/DataProvider";
import WaitingOverlay from "@/components/Common/WaitingOverlay";
import OutOfCreditsAlert from "@/components/Common/OutOfCreditsAlert";
import { ChooseStock } from "./choosestock";

const CreateVideo2 = ({ myvideos, templateParam,fromAI }: { myvideos: UserVideoRequest[], templateParam?: string, fromAI:boolean }) => {

  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push('/signin');
    },
  })


  const [itemDetails, setItemDetails] = useState<ItemDetails[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemDetails>();
 
  const [showStockModel,setShowStockModel] = useState(false);
  const [ttsLoading, setTtsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isOutOfCredits,setIsOutOfCredits] =  useState(false);
  const [videoId, setVideoId] = useState("");
  const [savingLabel,setSavingLabel]=useState("Saving");
  const [openAIModal,setOpenAIModal] = useState(false);

  const [missingName, setMissingName] = useState(false);
  const [missingVideoType, setMissingVideoType] = useState(false);
  const [missingItemDuration, setMissingItemDuration] = useState(false);
  const [inputProps, setInputProps] = useState<RemotionUserVideoDef>(sampleUserVideoDef1);

  const [videoname, setVideoname] = useState('');
  const [description, setDescription] = useState('');
  const [videotype, setVideotype] = useState<VideoType>(VideoTypeSchema.Values.SIMPLE);
  const [videotypestr, setVideotypestr] = useState('simple');
  const [videoTemplate, setVideoTemplate] = useState('')
  const [totalduration, setTotalduration] = useState(2);
  const [bgaudioid, setBgaudioid] = useState('');
  const [renderCost,setRenderCost]=useState(1);
  const{userCredits,updateCreditsContext} = useContext(DataContext);

  useEffect(() => {

    if (templateParam) {
      setVideoTemplate(templateParam);
      setVideotypestr('myvideo');
    } else {
      const newItem: ItemDetails[] = [];
      newItem.push(getDefaultItemDetails(1));
      setItemDetails(newItem);
      setSelectedItem(getDefaultItemDetails(1));
    }
    if (fromAI){
      setOpenAIModal(true);
    }

  }, []);

  

  useEffect(() => {
    //console.log("Selected Item "+JSON.stringify(selectedItem))
    if (!selectedItem && itemDetails.length>0){
      setSelectedItem(itemDetails[0]);
    }
  },[selectedItem]);

  const handleCardClick = (item: ItemDetails) => {
    //console.log("card click");
    setSelectedItem(item);
  };

  const removeItem = (currentIndex: number,evt:React.MouseEvent) => {
    const newItems = itemDetails.filter((_, index) => index !== currentIndex);
    //console.log(newItems.length);
    if (newItems.length>0){
      setItemDetails(newItems);
      setSelectedItem(newItems[0]);
    }
    evt.stopPropagation();
  };

  const moveItem = (currentIndex: number, direction: string,evt:React.MouseEvent) => {
    // Prevent moving out of array bounds
    if ((currentIndex === 0 && direction === 'up') ||
      (currentIndex === itemDetails.length - 1 && direction === 'down')) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newItems = [...itemDetails];
    [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];
    setItemDetails(newItems);
    evt.stopPropagation();
  };

  //error handling


  const loadTemplateFromVideo = (obj: UserVideoRequest) => {
    setVideotype(obj.videoDef.videotype);
    if (obj.videoDef.body.items) {
      setItemDetails(obj.videoDef.body.items);
      setSelectedItem(obj.videoDef.body.items[0]);
      if (obj.videoDef.bgaudioid){
        setBgaudioid(obj.videoDef.bgaudioid);
      }
    }
    if (obj.renderId) {
      //this has been rendered so treat it like a template
      setVideoname("Copy of " + obj.videoDef.videoname);
      setDescription("" + obj.videoDef.description);
    } else {
      setVideoId(obj._id as string);  //setting this means new saves will resave this.
      setVideoname("" + obj.videoDef.videoname);
      setDescription("" + obj.videoDef.description);
    }
  }


  useEffect(() => {
    if (videoTemplate) {
      console.log("video template changed");
      // Things to run on page load
      const fetchData = async () => {
        const qresp = await fetch("/api/getvideorequestbyid?id=" + videoTemplate);
        if (qresp.status == 200) {
          const obj = await qresp.json() as UserVideoRequest;
          if (obj) {
            loadTemplateFromVideo(obj);
          }
        }
      }

      fetchData();
    }

  }, [videoTemplate]);




  const addItem = () => {
    const id = itemDetails.length > 0 ? itemDetails[itemDetails.length - 1].id + 1 : 1;
    if (id > 1) {
      console.log("adding item " + id);
      const lastItem = itemDetails[itemDetails.length - 1];
      let newItem: ItemDetails = { ...getDefaultItemDetails(id), itemnamefont: lastItem.itemnamefont, itemsubtitlefont: lastItem.itemsubtitlefont, itemdetailsfont: lastItem.itemdetailsfont };
      if (lastItem.tts?.voice)
        newItem.tts = { voice: lastItem.tts?.voice, ttstext: "" }

      setItemDetails([...itemDetails, newItem]);
      setSelectedItem(newItem);

    } else {
      console.log("adding first item");
      setItemDetails([getDefaultItemDetails(id)]);
    }

  };

  function setImageFromDialog(item:string){
    console.log("setImageFromDialog "+item);
    console.log(selectedItem?.id);
    const newItems = itemDetails.map(itemDetails =>
      itemDetails.id === selectedItem?.id ? { ...itemDetails, image:item } : itemDetails
    );
    setItemDetails(newItems);
    setSelectedItem(newItems.find(obj => obj.id === selectedItem?.id) as ItemDetails)
  }

  const updateItem = (id: number, event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    resetErrors();
    if (event.target.name == "tts.ttstext") {
      const newItems = itemDetails.map(itemDetails =>
        itemDetails.id === id ? { ...itemDetails, tts: { ttstext: event.target.value as string, voice: itemDetails.tts?.voice as string } } : itemDetails
      );
      setItemDetails(newItems);
      setSelectedItem(newItems.find(obj => obj.id === id) as ItemDetails)
    }
    else {
      const newItems = itemDetails.map(itemDetails =>
        itemDetails.id === id ? { ...itemDetails, [event.target.name]: event.target.value } : itemDetails
      );
      setItemDetails(newItems);
      setSelectedItem(newItems.find(obj => obj.id === id) as ItemDetails)
    }
  };

  const updateItemAsNumber = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    resetErrors();
    const newItems = itemDetails.map(itemDetails =>
      itemDetails.id === id ? { ...itemDetails, [event.target.name]: Number(event.target.value) } : itemDetails
    );
    setItemDetails(newItems);
    setSelectedItem(newItems.find(obj => obj.id === id) as ItemDetails)

  }

  const updateItemImageEffect = (id: number, imageEffect: ImageEffect) => {
    const newItems = itemDetails.map(itemDetails =>
      itemDetails.id === id ? { ...itemDetails, imageeffect: imageEffect } : itemDetails
    );
    setItemDetails(newItems);
    setSelectedItem(newItems.find(obj => obj.id === id) as ItemDetails)

  }

  const updateTextType = (id: number, textType: TextTypes) => {
    const newItems = itemDetails.map(itemDetails =>
      itemDetails.id === id ? { ...itemDetails, texttype: textType } : itemDetails
    );
    setItemDetails(newItems);
    setSelectedItem(newItems.find(obj => obj.id === id) as ItemDetails)

  }

  const updateTextLocation = (id: number, textLocation: TextLocationTypes) => {
    const newItems = itemDetails.map(itemDetails =>
      itemDetails.id === id ? { ...itemDetails, textlocation: textLocation } : itemDetails
    );
    setItemDetails(newItems);
    setSelectedItem(newItems.find(obj => obj.id === id) as ItemDetails)

  }



  const updateItemAllFonts = (fd: FontDef, subfont: FontDef, id: number | undefined) => {
    const newItems = itemDetails.map(itemDetails =>
      itemDetails.id === id ? { ...itemDetails, itemdetailsfont: subfont, itemsubtitlefont: subfont, itemnamefont: fd } : itemDetails
    );
    setItemDetails(newItems);
    setSelectedItem(newItems.find(obj => obj.id === id) as ItemDetails)

  };

  const updateItemFont = (fontField: string, fd: FontDef, id: number | undefined) => {
    const newItems = itemDetails.map(itemDetails =>
      itemDetails.id === id ? { ...itemDetails, [fontField]: fd } : itemDetails
    );
    setItemDetails(newItems);
    setSelectedItem(newItems.find(obj => obj.id === id) as ItemDetails)

  };

  const handleItemVoice = (val: string, id: number) => {
    console.log("Setting voice to " + val);
    const newItems = itemDetails.map(itemDetails =>
      itemDetails.id === id ? { ...itemDetails, tts: { ttstext: itemDetails.tts?.ttstext as string, voice: val } } : itemDetails
    );
    setItemDetails(newItems);
    setSelectedItem(newItems.find(obj => obj.id === id) as ItemDetails)

  }

  const deleteItem = (id: number) => {
    setItemDetails(itemDetails.filter(itemDetails => itemDetails.id !== id));
  };


  // general 

  const validate = () => {

    let errors = false;
    resetErrors();


    if (!videoname) {
      setMissingName(true);
      errors = true;
    }

    if (!errors) {
      return true;
    } else {
      return false;
    }
  }



  /* this triggers the preview */
  useEffect(() => {
    let vbody: VideoBody = {
      items: itemDetails,
    }


    let uservid: RemotionUserVideoDef = {
      videoname: videoname,
      description: description,
      videotype: videotype,
      body: vbody,
      durationSec: totalduration,
      bgaudioid:bgaudioid,
    }
    //console.log("Updating inputProps "+JSON.stringify(uservid));
    setInputProps(uservid);
    const cost = Math.ceil(totalduration/10);
    setRenderCost(cost);

  }, [videoname, description, videotype, totalduration, itemDetails,bgaudioid]);



  useEffect(() => {

    let newDuration = 0;
    //console.log(JSON.stringify(itemDetails));
    if (itemDetails && itemDetails.length > 0) {
      itemDetails.forEach(element => {
        newDuration += element.itemduration;
      });
      if (newDuration > 0)
        setTotalduration(newDuration)
    }


  }, [itemDetails]);



  const resetErrors = () => {

    setMissingName(false);  //reset
    setMissingVideoType(false);

  }

  const saveOnly = async () => {

    if (!validate()) {
      return;
    }
    setSavingLabel("Saving");
    setIsSaving(true);

    let vbody: VideoBody = {
      items: itemDetails,
    };

    let uservid: RemotionUserVideoDef = {
      videoname: videoname,
      description: description,
      videotype: videotype,
      body: vbody,
      durationSec: totalduration,
      bgaudioid:bgaudioid,
    }

    window.gtag('event', 'savevideo');

    const valresponse = await fetch("/api/saveonly", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uservid: uservid, videoid: videoId })
    });
    if (valresponse.status == 200) {
      const resp = await valresponse.json();
      setVideoId(resp.id);
      router.refresh();
       //window.location.href = '/view-my-requests';
    } else {
      console.log("ERROR in valresponse " + JSON.stringify(valresponse));
    }
    setIsSaving(false);
  }


  const submitVideo = async () => {


    let vbody: VideoBody = {
      items: itemDetails,
    };

    if (!validate()) {
      return;
    }
    setSavingLabel("Rendering");
    setIsSaving(true);


    console.log("Submit Video called");

    
    let uservid: RemotionUserVideoDef = {
      videoname: videoname,
      description: description,
      videotype: videotype,
      body: vbody,
      durationSec: totalduration,
      bgaudioid:bgaudioid,
    }

    window.gtag('event', 'submitvideo');

    const valresponse = await fetch("/api/createvideorequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uservid: uservid,videoid:videoId })
    });

    if (valresponse.status == 200) {
      console.log("RESP:" + JSON.stringify(await valresponse.json()))
      // tell it to process the queue (this may be removed in future)
      const qresp = await fetch("/api/processqueue", {
        method: "POST",
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (qresp.status == 200) {
        //we re good to redirect you
        await updateCreditsContext();
        router.refresh();
        router.push("/view-my-requests");
      } else {
        //show error
        setIsSaving(false);
        console.log("ERROR IN PROCESS QUEUE " + qresp.status);
      }

    } else if (valresponse.status==410){
     //not enough credits 
     setIsSaving(false);
      saveOnly();
      setIsOutOfCredits(true);
    }else {
      setIsSaving(false);
      console.log("ERROR RESP " + valresponse.status);
    }

  }

  const player: React.CSSProperties = {
    width: "100%",
  };



  return (
    <>
      <Breadcrumb
        pageName="Create Video"
        description=""
      />
      <div>

 
    {isSaving && (
    <WaitingOverlay title={savingLabel}/>
  )}   

{isOutOfCredits && (
      <OutOfCreditsAlert  onClose={() => setIsOutOfCredits(false)}/>
      )}   




  <PostAIModal open={openAIModal} setOpen={setOpenAIModal}/>
  <ChooseStock open={showStockModel} setOpen={setShowStockModel} setSelection={setImageFromDialog}/>

{ itemDetails && itemDetails.length>0 && selectedItem && (
        <div className="w-full h-full lg:h-screen grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4 p-4">
          <div className="flex flex-col h-full gap-4 p-4 rounded-lg bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-200 via-white to-gray-200">

            <h2 className="text-lg font-semibold">Video Info</h2>
            <Input crossOrigin={undefined} className="bg-white" required color="blue" label="Video Name" {...(missingName && { error: true })} onChange={(e) => setVideoname(e.target.value)} value={videoname} />
            <Input crossOrigin={undefined} className="bg-white" color="blue" label="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
            <Select color="blue" className="w-full bg-white" label="Background Audio" size="md"
                          value={bgaudioid} onChange={(e) => setBgaudioid(e as string)}>
                      
                          {

                            Object.values(ValidBGAudioOptions).map((e, i) => {
                              //console.log(JSON.stringify(e));
                              return (
                          
                              <Option key={e.audioid} value={e.audioid}>{e.label}</Option>
               
                              )
                            })
                          }
                         
            </Select>
            <h2 className="text-lg font-semibold">Scenes</h2>
            <div className="flex-1 overflow-y-auto space-y-2">
              { itemDetails && itemDetails.length>0 && itemDetails.map((item, index) => (
                <Card onClick={() => handleCardClick(item)} className="pt-2" key={item.id}>
                  <CardContent className="flex items-center justify-between">
                    <span>{item ? item.itemname ? truncateString(item.itemname, 24) : 'Scene ' + item.id : 'Scene'}</span>
                    <div className=" mt-3 flex flex-row">
                      <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => removeItem(index,e)} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 hover:text-red-600 cursor-pointer ">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                      </svg>

                      <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => moveItem(index, 'up',e)} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer ">
                        <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                      </svg>

                      <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => moveItem(index, 'down',e)} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer ">
                        <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                      </svg>

                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-center">
                <Button onClick={addItem} className="text-white" >+ Scene</Button>
              </div>

            </div>
          </div>
          <div className="flex flex-col h-full gap-4 p-4 rounded-lg bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]  from-gray-200 via-white to-gray-200">
            {selectedItem && (
              <>
                <h2 className="text-lg font-semibold">Scene {selectedItem.id}</h2>
                <div className="flex-1 overflow-y-auto space-y-4">
                  <div key={selectedItem.id} className="mt-2 mb-2 flex flex-col gap-6  p-1 ">
                    <div className="grid grid-cols-1 xl:grid-cols-6 xl:space-x-3 xl:space-y-0 space-y-3 xl:mr-0 mr-0">
                      <div className="col-span-1 xl:col-span-5">
                        <Input className="bg-white" crossOrigin={undefined} color="blue" required name="image" label="Image/MP4 URL" onChange={(event) => updateItem(selectedItem.id, event)} value={selectedItem.image} />
                      </div>
                      <div className="col-span-1">
                        <Button className="text-white w-full" onClick={(e)=>{setShowStockModel(true)}}>
                          Find a Video 
                        </Button>
                      </div>

                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 xl:space-x-3 xl:space-y-0 space-y-3 xl:mr-0 mr-0">
                      <div className="col-span-1">
                        <Input crossOrigin={undefined} className="bg-white" color="blue" required 
                          name="itemduration" type="number" label="Duration For Scene(sec)" min={1} max={30}
                          {...(missingItemDuration && { error: true })} 
                          onChange={(event) => updateItemAsNumber(selectedItem.id, event)} value={selectedItem.itemduration} />

                      </div>

                      <div className="col-span-1">
                        <Select color="blue" className="w-full bg-white" label="Text Display" size="md"
                          value={selectedItem.texttype} onChange={(e) => updateTextType(selectedItem.id, e as TextTypes)}>
                          {

                            Object.values(ValidTextTypes).map((e, i) => {
                              //console.log(e);
                              return (
                                <Option key={e} value={e}>{e}</Option>
                              )
                            })
                          }
                        </Select>
                      </div>
                      <div className="col-span-1 xl:col-span-1">
                        <Select color="blue" className="w-full bg-white" label="Image Effect" size="md"
                          value={selectedItem.imageeffect} onChange={(e) => updateItemImageEffect(selectedItem.id, e as ImageEffect)}>
                          {

                            Object.values(ValidImageEffects).map((e, i) => {
                              //console.log(e);
                              return (
                                <Option key={e} value={e}>{e}</Option>
                              )
                            })
                          }
                        </Select>
                      </div>
                      {/* 
                      <div className="col-span-1">
                        <Select color="blue" className="w-full bg-white" label="Text Location" size="md" disabled={selectedItem.texttype==TextTypeEnum.Values.BUBBLES}
                          value={selectedItem.textlocation} onChange={(e) => updateTextLocation(selectedItem.id, e as TextLocationTypes)}>
                          {

                            Object.values(ValidTextLocations).map((e, i) => {
                              //console.log(e);
                              return (
                                <Option key={e} value={e}>{e}</Option>
                              )
                            })
                          }
                        </Select>
                      </div>
                      */}
                    </div>

                      <FieldGroup label="Title">
                        <div className="grid grid-cols-1 lg:grid-cols-6 w-full gap-2">
                          <div className="col-span-1 lg:col-span-5 w-full">
                            <Input crossOrigin={undefined} className="bg-white " color="blue" required name="itemname" label="Title" onChange={(event) => updateItem(selectedItem.id, event)} value={selectedItem.itemname} />
                          </div>
                          <Input crossOrigin={undefined} className="bg-white" color="blue" type="number" step={5} name="itemnametop" label="Placement" onChange={(event) => updateItemAsNumber(selectedItem.id, event)} value={selectedItem.itemnametop} />
                        </div>
                        <FontDefInput inputFontDef={selectedItem.itemnamefont} label="Item Title" setFunc={updateItemFont} fontFieldName="itemnamefont" itemIndex={selectedItem.id}></FontDefInput>
                      </FieldGroup>
                      {selectedItem.texttype == TextTypeEnum.Values.BUBBLES && (
                        <>
                          <FieldGroup label="Subtitle(Optional)">
                            <div className="grid grid-cols-1 lg:grid-cols-6 w-full gap-2">
                              <div className="col-span-1 lg:col-span-5 w-full">
                                <Textarea className="bg-white" color="blue" name="itemsubtitle" label="Subtitle" onChange={(event) => updateItem(selectedItem.id, event)} value={selectedItem.itemsubtitle} />
                              </div>
                              <Input crossOrigin={undefined} className="bg-white" color="blue" type="number" step={5} name="itemsubtitletop" label="Placement" onChange={(event) => updateItemAsNumber(selectedItem.id, event)} value={selectedItem.itemsubtitletop} />
                            </div>

                            <FontDefInput inputFontDef={selectedItem.itemsubtitlefont} label="Item Subtitle" setFunc={updateItemFont} fontFieldName="itemsubtitlefont" itemIndex={selectedItem.id}></FontDefInput>

                          </FieldGroup>
                    </>
                    )}
                    <FieldGroup label="Voiceover (Optional)">
                      <Input crossOrigin={undefined} className="bg-white" color="blue" name="tts.ttstext" label="Text to Say" onChange={(event) => updateItem(selectedItem.id, event)} value={selectedItem.tts ? selectedItem?.tts?.ttstext : ''} />
                      <Select color="blue" className="bg-white" label="Select Voice" value={selectedItem.tts?.voice}
                        onChange={(e) => handleItemVoice(e as string, selectedItem.id)} >

                        {VOICELIST.map((voice, index) => {
                          return (
                            <Option key={voice.key} value={voice.key}>{voice.label}</Option>
                          )
                        })}

                      </Select>
                    </FieldGroup>

                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col h-full gap-4 p-4 rounded-lg bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]  from-gray-200 via-white to-gray-200">
            <div className="flex justify-between space-x-4 mb-2">
              <h2 className="text-lg font-semibold">Preview</h2>
              <div className="flex space-x-4">
                <Button className="text-white" disabled={isSaving || undefined} onClick={saveOnly}>Save</Button>
                <Button className={`text-white ${isSaving ? 'animate-pulse' : ''}`} onClick={submitVideo} disabled={isSaving || undefined}>
                 
                  
                  <div className="grid grid-cols-2 justify-center items-center">
                                <div className=""><p className="text-left"> {isSaving ? 'Submitting...' : 'Download'}    </p> </div>
                                <div className="">
                                    <div className="grid grid-cols-2 justify-center items-center">
                                        <div className="text-right"> {renderCost}</div>
                                        <div><Image width={30} height={30} src="/images/token.png" alt="Token"/></div>
                                    </div>
                                </div>
                            </div>
                  
                 
                </Button>
              
              </div>
            </div>
            <div className=" relative flex-1 rounded-lg overflow-hidden">
              <div className="flex items-center justify-center">
                {inputProps && itemDetails && itemDetails.length > 0 &&(
                <Player
                 component={MyComposition}
                  inputProps={{ videoDef: inputProps, ttsCallback:setTtsLoading }}
                  durationInFrames={totalduration * 30}
                  fps={30}
                  compositionHeight={1920}
                  compositionWidth={1080}
                  style={player}
                  controls
                  loop 
                />
                )}
                { ttsLoading && (
                  <div className="absolute flex justify-center items-center bg-gray-500 bg-opacity-50" >
                   <div className="text-2xl text-white p-5">Voiceover Loading </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
)}
      </div>
    </>
  );
};


export default CreateVideo2;


function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}