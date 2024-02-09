
import { addToGallery } from '@/dbutil/gallerydb';
import { NextRequest } from 'next/server';
import { authOptions } from '@/utils/authutil';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {

    const session = await getServerSession( authOptions);

    const body = await request.json() // res now contains body

    const url = body.url;
    const name = body.name;
    const link = body.link;
    const desc = body.description;
try{
    let resp=await addToGallery(session?.user?.id!,name,url,"",link,desc);
    return new Response(JSON.stringify({"added": true})
    , {
     status:200,
      headers: {
        'content-type': 'application/json',
      },
    });
    
  } catch (err) {
      const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
      return new Response("", {
          status: 500,
          headers: {
            'content-type': 'application/json',
          },
        });

  }
  }

