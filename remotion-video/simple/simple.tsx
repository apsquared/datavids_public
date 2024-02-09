
import {AbsoluteFill, Sequence, interpolate, useVideoConfig} from 'remotion';
import {useCurrentFrame} from 'remotion';
import React from 'react';
import { RemotionUserVideoDef } from '../types/uservideodef';
import { Body } from './Body';
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { flip } from "@remotion/transitions/flip";
import { ICallbackFunction } from '../Composition';
import {Audio,IFrame} from 'remotion'
import { ValidBGAudioOptions } from '../types/bgaudio';

export const SimpleVideo: React.FC<{
  videoDef: RemotionUserVideoDef,
  ttsCallback?: ICallbackFunction,
}> = ({videoDef,ttsCallback}) => {

	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();


	let audioUrl = "";
	if (videoDef.bgaudioid){
		ValidBGAudioOptions.forEach(el => {
			if (el.audioid == videoDef.bgaudioid){
				audioUrl = el.url;
			}
		});
	}

	return (
    <AbsoluteFill style={{backgroundColor: 'black',justifyContent: "center", alignItems: "center",}}>
	{audioUrl ? <Audio  volume={.10} src={audioUrl} /> : <></>}
	   <TransitionSeries>
	  {videoDef.body.items?.map(item => (
	 <React.Fragment key={`f${item.id}`}>
      <TransitionSeries.Sequence  durationInFrames={(fps*item.itemduration)+10} key={`a${item.id}`}>
			<AbsoluteFill key={`b${item.id}`} style={{backgroundColor: 'white',justifyContent: "center", alignItems: "center",}}>
				<Body videoDef={videoDef} item={item}  key={`c${item.id}`} ttsCallback={ttsCallback}/>
			</AbsoluteFill>
		</TransitionSeries.Sequence>
		<TransitionSeries.Transition key={`d${item.id}`}
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      /> 
	  </React.Fragment>
	  ))}
		</TransitionSeries>
    </AbsoluteFill>
	);
};