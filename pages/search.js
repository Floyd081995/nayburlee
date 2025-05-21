export default function Search() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <h1>Find Your Perfect Workspace</h1>
      <p>
        Explore shared offices, conference rooms, and hybrid spaces available
        for booking.
      </p>
      <form>
        <input
          type="text"
          placeholder="Enter location or keyword"
          style={{ padding: "0.5rem", width: "80%", marginRight: "1rem" }}
        />
        <button style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Search
        </button>
      </form>

      {/* If you want the extra search bar, include it here */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search for a workspace..."
          style={{
            padding: "10px",
            width: "80%",
            maxWidth: "500px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            backgroundColor: "#2fd1ba",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}


