import Image from "next/image";
import blogImage from "@/assets/cardImage.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const BlogCard = () => {
  return (
    <div className="w-[300px]">
      <Image
        alt="blog image"
        src={blogImage}
        className="h-[200px] object-cover rounded-xl"
      />
      <p className="text-muted-foreground text-xs mt-3">30 Jan 2024</p>
      <h3 className="text-lg font-medium ">
        Unveiling the power of the blockchain in Neospace
      </h3>
      <p className="text-xs mt-2 text-muted-foreground">
        Dive into justifcation or use cases of web3 and cryptocurrency on the
        Ethereum and its application in Neospace engineering
      </p>
      <div className="flex gap-x-2 mb-2 items-center mt-3">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="w-6"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">Zosu Semako</p>
      </div>
    </div>
  );
};

export default BlogCard;
