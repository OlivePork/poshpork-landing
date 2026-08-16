export const metadata = {
  title: "Press | Which Food Is Killing You?",
  description:
    "Press materials, sources and screener access for Which Food Is Killing You? Inside the Greatest Fraud In Human History.",
};

/* ============================================================
   CLAIMS — timestamps verified against the final script.
   ============================================================ */

type Status = "Consensus" | "Contested" | "Synthesis";

const CLAIMS: { time: string; claim: string; status: Status; source: string }[] = [

  /* ---------------- THE CHARGE ---------------- */
  {
    time: "01:00",
    claim: "Three out of five people die from chronic inflammatory disease.",
    status: "Consensus",
    source: "Furman et al., Nature Medicine 25, 1822–1832 (2019). The paper groups stroke, chronic respiratory disease, heart disorders, cancer, obesity and diabetes as inflammation-related. It is a grouping of diseases in which inflammation plays a role, not deaths caused by inflammation alone.",
  },
  {
    time: "01:30",
    claim: "Inflammation damaging the blood vessels to the heart causes heart attacks; in the brain, stroke, dementia and Alzheimer's.",
    status: "Consensus",
    source: "Inflammation is an established component of atherosclerosis (Libby, Nature 2002) and of neurodegenerative pathology (Heneka et al., Lancet Neurology 2015).",
  },
  {
    time: "03:00",
    claim: "Saturated fat was blamed for heart attacks on the basis of studies that did not support the conclusion.",
    status: "Contested",
    source: "See the fuller entry at 45:00. One of the most actively disputed questions in nutrition science; the film argues one side of it.",
  },
  {
    time: "06:30",
    claim: "Nearly a million people alive today are aged 100 or over; researchers classify roughly the top fifth as 'escapers' who reach 100 without major age-related disease.",
    status: "Consensus",
    source: "UN Population Division: 935,000 centenarians worldwide in 2024, up from 23,000 in 1950. Estimates vary by source — some 2025 figures give ~630,000 — because age verification at the extreme end is unreliable. The escaper / delayer / survivor classification: Evert, Lawler, Bogan & Perls, Journals of Gerontology 58A (2003), New England Centenarian Study.",
  },

  /* ---------------- PROTEIN ---------------- */
  {
    time: "07:30",
    claim: "You would need to eat roughly three times the weight of plant food to obtain the protein in an equivalent portion of meat.",
    status: "Consensus",
    source: "Straightforward from food composition tables. Pork ~25g protein per 100g; cooked legumes ~8–9g; tofu ~8g.",
  },
  {
    time: "08:00",
    claim: "Plant protein is less available to the body than animal protein, and plant foods are typically limiting in at least one essential amino acid.",
    status: "Consensus",
    source: "FAO DIAAS scoring (2013). Cereals are limiting in lysine, legumes in methionine. Animal proteins score higher on digestibility and completeness.",
  },
  {
    time: "09:30",
    claim: "Phytic acid and tannins in plant foods bind minerals and reduce their absorption; they are also present in tea and coffee.",
    status: "Consensus",
    source: "Phytate inhibits zinc and iron absorption; tannins inhibit non-haem iron. Hurrell & Egli, American Journal of Clinical Nutrition 91 (2010).",
  },
  {
    time: "10:00",
    claim: "In 1960s Iran, villagers eating adequate zinc suffered deficiency because unleavened bread's phytate blocked absorption; fermented bread did not have the same effect.",
    status: "Consensus",
    source: "Prasad et al. (1961, 1963) on zinc deficiency and dwarfism in Iranian villagers. Leavening and fermentation reduce phytate content.",
  },
  {
    time: "11:00",
    claim: "Children's average height has stalled in some countries, including the UK, while children elsewhere continue to grow taller.",
    status: "Consensus",
    source: "NCD Risk Factor Collaboration, Lancet 396 (2020). UK height ranking has fallen relative to comparable countries over recent decades.",
  },
  {
    time: "12:00",
    claim: "The liver can regrow in three to five years, and skin renews in a month.",
    status: "Consensus",
    source: "Heinke et al., Cell Systems 13 (2022) used retrospective radiocarbon birth dating to show human hepatocytes turn over continuously throughout life, keeping the liver an average age of under three years, independent of the person's age. Skin epidermal turnover is ~28–40 days. The film's three-to-five-year range sits at the upper end of the measured average.",
  },

  /* ---------------- FAT ---------------- */
  {
    time: "13:00",
    claim: "The human body has no requirement for carbohydrate, but does require fat.",
    status: "Consensus",
    source: "Institute of Medicine, Dietary Reference Intakes (2005): the lower limit of dietary carbohydrate compatible with life is apparently zero, provided adequate protein and fat are consumed. Linoleic acid and alpha-linolenic acid are classified as essential fatty acids.",
  },
  {
    time: "14:30",
    claim: "Industrially produced trans fats directly caused heart attacks and have since been banned.",
    status: "Consensus",
    source: "WHO REPLACE initiative (2018); FDA revocation of GRAS status for partially hydrogenated oils (2015); Mozaffarian et al., New England Journal of Medicine 354 (2006).",
  },
  {
    time: "15:00",
    claim: "Nine in ten people are now deficient in omega-3.",
    status: "Consensus",
    source: "Stark et al., Progress in Lipid Research 63 (2016) and the 2024 world map update: only the Sea of Japan, Scandinavia and some non-Westernised populations average above an Omega-3 Index of 8%. Direct measurement found 95% of US family physicians (Current Developments in Nutrition) and 98% of a US/German sample (Nutrients) below 8%. Note that 8% is Harris and von Schacky's proposed cardioprotective target, not a formally established clinical deficiency threshold — no such threshold exists for EPA and DHA.",
  },
  {
    time: "15:30",
    claim: "Omega-3 is anti-inflammatory; omega-6 in excess is not.",
    status: "Consensus",
    source: "EPA and DHA are precursors to resolvins and protectins, which actively resolve inflammation (Serhan, Nature 510, 2014). The inflammatory consequences of high omega-6 intake specifically are more debated than the anti-inflammatory role of omega-3.",
  },
  {
    time: "16:00",
    claim: "Pork fat contains omega-3 as well as saturated fat.",
    status: "Contested",
    source: "True but quantitatively marginal. Pork fat contains small amounts of alpha-linolenic acid and, depending on the animal's feed, trace EPA and DHA. It is not a meaningful omega-3 source compared with oily fish. The film's wider point — that removing animal fat also removes these fats — holds; the implication that pork is a comparable source does not.",
  },
  {
    time: "16:15",
    claim: "Vegetables contain no oil; seed oils are named misleadingly.",
    status: "Consensus",
    source: "A naming point rather than a scientific one, and accurate. 'Vegetable oil' is extracted from seeds — soybean, rapeseed, sunflower, cottonseed — not from vegetables.",
  },
  {
    time: "18:00",
    claim: "Low omega-3 status carries a mortality risk comparable to smoking — a loss of ten, if not twenty, years.",
    status: "Contested",
    source: "McBurney et al., American Journal of Clinical Nutrition 114 (2021), Framingham Offspring cohort, found roughly 4.7 years' difference in life expectancy between the lowest and highest Omega-3 Index quintiles, and that Omega-3 Index performed comparably to smoking as a mortality predictor. The comparison to smoking is sourced; the ten-to-twenty-year figure overstates the measured difference.",
  },

  /* ---------------- EVOLUTION ---------------- */
  {
    time: "22:00",
    claim: "Cooking pre-digested food, allowing the human digestive system to shrink and the energy saved to go to the brain.",
    status: "Contested",
    source: "Wrangham's cooking hypothesis (Catching Fire, 2009) and the expensive tissue hypothesis (Aiello & Wheeler, Current Anthropology 36, 1995). Both are influential and both are actively disputed; the timing of controlled fire use remains unsettled.",
  },
  {
    time: "25:00",
    claim: "Stable isotope analysis of nitrogen-15 in fossilised remains shows early humans ate predominantly animal protein.",
    status: "Consensus",
    source: "Richards & Trinkaus, PNAS 106 (2009), and the wider palaeodietary isotope literature. Trophic-level nitrogen-15 enrichment is well established. Note this describes the specific populations sampled — largely European Neanderthals and early modern humans — not all early humans everywhere.",
  },
  {
    time: "26:00",
    claim: "Humans evolved to eat seasonal fruit in order to gain weight before winter, and fructose is metabolically suited to fat storage.",
    status: "Contested",
    source: "Richard Johnson's fructose survival hypothesis (The Fat Switch, 2012; Johnson et al., Obesity 21, 2013). A published and serious hypothesis, not an established finding.",
  },
  {
    time: "26:30",
    claim: "Fructose is metabolised in the liver and converted to fat.",
    status: "Consensus",
    source: "De novo lipogenesis from fructose is well documented — Softic, Cohen & Kahn, Digestive Diseases and Sciences 61 (2016).",
  },
  {
    time: "27:30",
    claim: "When you stop eating, the body enters a repair state, clearing damaged cells and using stored fat for energy. Constant snacking prevents this.",
    status: "Consensus",
    source: "Autophagy — cellular self-digestion and recycling, upregulated by nutrient deprivation — is established cell biology. Yoshinori Ohsumi received the 2016 Nobel Prize in Physiology or Medicine for elucidating its mechanisms. Insulin suppression of lipolysis between meals is standard endocrinology.",
  },
  {
    time: "27:45",
    claim: "It takes about sixteen hours without food for this state to activate.",
    status: "Contested",
    source: "The timing, not the mechanism. Human autophagy is difficult to measure directly, and the sixteen-hour figure is extrapolated from animal work and indirect markers such as the glycogen-depletion-to-ketosis transition. Fasting thresholds in humans are not established and vary with prior meal composition, activity and individual metabolism.",
  },
  {
    time: "29:30",
    claim: "Human genetics are over 99% the same now as a million years ago.",
    status: "Consensus",
    source: "Broadly accurate as a statement about genomic similarity, though the figure depends heavily on how difference is measured. The wider point — that the human genome has changed far less than the human food supply — is not disputed.",
  },
  {
    time: "30:00",
    claim: "The fossil record shows early farmers were shorter and had smaller skulls than the hunter-gatherers who preceded them, indicating reduced capacity.",
    status: "Contested",
    source: "The skeletal changes are extensively documented — Cohen & Armelagos, Paleopathology at the Origins of Agriculture (1984); Mummert et al., Economics & Human Biology 9 (2011). Height reduction and increased dental disease at the agricultural transition are not in dispute. The inference from cranial size to intelligence is: cranial capacity is a poor proxy for cognitive ability and this inference is not supported by the literature. The director draws it; the evidence does not.",
  },

  /* ---------------- ORIGINAL ARGUMENT: IRELAND ---------------- */
  {
    time: "31:00",
    claim: "Britain industrialised first in part because it imported large quantities of high-quality animal protein and fat from Ireland. This raised omega-3 and nutrient intake among its population, and over generations contributed to the cognitive and physical capacity that industrialisation required.",
    status: "Synthesis",
    source: "ORIGINAL ARGUMENT — the director's own, not published, tested or peer-reviewed. The component facts are documented: large-scale Irish cattle and provisions exports to Britain through the sixteenth and seventeenth centuries; the Cattle Acts of 1663 and 1667, in which English landowners successfully pressured Parliament to ban Irish livestock imports; the subsequent Irish provisions trade in salted beef, butter and pork; and omega-3's established role in neurodevelopment. The causal chain connecting these to British industrialisation is the film's argument. It is offered for examination, not as a finding.",
  },
  {
    time: "35:00",
    claim: "Vegetable oils were originally produced as industrial machine lubricants before entering the food supply.",
    status: "Consensus",
    source: "Cottonseed oil began as an industrial by-product and lubricant; Procter & Gamble's Crisco (1911) marked its transition into food. Documented in Fitzgerald, The Business of Food (2003).",
  },

  /* ---------------- MANIPULATION ---------------- */
  {
    time: "36:00",
    claim: "A baby's IQ increases by 6% when breastfed.",
    status: "Contested",
    source: "The breastfeeding–IQ association is repeatedly observed (Horta et al., Acta Paediatrica 104, 2015) but heavily confounded by maternal education and socioeconomic status; sibling-controlled studies find much smaller effects. The specific 6% figure is not one the director can source precisely.",
  },
  {
    time: "37:00",
    claim: "Once carbohydrate is in the blood, the body cannot burn fat.",
    status: "Consensus",
    source: "Insulin suppresses lipolysis and fatty acid oxidation. Standard endocrinology. Note the film's phrasing is absolute where the biology is a matter of degree — fat oxidation is suppressed, not switched off entirely.",
  },
  {
    time: "38:30",
    claim: "Dr Clara Davis's orphanage study showed infants left to choose freely selected a nutritionally adequate diet, including a balance of fats and carbohydrates.",
    status: "Contested",
    source: "The study is real (Davis, American Journal of Diseases of Children, 1928–1939) and the outcomes reported are accurate. But every food offered was whole and unprocessed, and there were only 33–34 options. It demonstrates appetite operating within a constrained wholefood environment, not nutritional wisdom in general — a caveat the film makes.",
  },
  {
    time: "40:30",
    claim: "Animals eat to a protein target; when protein is diluted, they overconsume total energy trying to reach it.",
    status: "Contested",
    source: "The protein leverage hypothesis — Simpson & Raubenheimer, Obesity Reviews 6 (2005). Well published, widely discussed, supported by experimental work in several species and some human trials. Not settled consensus.",
  },
  {
    time: "42:00",
    claim: "Food companies deliberately market engineered products to children in order to establish lifelong preference.",
    status: "Consensus",
    source: "Extensively documented — WHO reports on food marketing to children; Moss, Salt Sugar Fat (2013), drawing on internal industry documents.",
  },
  {
    time: "44:00",
    claim: "Correlation is not causation, and much nutritional epidemiology rests on it.",
    status: "Consensus",
    source: "Methodological point, not in dispute. On dietary recall specifically: Archer, Hand & Blair, Mayo Clinic Proceedings 90 (2015) on the validity of self-reported intake data.",
  },
  {
    time: "45:00",
    claim: "There was never a sound scientific basis for the policy of reducing saturated fat intake.",
    status: "Contested",
    source: "One of the most actively disputed questions in nutrition science; the film argues one side. Supporting: Teicholz, BMJ 351:h4962 (2015), arguing the 2015 US Dietary Guidelines committee did not follow standard systematic review procedures; Ramsden et al., BMJ 353 (2016), recovered Minnesota Coronary Experiment data; Siri-Tarino et al., AJCN 91 (2010) meta-analysis. Opposing: Hooper et al., Cochrane Database (2020); AHA Presidential Advisory, Sacks et al., Circulation 136 (2017); WHO saturated fat guideline (2023). Context: more than 180 scientists demanded the BMJ retract Teicholz's article; after external review the BMJ declined, finding her criticisms fell within the realm of legitimate scientific discussion. That is a finding that the argument is admissible, not that it is correct. Teicholz issued a correction on one point in her published Rapid Response.",
  },
  {
    time: "46:30",
    claim: "Type 2 diabetes is being reversed under medical supervision by removing carbohydrate, with patients coming off medication.",
    status: "Consensus",
    source: "Athinarayanan et al., Frontiers in Endocrinology 10 (2019) — two-year Virta Health outcomes; Lean et al., Lancet 391 (2018), the DiRECT trial, via calorie restriction. Remission is now an accepted clinical outcome. The optimal route remains debated. Medication changes must be supervised.",
  },
  {
    time: "47:30",
    claim: "Serious mental illness, including schizophrenia, can be treated through metabolic and dietary intervention.",
    status: "Contested",
    source: "Metabolic psychiatry is a real and active field. Dr Chris Palmer (Harvard Medical School) has published case reports of schizoaffective disorder entering remission on a ketogenic diet (Schizophrenia Research 208, 2019) and set out the theory in Brain Energy (2022). A 2024 Stanford pilot (Sethi et al., Psychiatry Research) found psychiatric and metabolic improvement in schizophrenia and bipolar patients. The evidence is case series and small pilots, not controlled trials. Nobody should alter prescribed psychiatric medication except under medical supervision.",
  },
  {
    time: "48:00",
    claim: "A high-fat, low-carbohydrate diet is beneficial in 70% of cancers, because cancer cells consume ten times more blood sugar than healthy cells.",
    status: "Contested",
    source: "The Warburg effect — elevated glucose uptake by tumour cells — is established and is the basis of PET imaging. The therapeutic inference is not. Thomas Seyfried's metabolic theory of cancer (Cancer as a Metabolic Disease, 2012) is a serious minority position with a growing preclinical literature and early human case reports, but the 70% figure is not supported by clinical trial evidence and no dietary protocol is established treatment for any cancer. Nobody should substitute diet for oncological care.",
  },

  /* ---------------- THE BLISS POINT ---------------- */
  {
    time: "60:30",
    claim: "The bliss point is a deliberately engineered combination of sugar, salt and fat that maximises consumption while minimising nourishment.",
    status: "Consensus",
    source: "Howard Moskowitz's work, documented in Moss, Salt Sugar Fat (2013). Openly described by those who developed it. The 'minimising nourishment' framing is the film's characterisation of a commercial optimisation, not a stated industry goal.",
  },
  {
    time: "61:30",
    claim: "Flavour enhancers signal protein to the tongue where little or no protein is present.",
    status: "Synthesis",
    source: "Umami compounds signal the presence of amino acids, and this is established taste physiology (Chaudhari & Roper, Journal of Cell Biology 190, 2010). Framing this as a decoy that defeats the protein appetite — and therefore drives overconsumption — is the director's inference, built on the protein leverage hypothesis above.",
  },
  {
    time: "63:00",
    claim: "Children's bliss points are easier to find because they are still learning what food is.",
    status: "Contested",
    source: "Children do have heightened preference for sweetness, which declines through adolescence (Mennella et al., PLOS ONE 2011). That this makes commercial optimisation easier is a reasonable inference but not a documented industry finding.",
  },
  {
    time: "64:00",
    claim: "Processed meat is classified as a group one carcinogen.",
    status: "Consensus",
    source: "IARC Monograph 114 (2015). Accurate, and raised in the film by the defence rather than the prosecution. Note that IARC classifies strength of evidence for a hazard, not magnitude of risk.",
  },

  /* ---------------- THE MECHANISM ---------------- */
  {
    time: "66:30",
    claim: "A seed naturally contains the vitamin needed to protect its own fat from oxidation, and the processed oil has much less.",
    status: "Consensus",
    source: "Vitamin E (tocopherols) protects polyunsaturated fats from peroxidation, and refining reduces tocopherol content.",
  },
  {
    time: "69:00",
    claim: "Fat travels in the blood inside lipoprotein particles carrying triglycerides, cholesterol and fat-soluble vitamins.",
    status: "Consensus",
    source: "Standard lipid biology, not in dispute.",
  },
  {
    time: "70:00",
    claim: "HDL returns damaged and excess cholesterol to the liver.",
    status: "Consensus",
    source: "Reverse cholesterol transport is established. Whether raising HDL is therapeutically beneficial is a separate and contested question.",
  },
  {
    time: "72:00",
    claim: "Free radical attack cannot occur at a saturated fat, because there is no double bond for it to occur at.",
    status: "Consensus",
    source: "Basic lipid chemistry. Lipid peroxidation initiates by hydrogen abstraction at the bis-allylic position, which exists only in polyunsaturated fatty acids. Saturated fatty acids are not substrates for peroxidation.",
  },
  {
    time: "73:00",
    claim: "The heart preferentially uses saturated fat for fuel.",
    status: "Consensus",
    source: "The heart derives 60–70% of its ATP from fatty acid oxidation under normal conditions (Lopaschuk et al., Physiological Reviews 90, 2010). The preference is for fatty acids generally rather than saturated fat specifically.",
  },
  {
    time: "74:00",
    claim: "People eating ten times more seed oil than they should have tissue loaded with oxidisable fat, and this makes inflammation chronic.",
    status: "Contested",
    source: "The intake increase is documented — Blasbalg et al., AJCN 93 (2011): US soybean oil consumption rose roughly a thousand-fold across the twentieth century, and estimated linoleic acid intake rose from ~2% to ~7% of energy. Tissue incorporation of linoleic acid has risen correspondingly (Guyenet & Carlson, Advances in Nutrition 6, 2015). That this constitutes the fuel for chronic inflammatory disease is the film's argument, not an established finding.",
  },
  {
    time: "75:00",
    claim: "Deep frying oxidises oils and produces toxic aldehydes; breaded fast foods absorb the most.",
    status: "Consensus",
    source: "Grootveld et al., Food Chemistry 75 (2001) and subsequent work on aldehyde formation in heated PUFA-rich oils. Higher absorption by coated foods follows from surface area and porosity.",
  },
  {
    time: "77:00",
    claim: "Polyphenols from foods such as olives help protect fats from oxidative damage.",
    status: "Consensus",
    source: "Olive polyphenols including hydroxytyrosol have documented antioxidant activity; EFSA has approved a health claim for protection of blood lipids from oxidative stress.",
  },
  {
    time: "80:00",
    claim: "Sugar is sticky and glycates proteins as the body processes it.",
    status: "Consensus",
    source: "Advanced glycation end-products and protein cross-linking are well documented (Gkogkolou & Böhm, Dermato-Endocrinology 4, 2012).",
  },
  {
    time: "82:00",
    claim: "When carbohydrate is eaten, fat delivery to organs and muscles stops and the fat is directed to storage instead.",
    status: "Consensus",
    source: "Insulin simultaneously suppresses lipolysis and activates lipoprotein lipase in adipose tissue. Standard metabolic physiology.",
  },
  {
    time: "83:00",
    claim: "The body converts excess energy into saturated fat, which it would not do if saturated fat were harmful.",
    status: "Contested",
    source: "The first half is established: de novo lipogenesis produces palmitate, a saturated fatty acid. The inference — that the body would not manufacture something harmful — is rhetorical rather than evidential. Elevated de novo lipogenesis is itself associated with metabolic dysfunction.",
  },
  {
    time: "84:00",
    claim: "Ketones are a four-carbon fuel made in the liver that reach the brain quickly and do not need a carrier.",
    status: "Consensus",
    source: "Beta-hydroxybutyrate and acetoacetate are four-carbon molecules, water-soluble, and cross the blood-brain barrier via monocarboxylate transporters. Standard biochemistry.",
  },

  /* ---------------- ORIGINAL ARGUMENT: THE THESIS ---------------- */
  {
    time: "85:30",
    claim: "The central argument: engineered additives drive overconsumption of both seed oil and refined carbohydrate. The seed oil loads body tissue and blood lipids with polyunsaturated fat, which is uniquely vulnerable to oxidation — the fuel. The excess carbohydrate overloads energy production and generates the free radicals — the match. Neither alone is sufficient. Together they produce chronic inflammation.",
    status: "Synthesis",
    source: "ORIGINAL ARGUMENT — the director's own, not published, tested or peer-reviewed. Each component is separately supported: additive-driven overconsumption (protein leverage; bliss point engineering), rising PUFA intake and tissue incorporation (Blasbalg 2011; Guyenet & Carlson 2015), lipid peroxidation chemistry, and substrate-overload reactive oxygen species generation (Brownlee, Nature 414, 2001; Murphy, Biochemical Journal 417, 2009). The proposition that these combine as a single interacting mechanism — and that this interaction, rather than any individual suspect, drives chronic inflammatory disease — is the argument the film exists to make. It is offered for examination, and the director welcomes correction.",
  },
];

