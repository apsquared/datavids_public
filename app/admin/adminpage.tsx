"use client"
import Breadcrumb from '@/components/Common/Breadcrumb';
import { Input } from "@/components/mtexport";
import { useState , useContext} from 'react';
import { DataContext } from '@/components/DataProvider';
import { GenericCount } from '@/dbutil/videoreqdb';
import { array } from 'zod';
import { VideoStatus, getVideoStatusLabel } from '@/types/uservideoreq';



const AdminPage = ({myuserid,vidcounts}:{myuserid:string,vidcounts:GenericCount[]}) => {
    
    const [userId,setUserId] = useState(myuserid);
    const [credits,setCredits] = useState("");

    const{userCredits,updateCreditsContext} = useContext(DataContext);

    const grantCredits = () =>{
      
        fetch("/api/grant_credits", {
          method: "POST",
          body:JSON.stringify({userid:userId,credits:+credits as number})
        })
          .then((res) => res.json())
          .then((data) => updateCreditsContext());
  
      }
 
    
    return (
      
        
        <> 
        <Breadcrumb
        pageName="Admin"
        description=""
      />

<div className='container py-10 my-10 '>
            <div className='flex'>
                <div className='w-3/4 mr-10'>
                    <h1 className="text-3xl text-primary font-bold">Grant Credits to User</h1>
                    <p className="mb-5 mt-3">Enter an userid (Defaults to your id)</p>
                  
                    <div className="flex flex-col items-end">
                        <Input className="w-full mr-5 mb-5" color="blue" required name="userid" value={userId} onChange={(e)=>setUserId(e.target.value)} 
                                label="Enter User ID" crossOrigin={undefined} />
                    </div>
                    <p className="mb-5 mt-3">Enter a credit amount</p>
                    <div className="flex flex-col items-end">
                        <Input className="w-full mr-5 mb-5" color="blue" required name="credits" value={credits} onChange={(e)=>setCredits(e.target.value)} 
                                label="Enter Credits" crossOrigin={undefined} />
                    </div>
                    <button className="m-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3" onClick={(e)=>grantCredits()} >
                        Grant Credits 
                    </button>

                </div>
            </div>
            <div>
            <h2 className='mt-4 text-2xl'>Video Counts</h2>
            { vidcounts.map((e,index) => {
                return (
                    <div key={index}><a href={'/admin/videolist?status='+e._id}>{getVideoStatusLabel(e._id)}- {e.count}</a></div>
                )
            })
            }

            </div>
</div>
        </>
     
    )
}

export default AdminPage