import { JSDOM } from 'jsdom';

export const sanitizeAndTruncateHtml = (
  html: string,
  maxLength: number,
): string => {
  const dom = new JSDOM(html.substring(1));
  const document = dom.window.document;

  const traverseNodes = (node: Node): string => {
    let textContent = '';
    const nodes = node.childNodes;

    for (const child of nodes) {
      if (child.nodeType === 3) {
        // Text node
        const remainingLength = maxLength - textContent.length;
        if (remainingLength <= 0) break;
        textContent += child.textContent?.substring(0, remainingLength) || '';
      } else if (child.nodeType === 1) {
        // Element node
        textContent += traverseNodes(child);
      }
      if (textContent.length >= maxLength) break;
    }

    return textContent;
  };

  const truncatedText = traverseNodes(document.body).substring(0, maxLength);

  // Sanitize the truncated text to ensure safe HTML
  const sanitizedHtml = truncatedText + '...';

  return sanitizedHtml;
};
