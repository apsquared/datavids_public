
import { NextRequest } from 'next/server';
import { authOptions } from '@/utils/authutil';
import { getServerSession } from 'next-auth';
import { addAdminGrantedCreditsToLedger, addUserActionToLedger } from '@/utils/ledgerutil';
import { addToLedger } from '@/dbutil/ledgerdb';


export async function POST(request: NextRequest) {
                
       
                            try {
                              const session = await getServerSession( authOptions);
                              const json=await request.json();
                              let credits=json.credits as number;
                              let userid=session?.user?.id!;
                              
                              if(userid==null || userid=="" || credits==0 || credits==null)
                              {
                                return new Response(JSON.stringify({"used": false})
                                , {
                                 status:400,
                                  headers: {
                                    'content-type': 'application/json',
                                  },
                                });
                              }

                              await addUserActionToLedger(userid,"ADJUST","",credits,"Manually Adjustment");
                              return new Response(JSON.stringify({"used": true})
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
