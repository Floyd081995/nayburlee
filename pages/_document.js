import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
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

        {/* Open Graph Metadata for Link Previews */}
        <meta property="og:title" content="Nayburlee | Create. Collaborate. Grow." />
        <meta property="og:description" content="Find and book podcast studios, content creation spaces, and hybrid workspaces in South Africa — by the hour, day, or month. No leases, no hassle." />
        <meta property="og:image" content="https://nayburlee.co.za/preview-image.jpeg" />
        <meta property="og:url" content="https://nayburlee.co.za" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nayburlee | Create. Collaborate. Grow." />
        <meta name="twitter:description" content="Book podcast studios, content creation spaces, and hybrid workspaces in South Africa, instantly. Flexible, verified listings on demand." />
        <meta name="twitter:image" content="https://nayburlee.co.za/preview-image.jpeg" />
      </Head>
      <body style={{ fontFamily: 'Jost, sans-serif', backgroundColor: '#000000', color: 'white' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
