'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: 'Is this suitable for children?', a: 'Yes! Family-friendly and educational for ages 10 and up.' },
    { q: 'Do I need scientific background?', a: 'Not at all! Designed for everyone who eats food.' },
    { q: 'What if I am vegetarian?', a: 'The science applies to everyone regardless of diet.' },
    { q: 'How interactive is it?', a: 'Very! You examine evidence and cast your verdict.' },
    { q: 'Cancellation policy?', a: 'Contact us 48 hours before for refund or reschedule.' },
    { q: 'Is food provided?', a: 'No food served. Eat beforehand.' },
    { q: 'What to bring?', a: 'Just yourself! Everything is provided.' },
    { q: 'Private bookings?', a: 'Yes! Email hello@poshpork.com to arrange.' }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left flex justify-between items-center"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <span className="text-yellow-600 text-2xl">{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && <p className="mt-4 text-gray-700">{faq.a}</p>}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4">Have another question?</p>
          <a 
            href="mailto:hello@poshpork.com" 
            className="px-6 py-3 bg-gray-900 text-yellow-500 rounded-lg inline-block font-bold"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}