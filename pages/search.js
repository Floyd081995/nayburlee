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
    </div>
  );
}
