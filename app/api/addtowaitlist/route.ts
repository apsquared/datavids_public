
import { addToWaitlist } from '@/dbutil/waitlistdb';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {

    ////console.log("here");
    const body = await request.json() // res now contains body

    const email = body.email;

    let resp = {
        status: 'OK',
    }

    if (isValidEmail(email)){
       await addToWaitlist(email);
    } else {
        resp.status = "Invalid Email";
    }


    return new Response(JSON.stringify({resp}), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });
  }

  function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }
