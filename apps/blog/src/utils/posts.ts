import path from "path";
import fs from "fs";
import matter from "gray-matter";

interface FrontMatter {
  title: string;
  date: string;
  slug: string;
  [key: string]: any;
}

interface Post extends FrontMatter {
  content: string;
}


const ROOT_DIR = process.cwd();
const POSTS_PATH = path.join(ROOT_DIR, "content");
export const allSlugs = fs.readdirSync(POSTS_PATH);
export const formatSlug = (slug: string): string => slug.replace(/\.mdx$/, "");

const readFileSync = (filePath: string): string => fs.readFileSync(filePath, "utf-8");
const getAllSlugs = (): string[] => fs.readdirSync(POSTS_PATH);
const dateSortDesc = (a: string, b: string): number => (a > b ? -1 : a < b ? 1 : 0);

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = readFileSync(filePath);
  const { content, data } = matter(fileContents);

  return {
    content,
    ...data,
  } as Post;
};

export const getAllPosts = (): FrontMatter[] => {
  const slugs = getAllSlugs();
  const posts = slugs.map((slug) => {
    const source = readFileSync(path.join(POSTS_PATH, slug));
    const { data } = matter(source);

    return {
      ...data,
      slug: formatSlug(slug),
      title: data.title,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    };
  });

  return posts.sort((a, b) => dateSortDesc(a.date, b.date));
};
