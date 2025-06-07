import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* Google Analytics */}
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

          {/* SEO Metadata */}
          <meta name="description" content="Book flexible podcast studios, content creation rooms, voiceover studios, and hybrid workspaces across South Africa—by the hour, day, week, or month. No leases. No hassle." />
          <meta name="keywords" content="creative workspace, studio rental, coworking space, podcast studio, content creation room, voiceover studio, production space, flexible workspace, hybrid office, hourly studio rental, monthly workspace, South Africa, Johannesburg, Cape Town, Durban, Pretoria" />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://nayburlee.co.za/" />

          {/* Open Graph */}
          <meta property="og:locale" content="en_ZA" />
          <meta property="og:site_name" content="Nayburlee" />
          <meta property="og:title" content="Nayburlee | Creative & Hybrid Workspaces in South Africa"/>
          <meta property="og:description" content="Book flexible podcast studios, content creation rooms, voiceover studios, and hybrid workspaces across South Africa—by the hour, day, week, or month. No leases. No hassle."/>
          <meta property="og:image" content="https://nayburlee.co.za/preview-image.jpeg" />
          <meta property="og:url" content="https://nayburlee.co.za" />
          <meta property="og:type" content="website" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Nayburlee | Creative & Hybrid Workspaces in South Africa"/>
          <meta name="twitter:description" content="Book flexible podcast studios, content creation rooms, voiceover studios, and hybrid workspaces across South Africa—by the hour, day, week, or month. No leases. No hassle."/>
          <meta name="twitter:image" content="https://nayburlee.co.za/preview-image.jpeg" />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
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
