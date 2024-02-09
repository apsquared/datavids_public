
import { getGalleryItems } from "@/dbutil/gallerydb";
import { Metadata } from "next";
import DisplayGalleryPage from "./displaygallery";
export const revalidate = 30 
const mTitle = "DataVids Gallery of Websites";
const mDesc = "See how other websites are using DataVids to quickly and easily produce viral social media videos.";
const mCan = '/gallery'
const img='/images/og.png' 


const Examples = async() => {

  const galleryItems=await getGalleryItems();

  return (
    <DisplayGalleryPage results={galleryItems}/>
  );
};

export default Examples;

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