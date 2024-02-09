"use client"

import { useState,useEffect,useContext} from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react" 

import { loadStripe } from '@stripe/stripe-js';
import { Ledger } from '@/types/ledger';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon, UserPlusIcon,ArrowPathIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
 
} from "@/components/mtexport";

import { UserDetails } from '@/types/userdetails';
import {DataContext} from '@/components/DataProvider';


const MyAccountPage = ({userDetails,transactionList}:{userDetails:UserDetails,transactionList:Ledger[]})  => {
  const [showHistory,setShowHistory] = useState(false);
  const router = useRouter();
  const TABLE_HEAD = ["Amount", "Note","Type", "Date"];
  const [transList,setTransList] = useState<Ledger[]>(transactionList);
  const{userCredits,updateCreditsContext} = useContext(DataContext);

   useEffect(() => {
  
   
  }, []);

  const { data: session,status } = useSession();

  const createVideo = () => {
    window.location.href = '/videooptions';
};

const gotoBuy = () => {
    window.location.href = '/buycredits';
};
const viewVideos = () => {
    window.location.href = '/view-my-requests';
};
    const updateTotal = () =>{

        updateCreditsContext();

    }


    return (
       <>
      <Breadcrumb
      pageName="Account Home"
      description=""
    />

<div className="container">
    <div className="flex flex-col items-center justify-center">

                                    
        <h5 className=" text-3xl font-medium text-gray-900 dark:text-white">Account </h5>
        <div className="flex ">
            <Button className="m-3 flex items-center gap-3" color="blue" size="sm" onClick={createVideo}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create New Video
                        </Button>
                <Button className="m-3 flex items-center gap-3" color="blue" size="sm" onClick={viewVideos}>
                            <MagnifyingGlassIcon strokeWidth={2} className="h-4 w-4" /> View My Videos
                        </Button>
        </div>
        <div className="grid grid-cols-2 m-5">
        <div className="col-span-2 md:col-span-1 m-5">
                <Card className="w-full justify-center items-center m-5">
                    <CardHeader floated={false} shadow={false} className="rounded-none justify-center items-center">
                    <div className="m-1 pt-3 text-2xl font-medium text-center text-gray-900 dark:text-white"><h2>Details</h2></div>
                    </CardHeader>
                        <div className="grid grid-cols-2 justify-center items-center">
                            <div className="text-left text-base">Name: </div>
                            <div className="text-left text-base"> {session?.user?.name} </div>
                            <div className="text-left text-base">Email: </div>
                            <div className="text-left text-base"> {session?.user?.email} </div>
                            {/*<div className="text-left text-base">API Key: </div>
                            <div className="text-left text-base"> {userDetails.apikey} </div>*/}
                            <Button
                                onClick={() => signOut()}
                                className="m-3 col-span-2 flex mx-auto items-center justify-center" 
                                color="blue" size="sm"
                            >
                                Logout
                            </Button>   
                            
                    </div>
                
                </Card>
            </div>
            <div className="col-span-2 md:col-span-1 m-5">
                <Card className="w-full justify-center items-center m-5">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="m-1 pt-3 text-2xl font-medium text-center text-gray-900 dark:text-white"><h2>Credits<button onClick={(e)=>updateTotal()}><ArrowPathIcon strokeWidth={2} className="h-4 w-4"/></button></h2></div>
                    </CardHeader>
                        <div className="grid grid-cols-2 justify-center items-center">
                            <div className="text-right text-3xl">{userCredits} </div>
                                <div><Image width={50} height={50} src="/images/token.png" alt="Token"/>
                                
                                </div>
                                <div className="justify-left">

                                <Button className="m-3 flex items-center gap-3" color="blue" size="sm" onClick={gotoBuy}>
                                    <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Add Credits
                                </Button>
                            

                                </div>
                                <div className="justify-center items-center text-center col-span-3">
                                    <button onClick={()=>setShowHistory(true)}>View History</button>
                                </div>
                            
                            
                        
                    </div>
                
                </Card>
            </div>
        
        </div>
            

    {/* 
        { products?.map((p:Product , index:number) => 

        (<div key={p.stripeid}>
            <button className="m-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3" onClick={(e)=>buyItem(p.stripeid)} value={p.stripeid} key={p.stripeid}>{p.name} (${p.cost/100}) <br></br>{p.credits} Credits</button>
            </div>
        ))}
        { products==null && (
            <>Loading Products...</>
        )}

    */}   

        {showHistory && (
    <div className="items-center justify-center m-10">
    
                <div className="mb-8 flex items-center justify-center gap-6">
                    <div>
                    <Typography variant="h5" color="blue-gray">
                    Transaction History
                    </Typography>
                    
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

                    </div>
                </div>
            
                <table className="m-5 min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                        <th
                            key={head}
                            className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                        >
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                            {head}{" "}
                            
                            </Typography>
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {transList!.map(({ _id,type,note,createdOn ,amount,subtype}, index) => {
                    
                        const classes =  "p-4 border-b border-blue-gray-50";

                    

                        return (
                        <tr key={_id}>
                            
                            <td className={classes}>
                        {amount}
                            </td>

                            <td className={classes}>
                            <div className="w-max">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {note}
                            </Typography>
                            </div>
                            </td>
                            <td className={classes}>
                            <div className="flex items-center gap-3">
                                
                                <div className="flex flex-col">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {type}
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-70"
                                >
                                    {subtype}
                                </Typography>
                                </div>
                            </div>
                            </td>
                            <td className={classes}>
                            {createdOn ? createdOn.toLocaleString() : ''}
                            </td>
                    

                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            
    </div>
        
    )}
        
        </div>

</div>

  
  </>
    )
}

export default MyAccountPage