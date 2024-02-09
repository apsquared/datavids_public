import Link from 'next/link';
import React from 'react';



const OutOfCreditsAlert = ({onClose}:{onClose:()=>void}) => {


    return (
        <div className="loading-overlay">
        <div className="spinner text-3xl p-16 w-1/2 bg-white rounded-md ">
            <div className='flex flex-row'>
            
            <div className='ml-4 animate-pulse'>Out of Credits!</div>
            </div>
            <div className='text-lg text-gray-600'  >Shorten your video or buy more credits</div>
            <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onClose()}
                    
                  >
                        Edit Video           
                </button>
                <Link href="/buycredits">
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    
                  >
                        Buy More           
                </button>
                </Link>
            </div>
          
      </div>
    )
}



export default OutOfCreditsAlert;