import { getServerSession } from 'next-auth'
import MyAccountPage from './myaccount'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { addProduct, getProducts, getCreditHistoryForUser, getUserCreditBalance } from '@/dbutil/ledgerdb'
import { stripe } from '@/utils/stripe'
import { Product } from '@/types/product'
import { getUserDetails } from '@/dbutil/userdb'


const MyWallet = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {
    
    const session = await getServerSession( authOptions);

    if (!session || !session.user){
        redirect('/signin');
        return;
    }
    
  
    let userDetails=await getUserDetails(session.user.id);
    const userid = session.user.id;
    //const results = await getUserVideoRequests(userid);
    const results = await getCreditHistoryForUser(userid);
   
    return (
      
        <MyAccountPage userDetails={userDetails!} transactionList={results} />
     
    )
    
}

export default MyWallet