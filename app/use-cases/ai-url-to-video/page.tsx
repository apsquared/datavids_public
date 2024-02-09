
import TextHighlight from "@/components/Common/TextHighlight";
import Video from "@/components/Video";
import { Metadata } from "next";
import Link from "next/link";

const mTitle = "Use AI to go from URL to Video";
const mDesc = "Use artificial intelligence to take a URL and generate a social media video quickly.";
const mCan = "/use-cases/ai-url-to-video"
const img="/images/main.png" //need to update this

const AIURL = () => {
return (
<>
<div className="text-dark font-medium">
  <h1 className="mb-4 text-3xl  leading-tight sm:text-4xl sm:leading-tight">
    Use AI to take a URL and Create a Video, Instantly!
  </h1>
  <div className="mb-5 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-2 dark:border-white dark:border-opacity-10">

  </div>
  <div>
  <p className="mb-10 text-base leading-relaxed sm:leading-relaxed  lg:leading-relaxed xl:leading-relaxed">
  Who doesn&apos;t love when AI can help make your life a little easier?  Using our AI + Video Generation all you need to do is give us a URL and we will do the rest.
  Generally, it is beneficial if the website has proper meta tags.
   </p>
   
   <TextHighlight text="Did You Know:  You can also specify an existing video and we will use that as a template for our AI."/>
  
  <p className="mb-2 text-base leading-relaxed  sm:leading-relaxed  lg:leading-relaxed xl:leading-relaxed">
    After our AI is done you can render it as is or edit the video further using our API or editor.
  </p>

  <Video videourl="/video/DataVidsAI.mp4" introimage="/images/AIVideoIntro.png"/>

  <p className="mb-10 text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
    
  </p>
  <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="/signin"
            className="rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
          >
            🔥 Get Started
          </Link>
  </div>

</div>

</div>
</>
)
}

export default AIURL;

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