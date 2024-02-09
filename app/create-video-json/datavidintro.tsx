import { RemotionUserVideoDef } from "@/remotion-video/types/uservideodef";

export const dataVidIntro:RemotionUserVideoDef = {
    "videoname": "Default",
    "description": "This is a default video.",
    "videotype": "SIMPLE",
    "durationSec": 15,
    "body": {
      "items": [{
        "id": 1,
        "itemname": "Introducing DataVids",
        "itemsubtitle": "Turn Content Into Videos In Seconds",
        "itemdetails": "No coding or video editing!",
        "image": "https://www.datavids.io/images/DataVids1.png",
        "imageeffect": "SQUARE",
        "itemnamefont": {
          "fontname": "Poppins",
          "fontsize": 80,
          "fontcolor": "#FFFFFF",
          "bgcolor": "#4A6CF799"
        },
        "itemsubtitlefont": {
          "fontname": "Poppins",
          "fontsize": 70,
          "fontcolor": "#FFFFFF",
          "bgcolor": "#4A6CF799"
        },
        "itemdetailsfont": {
          "fontname": "Poppins",
          "fontsize": 60,
          "fontcolor": "#FFFFFF",
          "bgcolor": "#00000A80"
        },
        "tts": {
          "ttstext": "Introducing DataVids, Turn Content Into Videos In Seconds",
          "voice": "enUSMan1"
        },
        "itemduration": 5,
      }]
    },
    
  }