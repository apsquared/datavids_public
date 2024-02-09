

import { getServerSession } from 'next-auth';
import {authOptions} from "@/utils/authutil"

import { redirect } from "next/navigation";
import Subscribe from './subscribe';
import { Metadata } from 'next';

const mTitle = "Join the DataVids Waitlist";
const mDesc = "Join the DataVids Wailist to be the first to turn content into viral videos.";
const mCan = '/waitlist'
const img='/images/og.png' 


export default async function SigninPage() {

  const session = await getServerSession(authOptions);
    if (session && session.user ){
      redirect('/');
      return;
    }


  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[900px] rounded-md bg-primary bg-opacity-5 py-5 px-6 dark:bg-dark sm:p-[30px] h-[600px]">


                <iframe className='w-full h-full ' src="https://cdn.forms-content-1.sg-form.com/135bd7d2-6c36-11ee-89dc-ee7606221644"/>

              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};


export const metadata: Metadata = {
  title:mTitle,
  description:mDesc,
  keywords: ['Videos', 'Generate', 'TikTok','Viral','NoCode'],
  metadataBase: new URL("https://www.datavids.io"),
  alternates: {
    canonical: mCan,
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: mTitle,
    description: mDesc,
    url: mCan,
    siteName: 'DataVids',
    type:'website',
    images: [{
      url: img,  
      alt:'DataVids'
     }
    ]
  },
  icons: {    //need to make these work
    icon: '/images/icons/icon.png',
    shortcut: '/images/icons/icon.png',
    apple: '/images/icons/icon.png',
    other: {
      rel: '/images/icons/icon.png',
      url: '/images/icons/icon.png',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: mTitle,
    description: mDesc,
    site:'https://www.datavids.io',
    creator: '@datavidsIO',
    images: [img],
  },
}