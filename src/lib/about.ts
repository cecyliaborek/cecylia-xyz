import aboutEn from '../content/about/en.json';
import aboutPl from '../content/about/pl.json';
import type { Language } from './site';

export type AboutListItem =
  | {
      kind: 'link';
      label: string;
      href: string;
      note?: string;
    }
  | {
      kind: 'text';
      label: string;
      text: string;
    };

export type AboutSection = {
  heading?: string;
  paragraphs?: string[];
  list?: AboutListItem[];
};

export type AboutPage = {
  description: string;
  sections: AboutSection[];
};

const aboutByLanguage: Record<Language, AboutPage> = {
  en: aboutEn as AboutPage,
  pl: aboutPl as AboutPage,
};

export function getAboutContent(language: Language): AboutPage {
  return aboutByLanguage[language];
}
