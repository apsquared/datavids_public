import { getUserCreditBalance } from '@/dbutil/ledgerdb';
import { createVideoRequest, getAllVideoRequests, resaveVideoRequest } from '@/dbutil/videoreqdb';
import {UserVideoDef} from '@/types/uservideodef'
import { UserVideoRequest, VideoStatus } from '@/types/uservideoreq';
import { authOptions } from '@/utils/authutil';
import { AI_COST, addUserActionToLedger } from '@/utils/ledgerutil';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {

    ////console.log("here");
    const json = await request.json() // res now contains body

    const uservid = json.uservid;
    const videoid = json.videoid;

    const session = await getServerSession( authOptions);

    if (!session || !session.user){
        return new Response('Unauthorized', {status: 401,});
    }
    let cost=1*Math.ceil(uservid.durationSec!/10);
    let creditbalance=await getUserCreditBalance(session.user.id);
    if(creditbalance < cost)
    {
      return new Response('NotEnoughCredits', {status: 410,});
    }
    cost=cost*-1; //set to negative for the ledger later
    //console.log(JSON.stringify(uservid));
    if (videoid && videoid.length>1){
        //already saved object
        console.log("Adding existing video to queue");
        const vidreq : UserVideoRequest = {
            userid:session.user.id,
            videoDef:uservid,
            status:VideoStatus.QUEUED,
            updateTime: new Date(),
        }
        const resp:string = await resaveVideoRequest(videoid,vidreq);
        await addUserActionToLedger(session.user.id,"RENDER",resp,cost,"Rendering of video");
        return new Response(JSON.stringify({id:resp}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
    else {
        console.log("Adding new video to queue");
        const vidreq : UserVideoRequest = {
            userid:session.user.id,
            videoDef:uservid,
            status:VideoStatus.QUEUED,
            requestTime: new Date(),
            updateTime: new Date(),
        }
    
        const resp:string = await createVideoRequest(vidreq);
        await addUserActionToLedger(session.user.id,"RENDER",resp,cost,"Rendering of video");
        return new Response(JSON.stringify({id:resp}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }




  
  }