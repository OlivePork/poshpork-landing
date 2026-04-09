'use client';

import { useState } from 'react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section style={{background: 'var(--charcoal)', paddingTop: '20px', paddingBottom: '60px'}}>
        <div style={{width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center'}}>
          <div className="parchment rounded-lg p-8" style={{border: '2px solid var(--gold)'}}>
            <h3 className="text-3xl font-bold mb-4" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
              You are On The List! 🎉
            </h3>
            <p style={{color: 'var(--dark-brown)', fontSize: '18px', lineHeight: '1.6'}}>
              We will email you as soon as the full digital experience launches in July 2026.
            </p>
            <p className="mt-4" style={{color: 'var(--dark-brown)', fontSize: '16px', fontStyle: 'italic'}}>
              The investigation continues...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{background: 'var(--charcoal)', paddingTop: '60px', paddingBottom: '60px'}}>
      <div style={{width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 20px'}}>
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
            Full Digital Experience
          </h2>
          <p className="text-2xl mb-2" style={{color: 'var(--cream)'}}>
            Launching July 2026
          </p>
          <p className="text-lg" style={{color: 'var(--cream)', opacity: 0.8}}>
            Join the waitlist to be notified when bookings open
          </p>
        </div>

        <div className="parchment rounded-lg p-8" style={{border: '2px solid var(--gold)', boxShadow: '0 0 20px rgba(212, 175, 55, 0.15)'}}>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block font-bold mb-3" style={{color: 'var(--dark-brown)', fontFamily: 'var(--font-cinzel)', fontSize: '14px'}}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded border-2 bg-white transition-all focus:outline-none focus:border-yellow-700"
                style={{borderColor: 'var(--dark-gold)', color: 'var(--dark-brown)', fontSize: '16px'}}
                required
              />
            </div>

            {error && (
              <p className="mb-4 text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              style={{
                fontSize: '20px',
                background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
                color: 'var(--charcoal)',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                fontFamily: 'var(--font-cinzel)'
              }}
            >
              {loading ? 'Joining...' : 'Join the Waitlist'}
            </button>
          </form>

          <div className="mt-6 pt-6 text-center" style={{borderTop: '1px solid rgba(212, 175, 55, 0.2)'}}>
            <p className="text-xs" style={{color: '#999'}}>
              💡 Be the first to solve the mystery worldwide
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}