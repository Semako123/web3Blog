import Image from "next/image";
import landing from "@/assets/landing.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const LandingHero = () => {
  return (
    <div className="p-10 py-20 h-[600px] my-10 relative overflow-hidden rounded-xl flex">
      <Image
        src={landing}
        alt="Just here for now"
        className="object-cover absolute -z-10 filter blur-xs brightness-75"
        fill
      />
      <div className="flex flex-1 justify-between self-end">
        <div className="">
          <h2 className="font-bold text-4xl mb-6">
            Exploring the Wonders of Streaming
          </h2>
          <p className="w-[550px] text-balance">
            An introduction to the new phase in business, marketing, sales and
            social retention in the 21st century
          </p>
        </div>
        <div>
          <div className="flex gap-x-2 mb-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h4 className="text-xl font-medium">Zosu Semako</h4>
          </div>
          <p>24 Jan 2014</p>
          <p>Explore {">>>"}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
