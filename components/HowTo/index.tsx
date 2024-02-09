import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import Video from "../Video";
import SingleHowto from "./SingleHowto";
import howtoData from "./howtoData";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const List = ({ text }:{text:string}) => (
  <p className="mb-5 flex items-center text-lg font-medium text-body-color">
    <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
      {checkIcon}
    </span>
    {text}
  </p>
);

const HowTo = () => {
  return (
    <>
      <section
        id="features"
        className=" py-8 md:py-8 lg:py-10"
      >
        <div className="container">
          <SectionTitle
            title="How It Works"
            paragraph="Simple Ways to Create Viral Videos Fast. Choose which works best for you."
            center
            mb="60px"
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-2 ">
            {howtoData.map((howto) => (
              <SingleHowto key={howto.id} howto={howto} />
            ))}
          </div>

          <div className="mt-10 border-t-2 pt-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl lg:text-4xl mb-5 font-bold">Our Video Wizard</h2>
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/2">
                    <List text="Simple yet Powerful" />
                    <List text="Customize(if you want to)" />
                    <List text="Cut and Paste Your Data" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-1/2 xl:w-1/2">
                    <List text="Add Voiceovers" />
                    <List text="Add Images" />
                    <List text="Go Viral!" />
                  </div>
                </div>
              </div>
              <div>
                <Video videourl="https://datavidsio.s3.amazonaws.com/vids/DataVid1_music.mp4" introimage="/images/WizardVideo_Image.jpg"/>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t-2 pt-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl lg:text-4xl mb-5 font-bold">AI: URL to Video</h2>
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Paste a URL" />
                    <List text="Uses MetaTags and Page Content" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Tweak as Needed" />
                    <List text="Let AI Do The Work" />
                  </div>
                </div>
              </div>
              <div>
                <Video videourl="https://datavidsio.s3.amazonaws.com/vids/DataVids-AI_music.mp4" introimage="/images/AIVideo_Image.jpg"/>
              </div>
            </div>
          </div>
{/* 
          <div className="mt-10 border-t-2 pt-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl lg:text-4xl mb-5 font-bold">APIs to Automate Videos</h2>
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Programatically Create Videos" />
                    <List text="Well defined JSON for videos" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Send full video defintion or use a template" />
                    <List text="Call from command line or code" />
                  </div>
                </div>
              </div>
              <div>
                <Video videourl="/video/DataVids-API.mp4" introimage="/images/AIAPIIntro.png"/>
              </div>
            </div>
          </div>
*/}
          <div className="mt-10 border-t-2 pt-8 justify-center items-center">
             <div className="justify-center items-center flex">
                <h2 className="text-2xl lg:text-4xl mb-5 font-bold">Why Wait? Get Started Today</h2><br></br>
              </div>
                <div className="justify-center items-center flex">
                <Link
                    href="/signin"
                    className="rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                   🔥 Sign Up for free
                  </Link>
                </div>
            
          </div>

        </div>
      </section>
    </>
  );
};

export default HowTo;
