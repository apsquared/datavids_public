import { authOptions } from "@/utils/authutil";
import { getServerSession } from "next-auth";
import { AI_COST, addAICreationToLeder } from "@/utils/ledgerutil";
import { getUserCreditBalance } from "@/dbutil/ledgerdb";
import { getWebsiteData } from "@/utils/urltovideoai";


/* not yet implemented */
export async function POST(request: Request) {
    ////console.log("here");
  
    const json = await request.json();
    const url = json.url;
  
    const session = await getServerSession( authOptions);
  
    if (!session || !session.user){
        return new Response('Unauthorized', {status: 401,});
    }
  
    console.log("Gathering webdata for  "+url);
      //check credit count
    let creditbalance=await getUserCreditBalance(session.user.id);
    if(creditbalance < AI_COST)
    {
        return new Response('NotEnoughCredits', {status: 410});
    }

    const {webdata,metadata} = await getWebsiteData(url);
    return new Response(JSON.stringify({webdata,metadata}), {
        status: 200,
        headers: {
        'content-type': 'application/json',
        },
    });
  
}