import { NextApiRequest, NextApiResponse } from 'next'
import { getUserDetails} from '../../../../dbutil/userdb'
import { stripe } from '../../../../utils/stripe'
import { getURL } from '../../../../utils/api-helpers';
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
                
       
                            try {

                              
                              //const products = await stripe.products.list({active:true});
                              const prices = await stripe.prices.list({active:true});
                              
                              return new Response(JSON.stringify({"data": prices.data})
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
