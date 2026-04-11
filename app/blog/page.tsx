import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog - Posh Pork Murder Mystery',
  description: 'Latest news and updates about The Posh Pork Murder Mystery experience in Mallorca',
};

export default function BlogPage() {
  return (
    <>
      <section style={{background: 'var(--charcoal)', paddingTop: '100px', paddingBottom: '80px'}}>
        <div style={{width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 20px'}}>
          
          <h1 className="text-5xl font-bold mb-6 text-center" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
            Posh Pork Blog
          </h1>
          <p className="text-xl text-center mb-12" style={{color: 'var(--cream)', opacity: 0.8}}>
            News, updates, and insights from the investigation
          </p>

          <div className="parchment rounded-lg p-8 mb-6" style={{border: '2px solid var(--gold)'}}>
            <Link href="/blog/summer-2026-launch" style={{textDecoration: 'none'}}>
              <h2 className="text-3xl font-bold mb-4" style={{color: 'var(--gold)', fontFamily: 'var(--font-cinzel)'}}>
                Interactive Entertainment Comes to Llucmajor This Summer
              </h2>
              <p className="text-lg mb-4" style={{color: 'var(--dark-brown)', lineHeight: '1.6'}}>
                A groundbreaking food investigation experience launches in the Llucmajor area this July. Sixteen guests, four tables, 90 minutes of mystery. Join the jury, examine the evidence, and decide which food is truly guilty...
              </p>
              <span style={{color: 'var(--dark-gold)', fontWeight: 'bold'}}>Read More →</span>
            </Link>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}