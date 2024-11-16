import { sanitizeAndTruncateHtml } from '@/lib/SanitizeHtml';

type Props = {
  html: string;
  removeImage: boolean;
};

const ContentDisplay = ({ html, removeImage }: Props) => {
  return (
    <div className="w-full">
      {removeImage ? (
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeAndTruncateHtml(html, 200),
          }}
        />
      ) : (
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: JSON.parse(html) }}
        />
      )}
    </div>
  );
};

export default ContentDisplay;
