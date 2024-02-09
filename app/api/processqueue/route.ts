import { getAllQueuedRequests, updateVidReq } from '@/dbutil/videoreqdb';
import { UserVideoRequest } from '@/types/uservideoreq';
import { startLambda } from '@/utils/vidutil';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest){
  console.log(request.url);
  return POST(request);
}


export async function POST(request: NextRequest) {

    console.log ("cron job called");
    
    const items:UserVideoRequest[] = await getAllQueuedRequests();
    console.log("Queue items "+JSON.stringify(items) );

    if (items.length==0){
        return new Response(JSON.stringify({status:'no items'}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

    let i = 0;
    const MAX_ITEMS = 3;

    for (let item of items){
        const {renderId,bucketName} = await startLambda(item.videoDef);
        //update item with renderId and bucketName, start time,
        const result = await updateVidReq(item,renderId,bucketName);
        i++;
        if (i >= MAX_ITEMS){
            break;
        }
    }

    return new Response(JSON.stringify({status:'ok'}), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

}