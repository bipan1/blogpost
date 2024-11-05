"use client";

import { sanitizeHtmlContent, sanitizeHtmlNoImage } from '@/lib/SanitizeHtml';
import React from 'react'

type Props = {
    html : string;
    removeImage :  boolean;
}

const ContentDisplay = ({html, removeImage}: Props) => {
  console.log(html)
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html:  removeImage ? sanitizeHtmlNoImage(html) : sanitizeHtmlContent(html) }} />

  )
}

export default ContentDisplay