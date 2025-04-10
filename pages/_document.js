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
        <meta property="og:title" content="Nayburlee | On-Demand Workspaces in South Africa" />
        <meta property="og:description" content="Rent desks, offices, and meeting rooms by the hour or day with no long-term leases. Perfect for freelancers, startups, and teams." />
        <meta property="og:image" content="https://nayburlee.co.za/public/previewimage" />
        <meta property="og:url" content="https://nayburlee.co.za" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nayburlee | On-Demand Workspaces in South Africa" />
        <meta name="twitter:description" content="Rent desks, offices, and meeting rooms by the hour or day with no long-term leases. Perfect for freelancers, startups, and teams." />
        <meta name="twitter:image" content="https://nayburlee.co.za/public/previewimage" />
      </Head>
      <body style={{ fontFamily: 'Jost, sans-serif', backgroundColor: '#000000', color: 'white' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
