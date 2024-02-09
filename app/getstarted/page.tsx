import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { addProduct, getProducts, getCreditHistoryForUser, getUserCreditBalance } from '@/dbutil/ledgerdb'
import { stripe } from '@/utils/stripe'
import { Product } from '@/types/product'
import { getUserDetails } from '@/dbutil/userdb'
import WelcomePage from './getstarted'
import { getUserVideoRequests } from '@/dbutil/videoreqdb'


const GetStarted = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {
    
    const session = await getServerSession( authOptions);

    if (!session || !session.user){
        redirect('/signin');
        return;
    }
    
  
    let userDetails=await getUserDetails(session.user.id);
    const userid = session.user.id;
    //const results = await getUserVideoRequests(userid);
    const results = await getUserVideoRequests(userid);    
    if(results.length==0)
    {
        return(
         <WelcomePage/>
        )
    }else{
      redirect("/view-my-requests");
    }
}

export default GetStarted