import {createItem} from '@/dbutil/itemsdb'
import {Item} from '@/types/item'
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {

    ////console.log("here");
    const body = await request.json() // res now contains body

    const itm : Item = {
        name: body.name,
        description: body.description,
        link: body.link,
    }

    const resp:boolean = await createItem(itm);

    return new Response(JSON.stringify({resp}), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });

  
  }