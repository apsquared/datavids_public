import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import SectionTitle from "../Common/SectionTitle"
import { faqs } from "./faqdata"

const FAQ = () => {
    return (
        <>
      <section
        id="faq"
        className="relative z-10 overflow-hidden pt-[10px] pb-16 md:pt-[10px] md:pb-[30px] xl:pt-[10px] xl:pb-[30px]"
      >
       <div className="container text-body-color">
       <SectionTitle
            title="Frequently Asked Questions"
            paragraph=""
            center
            mb="30px"
          />
            {faqs.map((faq) => (
            <Collapsible className="space-y-2" defaultOpen key={faq.id}>
            <div className="flex items-center justify-between space-x-4 px-4">
              <div className="flex items-center space-x-2">
                <svg
                  className=" h-5 w-5"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" />
                  <path d="M12 17h.01" />
                </svg>
                <h4 className="text-lg font-semibold">{faq.question}</h4>
              </div>
              <CollapsibleTrigger asChild>
                <Button size="sm" variant="ghost">
                  ^
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="px-4 py-2">
              <p className="text-base">
                {faq.answer}
              </p>
            </CollapsibleContent>
          </Collapsible>
            ))}
          </div>
          </section>
        </>
    )
}

export default FAQ