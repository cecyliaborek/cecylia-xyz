import type { BlogPost, Category } from './site';
import { getPostUrl } from './site';

export interface ExternalPost {
  kind: 'external';
  title: string;
  href: string;
  date: Date;
  category: Category;
}

export interface LocalPostPreview {
  kind: 'local';
  title: string;
  href: string;
  date: Date;
  category: Category;
}

export type WritingPost = ExternalPost | LocalPostPreview;

const posts: ExternalPost[] = [
  {
    kind: 'external',
    title:
      'Building a Testing Framework from Scratch with Node.js and TypeScript',
    href: 'https://medium.com/@cecylia.borek/building-a-testing-framework-from-scratch-with-node-js-and-typescript-2709a8041f16',
    date: new Date('2024-12-16T00:00:00.000Z'),
    category: 'tech',
  },
  {
    kind: 'external',
    title:
      'Setting up a monorepo using npm workspaces and TypeScript Project References',
    href: 'https://medium.com/@cecylia.borek/setting-up-a-monorepo-using-npm-workspaces-and-typescript-project-references-307841e0ba4a',
    date: new Date('2024-12-05T00:00:00.000Z'),
    category: 'tech',
  },
];

export function getExternalPosts() {
  return [...posts];
}

export function getLocalPostPreview(post: BlogPost): LocalPostPreview {
  return {
    kind: 'local',
    title: post.data.title,
    href: getPostUrl(post),
    date: post.data.date,
    category: post.data.category,
  };
}

export function sortWritingPosts(posts: WritingPost[]) {
  return [...posts].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getRecentPosts(posts: WritingPost[], limit = 5) {
  return sortWritingPosts(posts).slice(0, limit);
}
