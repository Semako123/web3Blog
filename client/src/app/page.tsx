import ConnectWalletButton from "@/components/ConnectWalletButton";
import Link from "next/link";

export default function Home() {

  return (
    <div className="w-full">
      <h1>
        Hey, this is the home page of the blog app. You can create a blog post
        by going to the <Link href="/create" className="text-blue-300">create</Link> page.
      </h1>
      <ConnectWalletButton/>
    </div>
  );
}
