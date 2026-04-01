export default function Video() {
  return (
    <section style={{background: 'var(--charcoal)', padding: '0', margin: '0'}}>
      
      <div className="max-w-6xl mx-auto px-4" style={{paddingTop: '40px', paddingBottom: '0'}}>
        
        {/* Video */}
        <div className="relative rounded-lg overflow-hidden mb-10" style={{ paddingBottom: '37.5%', maxWidth: '900px', margin: '0 auto', border: '1px solid var(--gold)' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/sWlohn79hww"
            title="The Posh Pork Murder Mystery Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Text content below video */}
        <div className="text-center max-w-2xl mx-auto" style={{paddingBottom: '0', marginBottom: '0'}}>
          <p className="text-xl mb-6" style={{color: 'var(--cream)', opacity: 0.85}}>
            Join the jury. Examine the evidence. Cast your verdict.
          </p>

          <p className="text-xl" style={{color: 'var(--cream)', opacity: 0.75, marginBottom: '0'}}>
            A groundbreaking new tourism experience in Mallorca. Book now to be among the first to experience it, shape its evolution, and help create something truly original.
          </p>
        </div>

      </div>
    </section>
  );
}