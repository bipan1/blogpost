import { CATEGORIES, Category } from './Constants';

const WORDS_PER_MINUTE = 200;

export const formatDate = (date: Date | string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));

/**
 * Post content is stored as a JSON-encoded HTML string (see createPost).
 * Falls back to the raw value for any rows saved without encoding.
 */
export const parseContent = (stored: string): string => {
  try {
    const parsed: unknown = JSON.parse(stored);
    return typeof parsed === 'string' ? parsed : stored;
  } catch {
    return stored;
  }
};

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

const decodeEntities = (text: string) =>
  text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === '#') {
      const point =
        code[1].toLowerCase() === 'x'
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      return Number.isNaN(point) ? match : String.fromCodePoint(point);
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });

/** Plain text of an HTML string. Output must be rendered as text, not HTML. */
export const toPlainText = (html: string) =>
  decodeEntities(
    html
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();

export const excerpt = (html: string, maxLength: number) => {
  const text = toPlainText(html);
  return text.length > maxLength
    ? `${text.slice(0, maxLength).trimEnd()}...`
    : text;
};

export const readingTime = (html: string) => {
  const words = toPlainText(html).split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export const extractFirstImage = (html: string): string | undefined =>
  html.match(/<img[^>]+src="([^">]+)"/)?.[1];

export const parseCategory = (value: unknown): Category | undefined =>
  CATEGORIES.find((category) => category === value);

export const parsePage = (value: unknown): number => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};
