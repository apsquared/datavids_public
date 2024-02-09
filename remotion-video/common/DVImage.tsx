import { ImageEffect } from "@/remotion-video/types/uservideodef";
import { AbsoluteFill, Img, Video, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const DVImage = ({
    url,
    imageEffect,
    duration,
}: {
  url: string;
  imageEffect:ImageEffect
  duration:number,

}) => {

  const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
  if (isVideo(url)){
    return (<>
    <AbsoluteFill style={{justifyContent: "center", alignItems: "center"}} className="bg-gradient-to-b from-indigo-500">
        <div className='w-full'>
         <Video className="w-full h-full" src={url} />
        </div>
        </AbsoluteFill>
    </>)
  } else {
    let panLeft = interpolate(
      frame,
      [0, (duration*fps/2)],
      [0, -100],
      {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
      }
      );

      let panRight = interpolate(
        frame,
        [(duration*fps/2),duration*fps],
        [-100, 100],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
        );
      
      let pan = (frame < (duration*fps/2) ? panLeft : panRight)

      let zoom = interpolate(
      frame,
      [0, (duration*fps-fps)],
      [1, 1.25],
      {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
      }
      );

      const effect = imageEffect;
      let blur = "";
      let detailstop=1200;

      if (effect=="FULLPAGE" || effect=="SQUARE"){
      pan = 0;
      zoom = 1;
      }

      if (effect=="SQUARE" || effect=="SQUARE-PAN"){
      blur='blur-2xl'
      detailstop=1460;
      }

    return (
          <>
        <Img src={url} className={blur}			
        style={{
          top:0,  
          height:"100%",
          left:pan,
          position: 'absolute',
          objectFit: 'cover',
          transform: `scale(${zoom})`,
          }} />
          {
          (effect=="SQUARE" || effect=="SQUARE-PAN") ?
          <div className='drop-shadow-xl rounded-lg border-solid border-[12px] border-white' style={{position:'absolute',top:600,width:'860px',height:'860px',overflow: 'hidden'}}>
          <Img src={url} className="w-full h-full" 				
          style={{
            transform: `scale(${zoom})`,
            objectFit: 'contain',
            left:pan,
            }} />
            </div>
            :
            <></>
        }
          </>
    )
  }
}

function isVideo(url:string):boolean{
  if (url.endsWith("mp4") || url.indexOf("player.vimeo")>0){
    return true;
  }
  return false;
}