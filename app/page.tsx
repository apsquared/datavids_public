import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import {Hero} from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Inter } from "next/font/google";
import HowTo from "@/components/HowTo";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";


const mTitle = "DataVids - Turn Content into Viral Videos. Fast";
const mDesc = "Use your websites existing content to quickly and easily create viral videos for sites like Tik Tok with no coding or video editing.";
const mCan = '/'
const img='/images/og.png' //need to update this



export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
    {/*  <Video /> */}
    {/*  <Brands /> */}
      <AboutSectionOne />
    {/*  <AboutSectionTwo /> */}
    {/*  <Testimonials /> */}
      <Pricing />
      <FAQ/>
     {/* <Blog /> */}
    </>
  );
}


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