import projectsEn from '../content/projects/en.json';
import projectsPl from '../content/projects/pl.json';
import type { Language } from './site';

export type Project = {
  title: string;
  description: string;
  href?: string;
};

export type ProjectsContent = {
  items: Project[];
};

const projectsByLanguage: Record<Language, ProjectsContent> = {
  en: projectsEn as ProjectsContent,
  pl: projectsPl as ProjectsContent,
};

export function getFeaturedProjects(language: Language): Project[] {
  return projectsByLanguage[language].items;
}
