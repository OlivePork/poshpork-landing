export default function TermsAndConditions() {
  return (
    <div style={{background: 'var(--cream)', minHeight: '100vh', padding: '60px 20px'}}>
      <div style={{maxWidth: '800px', margin: '0 auto', color: 'var(--dark-brown)'}}>

        <h1 style={{fontSize: '48px', marginBottom: '20px', color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
          Terms &amp; Conditions
        </h1>

        <p style={{marginBottom: '40px', fontSize: '14px', opacity: 0.7}}>
          Last updated: August 13, 2026
        </p>

        {/* ============================================================
            TRADER IDENTIFICATION — required by Spanish LSSI-CE.
            DO NOT PUBLISH until the autónomo registration is complete
            and the address below is replaced with a real establishment
            address you are content to be legally served at.
            A parcel-shop address is not suitable.
            ============================================================ */}
        <section style={{
          marginBottom: '40px',
          padding: '24px',
          background: 'rgba(212,175,55,0.10)',
          borderLeft: '3px solid var(--gold)'
        }}>
          <h2 style={sectionHeading}>Who we are</h2>
          <p style={para}>
            <strong>Trader:</strong> Colin Marry<br/>
            <strong>Trading as:</strong> Posh Pork<br/>
            <strong>NIF:</strong> Z4356082W<br/>
            <strong>Registered address:</strong> [ADDRESS PENDING — see note below]<br/>
            <strong>Email:</strong> mystery@poshpork.com
          </p>
          <p style={{...para, fontSize: '13px', opacity: 0.75, marginBottom: 0}}>
            Colin Marry trades as a sole trader (autónomo) registered in Spain.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>1. What these terms cover</h2>
          <p style={para}>
            These Terms &amp; Conditions govern your purchase of and access to <em>Which Food Is Killing You?
            Inside the Greatest Fraud In Human History</em> (&quot;the Film&quot;) through poshpork.com
            (&quot;the Site&quot;).
          </p>
          <p style={para}>
            By purchasing or viewing the Film you agree to be bound by these terms. If you do not agree with
            them, please do not purchase.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>2. What you are buying</h2>
          <p style={para}>
            The Film is a feature-length documentary of approximately 1 hour 27 minutes, with optional
            interactive questions that appear during playback. On purchase you receive:
          </p>
          <ul style={list}>
            <li>A personal, non-exclusive, non-transferable licence to stream the Film for private,
                non-commercial viewing</li>
            <li>Unlimited repeat viewing for as long as we make the Film available on the Site
                (see section 7)</li>
            <li>Access for your household, as defined in section 4</li>
          </ul>
          <p style={para}>
            The Film is streamed only. No downloadable copy is provided, and no physical media is supplied.
          </p>
          <p style={para}>
            The Film is educational and journalistic in nature. It is not medical, nutritional or dietary
            advice, and nothing in it should be relied upon in making decisions about your health. Always
            consult a qualified professional.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>3. Price and payment</h2>
          <p style={para}>
            The Film is priced at €15 as a single payment. Prices are in euros and include applicable VAT.
            Payment is processed securely by Stripe; we do not store your card details.
          </p>
          <p style={para}>
            Your purchase is confirmed on successful payment, and you will receive a confirmation email
            containing your access details. If you do not receive it within one hour, check your spam folder
            and then contact us.
          </p>
          <p style={para}>
            Gift purchases are made on the same terms. The recipient of a gift is bound by these terms once
            they redeem their access.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>4. Your household, and what you may not do</h2>
          <p style={para}>
            <strong>4.1 Household viewing.</strong> One purchase covers the members of your household —
            people who normally live with you at the same address. You may watch together on one screen or
            on separate devices. To support this, your account permits a limited number of simultaneous
            streams. We may suspend access where usage clearly exceeds normal household use.
          </p>
          <p style={para}>
            <strong>4.2 What you may not do.</strong> You may not:
          </p>
          <ul style={list}>
            <li>Share your login credentials with anyone outside your household</li>
            <li>Record, download, copy, screen-capture or re-upload the Film, in whole or in part</li>
            <li>Show the Film to any audience outside your household, whether or not you charge admission —
                this includes schools, workplaces, clinics, libraries, community groups, clubs and events</li>
            <li>Sell, rent, sub-licence or otherwise transfer your access</li>
            <li>Use the Film or any part of it for any commercial purpose</li>
          </ul>
          <p style={para}>
            <strong>4.3 Group and educational screenings.</strong> Screenings outside a household require a
            separate licence. We offer these and are glad to arrange them — contact us at
            mystery@poshpork.com.
          </p>
          <p style={para}>
            We may suspend or terminate access, without refund, where these terms are breached.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>5. Refunds</h2>
          <p style={para}>
            <strong>5.1 Your statutory right.</strong> As a consumer in the EU you have 14 days from purchase
            to withdraw and receive a full refund, without giving a reason. Email us with your order details
            and we will refund you.
          </p>
          <p style={para}>
            <strong>5.2 Technical problems.</strong> If you cannot access the Film because of a fault on our
            side and we cannot resolve it within a reasonable time, you are entitled to a full refund. Tell
            us what is happening and we will try to fix it first.
          </p>
          <p style={para}>
            <strong>5.3 Beyond 14 days.</strong> Refunds after this period are at our discretion. We would
            rather hear from an unhappy viewer than not — please write to us.
          </p>
          <p style={para}>
            Refunds are issued to the original payment method within 14 days of being agreed.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>6. Accounts and access</h2>
          <p style={para}>
            You are responsible for keeping your login credentials confidential and for all activity under
            your account. Tell us promptly if you believe your account has been accessed by someone else.
          </p>
          <p style={para}>
            You must provide a valid email address. If you lose access to it, contact us and we will try to
            help, but we may be unable to restore access where we cannot verify the purchase.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>7. Availability of the Film</h2>
          <p style={para}>
            We intend to keep the Film available indefinitely, and describe your access as permanent on that
            basis. However, we cannot guarantee that the Site or the streaming service will remain available
            forever, and access depends on services we do not control.
          </p>
          <p style={para}>
            <strong>If we ever decide to withdraw the Film from sale or discontinue the Site, we will give
            existing purchasers at least 90 days&apos; notice by email</strong>, so that you have a final
            opportunity to watch.
          </p>
          <p style={para}>
            We may carry out maintenance, make improvements, or change the interactive questions from time to
            time. We do not warrant that the service will be uninterrupted or error-free.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>8. Interactive questions and your answers</h2>
          <p style={para}>
            The Film includes optional questions, and a closing verdict on each of the four suspects. Your
            answers are recorded against your account and shown to other viewers only in aggregate as a
            running tally. We do not publish or share individual answers, and no viewer can see how another
            has voted. The questions can be switched off, and doing so does not affect the Film.
          </p>
          <p style={para}>
            See our <a href="/privacy" style={link}>Privacy Policy</a> for how we handle this data.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>9. Intellectual property</h2>
          <p style={para}>
            The Film, together with all content, characters, storylines, artwork, music and designs within
            it, is the property of Colin Marry trading as Posh Pork and is protected by copyright and other
            intellectual property laws. Your purchase grants a licence to view, not any transfer of
            ownership.
          </p>
          <p style={para}>
            Sources cited on screen remain the property of their respective owners and are used for the
            purposes of review, criticism and comment.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>10. Age</h2>
          <p style={para}>
            Purchases must be made by a person aged 18 or over. Once purchased, the Film may be watched by
            anyone in the household, including children and teenagers — it contains no material unsuitable
            for a general audience and is intended to be watched by families together.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>11. Disclaimers and liability</h2>
          <p style={para}>
            <strong>11.1 Nature of the Film.</strong> The Film presents evidence, argument and interpretation
            on a contested subject. It is offered as entertainment and education, not as professional advice
            of any kind. It should not be used to diagnose, treat or make decisions about any medical
            condition.
          </p>
          <p style={para}>
            <strong>11.2 Accuracy.</strong> We have taken care with the research and cite sources on screen so
            that you can examine them yourself. We do not warrant that all content is complete or free from
            error, and we welcome corrections.
          </p>
          <p style={para}>
            <strong>11.3 Limitation.</strong> To the fullest extent permitted by law, our total liability
            arising from your purchase shall not exceed the amount you paid. Nothing in these terms limits
            liability for death or personal injury caused by negligence, for fraud, or for any liability that
            cannot lawfully be excluded — including your statutory rights as a consumer.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>12. Disclosure of interest</h2>
          <p style={para}>
            The Film was written and directed by Colin Marry, a pig farmer, and was self-funded. It received
            no industry, commercial, institutional or advocacy funding, and no company had any involvement in
            or sight of its contents. The animation was generated using AI tools.
          </p>
          <p style={para}>
            Colin Marry may in future develop and sell food products, including pork products, under the Posh
            Pork name. No such product currently exists or is for sale. Your purchase of the Film creates no
            obligation to buy anything else, and if you have opted in to marketing we may contact you about
            future offerings. You can unsubscribe at any time.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>13. Privacy</h2>
          <p style={para}>
            Your use of the Site is subject to our <a href="/privacy" style={link}>Privacy Policy</a>, which
            explains how we collect, use and protect your personal data in compliance with the GDPR.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>14. Changes to these terms</h2>
          <p style={para}>
            We may modify these terms from time to time. Changes take effect when posted to this page and
            apply to purchases made after that date. Where a change materially affects existing purchasers,
            we will notify you by email.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>15. Governing law and disputes</h2>
          <p style={para}>
            These terms are governed by the laws of Spain, and disputes are subject to the courts of
            Mallorca, Spain. If you are a consumer resident in another EU member state, this does not deprive
            you of the protection of the mandatory consumer laws of your own country.
          </p>
          <p style={para}>
            EU consumers may also use the European Commission&apos;s Online Dispute Resolution platform:{' '}
            <a href="https://ec.europa.eu/consumers/odr" style={link}>ec.europa.eu/consumers/odr</a>
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>16. Severability</h2>
          <p style={para}>
            If any provision of these terms is found invalid or unenforceable, the remaining provisions
            continue in full force and effect.
          </p>
        </section>

        <section style={{marginBottom: '40px'}}>
          <h2 style={sectionHeading}>17. Contact</h2>
          <p style={para}>
            <strong>Email:</strong> mystery@poshpork.com<br/>
            <strong>Post:</strong> [ADDRESS PENDING]
          </p>
        </section>

        <div style={{marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(0,0,0,0.1)', textAlign: 'center'}}>
          <a href="/" style={link}>← Back to Home</a>
        </div>

      </div>
    </div>
  );
}

const sectionHeading: React.CSSProperties = {
  fontSize: '24px',
  marginBottom: '16px',
  color: 'var(--dark-brown)',
  fontFamily: 'var(--font-cinzel)'
};

const para: React.CSSProperties = {
  marginBottom: '16px',
  lineHeight: '1.8'
};

const list: React.CSSProperties = {
  marginBottom: '16px',
  marginLeft: '20px',
  lineHeight: '1.8'
};

const link: React.CSSProperties = {
  color: 'var(--dark-gold)',
  textDecoration: 'underline'
};