export default function PressPage() {
  return (
    <main style={{ background: "#0f0f0f", color: "#e8e2d5", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ background: "#1a1a1a", padding: "clamp(56px,8vw,96px) 20px", borderBottom: "1px solid rgba(212,175,55,.25)" }}>
        <div style={wrap}>
          <p style={eyebrow}>Press &amp; Media</p>
          <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(32px,5.5vw,52px)", color: "#d4af37", lineHeight: 1.1, margin: "0 0 20px" }}>
            Which Food Is Killing You?
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.6, opacity: .8, maxWidth: "60ch", margin: 0 }}>
            Everything a writer needs: the film, the facts, the sources behind every claim,
            and how it was made. Free viewing access for press is below.
          </p>
        </div>
      </header>

      {/* TRAILER */}
      <section style={{ ...section, paddingBottom: 0 }}>
        <div style={wrap}>
          <div style={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(212,175,55,.3)",
            background: "#000",
          }}>
            <iframe
              src="https://player.vimeo.com/video/1218266606?title=0&byline=0&portrait=0&dnt=1"
              title="Which Food Is Killing You? — trailer"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: 0, display: "block" }}
            />
          </div>
          <p style={{ ...para, fontSize: "14px", opacity: .65, marginTop: "14px" }}>
            Trailer &mdash; free to embed. <a href="https://vimeo.com/1218266606" style={link}>vimeo.com/1218266606</a>
          </p>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>At a glance</h2>
          <dl style={{ margin: 0 }}>
            <Row k="Title" v="Which Food Is Killing You? Inside the Greatest Fraud In Human History" />
            <Row k="Runtime" v="1 hour 27 minutes" />
            <Row k="Format" v="Animated feature documentary with interactive audience voting" />
            <Row k="Language" v="English" />
            <Row k="Director" v="Colin Marry" />
            <Row k="Release" v="Direct to consumer at poshpork.com" />
            <Row k="Price" v="€15 — one payment, permanent access" />
            <Row k="Production" v="One person. Animation generated using AI tools." />
            <Row k="Funding" v="Self-funded. No industry, commercial or institutional backing." />
          </dl>
        </div>
      </section>

      {/* SYNOPSES */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Synopsis</h2>

          <h3 style={h3}>25 words</h3>
          <p style={para}>
            A murder trial in which the suspects are foods. The evidence is laid out,
            the witnesses contradict each other, and the audience delivers the verdict.
          </p>

          <h3 style={h3}>100 words</h3>
          <p style={para}>
            Three out of five people die from chronic inflammatory disease. Its drivers are
            lifestyle, and for most of us the largest lifestyle factor is food. So which food
            is it? <em>Which Food Is Killing You?</em> puts four suspects on trial &mdash; and puts
            the viewer on the jury. Questions appear during the film; viewers commit to an
            answer before they learn whether they were right, and their verdicts join a running
            tally counted alongside every other viewer&apos;s. Animated, family-watchable, and
            built for the argument it starts in the room.
          </p>

          <h3 style={h3}>300 words</h3>
          <p style={para}>
            The court is in session. The defendant is your dinner.
          </p>
          <p style={para}>
            <em>Which Food Is Killing You?</em> opens on four suspects in the dock: refined
            carbohydrates, industrial seed oils, a syndicate of food engineers, and one animal
            fat that has carried the blame for sixty years and is now asking for a retrial.
          </p>
          <p style={para}>
            The viewer is on the jury.
          </p>
          <p style={para}>
            At points throughout the film, the evidence stops and a question appears. You commit
            to an answer before you learn whether you were right &mdash; and that turns out to
            matter more than it sounds. You remember what you got wrong. You notice the moment
            your mind changed and what changed it. At the end, you deliver a verdict on each
            suspect, and see how the rest of the jury voted.
          </p>
          <p style={para}>
            Three out of five people die from chronic inflammatory disease. Its drivers are
            lifestyle, and the largest lifestyle factor for most of us is food. Ask ten people
            which food and you get ten confident answers, each with studies attached. They cannot
            all be right. Why they cannot all be right is the actual subject of the film.
          </p>
          <p style={para}>
            It is animated in order to carry food education to as wide an audience as possible.
            The subject is heavy; the film is not. A fourteen-year-old follows every step and
            laughs at the pirates.
          </p>
          <p style={para}>
            Written and directed by Colin Marry, an Irish pig farmer with an MSc in Agricultural
            Economics and no filmmaking background, working alone for a year with AI animation
            tools and no budget.
          </p>
        </div>
      </section>

      {/* PRESS ACCESS */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Watch the film</h2>
          <p style={{ ...para, maxWidth: "60ch" }}>
            Free, unrestricted access for press. No payment.
          </p>
          <div style={{
            border: "1px solid rgba(212,175,55,.35)",
            borderRadius: "8px",
            padding: "24px",
            background: "rgba(212,175,55,.06)",
            maxWidth: "60ch",
          }}>
            <p style={{ ...para, marginBottom: "16px" }}>
              Write to <a href="mailto:colin@poshpork.com?subject=Press%20access" style={link}>colin@poshpork.com</a> with
              the outlet you write for, and I&apos;ll set up access the same day. You will get a
              single link that signs you in and starts the film.
            </p>
            <p style={{ ...para, fontSize: "15px", marginBottom: 0, opacity: .8 }}>
              No conditions attached, and no embargo &mdash; write whenever suits you, or not at all.
            </p>
          </div>
        </div>
      </section>

      {/* THE EVIDENCE — CLAIMS AND SOURCES */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <p style={eyebrow}>The Evidence</p>
          <h2 style={h2}>Claims and sources</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            Every substantive claim in the film, with its status stated plainly and its source
            given. Claims are marked <strong>Consensus</strong> where they reflect settled
            scientific agreement, <strong>Contested</strong> where the literature genuinely
            disagrees, and <strong>Synthesis</strong> where the inference is the director&apos;s
            own reading of the evidence rather than an established finding.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            The film makes two original arguments. Both are marked Synthesis. Neither is
            established science, and neither is presented as such.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            That distinction is the point of the film. It is published here so that anyone can
            check it.
          </p>

          <div style={{ overflowX: "auto", marginTop: "36px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px", minWidth: "760px" }}>
              <thead>
                <tr>
                  <th style={th}>Time</th>
                  <th style={th}>Claim</th>
                  <th style={th}>Status</th>
                  <th style={th}>Source / note</th>
                </tr>
              </thead>
              <tbody>
                {CLAIMS.map((c, i) => <ClaimRow key={i} {...c} />)}
              </tbody>
            </table>
          </div>

          <p style={{ ...para, fontSize: "14px", opacity: .65, marginTop: "28px", maxWidth: "62ch" }}>
            Corrections are welcome and will be published here. Write to{" "}
            <a href="mailto:colin@poshpork.com" style={link}>colin@poshpork.com</a>.
          </p>
        </div>
      </section>

      {/* HOW IT WAS MADE */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>How it was made</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            The film was written and directed by one person over roughly a year, working seven
            hours a day starting at 4:30am. There was no studio, no crew and no budget.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>Every frame of the animation was generated using AI.</strong> There was no
            animation team, because there was no money to pay one &mdash; the alternative was
            not a hand-drawn version of this film, it was no film at all.
          </p>

          <h3 style={h3}>The tools</h3>
          <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none", maxWidth: "62ch" }}>
            <Tool name="Grok Imagine" use="Image and video generation &mdash; every frame of the animation." />
            <Tool name="Claude Code" use="Prompting, and building this website." />
            <Tool name="Gemini" use="The soundtrack." />
            <Tool name="CapCut" use="Editing." />
          </ul>

          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>The script was written word for word by Colin Marry.</strong> So were the
            research, the argument, the characters, the structure of the trial, the questions
            put to the jury, and every decision about what a piece of evidence means and where
            it sits. No part of the script was generated.
          </p>

          <p style={{ ...para, maxWidth: "62ch", opacity: .8 }}>
            It may be the first feature-length documentary animated this way. The director would
            rather be corrected on that than overstate it.
          </p>
        </div>
      </section>

      {/* DISCLOSURE */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Disclosure</h2>
          <div style={{
            borderLeft: "2px solid #d4af37",
            paddingLeft: "24px",
            maxWidth: "62ch",
          }}>
            <p style={para}>
              Colin Marry was a pig farmer by trade, having taken over a family farm in Ireland.
              During that time he developed a belief that there was a need for a global meat
              brand. He created that brand, Olive Pork, but it was liquidated in 2023 after
              costs across the industry rose. This is addressed directly in the film.
            </p>
            <p style={para}>
              He still believes a natural food brand is needed to counter the marketing of
              processed food brands. It will only come to exist if enough people demonstrate
              they want it, by joining the waitlist and paying €1.
            </p>
            <p style={{ ...para, marginBottom: 0 }}>
              The film was self-funded. It received no industry, commercial, institutional or
              advocacy funding, and no company had any involvement in or sight of its contents.
            </p>
          </div>
        </div>
      </section>

      {/* DIRECTOR */}
      <section style={section}>
        <div style={wrap}>
          <h2 style={h2}>Director</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <strong>Colin Marry has no film or directing experience of any kind.</strong> He had
            never made a film before this one, had no training in it, and has never worked in
            the industry.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            He is Irish, based in Mallorca, and was a pig farmer by trade. He spent his twenties
            trying to work out why the family farm had stopped paying for itself, and concluded
            the problem was not in the field but in the mind of whoever stood in the supermarket
            aisle deciding. He founded Olive Pork in 2018, feeding pigs on olive pomace &mdash;
            a waste product of oil pressing &mdash; and exported to six countries before the
            business failed in 2023.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            He holds a Masters Degree in Agricultural Economics from the University of London.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            <em>Which Food Is Killing You?</em> is his first film.
          </p>
          <p style={{ ...para, maxWidth: "62ch" }}>
            Longer version: <a href="/about" style={link}>The Back Story</a>.
          </p>
        </div>
      </section>

      {/* ASSETS */}
      <section style={{ ...section, background: "#141414" }}>
        <div style={wrap}>
          <h2 style={h2}>Downloads</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            All images are high resolution and free to use in coverage of the film.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", maxWidth: "60ch" }}>
            <Asset label="The suspects — lineup" href="/press/posh-pork-suspects-lineup.jpg" note="[TO ADD]" />
            <Asset label="Lady Posh Pork" href="/press/posh-pork-lady-posh-pork.jpg" note="[TO ADD]" />
            <Asset label="Mr Carbohydrates" href="/press/posh-pork-mr-carbohydrates.jpg" note="[TO ADD]" />
            <Asset label="Mr Vegetable Oils" href="/press/posh-pork-mr-vegetable-oils.jpg" note="[TO ADD]" />
            <Asset label="The Bliss Brothers" href="/press/posh-pork-bliss-brothers.jpg" note="[TO ADD]" />
            <Asset label="The judge" href="/press/posh-pork-judge.jpg" note="[TO ADD]" />
            <Asset label="Key art / poster" href="/press/posh-pork-key-art.jpg" note="[TO ADD]" />
            <Asset label="Colin Marry" href="/press/colin-marry.jpg" note="[TO ADD]" />
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ ...section, paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div style={wrap}>
          <h2 style={h2}>Contact</h2>
          <p style={{ ...para, maxWidth: "62ch" }}>
            All press enquiries go directly to the director. There is no publicist and no
            agency &mdash; you will be talking to the person who made it.
          </p>
          <p style={{ ...para, fontSize: "18px" }}>
            <a href="mailto:colin@poshpork.com" style={link}>colin@poshpork.com</a>
          </p>
          <p style={{ ...para, fontSize: "15px", opacity: .7 }}>
            Group and educational screening licences:{" "}
            <a href="mailto:screenings@poshpork.com" style={link}>screenings@poshpork.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}

/* ---------- small components ---------- */

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "minmax(120px, 180px) 1fr",
      gap: "20px",
      padding: "14px 0",
      borderBottom: "1px solid rgba(232,226,213,.12)",
      alignItems: "baseline",
    }}>
      <dt style={{ fontFamily: "Cinzel, serif", fontSize: "13px", letterSpacing: ".12em", textTransform: "uppercase", color: "#d4af37" }}>{k}</dt>
      <dd style={{ margin: 0, fontSize: "16px", lineHeight: 1.6 }}>{v}</dd>
    </div>
  );
}

