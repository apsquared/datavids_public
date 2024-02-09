import Breadcrumb from '@/components/Common/Breadcrumb'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <>
    
    <Breadcrumb
        pageName="Not Found"
        description=""
      />
    <div className='container pt-8 mb-8'>
      <h2 className='text-3xl'>Not Found</h2>
      <p className='text-xl'>We can&apos;t seem to find what you are looking for.</p>
      <Link className='underline mt-8 text-xl' href="/">Return Home</Link> 
    </div>
    </>
  )
}