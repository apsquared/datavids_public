import { createVideoRequest, getAllVideoRequests, resaveVideoRequest } from '@/dbutil/videoreqdb';
import {UserVideoDef} from '@/types/uservideodef'
import { UserVideoRequest, VideoStatus } from '@/types/uservideoreq';
import { authOptions } from '@/utils/authutil';
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

    console.log(JSON.stringify(uservid));

    if (!videoid){
        //NEW VIDEO
        const vidreq : UserVideoRequest = {
            userid:session.user.id,
            videoDef:uservid,
            status:VideoStatus.SAVED,
            updateTime: new Date(),
        }
    
        const resp:string = await createVideoRequest(vidreq);
        return new Response(JSON.stringify({id:resp}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    } else {
        //OLD VIDEO
        console.log("Existing video "+videoid);
        const vidreq : UserVideoRequest = {
            userid:session.user.id,
            videoDef:uservid,
            status:VideoStatus.SAVED,
            updateTime: new Date(),
        }
        const resp:string = await resaveVideoRequest(videoid,vidreq);
        return new Response(JSON.stringify({id:resp}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

  }