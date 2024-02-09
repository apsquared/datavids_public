import { HowToItem } from "@/types/howto";

const SingleHowto = ({ howto }: { howto: HowToItem }) => {
  const { icon, title, paragraph } = howto;
  return (
    <div className="w-full bg-primary/[.03] rounded-lg p-2">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="grid grid-cols-5 gap-x-2 items-center mb-5">
          <div className="flex h-[60px] w-[60px] lg:h-[70px] lg:w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary mr-2">
            {icon}
          </div>
          <h3 className=" col-span-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            {title}
          </h3>
        </div>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleHowto;
