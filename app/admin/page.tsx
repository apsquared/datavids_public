import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import Breadcrumb from '@/components/Common/Breadcrumb';
import { Input } from "@/components/mtexport";
import AdminPage from './adminpage';
import { getRequestCountByStatus,getRequestCountByStatusNotUs } from '@/dbutil/videoreqdb';



const AdminP = async() => {
    
    const session = await getServerSession( authOptions);

    if (!session || !session.user || session.user.role!="ADMIN"){
        redirect('/signin');
        return;
    }
    
    const counts = await getRequestCountByStatusNotUs();
    
    return (
      
        <AdminPage myuserid={session.user?.id} vidcounts={counts}/>     
    )
}

export default AdminP