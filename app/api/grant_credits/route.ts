import { NextApiRequest, NextApiResponse } from 'next'
import { getUserDetails} from '../../../dbutil/userdb'
import { stripe } from '../../../utils/stripe'
import { getURL } from '../../../utils/api-helpers';
import { NextRequest } from 'next/server';
import { authOptions } from '@/utils/authutil';
import { getServerSession } from 'next-auth';
import { Ledger } from '@/types/ledger';
import { addAdminGrantedCreditsToLedger } from '@/utils/ledgerutil';


export async function POST(request: NextRequest) {
                
       
                            try {
                              const session = await getServerSession( authOptions);
                              if(session?.user?.role!="ADMIN")
                              {
                                return new Response(JSON.stringify({"granted": false})
                                , {
                                 status:400,
                                  headers: {
                                    'content-type': 'application/json',
                                  },
                                });
                              }
                              const json=await request.json();
                              let credits=json.credits as number;
                              let userid=json.userid;
                              
                              if(userid==null || userid=="" || credits==0 || credits==null)
                              {
                                return new Response(JSON.stringify({"granted": false})
                                , {
                                 status:400,
                                  headers: {
                                    'content-type': 'application/json',
                                  },
                                });
                              }
                              await addAdminGrantedCreditsToLedger(userid!,credits);
                              return new Response(JSON.stringify({"granted": true})
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
