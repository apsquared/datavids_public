import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { CreateVideoURL } from './createvideourl';

import { Metadata } from 'next';



const CreateVideoPage = async() => {
    
    const session = await getServerSession( authOptions);
    let loggedIn = false;

    if (session  && session.user){
        loggedIn = true;
    }


    //const userCredits = await getUserCreditBalance(session?.user?.id);
    return (
        <CreateVideoURL loggedIn={loggedIn}/>
    )


}

export default CreateVideoPage;

const mTitle = "URL to Video Creator Using AI, Get Started for FREE!";
const mDesc = "Just enter a URL to any webpage and DataVid&apos;s AI will create a TikTok ready video for you to go Viral with.  Get started today for free!";
const mCan = '/'
const img='/images/og.png' //need to update this

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
        alt:'BarGPT'
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
      site:'https://www.bargpt.app',
      creator: '@BarGPt',
      images: [img],
    },
  }