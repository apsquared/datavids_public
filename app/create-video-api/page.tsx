import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { getUserCreditBalance } from '@/dbutil/ledgerdb';
import Breadcrumb from '@/components/Common/Breadcrumb';



const CreateVideoPage = async() => {
    
    const session = await getServerSession( authOptions);
  
    if (!session || !session.user){
        redirect('/signin');
        return;
    }
    const userCredits = await getUserCreditBalance(session?.user?.id);
    return (
        <>
          <Breadcrumb
        pageName="Create Video By URL"
        description=""
        />
          <h2 className="font-xl mt-8 mb-5 font-bold leading-tight text-black sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
    API Details
  </h2>
  <p className="mb-5 text-base  leading-relaxed  sm:leading-relaxed lg:text-base lg:leading-relaxed  xl:leading-relaxed">
    Coming Soon.
  </p>
        </>
    )


}

export default CreateVideoPage