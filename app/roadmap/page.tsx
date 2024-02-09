/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KMjEbEFBIAv
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";

const items = [
    {
        title: 'More voices and fonts.',
        description: 'Spice up your videos with different voices and fonts.  Our AI will even find the right voice and font for your content.',
        badge: 'In-Progress',
    },
    {
        title: 'Wide Format Videos',
        description: 'Generate wide format videos that are better for sharing on sites like LinkedIn and Twitter.',
        badge: 'Coming Soon',
    }, {
        title: 'Use Stock Videos and Images',
        description: 'Choose from an endless supply of stock videos and images to enhance your videos.',
        badge: 'Coming Soon',
    },
    {
      title: 'Full API Support',
      description: 'Like programming? We have you covered with a full API for generating videos.',
      badge: 'Coming Soon',
    },
]


function Roadmap() {
  return (
    <main className="flex flex-col gap-8 p-8 bg-gradient-to-b from-gray-100 to-gray-300 mt-4 mb-4 rounded-lg"> 
      <header className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold text-primary">DataVids Product Roadmap</h1>
        <p className="text-lg text-gray-700">
          See the upcoming features we are adding to DataVids to make your video creation faster and easier.
        </p>
      </header>
      <section className="flex flex-col gap-8">
        { items.map((item,index) => {
         return (
        <Card key={index} className={`bg-gradient-to-b from-sky-200 to-sky-50 border-blue-500 border-2`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={`text-2xl font-bold text-primary`}>{item.title}</CardTitle>
              <Badge className={`text-sm font-medium bg-green-500 text-white`}>{item.badge}</Badge>
            </div>
          </CardHeader>
          <CardContent>  
            <p className="text-gray-700">
             {item.description}
            </p>
       
          </CardContent>
        </Card>
        )})
         }

      </section>
    </main>
  )
}

const mTitle = "Roadmap for DataVids - Create Videos From Content, Fast.";
const mDesc = "See the public roadmap for DataVids and learn about upcoming features.";
const mCan = '/'
const img='/images/og.png' //need to update this

const RoadmapPage = async() => {

  
    return (
        <>
        <Breadcrumb
        pageName="Gallery"
        description=""
        />
      <div className="container">
      <Roadmap/>
      </div>
      </>
    );
  };
  
  export default RoadmapPage;
  
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