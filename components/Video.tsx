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

        
    </section>
  );
}