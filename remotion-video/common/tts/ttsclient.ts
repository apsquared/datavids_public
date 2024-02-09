import { TTS_RESULT } from "@/app/api/tts/tts";

//https://www.datavids.io/api/tts
//http://localhost:3000/api/tts

export const textToSpeech = async (
	text: string,
	voice: keyof typeof VALID_VOICES
): Promise<TTS_RESULT> => {

    const valresponse = await fetch("https://www.datavids.io/api/tts", {  // can we make this dynamic when running locally vs. lambda??
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text:text, voice:voice})
      });
      if (valresponse.status==200){
        const respj = await valresponse.json();
        return respj;
      } else {
        console.log("Error occured in textToSpeech client "+valresponse.status);
        return {audiourl:'',durationMs:-1};
      }

}

// https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support?tabs=tts
export const VALID_VOICES = {
	enBRMan1: "en-GB-OliverNeural",
	enBRMan2: "en-GB-AlfieNeural",
	enUSWoman1: 'en-US-JennyNeural',
	enUSWoman2: 'en-US-AriaNeural',
	enUSMan1: 'en-US-TonyNeural',
	enUSMan2: 'en-US-AIGenerate1Neural',
  oaialloy: 'alloy',
  oaishimmer: 'shimmer',
  oaiecho: 'echo',
  oainova: 'nova',
  oaionyx: 'onyx'
} as const;

export const VOICELIST = [
  {key: "oaialloy", label:'Alloy'},
  {key: "oaishimmer",label:"Shimmer"},
  {key: "oaiecho",label:"Echo"},
  {key: "oainova",label:"Nova"},
  {key: "oaionyx",label:"Onyx"},
  {key: "enBRMan1", label:"Oliver (GB)"},
  {key: "enBRMan2", label:"Alfie (GB)"},
  {key: "enUSWoman1", label:"Jenny (US)"},
  {key: "enUSWoman2", label:"Aria (US)"},
  {key: "enUSMan1", label:"Tony (US)"},
  {key: "enUSMan2", label:"AI"}

]