function ClaimRow({ time, claim, status, source }: { time: string; claim: string; status: Status; source: string }) {
  const colour =
    status === "Consensus" ? "#7fa87f" :
    status === "Contested" ? "#d4af37" :
    "#c98b5e";

  return (
    <tr>
      <td style={{ ...td, whiteSpace: "nowrap", fontFamily: "monospace", fontSize: "13px", color: "#d4af37" }}>{time}</td>
      <td style={td}>{claim}</td>
      <td style={{ ...td, whiteSpace: "nowrap" }}>
        <span style={{
          fontFamily: "Cinzel, serif",
          fontSize: "12px",
          letterSpacing: ".08em",
          color: colour,
          border: `1px solid ${colour}`,
          borderRadius: "3px",
          padding: "3px 8px",
          display: "inline-block",
        }}>
          {status}
        </span>
      </td>
      <td style={{ ...td, fontSize: "14px", opacity: .85 }}>{source}</td>
    </tr>
  );
}

function Tool({ name, use }: { name: string; use: string }) {
  return (
    <li style={{
      display: "grid",
      gridTemplateColumns: "minmax(120px, 160px) 1fr",
      gap: "16px",
      padding: "12px 0",
      borderBottom: "1px solid rgba(232,226,213,.12)",
      alignItems: "baseline",
    }}>
      <span style={{ fontFamily: "Cinzel, serif", fontSize: "15px", color: "#d4af37" }}>{name}</span>
      <span style={{ fontSize: "15px", lineHeight: 1.6, opacity: .85 }}
        dangerouslySetInnerHTML={{ __html: use }} />
    </li>
  );
}

