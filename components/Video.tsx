export default function Video() {
  return (
    <section className="relative" style={{
      background: 'var(--charcoal)',
      padding: '80px 20px'
    }}>
      <div className="max-w-4xl mx-auto">
        
        {/* Video container */}
        <div className="relative" style={{
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=example"
            title="Posh Pork Mystery Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
          />
        </div>

      </div>
    </section>
  );
}