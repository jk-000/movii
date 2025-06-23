import React from "react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="p-10 px-4 sm:px-20">
      {/* SEO Integration */}
      <Helmet>
        <title>About Us - JKHub Movies</title>
        <meta
          name="description"
          content="Learn more about JKHub Movies, a platform for the latest movies and series. Get in touch with us for issues, and read our copyright disclaimer."
        />
        <meta
          name="keywords"
          content="JKHub, About JKHub, Movies, Series, Copyright Disclaimer, Contact JKHub"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jkhubmovies.site/about" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="About Us - JKHub Movies" />
        <meta
          property="og:description"
          content="Learn more about JKHub Movies, a platform for the latest movies and series. Get in touch with us for issues, and read our copyright disclaimer."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jkhubmovies.site/about" />
        <meta property="og:image" content="https://jkhubmovies.site/logo.png" />
        <meta property="og:image:alt" content="JKHub Movies Logo" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - JKHub Movies" />
        <meta
          name="twitter:description"
          content="Learn more about JKHub Movies, a platform for the latest movies and series. Get in touch with us for issues, and read our copyright disclaimer."
        />
        <meta name="twitter:image" content="https://jkhubmovies.site/logo.png" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        <strong>JKHub Movies:</strong> Your go-to for the latest movies and
        series. Explore a vast library, seamless navigation, and join a
        community of fellow enthusiasts. Start your cinematic journey today!
      </p>
      <p className="mb-4">
        If there are any website issues or unavailable movies and series, DM us
        on Instagram.
        <br />
        <span className="text-red-600">
          (किसी भी वेबसाइट समस्या या अनुपलब्ध फिल्मों और सीरीज के लिए, हमें
          इंस्टाग्राम पर DM करें।)
        </span>
      </p>

      <p className="mt-4">
        <strong>Copyright Disclaimer:</strong> This website is not hosting any
        copyrighted content. All movies and series added here are publicly
        available on the internet, indexed like Google does, from non-affiliated
        third-party websites. If you believe any content is violating your
        copyright, please feel free to contact us.
      </p>
      <p className="mt-4">
        We respect the rights of content creators and owners. If you want to
        remove any content from our site, simply provide us the details, and we
        will ensure to remove it within 2-4 business days.
      </p>
      <p className="mb-4 mt-5">
        <strong>Connect with me!</strong>
        <br />
        Email:{" "}
        <a href="mailto:rockybhaiass999@gmail.com" className="text-blue-600">
          rockybhaiass999@gmail.com
        </a>
      </p>
    </div>
  );
};

export default About;
