"use client"
import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { useState,useEffect, useContext } from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DataContext } from '@/components/DataProvider';

import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';


const Return = ({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  let stripesessionid: string;
  const router = useRouter();
  const{userCredits,updateCreditsContext} = useContext(DataContext);
  if (searchParams && searchParams['session_id']){
    stripesessionid = searchParams['session_id'] as string;
}

const updateCredits = async ()=>{
  await updateCreditsContext();
}
const gotoWallet = async () =>{
  //await updateCreditsContext();
  router.push('/my-account');
}
    useEffect(() => {
    
      fetch("/api/stripe/checkout_sessions?session_id="+stripesessionid, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((data) => {  setStatus(data.status);
        setCustomerEmail(data.customer_email);
        updateCredits();});
        }, []);
  
        if (status === 'open') {
          return (
            redirect('/checkout')
          )
        }


        if (status === 'complete') {
        
          return (
            <>
            <Breadcrumb
            pageName=""
            description=""
          />
            <div className="flex justify-center max-w-lg flex-col mx-auto bg-white border border-blue-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   
    <div className="flex flex-col justify-center items-center pb-10">
    <Image width={150} height={150} src="/images/token.png" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Thank You!</h5>
      
            <section className="p-5" id="success">
              <p>
                We appreciate your business! A confirmation email will be sent to {customerEmail}.
      
                Your credit balance should be updated shortly.<br></br>
             
              </p>
              
            </section>
            <button className="justify-center m-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3" onClick={(e)=>gotoWallet()}>Go To Your Account </button>
           


            </div>
            </div>
            </>
          )
        }
      
        return null;
}

export default Return