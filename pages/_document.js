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
      </Head>
      <body style={{ fontFamily: 'Jost, sans-serif', backgroundColor: '#000000', color: 'white' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
