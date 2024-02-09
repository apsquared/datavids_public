"use client"
import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { useState,useEffect } from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRouter } from "next/navigation";
import { Product } from '@/types/product';
import PricingBox from './PricingBox';
import OfferList from './OfferList';
import SectionTitle from '@/components/Common/SectionTitle';

 const DisplayProducts = ({productsList}:{productsList:Product[]}) => {
  const router = useRouter();
  const buyItem = (priceid: string) =>{
    console.log("clicked for "+priceid);
    router.push('/checkout?priceid='+priceid);
  }

    return (
       <>
      <Breadcrumb
      pageName="Add Credits"
      description=""
    />
    <div className="container">
     <div className="grid grid-cols-1 md:grid-cols-2 mx-auto justify-center items-center">
     { productsList?.map((p:Product , index:number) => 
    (<div key={p.stripeid}>
        
        <section id={p.stripeid} className="relative z-10 py-16 md:py-10 lg:py-12">
    
        <SectionTitle
          title={p.name}
          paragraph={p.desc}
          center
          width="665px"
          mb="20px"
        />

        <div className="flex mx-auto  items-center max-w-lg m-2">
          <PricingBox
            packageName={""+p.credits}
            price={""+p.cost/100}
            percredit={(p.cost/100)/p.credits}
            subtitle=" No Subscription Necessary"
            stripeid={""+p.stripeid}
          >
            
            <OfferList text="1 Credit per 10 sec of Render" status="active" />
            <OfferList text="1 Credit per AI URL to Video" status="active" />
            
          </PricingBox>

         
         
         </div>
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28"></div>
      

      
    </section>
        
    </div>
    
    ))}
    { productsList==null && (
        <>Loading Products...</>
    )}
    </div>
    </div>
  </>
    )
}

export default DisplayProducts