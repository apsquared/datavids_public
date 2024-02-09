import { AIVideoScript, createVideoScript, getWebsiteData } from "@/utils/urltovideoai";
import { getDefaultAIVideo } from "./baseaivideo";
import { VideoDefSchema } from "@/remotion-video/types/uservideodef";
import { UserVideoRequest, VideoStatus } from "@/types/uservideoreq";
import { createVideoRequest } from "@/dbutil/videoreqdb";
import { authOptions } from "@/utils/authutil";
import { getServerSession } from "next-auth";
import { addToLedger, getUserCreditBalance } from "@/dbutil/ledgerdb";
import { Ledger } from "@/types/ledger";
import { AI_COST, addAICreationToLeder } from "@/utils/ledgerutil";
import { DVVideoResult, findVerticalVideos } from "@/utils/pexels";

export const maxDuration = 30;


export async function POST(request: Request) {
  ////console.log("here");

  const json = await request.json();
  const url = json.url;
  const userimage = json.image;
  const usertip = json.usertip;
  const duration = json.duration;
  const bgmusic = json.bgmusic;

  const session = await getServerSession( authOptions);

  if (!session || !session.user){
      return new Response('Unauthorized', {status: 401,});
  }

  console.log("AI URL to video called "+JSON.stringify(json));

  //check credit count
  let creditbalance=await getUserCreditBalance(session.user.id);
  if(creditbalance < AI_COST)
  {
    return new Response('NotEnoughCredits', {status: 410});
  }

  const {webdata,metadata} = await getWebsiteData(url);

  const resp:AIVideoScript = await createVideoScript(url as string,webdata,metadata,usertip,duration,bgmusic);
  if (!resp.image && !userimage){
    console.warn('Could not find image for '+url);
    return new Response(JSON.stringify({"error":"MISSING_IMG"}), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      });
  }

  let results:DVVideoResult[] = []; 
  if (resp.searchTerm){
     results = await findVerticalVideos(resp.searchTerm);
  }

  console.log("bg music "+bgmusic);

  let videoToCreate = getDefaultAIVideo(resp,userimage,url,bgmusic,results);   

  if (VideoDefSchema.safeParse(videoToCreate).success){

        const vidreq : UserVideoRequest = {
            userid: session.user?.id,
            videoDef:videoToCreate,
            status:VideoStatus.SAVED,
            updateTime:new Date(),
        }

        const resp:string = await createVideoRequest(vidreq);
        console.log("ai resp="+resp);
        await addAICreationToLeder(session.user?.id,resp);
        return new Response(JSON.stringify({id:resp}), {
            status: 200,
            headers: {
            'content-type': 'application/json',
            },
        });

 }else {
    console.log("invalid videodef "+JSON.stringify(videoToCreate));
    VideoDefSchema.parse(videoToCreate); //do this to cause an error
    return new Response(JSON.stringify({"error":"invalid videodef"}), {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
    });

 }
}