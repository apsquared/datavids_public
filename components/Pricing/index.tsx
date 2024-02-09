"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-10 lg:py-12">
      <div className="container">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="Pay as you use - No Subscriptions."
          center
          width="665px"
          mb="20px"
        />

        <div className="flex mx-auto  items-center max-w-lg ">
          <PricingBox
            packageName="Pay As You Go"
            price={isMonthly ? "0" : "0"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Credits starting as low as $0.125 per Credit"
          >
            <OfferList text="5 Free Credits to Start" status="active" />
            <OfferList text="1 Credit per 10 sec of Render" status="active" />
            <OfferList text="1 Credit per AI URL to Video" status="active" />
            <OfferList text="Add More Credits as you go" status="active" />

          </PricingBox>

         
         
         </div>
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28"></div>
      </div>

      <div className="absolute left-0 bottom-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
       </div>
    </section>

  );
};

export default Pricing;
