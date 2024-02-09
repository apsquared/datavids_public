import {z} from 'zod';
import {zColor} from '@remotion/zod-types';


export const VideoTypeSchema = z.enum(["SIMPLE"])
export const ImageEffectEnum = z.enum(["FULLPAGE","FULLPAGE-PAN","SQUARE","SQUARE-PAN"])
export const TextTypeEnum = z.enum(["CAPTIONS","BUBBLES"]);
export const TextLocationEnum = z.enum(["TOP","MIDDLE","BOTTOM"]);


export const ValidVideoTypes = ["SIMPLE"];
export const ValidImageEffects = ["FULLPAGE","FULLPAGE-PAN","SQUARE","SQUARE-PAN"];
export const ValidTextTypes = ["CAPTIONS","BUBBLES"];
export const ValidTextLocations = ["TOP","MIDDLE","BOTTOM"];


export const FontDefSchema = z.object({
  fontname: z.string(),
  fontsize: z.number(),
  fontcolor: zColor(),
  bgcolor: zColor(),
});

export const TTSInfoSchema = z.object({
  ttstext: z.string(),
  voice: z.string(),
});

export const ItemDetailsSchema = z.object({
  id: z.number(),
  tts: TTSInfoSchema.optional(),
  itemname: z.string(),
  image: z.string(),
  itemsubtitle: z.string().optional(),
  itemdetails: z.string().optional(),
  itemsubtitlefont:FontDefSchema,
  itemnamefont: FontDefSchema,
  itemdetailsfont: FontDefSchema,
  imageeffect:ImageEffectEnum,
  itemduration: z.number(),
  texttype:TextTypeEnum.optional(),
  textlocation:TextLocationEnum.optional(),  //might remove in favor of top
  itemnametop:z.number().optional(),
  itemsubtitletop:z.number().optional(),
})


export const VideoBodySchema = z.object({
  items:z.array(ItemDetailsSchema).optional(),
})




export const VideoDefSchema = z.object({
  videoname: z.string(), 
  description: z.string().optional(),
  videotype: VideoTypeSchema,
  body: VideoBodySchema,
  bgaudioid:z.string().optional(),
  durationSec: z.number()
})



export const myCompSchema = z.object({
  videoDef: VideoDefSchema,
})


export type RemotionUserVideoDef = z.infer<typeof VideoDefSchema>;
export type FontDef = z.infer<typeof FontDefSchema>
export type ItemDetails = z.infer<typeof ItemDetailsSchema>;
export type VideoBody = z.infer<typeof VideoBodySchema>
export type VideoType = z.infer<typeof VideoTypeSchema>;
export type ImageEffect = z.infer<typeof ImageEffectEnum>;
export type TextTypes = z.infer<typeof TextTypeEnum>;
export type TextLocationTypes = z.infer<typeof TextLocationEnum>;