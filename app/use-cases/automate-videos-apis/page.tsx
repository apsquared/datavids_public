
import TextHighlight from "@/components/Common/TextHighlight";
import Video from "@/components/Video";
import { Metadata } from "next";
import Link from "next/link";

const mTitle = "Create Viral Videos Programatically With APIs";
const mDesc = "Learn how to use DataVids to programatically generate viral TikTok videos from your existing content quickly and easily.";
const mCan = "/use-cases/automate-videos-apis"
const img="/images/main.png" //need to update this

const AutomateAPI = () => {
return (
<>
<div className="text-dark font-medium">
  <h1 className="mb-4 text-3xl  leading-tight sm:text-4xl sm:leading-tight">
    Create Viral Videos Programatically With APIs
  </h1>
  <div className="mb-5 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-2 dark:border-white dark:border-opacity-10">

  </div>
  <div>
  <p className="mb-10 text-base leading-relaxed sm:leading-relaxed  lg:leading-relaxed xl:leading-relaxed">
    The reality is there is no secret to guaranteeing a video will go viral.  You can increase your odds in many ways but the best way is to post lots of videos and try different things.
    However, if you are like many of us producing videos is boring and thus often skipped.  Using our simple to use <strong>API</strong> you easily create videos directly from your code or simple command line (using something like CURL).
  </p>

  <p className="mb-2 text-base leading-relaxed  sm:leading-relaxed  lg:leading-relaxed xl:leading-relaxed">
    By making video creation quick, easy and part of your content workflow you can increase the odds that your video will go viral.  It&apos;s just math!
  </p>

  <TextHighlight text="Did You Know:  Our API can take any existin video ID as a parameter to act as a template."/>

  <Video videourl="/video/DataVids-API.mp4" introimage="/images/AIAPIIntro.png"/>

  <h2 className="font-xl mt-8 mb-5 font-bold leading-tight text-black sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
    API Details
  </h2>
  <p className="mb-5 text-base  leading-relaxed  sm:leading-relaxed lg:text-base lg:leading-relaxed  xl:leading-relaxed">
    Coming Soon.
  </p>

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

export default AutomateAPI;

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