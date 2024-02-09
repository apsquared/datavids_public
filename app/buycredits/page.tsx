import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { getProducts } from '@/dbutil/ledgerdb';
import DisplayProducts from './displayproducts';
import Breadcrumb from '@/components/Common/Breadcrumb';

const DisplayProducts2 = async() => {
  let priceid: string="";
  let productlist=await getProducts();
  console.log("returned this many products : "+productlist.length);
return(
  <>
  <Breadcrumb
  pageName="Add Credits"
  description=""
/>
      <div className='text-2xl my-4'>Sorry we are no longer operating on credits.  If you are interested in DataVids please reach out to me on <a className='underline'  href="https://twitter.com/APSquaredDev">Twitter</a></div>
      </>
    )
  
    
}

export default DisplayProducts2