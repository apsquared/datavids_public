import Breadcrumb from "@/components/Common/Breadcrumb";
import HowTo from "@/components/HowTo";
import { Metadata } from "next";

const mTitle = "How to Generate Viral Videos from Content. Fast.";
const mDesc = "Learn how to use DataVids to generate viral social media videos from your existing content.";
const mCan = '/data-to-video-how'
const img='/images/og.png' 

const HowItWorks = () => {
    return (
        <>
      <Breadcrumb
        pageName="How It Works"
        description="Learn how your data can be transformed into Viral videos in just minutes."
      />
      <HowTo></HowTo>
        </>
    )
}

export default HowItWorks;

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