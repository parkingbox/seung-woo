

import Header from "@/components/Header";
import Intro from "@/components/Intro";
import { formatDate } from "@/utils/format-date";
import { getAllPosts } from "@/utils/posts";

export default async function Home() {
  const allPost = await getAllPosts()

  return (
    <div>
      <Header />
      <Intro/>
      <hr className="my-8" />
      {allPost.map((item) => {
        return (
          <div key={item.slug}>
            <h1>{item.title}</h1>
            <time className="text-lg font-medium">
              {formatDate(item.date)}
            </time>
            <summary>{item.summary}</summary>
          </div>
        )
      })}
    </div>
  );
}
