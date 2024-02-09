import { NextRequest } from 'next/server';
import { authOptions } from '@/utils/authutil';
import { getServerSession } from 'next-auth';
import { Ledger } from '@/types/ledger';
import { getUserCreditBalance } from '@/dbutil/ledgerdb';

export async function GET(request: Request) {

  ////console.log("here");
  const session = await getServerSession( authOptions);
  let credits=await getUserCreditBalance(session?.user?.id!);
  return new Response(JSON.stringify({total:credits}), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });

}