import { getUserByAPIKey } from '@/dbutil/userdb';
import { createVideoRequest, getAllVideoRequests, getVideoRequestById } from '@/dbutil/videoreqdb';
import { TestSchema } from '@/remotion-video/types/test';
import { VideoDefSchema } from '@/remotion-video/types/uservideodef';
import {UserVideoDef} from '@/types/uservideodef'
import { UserVideoRequest, VideoStatus } from '@/types/uservideoreq';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) { 

    ////console.log("here");
    const json = await request.json();

    //replace this with tokens from datavids-api-key header
    //lookup user from api key

    const apikey = request.headers.get('datavids-api-key');
    if (!apikey){
        return new Response(JSON.stringify({"error":"datavids-api-key must be present"}), {
            status: 400,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

    const userDetails = await getUserByAPIKey(apikey);

    if (!userDetails){
        return new Response(JSON.stringify({"error":"api-key value not found"}), {
            status: 400,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

    let userid = userDetails.userid;

    let videoToCreate : UserVideoDef = json.videoDef;
    let templateID = json.templateID;
    if (templateID){
        const vidReq:UserVideoRequest = await getVideoRequestById(templateID);
        if (vidReq){

            let vid = {...vidReq.videoDef,...videoToCreate};
            videoToCreate = vid;
            console.log("New Video: "+JSON.stringify(videoToCreate));
        } else {
            return new Response(JSON.stringify({"error":"unable to find template "+templateID}), {
                status: 404,
                headers: {
                  'content-type': 'application/json',
                },
              });
        }
    }

    if (VideoDefSchema.safeParse(videoToCreate).success){

        const vidreq : UserVideoRequest = {
            userid: userid,
            videoDef:videoToCreate,
            status:VideoStatus.SAVED,
            requestTime: new Date(),
        }

        const resp:string = await createVideoRequest(vidreq);

        return new Response(JSON.stringify({id:resp}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });

     }else {
        console.log("invalid videodef "+JSON.stringify(videoToCreate));
        VideoDefSchema.parse(videoToCreate)
        return new Response(JSON.stringify({"error":"invalid videodef"}), {
          status: 400,
          headers: {
            'content-type': 'application/json',
          },
        });

    }
  
  }

