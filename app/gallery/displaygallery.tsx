"use client"
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRouter } from "next/navigation";
import { Gallery } from '@/types/gallery';
import SectionTitle from '@/components/Common/SectionTitle';
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Video from "@/components/Video";

 const DisplayGalleryPage = ({results}:{results:Gallery[]}) => {

    return (
       <>
      <Breadcrumb
      pageName="Gallery"
      description=""
    />
    <div className="container">
      <h1 className="text-3xl text-bold">Gallery of videos created with DataVids.</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 mt-5 mb-5">
     { results?.map((p:Gallery , index:number) => 
    (
      
      <Card key={index} className="relative overflow-hidden rounded-lg shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl">{p.name}</h3>
          
        </div>
      </CardHeader>
      <CardContent>
      <div className="pr-8 pl-8">
      <video controls>
        <source src={p.url} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      </div>
        <p className="mt-4">
          {p.description}
        </p>
        { p.link && (
        <Link className="mt-4 inline-flex items-center" href={p.link}>
          <p className="mr-2 underline">Visit Original Link</p>
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
        )}
      </CardContent>
    </Card>
    
    ))}
    
    </div>
    </div>
  </>
    )
}

export default DisplayGalleryPage