
import { NextRequest } from 'next/server';
import { textToSpeech,TTS_RESULT } from './tts';
import { textToSpeechOAI } from './oaitts';
import { VALID_VOICES } from '@/remotion-video/common/tts/ttsclient';

export async function POST(request: NextRequest) {

    ////console.log("here");
    const body = await request.json() // res now contains body

    const text = body.text;
    const voice = body.voice as keyof typeof VALID_VOICES;

    //console.log("TTS REQUEST request for "+text);


    let result:TTS_RESULT = {audiourl:'',durationMs:-1,};
    if (voice.startsWith("oai")){
      result = await textToSpeechOAI(text,voice)
    } else {
      result = await textToSpeech(text,voice)
    }
    
 
    //console.log("TTS RESULTS for "+text+" "+JSON.stringify(result));

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
  }

  export async function OPTIONS(request: Request) {
    const allowedOrigin = request.headers.get("origin");
    const response = new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
  
    return response;
  }

