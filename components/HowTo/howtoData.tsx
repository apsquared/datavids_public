import { HowToItem } from "@/types/howto";

const howToData: HowToItem[] = [
  {
    id: 1,
    icon: (
        <span className="text-2xl lg:text-3xl font-bold">1</span>
    ),
    title: "Video Wizard",
    paragraph:
      "Use our simple scene editor and enter your data to quickly generate a video with control text, colors and voiceovers",
  },
  {
    id: 2,
    icon: (
        <span className="text-2xl lg:text-3xl font-bold">2</span>
    ),
    title: "AI: URL to Video",
    paragraph:
      "Just give us your URL and we will generate a video for you. It will feel like magic.  Don't worry you still can edit it after.",
  },/*
  {
    id: 3,
    icon: (
      <span className="text-2xl lg:text-3xl font-bold">3</span>
    ),
    title: "APIs for Automation",
    paragraph:
      "Want to programatically create videos? Our APIs are the answer.",
  },*/

];
export default howToData;
