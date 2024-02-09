import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { getProducts } from '@/dbutil/ledgerdb';
import CheckoutPage from './checkout';
import { redirect } from 'next/navigation'

const Checkout = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {
  let priceid: string="";
  let productlist=await getProducts();

  if (searchParams && searchParams['priceid']){
    priceid = searchParams['priceid'] as string;
}

  if(priceid!="")
  {
    return (<>
       <CheckoutPage priceid={priceid}/>
       </>
    )
  }else{
    redirect('/buycredits');

  }
    
}

export default Checkout