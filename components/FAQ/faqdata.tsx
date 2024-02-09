import { FAQItem } from "@/types/faqitem";

export const faqs: FAQItem[] = [{
    id:0,
    question:"How can DataVids help me?",
    answer:(
        <span>If you run a content based website (a blog, a site that does product reviews, a site that creates content) you can use DataVids to quickly turn that content into videos for sites like Tik Tok, Instagram and YouTube with NO coding and NO video editing.</span>
    )
},
{
    id:1,
    question:"How fast can I create a video?",
    answer:(
        <span>Very Fast.  The point of DataVids is to produce content fast and easy with some minimal effort so we require very little get a basic video out.</span>
    )
}
,
{
    id:2,
    question:"Can I customize the videos at all?",
    answer:(
        <span>Yes we provide the ability for you to customize some aspects of the video like voiceovers, colors, fonts, etc.  That said we are NOT a full video editor.</span>
    )
},
{
    id:3,
    question:"Who is DataVids NOT for?",
    answer:(
        <span>We want to be honest with you, we are NOT for someone who wants total control of their videos to do professional video editing.  Rather we focus on those who have a lot of content and want to create videos fast and easy.</span>
    )
},
{
    id:4,
    question:"I have ideas to make this better who can I contact?",
    answer:(
        <span>Use our <a className="underline" href="/contact">contact page</a> for contact methods or reach us on <a className="underline" href="https://twitter.com/APSquaredDev">Twitter</a></span>
    )
}

]