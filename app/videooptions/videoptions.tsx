"use client"
import Breadcrumb from "@/components/Common/Breadcrumb";

import CreateVideoOptions from '@/components/CreateVideoOptions';

const VideoOptionsPage = ()  => {
      return (
       <>
      <Breadcrumb
      pageName="Create a Video"
      description=""
    />

<CreateVideoOptions/>
  </>
    )
}

export default VideoOptionsPage