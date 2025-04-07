import React from "react";
import "./App.css";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="./assets/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Flexible Workspaces in South Africa</h1>
      <p>Rent desks, offices, or pop-up space by the hour/day – no long-term leases.</p>

      <h2>Example Listings</h2>
      <div className="listing">
        <strong>🪑 Hot Desk | Sandton</strong>
        <br /> R800/month • 24/7 access
      </div>

      <div className="listing">
        <strong>🏢 Private Office | Cape Town</strong>
        <br /> R2,500/month • 4 seats
      </div>

      <div id="signup">
        <h2>Match With Your Perfect Workspace</h2>
        <p>Join our platform today and discover flexible workspaces tailored to your needs!</p>
        <form action="https://formsubmit.co/YOUR_EMAIL" method="POST">
          <input type="text" name="name" placeholder="Your Name" required />
          <br />
          <input type="email" name="email" placeholder="Email" required />
          <br />
          <input type="hidden" name="_next" value="https://yourdomain.co.za/thanks.html" />
          <button type="submit" className="cta">Get Started</button>
        </form>
      </div>
    </div>
  );
}

export default App;
