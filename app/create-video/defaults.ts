import { RemotionUserVideoDef,ItemDetails, VideoBody, VideoType, VideoTypeSchema, FontDef, ImageEffectEnum, TextTypeEnum, TextLocationEnum } from "@/remotion-video/types/uservideodef";



export function getDefaultItemNameFont():FontDef{
    return {
        fontname: 'montserrat',
        fontsize: 100,
        fontcolor: 'white',
        bgcolor: 'black',
    }
}

export function getDefaultSubtitleFont():FontDef{
    return {
        fontname: 'montserrat',
        fontsize: 50,
        fontcolor: 'white',
        bgcolor: 'black',
    }
}

export function getDefaultItemDetails(id:number):ItemDetails{
    return {
            id:id,
            itemname: '',
            image: '',
            itemsubtitle: '',
            itemdetails:'',
            texttype:TextTypeEnum.Values.CAPTIONS,
            textlocation:TextLocationEnum.Values.TOP,
            itemnamefont: getDefaultItemNameFont(),
            itemsubtitlefont: getDefaultSubtitleFont(),
            itemdetailsfont: getDefaultSubtitleFont(),
            imageeffect: ImageEffectEnum.Values.SQUARE,
            itemduration:5,
            itemnametop:225,
            itemsubtitletop:1450,
            tts:{
                ttstext:'',
                voice:'oaialloy'
            }
        }
    }
