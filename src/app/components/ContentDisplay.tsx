"use client";

import { sanitizeHtmlNoImage } from '@/lib/SanitizeHtml';
import React from 'react'

type Props = {
    html : string;
    removeImage :  boolean;
}

const ContentDisplay = ({html, removeImage}: Props) => {
  return (
    <div className='w-full'>
      {
        removeImage ? 
          <div dangerouslySetInnerHTML={
            {__html : sanitizeHtmlNoImage(html.substring(0, 200) + '...')}
          } /> 
          : 
          <div className="prose text-xl w-full" dangerouslySetInnerHTML={{ __html: JSON.parse(html) }} />
      }
    </div>
  )
}

export default ContentDisplay