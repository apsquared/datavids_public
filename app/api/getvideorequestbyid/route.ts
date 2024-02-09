import { getVideoRequestById } from "@/dbutil/videoreqdb";
import { UserVideoRequest } from "@/types/uservideoreq";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    console.log("Loading")

    if (!id){
        return new Response(JSON.stringify({"status":"id not found"}), {
            status: 404,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

    const vidReq:UserVideoRequest = await getVideoRequestById(id);


    return new Response(JSON.stringify(vidReq), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

}