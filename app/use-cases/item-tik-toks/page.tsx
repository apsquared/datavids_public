
import TextHighlight from "@/components/Common/TextHighlight";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const mTitle = "Create Viral TikToks From Your Content";
const mDesc = "Learn how to use DataVids to generate viral TikTok videos from your existing content quickly and easily.";
const mCan = "/use-cases/item-tik-toks"
const img="/images/main.png" //need to update this

const ItemTikTok = () => {
return (
<>
<div className="text-dark font-medium">
  <h1 className="mb-4 text-3xl  leading-tight sm:text-4xl sm:leading-tight">
    Turn Your Content Pages Into Tik Tok Videos
  </h1>
  <div className="mb-5 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-2 dark:border-white dark:border-opacity-10">

  </div>
  <div>
  <p className="mb-10 text-base leading-relaxed sm:leading-relaxed  lg:leading-relaxed xl:leading-relaxed">
    Does your website have pages for different types of content? Recipes, Products, Reviews, Restaurants, etc?  DataVids makes it easy to generate a video for each item allowing you to spotlight that item.
    <strong> It will take just seconds of your effort and a few minutes to render.</strong>
  </p>

  <p className="mb-2 text-base leading-relaxed  sm:leading-relaxed  lg:leading-relaxed xl:leading-relaxed">
    The simplest way to get started is to select our Items tempate which requires the following:
  </p>
    <ul className="my-3 list-inside list-disc">
      <li>An Item Image</li>
      <li>An Item Title</li>
    </ul>
   <p>In addition you can add additional content with:</p>
    <ul className="my-3 list-inside list-disc">
      <li>An Item Subtitle</li>
      <li>Up to 3 different images</li>
      <li>A call to action pharse</li>
    </ul>
    <p>
    Of course in addition to this you will be able to control multiple effects, colors and voice over prompts, all with no editing and no code.
    We also provide tools to extract content from your page&apos;s meta tags (if you want).
  </p>
  <Image className="mx-auto" src="/images/DataVids1_wide.png" height={100} width={600} alt="turn website content into video"/>

  <h2 className="font-xl mt-8 mb-5 font-bold leading-tight text-black sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
    Tips for Going Viral with Your Tik Tok Video
  </h2>
  <p className="mb-5 text-base  leading-relaxed  sm:leading-relaxed lg:text-base lg:leading-relaxed  xl:leading-relaxed">
    Here are a few tips to go Viral on TikTok usign DataVids:
  </p>
  <ul className="mb-10 list-inside list-decimal">
    <li className="mb-2 text-base flex items-baseline ">
      <span className="mr-2">1.</span>
      <span className="flex-1">
      High quality images help draw in users.  Make the image visually interesting and the right size for Tik Toks vertical usage.
      </span>
    </li>
    <li className="mb-2 text-base flex items-baseline">
    <span className="mr-2">2.</span>
      <span className="flex-1">Say something catchy in the first 5 seconds.  Make it controversial, intriguing or funny.  
        Just think about whether the first 5 seconds will capture someone.
        </span>
    </li>
    <li className="mb-2 text-base flex items-baseline">
    <span className="mr-2">3.</span>
    <span className="flex-1">Ask a question to increase comment.</span>
    </li>
    <li className="mb-2 text-base flex items-baseline">
      <span className="mr-2">4.</span>
      <span className="flex-1"> Keep the video short and moving fast.</span>
    </li>
  </ul>
 <TextHighlight text="Did You Know You Can Automate The Creations of Your Videos with Our API?"/>
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

export default ItemTikTok;

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