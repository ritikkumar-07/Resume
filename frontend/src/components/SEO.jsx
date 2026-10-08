import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Resumora - Free Resume Builder",
  description = "Create professional, ATS-friendly resumes with Resumora.",
  canonical,
  noindex = false,
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      {canonical && (
        <link
          rel="canonical"
          href={canonical}
        />
      )}

      {noindex && (
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {canonical && (
        <meta property="og:url" content={canonical} />
      )}

      <meta property="og:site_name" content="Resumora" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;