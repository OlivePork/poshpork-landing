'use client';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18073746528/PURCHASE_1',
        'transaction_id': sessionId || '',
        'value': 35.0,
        'currency': 'EUR'
      });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed! 🎉</h1>
        <p className="text-xl text-gray-600 mb-8">Thank you for booking Posh Pork Murder Mystery!</p>
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Happens Next?</h2>
          <div className="text-left space-y-4">
            <div className="flex items-start">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold flex-shrink-0">1</div>
              <p className="ml-4 text-gray-700"><strong>Check your email</strong> - You&apos;ll receive a confirmation email with your booking details and check-in code.</p>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold flex-shrink-0">2</div>
              <p className="ml-4 text-gray-700"><strong>Save your check-in code</strong> - You&apos;ll need this to access the game on the day.</p>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold flex-shrink-0">3</div>
              <p className="ml-4 text-gray-700"><strong>Arrive on time</strong> - Come hungry for knowledge and ready to solve a murder!</p>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 rounded-lg p-6 mb-8">
          <p className="text-gray-700"><strong>Questions?</strong> Contact us at <a href="mailto:info@poshpork.com" className="text-blue-600 hover:underline">info@poshpork.com</a></p>
        </div>
        <a href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Return to Home</a>
      </div>
    </div>
  );
}

export default function BookingSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-amber-50" />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
