import GiftButton from "@/components/GiftButton";

export default function Suspects() {
  return (
    <section style={{ background: "#141414", padding: "110px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <p style={eyebrow}>The suspects</p>

        <h2 style={heading}>Four foods stand accused</h2>

        <img
          src="/og-image.jpg"
          alt="The suspects: Mr Carbohydrates, Mr Vegetable Oils, Lady Posh Pork and The Bliss Brothers"
          style={{
            width: "100%", maxWidth: "900px", height: "auto",
            borderRadius: "8px", margin: "0 auto 48px",
            border: "1px solid rgba(212,175,55,.25)",
          }}
        />

        <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#b0b0b0", maxWidth: "620px", margin: "0 auto 20px" }}>
          One of them has carried the blame for sixty years. She says the evidence was never
          sound, and she is asking for a retrial.
        </p>

        <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#b0b0b0", maxWidth: "620px", margin: "0 auto 44px" }}>
          Follow the clues, one by one, to a place nobody has stood before: a crime scene
          inside your own body — and a new theory about who was in the room.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
          <a href="/movie" style={primaryCta}>Take your seat on the jury — €15</a>
          <GiftButton />
        </div>

        <p style={{ fontSize: "14px", color: "#777", marginTop: "22px" }}>
          1 hour 26 minutes. One payment, permanent access.
        </p>
      </div>
    </section>
  );
}

const eyebrow: React.CSSProperties = {
  fontFamily: "Cinzel, serif", fontSize: "13px", letterSpacing: "0.3em",
  textTransform: "uppercase", color: "#d4af37", marginBottom: "20px",
};

const heading: React.CSSProperties = {
  fontFamily: "Cinzel, serif", fontSize: "clamp(30px,4.5vw,44px)",
  fontWeight: "bold", color: "#ffffff", marginBottom: "40px", lineHeight: 1.2,
};

const primaryCta: React.CSSProperties = {
  display: "inline-block", padding: "20px 44px",
  fontFamily: "Cinzel, serif", fontSize: "18px", fontWeight: "bold",
  color: "#0a0a0a",
  background: "linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)",
  borderRadius: "8px", textDecoration: "none",
  boxShadow: "0 8px 24px rgba(212, 175, 55, 0.3)",
};