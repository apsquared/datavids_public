
import { NextRequest } from 'next/server';
import { UserVideoRequest, VideoStatus } from '@/types/uservideoreq';
import { completeVidRequest, getVideoRequestById, setVidReqError } from '@/dbutil/videoreqdb';
import { getStatus } from '@/utils/vidutil';

export async function GET(request: NextRequest) {


    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id){
        return new Response(JSON.stringify({status:"id not provided"}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

    const vidReq:UserVideoRequest = await getVideoRequestById(id);
    //console.log(JSON.stringify(vidReq));

    if (!vidReq.renderId || !vidReq.bucketName){
        return new Response(JSON.stringify({status:"no renderId or bucketName for video",respObj:vidReq}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

    if (vidReq.status == VideoStatus.COMPLETE || vidReq.status==VideoStatus.ERROR){
        //its already complete just return
        return new Response(JSON.stringify({status:"ok",respObj:vidReq}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

    const {status, details} = await getStatus(vidReq.renderId,vidReq.bucketName)
    if (status == 'complete'){
        //update vid request
        console.log("video is complete ");
        const resp = await completeVidRequest(vidReq,details);
        const respObj:UserVideoRequest = await getVideoRequestById(id);
        return new Response(JSON.stringify({status:"ok",respObj}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    } else if (status=="error"){
        const resp = await setVidReqError(vidReq,details);
        const respObj:UserVideoRequest = await getVideoRequestById(id);
        return new Response(JSON.stringify({status:"ok",respObj:respObj}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

    let percComplete = (parseFloat(details) ? parseFloat(details) : -1);

    return new Response(JSON.stringify({status:"ok",respObj:{...vidReq,percComplete:percComplete}}), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });
    


}