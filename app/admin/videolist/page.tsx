import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import Breadcrumb from '@/components/Common/Breadcrumb';
import { Input } from "@/components/mtexport";
import VidList from './vidlist';
import { getRequestCountByStatus, getVideoRequestsByStatusNotUs } from '@/dbutil/videoreqdb';



const AdminP = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {
    
    const session = await getServerSession( authOptions);

    if (!session || !session.user || session.user.role!="ADMIN"){
        redirect('/signin');
        return;
    }
    let status;
    if (searchParams && searchParams['status']){
        status = searchParams['status'] as string;
    }
   let videoList=await getVideoRequestsByStatusNotUs(+status!);
    
    return (
        <> 
        <Breadcrumb
          pageName="View Requests"
          description=""
        />
          <div className="container">
            <div className="w-full py-4 px-8">
            <VidList vidList={videoList}/>     
            </div>
          </div>
          </>
       
    )
}

export default AdminP