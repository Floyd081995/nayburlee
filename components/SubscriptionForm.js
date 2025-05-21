import { useState } from 'react';

export default function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Subscription failed');
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{textAlign: "center",fontSize: "25px", marginTop: "10px"}}>
      <h2>Subscribe for Updates</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{ width: '250px', padding: '10px', borderRadius: '5px', border: '1px solid #2fd1ba', marginRight: '6px' }}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ padding: '10px 20px', borderRadius: '5px', background: '#2fd1ba', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {success && <p style={{ color: '#2fd1ba', marginTop: '10px' }}>Thank you for subscribing!</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}