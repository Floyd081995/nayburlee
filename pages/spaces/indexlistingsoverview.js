import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { db } from '@/lib/firebasedb';

export default function SpacesOverview({ listings }) {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Workspaces</h1>

      {listings.length === 0 ? (
        <p>No listings available yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-1">{listing.title || 'Untitled'}</h2>
              <p className="text-sm text-gray-600 mb-1">{listing.location}</p>
              <p className="text-sm mb-2">R{listing.price}</p>
              <Link
                href={`/spaces/${listing.id}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Server-side fetching
export async function getServerSideProps() {
  const listingsCol = collection(db, 'listings');
  const listingSnap = await getDocs(listingsCol);

  const listings = listingSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { props: { listings } };
}
