import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Readable } from 'node:stream';
import { stripe } from '../../../../utils/stripe'
import { NextRequest } from 'next/server';
import { getUserDetails, updateUserDetailsStripe } from '@/dbutil/userdb';
import { addToLedger } from '@/dbutil/ledgerdb';
import { Ledger } from '@/types/ledger';


// Stripe requires the raw body to construct the event.
/*
export const config = {
  api: {
    bodyParser: false
  }
}; */

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export async function POST(request: NextRequest) {
  
    const buf = await request.text();
    const sig = request.headers.get('stripe-signature');
    
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;
    
    try {
      if (!sig || !webhookSecret) return;
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      return new Response("Webhook Error", {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      });
    }

   
    if (relevantEvents.has(event.type)) {
      try {
        console.log(event.type);
        switch (event.type) {

          case 'checkout.session.completed':
            console.log("Checkout Completed  - creating customer and subscription");
            const checkoutSession = event.data.object as Stripe.Checkout.Session;
            if ( checkoutSession.status==='complete') {
              var customerid:string = checkoutSession.customer as string;//get customer id
              var clientrefstr:string = checkoutSession.client_reference_id! //get the client ref that we passed to checkout
              console.log("for "+clientrefstr+" we have cust id"+customerid);
              const udetails = await getUserDetails(clientrefstr);
              if(udetails?.stripe_customerid==null)
                {
                  await updateUserDetailsStripe(clientrefstr,customerid);
                }
              const lineItems=await stripe.checkout.sessions.listLineItems(checkoutSession.id);
              console.log(lineItems.data[0]?.price?.id);
              console.log(lineItems.data[0]?.price?.metadata);
              const metadata=lineItems.data[0]?.price?.metadata;
              console.log("credits from product "+metadata!.CREDITS);
              let credits:number=+metadata!.CREDITS;
              let ledgerItem : Ledger = {userid:clientrefstr,type:"BUY",amount:credits,reference:checkoutSession.id,note:lineItems.data[0].description};

              await addToLedger(ledgerItem);
            }
            break;
          default:
            throw new Error('Unhandled relevant event!');
        }
      } catch (error) {
        console.log(error);
        return new Response("Webhook Error", {
            status: 400,
            headers: {
              'content-type': 'application/json',
            },
          });
      
      }
    }
    return new Response(JSON.stringify({"received": true})
    , {
     status:200,
      headers: {
        'content-type': 'application/json',
      },
    });
    
}

