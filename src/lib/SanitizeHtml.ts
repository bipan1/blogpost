export const sanitizeHtmlNoImage = (html: string) => {
    // Create a temporary DOM element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
  
    // Remove all <img> tags
    const images = tempDiv.getElementsByTagName('img');
    while (images.length > 0) {
      images[0].parentNode?.removeChild(images[0]);
    }

    const sanitizedHtml = tempDiv.innerHTML.replace(/^[\s\n]*"|"[\s\n]*$/g, '');
  
    return sanitizedHtml;
};

export const sanitizeHtmlContent = (html : string ) => {
    // Create a temporary DOM element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const sanitizedHtml = tempDiv.innerHTML.replace(/^[\s\n]*"|"[\s\n]*$/g, '');
    return sanitizedHtml;
}
  