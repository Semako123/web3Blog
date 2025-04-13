import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <h1>
        Hey, this is the home page of the blog app. You can create a blog post
        by going to the <Link href="/create">create</Link> page.
      </h1>
    </div>
  );
}
