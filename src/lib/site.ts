import type { CollectionEntry } from 'astro:content';
import { intro } from './intro';

export const languages = ['en', 'pl'] as const;
export const categories = ['tech', 'lifestyle', 'culture'] as const;

export type Language = (typeof languages)[number];
export type Category = (typeof categories)[number];
export type BlogPost = CollectionEntry<'blog'>;

export const languageLabels: Record<Language, string> = {
  en: 'English',
  pl: 'Polski',
};

export const categoryLabels: Record<Language, Record<Category, string>> = {
  en: {
    tech: 'Tech',
    lifestyle: 'Lifestyle',
    culture: 'Culture',
  },
  pl: {
    tech: 'Technologia',
    lifestyle: 'Styl życia',
    culture: 'Kultura',
  },
};

export const ui = {
  en: {
    siteName: 'Cecylia Tkacz',
    navTitle: 'cecylia.xyz',
    nav: {
      about: 'About',
      posts: 'Posts',
      experience: 'Experience',
      contact: 'Contact',
    },
    a11y: {
      primaryNavigation: 'Primary navigation',
      languageSwitch: 'Language switch',
      postFilters: 'Post filters',
    },
    home: {
      profileAlt: 'Portrait of Cecylia Tkacz',
      tagline: 'Developer, generalist, writer',
      intro: intro.en,
      socialLinks: [
        { label: 'github', href: 'https://github.com/cecyliaborek' },
        {
          label: 'linkedin',
          href: 'https://www.linkedin.com/in/cecyliaborek/',
        },
        {
          label: 'goodreads',
          href: 'https://www.goodreads.com/user/show/30514170-cecylia',
        },
      ],
      recentPosts: 'Writing',
      allPosts: 'All posts',
      contact: 'Email me at',
    },
    blog: {
      title: 'Posts',
      description:
        'Writing in English and Polish across tech, lifestyle, and culture.',
      language: 'Language',
      category: 'Category',
      all: 'All',
      noPosts: 'No posts match these filters.',
    },
    post: {
      back: 'Back to posts',
      translation: 'Translation',
    },
  },
  pl: {
    siteName: 'Cecylia Tkacz',
    navTitle: 'cecylia.xyz',
    nav: {
      about: 'O mnie',
      posts: 'Posty',
      experience: 'Doświadczenie',
      contact: 'Kontakt',
    },
    a11y: {
      primaryNavigation: 'Główna nawigacja',
      languageSwitch: 'Przełącznik języka',
      postFilters: 'Filtry postów',
    },
    home: {
      profileAlt: 'Zdjęcie Cecylii Tkacz',
      tagline: 'Programistka, generalistka, pisarka',
      intro: intro.pl,
      socialLinks: [
        { label: 'github', href: 'https://github.com/cecyliaborek' },
        {
          label: 'linkedin',
          href: 'https://www.linkedin.com/in/cecyliaborek/',
        },
        {
          label: 'goodreads',
          href: 'https://www.goodreads.com/user/show/30514170-cecylia',
        },
      ],
      recentPosts: 'Pisanie',
      allPosts: 'Wszystkie posty',
      contact: 'Napisz do mnie',
    },
    blog: {
      title: 'Posty',
      description:
        'Teksty po polsku i angielsku o techu, lifestyle’u i kulturze.',
      language: 'Język',
      category: 'Kategoria',
      all: 'Wszystkie',
      noPosts: 'Brak postów dla tych filtrów.',
    },
    post: {
      back: 'Wróć do postów',
      translation: 'Tłumaczenie',
    },
  },
} as const;

export function isLanguage(value: string | undefined): value is Language {
  return languages.includes(value as Language);
}

export function getHomeUrl(language: Language) {
  return `/${language}/`;
}

export function getBlogUrl(language: Language) {
  return `/${language}/blog/`;
}

export function getAboutUrl(language: Language) {
  return `/${language}/about/`;
}

export function getPostUrl(post: BlogPost) {
  return `/${post.data.language}/blog/${post.data.category}/${post.data.slug}/`;
}

export function getCategoryLabel(category: Category, language: Language) {
  return categoryLabels[language][category];
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export function formatDate(date: Date, language: Language) {
  return new Intl.DateTimeFormat(language === 'pl' ? 'pl-PL' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatShortDate(date: Date, language: Language) {
  return new Intl.DateTimeFormat(language === 'pl' ? 'pl-PL' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function getPostLanguageSwitchUrl(
  post: BlogPost,
  posts: BlogPost[],
  targetLanguage: Language,
) {
  if (post.data.language === targetLanguage) {
    return getPostUrl(post);
  }

  const translatedSlug = post.data.translation?.[targetLanguage];
  const translatedPost = posts.find(
    (candidate) =>
      candidate.data.language === targetLanguage &&
      candidate.data.slug === translatedSlug,
  );

  return translatedPost
    ? getPostUrl(translatedPost)
    : getBlogUrl(targetLanguage);
}
