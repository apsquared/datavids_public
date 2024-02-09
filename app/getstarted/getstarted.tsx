"use client"
import { useState,useEffect,useContext} from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRouter } from "next/navigation";

import { UserDetails } from '@/types/userdetails';

import CreateVideoOptions from '@/components/CreateVideoOptions';

const WelcomePage = ()  => {
      return (
       <>
      <Breadcrumb
      pageName="Welcome"
      description=""
    />

<CreateVideoOptions/>
  </>
    )
}

export default WelcomePage