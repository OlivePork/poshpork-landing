'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const availableDates = [
  { date: '2026-05-16', day: 'Friday', time: '10:00 AM', available: 16 },
  { date: '2026-05-18', day: 'Sunday', time: '10:00 AM', available: 16 },
  { date: '2026-05-23', day: 'Friday', time: '10:00 AM', available: 16 },
  { date: '2026-05-25', day: 'Sunday', time: '10:00 AM', available: 16 },
  { date: '2026-05-30', day: 'Friday', time: '10:00 AM', available: 16 },
  { date: '2026-06-01', day: 'Sunday', time: '10:00 AM', available: 16 },
];

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    setLoading(true);

    try {
      const selectedSession = availableDates.find(d => d.date === selectedDate);
      const dateDisplay = selectedSession 
        ? `${selectedSession.day}, ${selectedSession.date.includes('-06-') ? 'June' : 'May'} ${selectedSession.date.split('-')[2]} at ${selectedSession.time}`
        : selectedDate;

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          date: selectedDate, 
          numPeople,
          dateDisplay 
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error processing your booking. Please try again.');
      setLoading(false);
    }
  };

  const total = numPeople * 15;

  return (
    <section id="booking" style={{background: 'var(--charcoal)', paddingTop: '40px', paddingBottom: '60px'}}>
      
      <div style={{width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 20px'}}>
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold mb-6" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
            Reserve Your Seat
          </h2>
          <p className="text-xl mb-2" style={{color: 'var(--cream)', opacity: 0.8}}>
            Possessió Vernissa, Llucmajor
          </p>
          <p className="text-sm uppercase tracking-wide mb-4" style={{color: 'var(--gold)', opacity: 0.6}}>
            May 16 — June 1, 2026
          </p>
          <p className="text-sm italic" style={{color: 'var(--cream)', opacity: 0.7}}>
            Limited trial sessions — your feedback will shape the future of this experience
          </p>
        </div>

        {/* Booking card */}
        <div className="parchment rounded-lg p-8" style={{border: '2px solid var(--gold)', boxShadow: '0 0 20px rgba(212, 175, 55, 0.15)'}}>
          
          {/* Date selection */}
          <div className="mb-6">
            <label className="block font-bold mb-3" style={{color: 'var(--dark-brown)', fontFamily: 'var(--font-cinzel)', fontSize: '14px'}}>
              SELECT DATE
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded border-2 bg-white transition-all focus:outline-none focus:border-yellow-700"
              style={{borderColor: 'var(--dark-gold)', color: 'var(--dark-brown)', fontSize: '16px'}}
            >
              <option value="">Choose your session...</option>
              {availableDates.map((session) => (
                <option key={session.date} value={session.date}>
                  {session.day}, {session.date.includes('-06-') ? 'June' : 'May'} {session.date.split('-')[2]}
                </option>
              ))}
            </select>
          </div>

          {/* Number of guests */}
          <div className="mb-6">
            <label className="block font-bold mb-3" style={{color: 'var(--dark-brown)', fontFamily: 'var(--font-cinzel)', fontSize: '14px'}}>
              GUESTS
            </label>
            <select
              value={numPeople}
              onChange={(e) => setNumPeople(Number(e.target.value))}
              className="w-full px-4 py-3 rounded border-2 bg-white transition-all focus:outline-none focus:border-yellow-700"
              style={{borderColor: 'var(--dark-gold)', color: 'var(--dark-brown)', fontSize: '16px'}}
            >
              {[...Array(16)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Price display */}
          <div className="rounded-lg p-6 mb-6 text-center" style={{background: 'linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%)'}}>
            <div className="font-bold" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)', fontSize: '48px'}}>
              €{total}
            </div>
          </div>

          {/* CTA button */}
          <button
            onClick={handleBooking}
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
            {loading ? 'Processing...' : 'Secure Your Seat'}
          </button>

          {/* Trust indicators */}
          <div className="mt-6 pt-6 text-center" style={{borderTop: '1px solid rgba(212, 175, 55, 0.2)'}}>
            <p className="text-xs mb-2" style={{color: '#999'}}>
              🔒 Secure Payment • ✉️ Instant Confirmation
            </p>
            <p className="text-xs" style={{color: '#999'}}>
              Private bookings: <a href="mailto:mystery@poshpork.com" className="underline" style={{color: 'var(--dark-gold)'}}>mystery@poshpork.com</a>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}