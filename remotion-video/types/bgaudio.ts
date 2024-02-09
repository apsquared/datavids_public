import {z} from 'zod';
import {zColor} from '@remotion/zod-types';



export const BGAudioOptionSchema = z.object({
  audioid: z.string(),
  url: z.string(),
  label: z.string(),
  style: z.string().optional(),
  description: z.string().optional(),
});


export type BGAudioOption = z.infer<typeof BGAudioOptionSchema>;

export const ValidBGAudioOptions:BGAudioOption[] = [
    {
        audioid:"",
        url:"NONE",
        label: "No Background Audio",
    },
    {
        audioid:"aid1",
        url:"https://www.datavids.io/audio/upbeat.mp3",
        label: "Upbeat Music",
        style:"upbeat"
    },
    {
        audioid:"aid2",
        url:"https://www.datavids.io/audio/dramatic.mp3",
        label: "Dramatic Audio",
        style:"dramatic"
    },
    {
        audioid:"aid3",
        url:"https://www.datavids.io/audio/relaxed.mp3",
        label: "Relaxed Sounded",
        style:"relaxed"
    },
    {
        audioid:"aid4",
        url:"https://www.datavids.io/audio/rock.mp3",
        label: "Rock Out",
        style:"rock"
    },
    {
        audioid:"aid5",
        url:"https://www.datavids.io/audio/chill.mp3",
        label: "Chill Sounds",
        style:"chill"
    },
]

export function getAudioIdByStyle(style:string | undefined) {
    if (!style){
        return 'aid1';
    }
    const matchedElement = ValidBGAudioOptions.find(option => 
      option.style?.toLowerCase() === style.toLowerCase()
    );
  
    return matchedElement ? matchedElement.audioid : 'aid1';
  }