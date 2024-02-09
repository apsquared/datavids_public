import getConfig from "next/config";
import Script from "next/script";

export default function Head() {

  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/images/favicon.ico" />
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-FLTZD2Z27Q"/>
      <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-FLTZD2Z27Q',{
                page_path: window.location.pathname,
           });`,

        }}
      />
    </>
  );
}
