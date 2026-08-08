export const metadata = {
  title: "The man who made it | Which Food Is Killing You?",
  description:
    "An Irish pig farmer lost his business, and spent a year making an animated feature film about what food does inside a human body.",
};

export default function AboutPage() {
  return (
    <main style={{ background: "#f5f1e8", paddingTop: "80px", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
        <article style={{ fontFamily: "Georgia, serif", color: "#2c1810", lineHeight: 1.85 }}>
          <p style={{
            fontFamily: "Cinzel, serif", fontSize: "12px", letterSpacing: ".3em",
            textTransform: "uppercase", color: "#a67c00", margin: "0 0 20px",
          }}>
            The man who made it
          </p>

          <h1 style={{
            fontFamily: "Cinzel, serif", fontSize: "clamp(32px,5vw,46px)",
            lineHeight: 1.15, color: "#d4af37", margin: "0 0 40px",
          }}>
            His parents died, and the farm was his.
          </h1>

          <p style={p}>
            He was in his twenties. Irish, one of several siblings, and suddenly responsible
            for a farm that had fed a family for generations and could no longer feed itself.
            Farming was breaking everywhere around him — good animals, decent people, prices
            that made no sense. He spent years working out why, and came to an answer that had
            nothing to do with farming: nobody eating the food had any idea what it took to
            make it, or why one piece of meat was not the same as another. The gap was not in
            the field. It was in the mind of whoever stood in the aisle deciding.
          </p>

          <p style={p}>So he tried to close it.</p>

          <p style={p}>
            In 2018 he made Olive Pork. He fed his pigs on olive pomace — the pulp left over
            when olives are pressed for oil, a waste product nobody wanted — and it produced
            meat that chefs called <em>sensational</em>. He put flax in the feed to raise the
            omega-3. He learned butchery, distribution, export. He got it into shops in
            Ireland, the UK, Italy, Hong Kong, Singapore and Vietnam. It was the best pork he
            had ever tasted, and he had spent his life around pigs.
          </p>

          <p style={p}>
            Then Russia invaded Ukraine, feed prices doubled, and the European pig industry
            fell apart. He went to the supermarkets to expand — to save the project, and the
            business with it. They turned him down, and they were honest about why: nobody has
            heard of you.
          </p>

          <p style={p}>
            The company was liquidated. People he owed money to lost it. He has never dressed
            that up — it is in this film, said out loud, under oath, by a cartoon pig who used
            to be called Olive Pork.
          </p>

          <p style={pullQuote}>He could have stopped there. Most people do.</p>

          <p style={p}>
            But the refusal had handed him the answer he had been circling for a decade. The
            product was never the problem. The problem was that the biggest food companies on
            earth spend billions a year telling people what to eat, and real food replies with
            a label and a hope. Nobody was making the case. Not properly, not to anyone who
            wasn&apos;t already listening.
          </p>

          <p style={p}>So he decided to make it himself.</p>

          <p style={p}>
            He wanted one thing, very specifically: three generations of a family on the same
            sofa. A child, a parent, a grandparent — watching together, laughing at the same
            jokes, arguing about the answers, telling each other things about food that none of
            them knew an hour earlier. Not a lecture anyone endures for their own good. A night
            in, that happens to change what goes in the trolley on Saturday.
          </p>

          <p style={p}>
            Because the numbers at both ends of that sofa are going the wrong way. Children are
            heavier and sicker than any generation before them. Their grandparents are living
            longer with more disease, not less. If enough people genuinely understood what food
            does inside a body — not as a rule to obey, but as a thing they had seen for
            themselves — both of those numbers move.
          </p>

          <p style={pullQuote}>That is what this film is for.</p>

          <p style={p}>
            He had no studio, no crew, no money and no experience. He had a laptop, tools that
            had only existed for about a year, and an alarm set for half past four every
            morning. Seven hours a day, every day, before the rest of life started. It took a
            year.
          </p>

          <p style={p}>This is it.</p>

          <p style={p}>
            He is not a doctor and has never claimed to be. There is nobody behind him and
            nobody paying him. Posh Pork does not exist in a single shop.
          </p>

          <p style={{ ...p, fontSize: "24px", fontFamily: "Cinzel, serif", color: "#d4af37", marginTop: "40px" }}>
            Not yet.
          </p>

          <div style={{ textAlign: "center", marginTop: "70px" }}>
            <a href="/movie" style={cta}>Watch the Film — €15</a>
          </div>
        </article>
      </div>
    </main>
  );
}

const p: React.CSSProperties = { fontSize: "18px", marginBottom: "26px" };

const pullQuote: React.CSSProperties = {
  fontSize: "23px",
  fontFamily: "Cinzel, serif",
  color: "#a67c00",
  margin: "44px 0",
  textAlign: "center",
  lineHeight: 1.4,
};

const cta: React.CSSProperties = {
  display: "inline-block",
  padding: "20px 44px",
  background: "linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)",
  color: "#0a0a0a",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "19px",
  fontFamily: "Cinzel, serif",
  boxShadow: "0 8px 24px rgba(212, 175, 55, 0.3)",
};