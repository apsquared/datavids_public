import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { getAllVideoRequests, getUserVideoRequests } from '@/dbutil/videoreqdb';
import RequestTable from './requesttable';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getUserDetails } from '@/dbutil/userdb';
import { revalidatePath } from "next/cache"


const ViewMyRequests = async() => {
    
    const session = await getServerSession( authOptions);

    if (!session || !session.user){
        return redirect('/signin');
    }


    const userid = session.user.id;

    const userdetails = await getUserDetails(userid);

    const results = await getUserVideoRequests(userid);    

    return (
        <> 
      <Breadcrumb
        pageName="View Requests"
        description=""
      />
        <div className="container">
          <div className="w-full py-4 px-8">
            <RequestTable results={results} userDetails={userdetails}/>
          </div>
        </div>
        </>
    )
}

export default ViewMyRequests