import { Category } from './Constants';

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const extractFirstImage = (htmlContent: string): string | null => {
  const imgTagMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
  return imgTagMatch ? imgTagMatch[1] : null;
};

export const convertToCategory = (category: string): Category | undefined => {
  if (Object.values(Category).includes(category as Category)) {
    return category as Category;
  }
  return undefined;
};
