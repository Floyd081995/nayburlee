import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* Google tag (gtag.js) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-JENDSF7B43"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-JENDSF7B43');
              `,
            }}
          />

          {/* Updated Open Graph Metadata */}
          <meta property="og:title" content="Nayburlee | Create. Collaborate. Grow." />
          <meta property="og:description" content="Book verified podcast studios, content creation spaces, and hybrid workspaces in South Africa — by the hour or day. No leases, no hassle." />
          <meta property="og:image" content="https://nayburlee.co.za/preview-image.jpeg" /> {/* Update image URL */}
          <meta property="og:url" content="https://nayburlee.co.za" />
          <meta property="og:type" content="website" />

          {/* Updated Twitter Card Metadata */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Nayburlee | Create. Collaborate. Grow." />
          <meta name="twitter:description" content="Book verified podcast studios, content creation spaces, and hybrid workspaces in South Africa — by the hour or day. No leases, no hassle." />
          <meta name="twitter:image" content="https://nayburlee.co.za/preview-image.jpeg" /> {/* Update image URL */}

          {/* SEO Metadata */}
          <meta name="description" content="Nayburlee matches creators, podcasters, and startups with flexible, bookable verified spaces across South Africa, including studios, content creation rooms, and hybrid workspaces" />
          <meta name="keywords" content="Nayburlee, creative spaces South Africa, hybrid workspaces, content creation rooms, flexible spaces, bookable studios, workspace solutions, podcast studios" />
          <meta name="robots" content="index, follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
