"use client"
import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { useState,useEffect } from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRouter } from "next/navigation";

import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import BreadcrumbCustom from '@/components/Common/BreadcrumbCustom';


 const CheckoutPage = ({priceid}:{priceid:string}) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const [clientSecret, setClientSecret] = useState('');
  const router = useRouter();


    useEffect(() => {
      fetch("/api/stripe/checkout_sessions", {
        method: "POST",
        body:JSON.stringify({priceid:priceid})
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  

    const gotoWallet = () =>{
      console.log("goto wallet");
      router.push('/my-account');

    }
   

    return (
       <>
      <BreadcrumbCustom
      pageName="Checkout"
      description=""
      parentPageLink='/checkout'
      parentPageName='Buy More'
    />
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}



  
  </>
    )
}

export default CheckoutPage