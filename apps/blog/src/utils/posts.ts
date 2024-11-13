import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface FrontMatter {
  title: string;
  date: string;
  slug: string;
  [key: string]: any;
}

const root: string = process.cwd();
const POSTS_PATH: string = path.join(root, "content");

export const allSlugs: string[] = fs.readdirSync(POSTS_PATH);

export const formatSlug = (slug: string): string => slug.replace(/\.mdx$/, "");

export const getPostBySlug = async (slug: string): Promise<{
  source: MDXRemoteSerializeResult;
  frontMatter: Record<string, any>;
}> => {
  const postFilePath: string = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath, "utf-8");

  const { content, data } = matter(source);

  const mdxSource = await serialize(content);

  const frontMatter = {
    ...data,
    slug,
  };
  return {
    source: mdxSource,
    frontMatter,
  };
};

export const getAllPosts = (): Array<FrontMatter> => {
  const frontMatter: Array<{ slug: string; title: string; date: string;[key: string]: any }> = [];

  allSlugs.forEach((slug) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, slug), "utf-8");

    const { data } = matter(source);

    const title = data.title;
    const date = data.date ? new Date(data.date).toISOString() : new Date().toISOString();

    frontMatter.push({
      ...data,
      slug: formatSlug(slug),
      title,
      date,
    });
  });

  return frontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
};


const dateSortDesc = (a: string, b: string): number => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};
