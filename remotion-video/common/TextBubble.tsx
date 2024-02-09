import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import { getFont } from './FontFactory'
import { FontDef } from '../types/uservideodef';

// Montserrat or Montserrat Semibold



const word: React.CSSProperties = {
	marginLeft: 10,
	marginRight: 10,
	textShadow:  '3px 3px 3px gray',
	display: 'inline-block',
};

export const TextBubble: React.FC<{
  font:FontDef,
  text:string,
  top:number,
  nodelay?:boolean,
}> = ({font,text,top,nodelay=false}) => {


  const title: React.CSSProperties = {
    fontFamily: getFont(font.fontname),
    fontSize: font.fontsize,
    textAlign: 'center',
    position: 'absolute',
    top: top,
    background: font.bgcolor,
    borderRadius: 50,
    padding: 30,
    margin: "5%",
    width: "90%"
  };

	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const hasNewlines = text.indexOf('\n')>0;

	const words = (hasNewlines? text.split('\n') : text.split(' '));
	let delayconst = 7;
	if (nodelay)
		delayconst = 0;

	return (
		<h1 style={title}>
			{words.map((t, i) => {
				const delay = i * delayconst;

				let scale = spring({
					fps: videoConfig.fps,
					frame: frame - delay,
					config: {
						damping: 200,
					},
				});


				return (
					<>
					<span
						key={t+i}
						style={{
							...word,
							color: font.fontcolor,
							transform: `scale(${scale})`,
							whiteSpace:'pre-wrap'
						}}
					>
						{t}
					</span>
					{hasNewlines && (
						<><br/></>

					)}
					</>
				);
			})}
		</h1>
	);
};