function Asset({ label, href, note }: { label: string; href: string; note?: string }) {
  return (
    <li style={{ padding: "14px 0", borderBottom: "1px solid rgba(232,226,213,.12)" }}>
      <a href={href} style={{ ...link, fontSize: "16px" }}>{label}</a>
      {note && <span style={{ display: "block", fontSize: "13px", opacity: .55, marginTop: "4px" }}>{note}</span>}
    </li>
  );
}

/* ---------- styles ---------- */

const wrap: React.CSSProperties = { maxWidth: "900px", margin: "0 auto" };

const section: React.CSSProperties = { padding: "clamp(56px,7vw,88px) 20px" };

const eyebrow: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "12px",
  letterSpacing: ".28em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: .8,
  margin: "0 0 16px",
};

const h2: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "clamp(24px,3.2vw,34px)",
  color: "#d4af37",
  lineHeight: 1.2,
  margin: "0 0 24px",
};

const h3: React.CSSProperties = {
  fontFamily: "Cinzel, serif",
  fontSize: "15px",
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#d4af37",
  opacity: .75,
  margin: "32px 0 12px",
};

const para: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  margin: "0 0 16px",
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 16px 12px 0",
  borderBottom: "1px solid rgba(212,175,55,.4)",
  fontFamily: "Cinzel, serif",
  fontSize: "12px",
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#d4af37",
  verticalAlign: "bottom",
};

const td: React.CSSProperties = {
  padding: "16px 16px 16px 0",
  borderBottom: "1px solid rgba(232,226,213,.1)",
  verticalAlign: "top",
  lineHeight: 1.6,
};

const link: React.CSSProperties = {
  color: "#d4af37",
  textDecoration: "underline",
};
