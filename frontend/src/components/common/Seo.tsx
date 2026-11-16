import { SITE_DESCRIPTION, SITE_TITLE, TITLE_SUFFIX } from '../../config/seo';

interface SeoProps {
  /** Page name; omitted on the home page to use the full site title. */
  title?: string;
  description?: string;
}

/** Per-page document metadata (React 19 hoists these tags into <head>). */
export function Seo({ title, description = SITE_DESCRIPTION }: SeoProps) {
  const fullTitle = title ? `${title} | ${TITLE_SUFFIX}` : SITE_TITLE;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
    </>
  );
}
