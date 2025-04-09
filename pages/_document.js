import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body style={{ fontFamily: 'Jost, sans-serif', backgroundColor: '#000000', color: 'white' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
