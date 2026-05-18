import introEn from '../content/intro/en.txt?raw';
import introPl from '../content/intro/pl.txt?raw';

function loadIntro(raw: string): string {
  return raw
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ');
}

export const intro = {
  en: loadIntro(introEn),
  pl: loadIntro(introPl),
};
