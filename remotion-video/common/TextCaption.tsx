import React, { useEffect, useState } from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import { getFont } from './FontFactory'
import { FontDef } from '../types/uservideodef';

// Montserrat or Montserrat Semibold


export const TextCaption: React.FC<{
  font:FontDef,
  text:string,
  top:number,
}> = ({font,text,top}) => {

    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();


    const word: React.CSSProperties = {
        marginLeft: 10,
        marginRight: 10,
        background: 'transparent',
        textShadow: '1px 1px 2px '+font.bgcolor+', 0 0 25px '+font.bgcolor+', 0 0 10px '+font.bgcolor, // X-offset, Y-offset, blur radius, and color
        display: 'inline-block',
    };

  const title: React.CSSProperties = {
    fontFamily: getFont(font.fontname),
    fontSize: font.fontsize,
    textAlign: 'center',
    padding: 30,
  };

  // Split the sentence into words
  const words = text.split(' ');

  // Average words per minute (wpm)
  const wpm = 150;
  // Average seconds per word
  const spw = 60 / wpm;

  // Calculate the number of frames for each word
  const framesPerWord = words.map(word => Math.ceil(spw * word.length / 5 * fps));

  // Calculate the starting frame for each word
  let accumulatedFrames = 0;
  const startFrames = framesPerWord.map(frames => {
    const startFrame = accumulatedFrames;
    accumulatedFrames += frames;
    return startFrame;
  });

  // Determine which word to show based on the current frame
  const wordIndex = startFrames.findIndex((startFrame, index) => {
    const endFrame = startFrames[index + 1] || Number.MAX_VALUE;
    return frame >= startFrame && frame < endFrame;
  });

  const wordToShow = words[wordIndex] || '';

  return (
    <div style={{position:'absolute',top:top}} className='w-full text-center'>
      <div style={{
        ...word,...title,
        color: font.fontcolor,

    }}>
          {wordToShow}
      </div>
      </div>
  );
};


