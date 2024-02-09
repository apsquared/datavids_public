import { getUserDetails} from '../../../../dbutil/userdb'
import { stripe } from '../../../../utils/stripe'
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authutil';
import { getURL } from '@/utils/api-helpers';


export async function POST(request: NextRequest) {

                        
                
                        
                        try {

                          const session = await getServerSession( authOptions);


                          const json=await request.json();
 
                          console.log("body="+json);
                          let price=json.priceid;
                          let userid=session?.user?.id;
                          const userDetails =await getUserDetails(userid!);
                          const userStripe=userDetails?.stripe_customerid;
                          console.log("Stripe id for user="+userStripe);
                          console.log("IN POST "+price);
                          console.log("IN POST user "+userid);
                          let url=getURL()+'return?session_id={CHECKOUT_SESSION_ID}';
                          console.log("URL="+url);
                          if(userStripe==null)
                          {
                                const session2 = await stripe.checkout.sessions.create({
                                  payment_method_types: ['card'],
                                  billing_address_collection: 'required',
                                  ui_mode: 'embedded',
                                  line_items: [
                                  {
                                      price: price,
                                      quantity: 1
                                  }
                                  ],
                                  mode: 'payment',
                                  client_reference_id: userid,
                                  customer_creation:'always',
                                  allow_promotion_codes:true,
                                  return_url:url
                              });

                              console.log("HERE");
                              return new Response(JSON.stringify({"clientSecret": session2.client_secret}), {
                                  status: 200,
                                  headers: {
                                    'content-type': 'application/json',
                                  },
                                });
                          }else{
                            console.log("WE HAVE STRIPE");
                            const session2 = await stripe.checkout.sessions.create({
                              payment_method_types: ['card'],
                              billing_address_collection: 'required',
                              ui_mode: 'embedded',
                              line_items: [
                              {
                                  price: price,
                                  quantity: 1
                              }
                              ],
                              mode: 'payment',
                              client_reference_id: userid,
                              customer: userStripe,
                              allow_promotion_codes:true,
                              return_url:url
                          });

                          console.log("HERE");
                          return new Response(JSON.stringify({"clientSecret": session2.client_secret}), {
                              status: 200,
                              headers: {
                                'content-type': 'application/json',
                              },
                            });
                          }

                        } catch (err) {
                            console.log("PUT ERROR");
                            const errorMessage =
                            err instanceof Error ? err.message : 'Internal server error'
                            console.log(errorMessage);

                            return new Response("", {
                                status: 500,
                                headers: {
                                  'content-type': 'application/json',
                                },
                              });
                        }
                    }
export async function GET(request: NextRequest) {
                
       
                            try {
                              const { searchParams } = new URL(request.url);
                              const type:string = searchParams.get("session_id")!;
                              
                                console.log("in get with data "+type);
                              const session = await stripe.checkout.sessions.retrieve(type);
                              return new Response(JSON.stringify({"status": session.status,  "customer_email": session.customer_details?.email})
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
