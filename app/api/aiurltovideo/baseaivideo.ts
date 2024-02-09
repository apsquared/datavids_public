import { getAudioIdByStyle } from "@/remotion-video/types/bgaudio";
import { ImageEffect, ItemDetails, RemotionUserVideoDef, TextTypeEnum, TextTypes } from "@/remotion-video/types/uservideodef";
import { DVVideoResult } from "@/utils/pexels";
import { AIVideoScript } from "@/utils/urltovideoai";

export function getDefaultAIVideo(update:AIVideoScript,userimage?:string,url?:string,bgmusic?:boolean,stockResults?:DVVideoResult[]):RemotionUserVideoDef{

 let fontname = getRandomElement(["Roboto","Poppins"]);   
 let bgcolor = getRandomElement(["#e6324b99","#9419FD89","#0086FF89"]);
 let voice = getRandomElement(["oaiecho","oaishimmer","oaialloy","oaiecho"]);
 let texttype = getRandomElement([TextTypeEnum.Values.BUBBLES,TextTypeEnum.Values.CAPTIONS]) as TextTypes;
 let imageeffect = getRandomElement(["FULLPAGE","FULLPAGE-PAN","SQUARE","SQUARE-PAN"]) as ImageEffect;

 let theimage = (userimage?userimage:update.image as string);

 let scenes : ItemDetails[] = [];
 let i = 0;
 let totalScenes = update.scenes.length;

 let vidtitle = (url ? "AI Video for "+shortenUrl(url) : "AI Video");

 update.scenes.forEach(scene => {
    i++;
    let imageOrVideoToShow = ( (i==totalScenes || !stockResults || i > stockResults.length) ? theimage : stockResults[i-1].videoLink);
    scenes.push( {
        id: i,
        itemname: (texttype=="CAPTIONS" ? scene.title+" "+scene.subtitle : scene.title),
        itemsubtitle: scene.subtitle,
        itemdetails: "",
        image: imageOrVideoToShow,
        imageeffect:imageeffect,
        itemnamefont: {
            fontname: fontname,
            fontsize: (texttype=="CAPTIONS" ? 100 : 75),
            fontcolor: "#FFFFFF",
            bgcolor: bgcolor,
        },
        itemsubtitlefont: {
            fontname: fontname,
            fontsize: 60,
            fontcolor: "#FFFFFF",
            bgcolor: bgcolor,
        },
        itemdetailsfont: {
            fontname: fontname,
            fontsize: 50,
            fontcolor: "#FFFFFF",
            bgcolor: bgcolor,
        },
        tts: {
          ttstext: scene.title+", "+ scene.subtitle,
          voice: voice,
      }, 
      itemduration: 6,
      texttype: texttype,
      textlocation: "TOP",
    });
 });

 let bgaudioaid = (bgmusic ? getAudioIdByStyle(update.bgmusicEmotion) : '');  //should look this up from update.bgmusicEmotion
 console.log("bgaudioaid "+bgaudioaid);

 const defaultAIVideo: RemotionUserVideoDef = {
  videoname: vidtitle,
  description: "AI Generated Video",
  videotype: "SIMPLE",
  durationSec: 6*scenes.length,
  bgaudioid: bgaudioaid,
  body: {
    items: scenes
  }

 }

 return defaultAIVideo;

}


function getRandomElement(arr: string[]): string  {
    if (arr.length === 0) {
        return ""; // Return null if the array is empty
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function shortenUrl(url: string): string {
    // Remove http://, https://, and www
    let cleanedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  
    // Remove any trailing parameters
    cleanedUrl = cleanedUrl.split('?')[0];
  
    // Cap the length to 32 characters
    return cleanedUrl.length > 32 ? cleanedUrl.substring(0, 32) : cleanedUrl;
  }

  