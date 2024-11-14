import React from 'react';
import { formatDate } from '@/utils/format-date';
import { allSlugs, formatSlug, getPostBySlug } from '@/utils/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface BlogProps {
  params: {
    slug: string;
  };
}
async function page({ params }: BlogProps) {
  const post = await getPostBySlug(params.slug);
  const { title, date } = post.frontMatter;
  
  return (
    <div>
      <h1 className="font-bold text-6xl mb-2">{title}</h1>
      <time dateTime={date} className="text-lg font-medium">
        {formatDate(date)}
      </time>
      <MDXRemote source={post.source} />
    </div>
  )
}

export default page;

export async function generateStaticParams() {
  return allSlugs.map((slug) => ({
    slug: formatSlug(slug),
  }));
}