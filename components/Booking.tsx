'use client';

import { useState, useEffect } from 'react';

const availableDates = [
  { date: '2026-05-16', day: 'Friday', time: '10:00 AM', capacity: 8 },
  { date: '2026-05-18', day: 'Sunday', time: '10:00 AM', capacity: 8 },
  { date: '2026-05-23', day: 'Friday', time: '10:00 AM', capacity: 8 },
  { date: '2026-05-25', day: 'Sunday', time: '10:00 AM', capacity: 8 },
  { date: '2026-05-30', day: 'Friday', time: '10:00 AM', capacity: 8 },
  { date: '2026-06-01', day: 'Sunday', time: '10:00 AM', capacity: 8 },
];

type TicketType = 'adult' | 'child';

interface Ticket {
  type: TicketType;
  price: number;
}

const PRICES = {
  adult: 15,
  child: 7,
};

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([{ type: 'adult', price: PRICES.adult }]);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<any>({});

  useEffect(() => {
    fetch('/api/availability')
      .then(r => r.json())
      .then(d => setAvailability(d.availability || {}))
      .catch(e => console.error(e));
  }, []);

  const addTicket = () => {
    setTickets([...tickets, { type: 'adult', price: PRICES.adult }]);
  };

  const removeTicket = (index: number) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter((_, i) => i !== index));
    }
  };

  const updateTicketType = (index: number, type: TicketType) => {
    const newTickets = [...tickets];
    newTickets[index] = { type, price: PRICES[type] };
    setTickets(newTickets);
  };

  const totalGuests = tickets.length;
  const totalPrice = tickets.reduce((sum, ticket) => sum + ticket.price, 0);

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
          numPeople: totalGuests,
          dateDisplay 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Booking failed');
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error processing your booking. Please try again or contact mystery@poshpork.com');
      setLoading(false);
    }
  };

  return (
    <section id="booking" style={{background: 'var(--charcoal)', paddingTop: '20px', paddingBottom: '10px'}}>
      
      <div style={{width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 20px'}}>
        
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
          <p className="text-sm mb-6" style={{color: 'var(--cream)', opacity: 0.8, fontStyle: 'italic'}}>
            This initial booking period is a trial. While the research has been done, the digital content is still being developed. Get early access with an in-person experience hosted by the creator himself over coffee. Your feedback will shape the future of the experience.
          </p>
        </div>

        <div className="parchment rounded-lg p-8" style={{border: '2px solid var(--gold)', boxShadow: '0 0 20px rgba(212, 175, 55, 0.15)'}}>
          
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
              {availableDates.map((session) => {
                const available = availability[session.date] !== undefined ? availability[session.date] : session.capacity;
                const isSoldOut = available <= 0;
                return (
                  <option key={session.date} value={session.date} disabled={isSoldOut}>
                    {session.day}, {session.date.includes('-06-') ? 'June' : 'May'} {session.date.split('-')[2]} - {isSoldOut ? 'SOLD OUT' : `${available} seat${available === 1 ? '' : 's'} left`}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block font-bold" style={{color: 'var(--dark-brown)', fontFamily: 'var(--font-cinzel)', fontSize: '14px'}}>
                TICKETS
              </label>
              {tickets.length < 8 && (
                <button
                  type="button"
                  onClick={addTicket}
                  className="text-sm px-3 py-1 rounded"
                  style={{color: 'var(--dark-gold)', border: '1px solid var(--dark-gold)'}}
                >
                  + Add Ticket
                </button>
              )}
            </div>

            {tickets.map((ticket, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <select
                  value={ticket.type}
                  onChange={(e) => updateTicketType(index, e.target.value as TicketType)}
                  className="flex-1 px-4 py-3 rounded border-2 bg-white transition-all focus:outline-none focus:border-yellow-700"
                  style={{borderColor: 'var(--dark-gold)', color: 'var(--dark-brown)', fontSize: '16px'}}
                >
                  <option value="adult">Adult (€15)</option>
                  <option value="child">Child 12 & under (€7)</option>
                </select>
                {tickets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicket(index)}
                    className="px-3 py-2 rounded"
                    style={{color: '#999', border: '1px solid #999'}}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-lg p-6 mb-6 text-center" style={{background: 'linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%)'}}>
            <div className="font-bold" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)', fontSize: '48px'}}>
              €{totalPrice}
            </div>
            <p className="text-sm mt-2" style={{color: 'var(--cream)', opacity: 0.7}}>
              {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}
            </p>
          </div>

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

          <div className="mt-6 pt-6 text-center" style={{borderTop: '1px solid rgba(212, 175, 55, 0.2)'}}>
            <p className="text-xs mb-2" style={{color: '#999'}}>
              🔒 Secure Payment • ✉️ Instant Confirmation
            </p>
            <p className="text-xs mb-2" style={{color: '#999'}}>
              Children under 3 are free
            </p>
            <p className="text-xs" style={{color: '#999'}}>
              Private bookings: <a href="mailto:mystery@poshpork.com" className="underline" style={{color: 'var(--dark-gold)'}}>mystery@poshpork.com</a>
            </p>
            <p className="text-xs mt-3" style={{color: '#999'}}>
              <a href="/privacy" className="underline" style={{color: 'var(--dark-gold)'}}>Privacy Policy</a>
              {' • '}
              <a href="/terms" className="underline" style={{color: 'var(--dark-gold)'}}>Terms & Conditions</a>
              {' • '}
              <a href="/cookies" className="underline" style={{color: 'var(--dark-gold)'}}>Cookie Policy</a>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}