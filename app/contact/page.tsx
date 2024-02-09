import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <section className="pt-[150px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
            <h1 className="mb-8 text-3xl font-bold leading-tightsm:text-4xl sm:leading-tight">
              Contact Us
            </h1>
            <p>
              We would love to hear from you.  If you would like to reach out feel free to contact us on 
              {" "}<a href="https://twitter.com/datavidsio" className="underline">Twitter @DataVidsIO</a>.
            </p>
            <p className="mt-2" > Or you can email
              us at datavids AT apsquared DOT co (that co not com!).
            </p>
            </div>
          </div>
      </div>
      </section>
      {/*<Contact />*/}
    </>
  );
};

export default ContactPage;
