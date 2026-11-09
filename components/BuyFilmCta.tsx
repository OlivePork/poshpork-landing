import BuyButton from "@/components/BuyButton";

/**
 * The purchase control used on the film page.
 * The label stays "Buy the film". Checkout is the POST to /api/checkout
 * inside BuyButton, which is the same call /movie makes.
 */
export default function BuyFilmCta() {
  return (
    <div
      className="article-cta"
      style={{
        background: "#1a1a1a",
        marginTop: "64px",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      <BuyButton label="Buy the film" />
      <p
        style={{
          maxWidth: "40rem",
          margin: "22px auto 0",
          fontFamily: "Georgia, serif",
          fontSize: "17px",
          lineHeight: 1.6,
          color: "#f2ece1",
        }}
      >
        This site sells the film Which Food Is Killing You?{" "}
        <a href="/movie" style={{ color: "#f2ece1" }}>
          The film page
        </a>{" "}
        shows the price and uses this same checkout.
      </p>
    </div>
  );
}
