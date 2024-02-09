import { RemotionUserVideoDef } from "../types/uservideodef";

export const sampleUserVideoDef1: RemotionUserVideoDef = {
  videoname: "Default",
  description: "This is a default video.",
  videotype: "SIMPLE",
  durationSec: 13,
  body: {
    items: [{
        id: 1,
        itemname: "Love Potion #9",
        itemsubtitle: "A sexy and delicious cocktail",
        itemdetails: "",
        image: "https://heybairtender.s3.amazonaws.com/recipes/love-potion-no-9.png?v=1",
        imageeffect:"SQUARE-PAN",
        itemnamefont: {
            fontname: "Poppins",
            fontsize: 80,
            fontcolor: "#FFFFFF",
            bgcolor: "#e6324b99",
        },
        itemsubtitlefont: {
            fontname: "Poppins",
            fontsize: 60,
            fontcolor: "#FFFFFF",
            bgcolor: "#e6324b99",
        },
        itemdetailsfont: {
            fontname: "Poppins",
            fontsize: 50,
            fontcolor: "#FFFFFF",
            bgcolor: "#00000A30",
        },
        tts: {
          ttstext: "Introducing Love Potion Number 9",
          voice: "enUSWoman2",
      }, 
      itemduration:4,
    }],
  },
 

};
