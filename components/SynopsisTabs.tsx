"use client";

import { useState } from "react";

type Angle = {
  key: string;
  label: string;
  note: string;
  w25: string;
  w100: string;
  w300: string[];
};

const ANGLES: Angle[] = [
  /* ---------------------------------------------------------------- */
    {
    key: "film",
    label: "The film",
    note: "The straight description. Start here if you are covering it as a film.",
    w25: "The first family food documentary. Animated, funny, and built for three generations on one sofa — because families shop together, eat together, and never learn about food together.",
    w100:
      "Families shop together, cook together and eat together. They almost never learn about food together. Food education arrives separately and in pieces — a lesson at school, a leaflet at the surgery, a headline that contradicts last year's. Which Food Is Killing You? is the first food documentary made for the whole family at once. Four foods stand trial, and everyone in the room sits on the jury: the ten-year-old, the teenager, the parents and the grandparents, hearing the same evidence at the same time and arguing about the verdict. Animated, ninety minutes, and food education disguised as an argument worth having.",
    w300: [
      "Families shop together. They cook together, eat together and get ill in the same ways. What they never do is learn about food together.",
      "Food education arrives in pieces, and always to one person at a time. A lesson at school the parents never hear. A leaflet at the surgery the children never see. A headline that reverses what the last one said. Everybody in the house is being told something different about the same dinner.",
      "Which Food Is Killing You? is the first food documentary made for all of them at once.",
      "The structure is a murder trial. Four foods stand accused, the witnesses contradict each other, and the room sits on the jury. Questions appear during the film and each person commits to an answer before the evidence continues — the ten-year-old, the teenager, the parents and the grandparents, all deciding at the same moment and finding out they disagree.",
      "That disagreement is the point. A child told what to eat forgets it by Thursday. A child who argued about it with their grandmother, in front of everyone, and then watched the evidence go the other way, remembers what changed their mind.",
      "It is one subject at three ages. Children are heavier and sicker than any generation before them. Teenagers are facing rates of anxiety and depression nobody can fully explain. Their grandparents are living longer with more chronic inflammatory disease, not less. The film's argument is that these are the same story arriving at different times of life — and it makes that case with the whole family in the room rather than to each of them separately.",
      "It is animated, and deliberately so. The subject is heavy; the film is not. A fourteen-year-old follows every step of the argument and laughs at the pirates. So does their grandmother, and by the second question the two of them are arguing about butter.",
      "Ninety minutes, one sofa, three generations. Written and directed by Colin Marry, an Irish pig farmer with an MSc in Agricultural Economics and no filmmaking background, working alone for a year.",
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    key: "health",
    label: "Health",
    note: "For health and science desks. The film advances an original argument, and says so.",
    w25: "A documentary that advances an original hypothesis about chronic inflammatory disease — and publishes every claim it makes with a source and a status.",
    w100:
      "Three out of five people die from chronic inflammatory disease. Ask which food is responsible and you get ten confident answers, each with studies attached. They cannot all be right. Which Food Is Killing You? argues that the question has been asked wrongly: the suspects have been examined one at a time for sixty years, and never together. Its central claim is that engineered additives drive overconsumption of both seed oil and refined carbohydrate, and that the interaction — not any single culprit — produces chronic inflammation. The argument is the director's own, unpublished and un-peer-reviewed, and the film says so.",
    w300: [
      "Three out of five people die from chronic inflammatory disease — heart disease, stroke, cancer, diabetes. It is the quietest killer there is, because it never appears on a death certificate. It arrives across decades and by the time it has a name it has been at work for thirty years.",
      "Its drivers are lifestyle. The largest lifestyle factor, for most of us, is food. So which food is it?",
      "Ask ten people and you get ten confident answers — sugar, seed oils, red meat, refined carbohydrates, ultra-processed food. Each arrives with studies attached and researchers prepared to stake their reputation on it. They cannot all be right, and why they cannot all be right is the subject of this film.",
      "Which Food Is Killing You? argues the question has been asked wrongly. The suspects have been examined one at a time for sixty years and never examined together. Its central proposition is that engineered additives drive overconsumption of both seed oil and refined carbohydrate; that the seed oil loads tissue with polyunsaturated fat which is uniquely vulnerable to oxidation; that the excess carbohydrate overloads energy production and generates the free radicals; and that the two together — abundant vulnerable fat and an abundant source of attack — produce chronic inflammation. Neither alone is sufficient.",
      "That argument is original and unproven. It has not been published, tested or peer-reviewed, and the film states this plainly rather than implying otherwise.",
      "Every substantive claim in the film is published at poshpork.com/press, marked as consensus, contested, or the director's own synthesis, with a source for each. Fifty-two claims are listed. Two are marked as original arguments.",
      "The director is not a clinician or a nutrition scientist. He holds an MSc in Agricultural Economics and made the film alone over a year. He welcomes correction and publishes it.",
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    key: "education",
    label: "Food education",
    note: "For education desks. The interactive format is the pedagogy, not a gimmick.",
    w25: "A ninety-minute film that teaches children how to weigh evidence, by making them commit to an answer before they learn whether they were right.",
    w100:
      "Most food education arrives as a list of rules to obey — five a day, less sugar — and rules given without reasons do not survive contact with a vending machine. Which Food Is Killing You? arrives as a mystery to solve. Four foods stand trial and the class sits on the jury. Questions appear during the film; each viewer takes the position of a jury member and gets to decide who is innocent or guilty. The lesson is not nutrition but epistemics: how studies get funded, how a strong claim differs from a loud one, how to notice your own mind changing. Those skills outlast any particular dietary advice.",
    w300: [
      "A child will eat roughly twenty thousand meals before they leave home. Almost none of those decisions will be theirs, and almost none will be explained.",
      "Food education, where it exists, arrives as a list of rules. Five a day. Less sugar. More vegetables. Rules given without reasons do not last, because a child who does not understand why has nothing to hold when the packet is in front of them.",
      "Which Food Is Killing You? does something different. Four foods stand trial. The class sits on the jury. The evidence is laid out, the witnesses contradict each other, and the room has to decide who is guilty — before the film says whether they were right.",
      "That order matters more than any fact in the film. A child told the answer forgets it by Thursday. A child who committed to an answer, argued about it in front of their friends, and then watched the evidence go the other way remembers what changed their mind. Commitment before revelation is the mechanism, and it is the only part of the film that could not be done in a book.",
      "In a classroom the format is built around tables of four. Everyone joins on their phone with a room code, and each table submits one answer — so they have to talk it through and agree. Anyone at the table can change it, and everyone can see who did. Where phones are not permitted, a show-of-hands mode does the same job.",
      "The subject is nutrition. The lesson is evidence: how studies get funded, how consensus differs from controversy, how to tell a strong claim from a loud one.",
      "The film publishes all fifty-two of its own claims with sources and a status — consensus, contested, or the director's own synthesis. For older groups, auditing that table is itself the exercise.",
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    key: "founder",
    label: "Farmer to solopreneur",
    note: "The human story. Liquidation, rebuild, one person and a laptop.",
    w25: "An Irish pig farmer lost his business in 2023, then spent a year alone at a kitchen table making a feature film to argue the case he could not afford to advertise.",
    w100:
      "In 2018 Colin Marry fed his pigs on olive pomace — the pulp left after olives are pressed — and produced meat that reached shops in six countries. Then feed prices doubled after the invasion of Ukraine, and the supermarkets he approached to save the business turned him down for a reason he never forgot: nobody has heard of you. Olive Pork was liquidated in 2023 and creditors lost money. The refusal contained the answer. The product was never the problem — the problem was that nobody was making the case for real food. So he made it himself, alone, in a year.",
    w300: [
      "Colin Marry took over a family pig farm in Ireland in his twenties and spent years working out why it had stopped paying for itself. The answer had nothing to do with farming. Nobody buying the food had any idea what it took to produce, or why one piece of meat was not the same as another. The gap was not in the field. It was in the mind of whoever stood in the supermarket aisle deciding.",
      "In 2018 he tried to close it. He fed his pigs on olive pomace — the pulp left over when olives are pressed for oil, a waste product nobody wanted — and produced meat that chefs called sensational. He learned butchery, distribution, export. Olive Pork reached shops in six countries.",
      "Then Russia invaded Ukraine, feed prices doubled, and the European pig industry collapsed. He went to the supermarkets to save it. They said no, and told him plainly why: nobody has heard of you. The company was liquidated in 2023. Creditors lost money. He says so in the film, out loud, under oath, through a cartoon pig.",
      "The refusal was the answer he had been circling for a decade. The product was never the problem. The problem was that the largest food companies on earth spend billions a year telling people what to eat, and real food replies with a label and a hope.",
      "So he made the case himself. A year, seven hours a day, starting at half past four each morning. No studio, no crew, no budget, and no filmmaking experience of any kind. Every frame of the animation was generated with AI; the script was written word for word by him.",
      "He holds an MSc in Agricultural Economics from the University of London. He is not a nutrition scientist, a clinician or a filmmaker, and says so on the film's own press page.",
      "It may be the first feature-length documentary animated this way.",
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    key: "originality",
    label: "Originality",
    note: "For film, animation and technology desks. What is formally new here.",
    w25: "An animated documentary that advances an original hypothesis, sets its crime scene inside the human body, and lets the audience deliver the verdict.",
    w100:
      "Documentaries transmit arguments that already exist. This one advances two of its own — and marks them, on its own press page, as unproven. That inversion is unusual. So is the form: the crime scene is inside the body, so the metaphor is not decorative but structural; the suspects are characters, so a mechanism becomes a plot; and the viewer commits to an answer before the reveal, so their own change of mind is the thing they experience. It was made by one person over a year using AI animation, in a period when animation box office hit records while a third of Animation Guild members were laid off.",
    w300: [
      "Food documentaries transmit positions. They assemble a case that already exists in the literature and argue for it. Which Food Is Killing You? does something rarer: it advances two original hypotheses of its own, and then publishes a table marking both as unproven, un-peer-reviewed and the director's own.",
      "Making a bold claim is common. Making one and simultaneously handing the audience the tools to check it is not. That combination is the film's actual novelty.",
      "The form is where the invention sits. A courtroom framing is familiar, but here the crime scene is inside the human body — which makes the metaphor structural rather than decorative, because the evidence the jury examines is the pathology itself. The suspects are characters with motives, which converts a biochemical mechanism into a plot, and audiences remember who did it where they do not remember a diagram. The digestive journey gives the film a physical spine rather than a chronological one, so it has forward motion even through the biochemistry.",
      "And the audience is not a spectator. Questions appear during the film and viewers get to take their seat on the jury, deciding who is innocent and who is guilty. The film ends on a verdict the audience delivers rather than one it is given.",
      "It was made by one person over a year, working seven hours a day from half past four each morning, with no studio, crew or budget. Every frame of animation was generated with AI. The script was written word for word by the director.",
      "It arrives at a particular moment. Animation took the top two slots at the 2025 box office and its first $2 billion title, while global children's television commissions fell 18% and a third of Animation Guild members were laid off in a single year.",
      "It may be the first feature-length documentary animated this way. The director would rather be corrected than overstate it.",
    ],
  },
];

export default function SynopsisTabs() {
  const [active, setActive] = useState(ANGLES[0].key);
  const angle = ANGLES.find((a) => a.key === active) ?? ANGLES[0];

  return (
    <div>
      <p style={intro}>
        The same film, five ways in. Pick whichever fits your desk &mdash; all of it is
        free to use and none of it needs attribution.
      </p>

      {/* TABS */}
      <div style={tabRow} role="tablist" aria-label="Story angles">
        {ANGLES.map((a) => {
          const on = a.key === active;
          return (
            <button
              key={a.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(a.key)}
              style={{
                ...tab,
                color: on ? "#d4af37" : "#e8e2d5",
                opacity: on ? 1 : 0.5,
                borderBottomColor: on ? "#d4af37" : "transparent",
              }}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      <p style={noteStyle}>{angle.note}</p>

      {/* CONTENT */}
      <div>
        <h3 style={h3}>25 words</h3>
        <p style={para}>{angle.w25}</p>

        <h3 style={h3}>100 words</h3>
        <p style={para}>{angle.w100}</p>

        <h3 style={h3}>300 words</h3>
        {angle.w300.map((p, i) => (
          <p key={i} style={para}>{p}</p>
        ))}
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const intro: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  margin: "0 0 28px",
  maxWidth: "62ch",
  opacity: 0.8,
};

const tabRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "4px 20px",
  borderBottom: "1px solid rgba(232,226,213,.15)",
  marginBottom: "18px",
};

const tab: React.CSSProperties = {
  background: "none",
  border: "none",
  borderBottom: "2px solid transparent",
  padding: "10px 0 12px",
  fontFamily: "Cinzel, serif",
  fontSize: "14px",
  letterSpacing: ".04em",
  cursor: "pointer",
  whiteSpace: "nowrap",
  marginBottom: "-1px",
};

const noteStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.6,
  opacity: 0.55,
  margin: "0 0 30px",
  maxWidth: "62ch",
};

const h3: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "15px",
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: 0.75,
  margin: "32px 0 12px",
};

const para: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  margin: "0 0 16px",
  maxWidth: "64ch",
};
