'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      loadGoogleAnalytics();
    }
  }, []);

  const loadGoogleAnalytics = () => {
    // Add your Google Analytics ID here
    const GA_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID
    
    const script1 = document.createElement('script');
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `;
    document.head.appendChild(script2);
  };

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    loadGoogleAnalytics();
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
  };

  const handleSavePreferences = (analytics: boolean) => {
    if (analytics) {
      localStorage.setItem('cookie-consent', 'accepted');
      loadGoogleAnalytics();
    } else {
      localStorage.setItem('cookie-consent', 'rejected');
    }
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {!showPreferences ? (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--dark-brown)',
          color: 'var(--cream)',
          padding: '20px',
          zIndex: 9999,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
          borderTop: '2px solid var(--gold)'
        }}>
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div>
                <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
                  🍪 We Value Your Privacy
                </h3>
                <p style={{fontSize: '14px', lineHeight: '1.6', marginBottom: '8px'}}>
                  We use cookies to enhance your experience and analyze site traffic. Essential cookies are required for the site to function, 
                  while analytics cookies help us improve our service.
                </p>
                <p style={{fontSize: '12px', opacity: 0.8}}>
                  <a href="/cookies" style={{color: 'var(--gold)', textDecoration: 'underline'}}>Cookie Policy</a>
                  {' • '}
                  <a href="/privacy" style={{color: 'var(--gold)', textDecoration: 'underline'}}>Privacy Policy</a>
                </p>
              </div>
              
              <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                <button
                  onClick={handleAcceptAll}
                  style={{
                    background: 'linear-gradient(135deg, #a67c00, #d4af37, #a67c00)',
                    color: 'var(--dark-brown)',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'var(--font-cinzel)'
                  }}
                >
                  Accept All
                </button>
                
                <button
                  onClick={handleRejectAll}
                  style={{
                    background: 'transparent',
                    color: 'var(--cream)',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    border: '1px solid var(--gold)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'var(--font-cinzel)'
                  }}
                >
                  Reject All
                </button>
                
                <button
                  onClick={() => setShowPreferences(true)}
                  style={{
                    background: 'transparent',
                    color: 'var(--cream)',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    border: '1px solid var(--cream)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'var(--font-lora)'
                  }}
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CookiePreferences onSave={handleSavePreferences} onClose={() => setShowPreferences(false)} />
      )}
    </>
  );
}

function CookiePreferences({ onSave, onClose }: { onSave: (analytics: boolean) => void; onClose: () => void }) {
  const [analytics, setAnalytics] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--cream)',
        borderRadius: '8px',
        padding: '32px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h3 style={{fontSize: '24px', marginBottom: '16px', color: 'var(--dark-brown)', fontFamily: 'var(--font-cinzel)'}}>
          Cookie Preferences
        </h3>
        
        <div style={{marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <div>
              <strong style={{display: 'block', marginBottom: '4px'}}>Essential Cookies</strong>
              <p style={{fontSize: '14px', color: '#666', margin: 0}}>Required for the website to function</p>
            </div>
            <span style={{color: 'var(--dark-gold)', fontWeight: 'bold'}}>Always Active</span>
          </div>
        </div>
        
        <div style={{marginBottom: '24px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <div>
              <strong style={{display: 'block', marginBottom: '4px'}}>Analytics Cookies</strong>
              <p style={{fontSize: '14px', color: '#666', margin: 0}}>Help us improve our website</p>
            </div>
            <label style={{position: 'relative', display: 'inline-block', width: '50px', height: '26px'}}>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                style={{opacity: 0, width: 0, height: 0}}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: analytics ? 'var(--dark-gold)' : '#ccc',
                borderRadius: '26px',
                transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: analytics ? '27px' : '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.3s'
                }} />
              </span>
            </label>
          </div>
        </div>
        
        <div style={{display: 'flex', gap: '12px'}}>
          <button
            onClick={() => onSave(analytics)}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #a67c00, #d4af37, #a67c00)',
              color: 'var(--dark-brown)',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'var(--font-cinzel)'
            }}
          >
            Save Preferences
          </button>
          
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: 'transparent',
              color: 'var(--dark-brown)',
              padding: '12px 24px',
              borderRadius: '6px',
              border: '1px solid var(--dark-brown)',
              cursor: 'pointer',
              fontFamily: 'var(--font-lora)'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}