import React from "react";
import { Helmet } from "react-helmet-async";

const DMCA = () => {
  return (
    <div className="p-10 px-4 sm:px-20">
      {/* SEO Integration */}
      <Helmet>
        <title>DMCA Policy - JKHub Movies</title>
        <meta
          name="description"
          content="Learn about JKHub Movies' DMCA policy. We only index third-party content and are not responsible for hosting or downloading content. Contact us for copyright issues."
        />
        <meta
          name="keywords"
          content="DMCA Policy, Copyright, Movie Download, Third-Party Content, Copyright Issues, JKHub Movies"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jkhubmovies.site/dmca" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="DMCA Policy - JKHub Movies" />
        <meta
          property="og:description"
          content="Learn about JKHub Movies' DMCA policy. We only index third-party content and are not responsible for hosting or downloading content. Contact us for copyright issues."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jkhubmovies.site/dmca" />
        <meta property="og:image" content="https://jkhubmovies.site/logo.png" />
        <meta property="og:image:alt" content="JKHub Movies Logo" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DMCA Policy - JKHub Movies" />
        <meta
          name="twitter:description"
          content="Learn about JKHub Movies' DMCA policy. We only index third-party content and are not responsible for hosting or downloading content. Contact us for copyright issues."
        />
        <meta name="twitter:image" content="https://jkhubmovies.site/logo.png" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">DMCA Policy</h1>
      <p className="mb-4">
        All parts of the website are for private use only. No files are hosted
        on our server. All contents are provided by non-affiliated third
        parties. They are only indexed much like how Google works. We do not
        accept responsibility for content hosted on third-party websites and do
        not have any involvement in the downloading/uploading of movies. We just
        post links available on the internet.
      </p>
      <p className="mb-4">
        This site merely indexes other sites’ contents. The hosting server or
        the administrator cannot be held responsible for the contents of any
        linked sites or any link contained in a linked site, or changes/updates
        to such sites. All materials on this website are for Educational
        Purposes ONLY.
      </p>
      <p className="mb-4">
        For any copyright issues, you should contact the hosting sites directly.
      </p>
      <p className="mb-4">
        If you still have any questions or need further information, please send
        me a PM through the contact page.
      </p>
      <p className="mb-4">
        Please allow 3-7 business days for an email response.
      </p>
      <p>
        <strong>Contact Us:</strong>
        <br />
        Email:{" "}
        <a href="mailto:rockybhaiass999@gmail.com" className="text-blue-600">
          rockybhaiass999@gmail.com
        </a>
      </p>
    </div>
  );
};

export default DMCA;
