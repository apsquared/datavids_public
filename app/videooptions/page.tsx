import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { addProduct, getProducts, getCreditHistoryForUser, getUserCreditBalance } from '@/dbutil/ledgerdb'
import { stripe } from '@/utils/stripe'
import { Product } from '@/types/product'
import { getUserDetails } from '@/dbutil/userdb'
import VideoOptionsPage from './videoptions'
import { getUserVideoRequests } from '@/dbutil/videoreqdb'


const VidOptions = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {
    
    const session = await getServerSession( authOptions);

    if (!session || !session.user){
        redirect('/signin');
        return;
    }
    return(
         <VideoOptionsPage/>
    )
}

export default VidOptions