
import { formatDate } from "@/utils/format-date";
import { allSlugs, formatSlug, getAllPosts, getPostBySlug } from "@/utils/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatRevalidate } from "next/dist/server/lib/revalidate";
import { notFound } from "next/navigation";

interface BlogProps {
  params: {
    slug: string;
  };
}

export default async function Blog({ params }: BlogProps) {
  return (
    <div>
      
    </div>
  );
}

export async function generateStaticParams() {
  const paths = allSlugs.map((slug) => ({
    slug: formatSlug(slug),
  }));

  return paths;
}