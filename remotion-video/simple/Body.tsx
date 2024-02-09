import { AbsoluteFill, Img, Sequence, continueRender, delayRender, interpolate, useCurrentFrame, useVideoConfig } from "remotion"
import { FontDef, RemotionUserVideoDef,ItemDetails, TextTypeEnum, TextLocationEnum } from "../types/uservideodef"
import { TextBubble } from "../common/TextBubble";
import { useCallback, useEffect, useState } from "react";
import { textToSpeech } from "../common/tts/ttsclient";
import {Audio,IFrame} from 'remotion'
import { VALID_VOICES } from "../common/tts/ttsclient";
import { DVImage } from "../common/DVImage";
import { TextCaption } from "../common/TextCaption";
import { ICallbackFunction } from "../Composition";


export const Body: React.FC<{
  videoDef: RemotionUserVideoDef,
  item: ItemDetails,
  ttsCallback?: ICallbackFunction
}> = ({videoDef,item,ttsCallback}) => {


  const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

  const [handle] = useState(() => delayRender());


  const [audioUrl, setAudioUrl] = useState('');

  //console.log(JSON.stringify(handle));

  const doFetch = useCallback(async () => {
    //console.log(JSON.stringify(item.tts));
    if (item.tts && item.tts.ttstext){
      console.log("doFetch");
      if (ttsCallback)
        ttsCallback(true);
      const voice = item.tts.voice as keyof typeof VALID_VOICES ;
      const ttsresp = await textToSpeech(item.tts.ttstext, voice);
      //console.log("Setting audio url "+ttsresp.audiourl);
      setAudioUrl(ttsresp.audiourl);
    }
    //console.log("Continue render");
    if (ttsCallback)
      ttsCallback(false);
		continueRender(handle);
    //console.log("Continue render "+handle);
	}, [handle,item.tts?.ttstext]);  //added the item.tts to deal with loading


  useEffect(() => {
    doFetch();
  }, [doFetch]);
  
    let bubbleTitleTop = 200;
    let bubbleSubtitleTop = 1450;

    let captiontop = 0;
    if (item.texttype==TextTypeEnum.Values.CAPTIONS){
      if (item.textlocation==TextLocationEnum.Values.TOP){
        captiontop = 225;
      } else if (item.textlocation==TextLocationEnum.Values.MIDDLE){
        captiontop = 900;
      } else {
        captiontop = 1500;
      }
    }

    if (item.itemnametop){
      bubbleTitleTop = item.itemnametop;
      captiontop = item.itemnametop;
    }

    if (item.itemsubtitletop){
      bubbleSubtitleTop = item.itemsubtitletop;
    }


    //not currently used
    let detailstop=1200;

    if (item.imageeffect=="SQUARE" || item.imageeffect=="SQUARE-PAN"){

      detailstop=1460;
    }

  
  
  return (
    <AbsoluteFill style={{backgroundColor: 'white',justifyContent: "center", alignItems: "center"}}>
      {item.image ?  (<DVImage url={item.image} imageEffect={item.imageeffect} duration={item.itemduration}></DVImage>) : <></>}
      {item.texttype && item.texttype == TextTypeEnum.Values.BUBBLES ? 
        <>
        <Sequence from={15}>
          <TextBubble font={item.itemnamefont as FontDef } text={item.itemname as string} top={bubbleTitleTop} />
        </Sequence>
        
        <Sequence from={15}>
          {audioUrl ? <Audio volume={1} src={audioUrl} /> : <></>}
        </Sequence>

        { item.itemsubtitle ? 
        <Sequence from={30}>
          <TextBubble font={item.itemsubtitlefont} text={item.itemsubtitle as string} top={bubbleSubtitleTop} />
        </Sequence> 
        : <></>
        }

        { item.itemdetails ?
        <Sequence from={45}>
          <TextBubble font={item.itemdetailsfont} text={item.itemdetails as string} top={detailstop} />
        </Sequence>
        : <></>
        }
      </>
      :   
      <>
      <Sequence from={15}>
        <TextCaption font={item.itemnamefont as FontDef } text={item.itemname as string} top={captiontop} />
      </Sequence>
      <Sequence from={20}>
        {audioUrl ? <Audio volume={1} src={audioUrl} /> : <></>}
      </Sequence>
      </>
    }

    </AbsoluteFill>
  )
}