import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Flex Space Matchmaker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Flex Space Matchmaker</h1>
        <p className="description">
          Match freelancers, SMEs, and startups with underutilized offices and flexible spaces today!
        </p>
        
        <form name="contact" method="POST" data-netlify="true">
          <input type="text" name="name" placeholder="Your Name" required />
          <br />
          <input type="email" name="email" placeholder="Your Email" required />
          <br />
          <button type="submit">Get Started</button>
        </form>
      </main>

      <footer>
        <p>&copy; 2025 Flex Space Matchmaker. All rights reserved.</p>
      </footer>
    </div>
  );
}
