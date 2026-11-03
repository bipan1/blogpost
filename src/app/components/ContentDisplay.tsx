type Props = {
  /** Decoded post HTML (see parseContent). */
  html: string;
};

// The HTML is rendered as authored in the editor; it is not sanitised, so only
// trusted authors should be able to create posts. Styled by .post-content in
// globals.css.
const ContentDisplay = ({ html }: Props) => (
  <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
);

export default ContentDisplay;
