import Breadcrumb from "@/components/Common/Breadcrumb";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";

const mTitle = "DataVids: Frequently Asked Questions";
const mDesc = "Common questions about turning your content into viral videos, fast and easily.";
const mCan = '/faq'
const img='/images/og.png' 

const FAQPage = () => {
    return (
        <>
      <Breadcrumb
        pageName="FAQ"
        description=""
      />
      <FAQ></FAQ>
        </>
    )
}

export default FAQPage;

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