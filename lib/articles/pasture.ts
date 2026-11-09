import { a, paragraph, t, type Article } from "./types";

const FSIS_PASTURE =
  "https://www.usda.gov/sites/default/files/guidance-documents/FSIS.%20FSIS%20Guideline%20on%20Substantiating%20Animal-Raising%20or%20Environment-Related%20Labeling%20Claims.pdf";
const EFSA_PIGS = "https://www.efsa.europa.eu/en/efsajournal/pub/7421";
const MEAT_REVIEW = "https://pmc.ncbi.nlm.nih.gov/articles/PMC4838835/";
const PASTURE_PILOT = "https://pmc.ncbi.nlm.nih.gov/articles/PMC11329800/";
const FEED_TRIAL = "https://pmc.ncbi.nlm.nih.gov/articles/PMC12771593/";

const article: Article = {
  slug: "pasture-raised-and-conventional-pork",
  title: "Pasture-raised versus conventional pork: what is the difference?",
  description:
    "Pasture-raised is a housing and land claim. Fatty acid differences depend on feed and are not consistent. These sources do not show a human health benefit.",
  answer: paragraph([
    t(
      "Pasture-raised pork is a claim about land and housing, not proof of better health than conventional pork.",
    ),
  ]),
  blocks: [
    {
      kind: "h2",
      text: "What the words mean",
    },
    paragraph([
      t("The label rules in this section are US rules from the Food Safety and Inspection Service."),
    ]),
    paragraph([
      t("An "),
      a("August 2024 FSIS guideline", FSIS_PASTURE),
      t(" says guidance documents lack the force of law unless a statute or contract adopts them."),
    ]),
    paragraph([
      t("Pasture-raised is treated as a living or raising conditions claim."),
      t(" FSIS strongly encourages plants to document that the majority of each animal's life was spent on pasture."),
    ]),
    paragraph([
      t("The same guidance says pasture means land where the majority is rooted in vegetative cover with grass or other plants."),
    ]),
    paragraph([
      t("Organic certification does not, by itself, support a pasture-raised claim."),
      t(" FSIS says the plant must provide more evidence for that claim."),
    ]),
    paragraph([
      t("Conventional is not a single legal standard in these sources."),
      t(" A "),
      a("2016 review of meat composition", MEAT_REVIEW),
      t(" describes a common pattern: more indoor housing and more concentrate feed from grains, legumes, and by-products."),
    ]),
    paragraph([
      t("That is a description of a trend. It is not a rule that every farm follows."),
    ]),
    {
      kind: "h2",
      text: "What differs in the meat",
    },
    paragraph([
      t("The 2016 review pooled 67 studies of organic and conventional meat."),
      t(" It is not a test of a pasture-raised sticker on its own."),
    ]),
    paragraph([
      t("Organic standards require some time outdoors, though the length differs by region and species."),
      t(" The feed still varies too."),
    ]),
    paragraph([
      t("For many vitamins, minerals, and individual fatty acids, the authors did not have enough data for a meaningful pool."),
    ]),
    paragraph([
      t("Where fatty acids did differ, the results were heterogeneous."),
      t(" The authors tied the gaps mainly to grazing and forage-based diets."),
    ]),
    paragraph([
      t("For pork, the pooled result they highlighted was lower saturated fat in organic meat."),
    ]),
    paragraph([
      t("They also cited a free-range study."),
      t(" Pigs with pasture access had more polyunsaturated fat, omega-3 fat, and alpha-linolenic acid than indoor pigs on a concentrate diet."),
    ]),
    paragraph([
      t("The review said those relative differences were under 50 percent."),
      t(" They were also smaller than the differences reported for beef and lamb."),
    ]),
    paragraph([
      t("The authors said some of these changes may be nutritionally desirable."),
      t(" They also said studies in people were still needed. They did not claim that organic meat prevents disease."),
    ]),
    paragraph([
      t("A "),
      a("2024 pilot study", PASTURE_PILOT),
      t(" asked a narrower question."),
    ]),
    paragraph([
      t("Twenty pigs of similar genetics were split into indoor and outdoor groups of ten."),
      t(" Both groups were offered the same ration. The outdoor group had pasture."),
    ]),
    paragraph([
      t("Color, marbling, loin eye area, and the pH values they measured did not differ significantly."),
      t(" Indoor pigs had thicker backfat."),
    ]),
    paragraph([
      t("The authors said outdoor rearing did not significantly affect those pork quality measures."),
      t(" They called the work a pilot."),
      t(" They did not measure omega-3, and they did not measure how much feed each group ate."),
    ]),
    paragraph([
      t("The contrast between these studies is the feed."),
      t(" A fatty acid gap appeared when pasture eating was compared with a concentrate diet."),
      t(" Housing alone, with the same ration, did not change those quality scores in the pilot."),
    ]),
    paragraph([
      t("Feed can change pork fat without a pasture label."),
      t(" A "),
      a("2026 feeding trial", FEED_TRIAL),
      t(" added stearic acid or palm oil to pig diets."),
    ]),
    paragraph([
      t("Growth, backfat, carcass weight, and the measured meat-quality traits did not differ significantly."),
      t(" Fatty acid composition did change with the added fat."),
    ]),
    paragraph([
      t("That trial is not a pasture study. It shows that the diet formula can move the fat profile indoors."),
    ]),
    {
      kind: "h2",
      text: "Welfare is a separate question",
    },
    paragraph([
      t("Pasture-raised, as FSIS uses it, is about time on vegetated land."),
      t(" It does not publish a full welfare score."),
    ]),
    paragraph([
      t("The "),
      a("2022 EFSA opinion on pig welfare", EFSA_PIGS),
      t(" assesses husbandry systems and the hazards in them."),
    ]),
    paragraph([
      t("For tail biting, the panel names space allowance, floor type, air quality, health status, and diet composition as main risk factors."),
      t(" A pasture claim does not state those factors."),
    ]),
    paragraph([
      t("These sources do not rank pasture systems as always higher welfare."),
      t(" They also do not rank indoor systems as always higher welfare."),
    ]),
    {
      kind: "h2",
      text: "Association and causation",
    },
    paragraph([
      t("A difference in alpha-linolenic acid is a composition measurement."),
      t(" It becomes a health result only if people eating one product fare better and other causes are ruled out."),
    ]),
    paragraph([
      t("No study cited here assigned people to pasture-raised pork or conventional pork and then tracked disease."),
      t(" Two different labels do not, by themselves, identify a cause."),
    ]),
    {
      kind: "h2",
      text: "Hazard and risk",
    },
    paragraph([
      t("A nutrient difference can be useful, unhelpful, or too small to matter."),
      t(" Risk and benefit depend on the size of the difference and on the rest of the diet."),
    ]),
    paragraph([
      t("The meat review said accurate comparisons of fatty acid intakes were not possible."),
      t(" Countries eat different amounts and cuts, and the comparative data were not complete."),
    ]),
    paragraph([
      t("Without that intake estimate, a human risk number would be a guess. This page will not make one."),
    ]),
    paragraph([
      t("Do not read these sources as saying pasture pork protects the heart or lowers cancer risk."),
    ]),
  ],
  faqs: [
    {
      question: "Is pasture-raised a legal guarantee in the United States?",
      answer:
        "Not in the guidance cited here. FSIS asks for documentation that most of the animal's life was on vegetated pasture, and it says the guide is not itself law.",
    },
    {
      question: "Does pasture pork have more omega-3?",
      answer:
        "Sometimes, when the comparison is pasture eating against a concentrate diet. A pilot that fed the same ration did not measure omega-3 and found little change in color, marbling, or loin size.",
    },
    {
      question: "Is organic pork the same as pasture-raised pork?",
      answer:
        "No. FSIS says an organic certificate does not by itself support a pasture-raised claim. The plant has to substantiate that claim separately.",
    },
    {
      question: "Does the label prove higher welfare?",
      answer:
        "It can describe time on pasture. EFSA also ties pig welfare to space, floors, air, health, and diet. Those details are not fixed by the word pasture.",
    },
    {
      question: "Will pasture-raised pork make a person healthier?",
      answer:
        "These sources do not show that. They show variable composition differences tied to feed. They do not report disease outcomes in people.",
    },
  ],
  limits: [
    "Pasture-raised, organic, free-range, and outdoor are different claims. Studies often mix them.",
    "The fatty acid findings come from organic and free-range comparisons, not from every product that uses the words pasture-raised.",
    "The 2024 housing pilot had ten pigs per group and did not measure how much feed they ate.",
    "Nutrient studies here do not measure human disease, so no health-superiority claim is available.",
    "Welfare depends on more than the pasture word. These sources do not rank one housing system above the other.",
    "This page is not veterinary advice or medical advice.",
  ],
  references: [
    {
      title: "FSIS guideline on substantiating animal-raising or environment-related labeling claims, August 2024",
      href: FSIS_PASTURE,
      note: "Describes the pasture documentation FSIS encourages and says the guideline is not law by itself.",
    },
    {
      title: "Srednicka-Tober and colleagues, British Journal of Nutrition, 2016. Organic and conventional meat",
      href: MEAT_REVIEW,
      note: "Systematic review of 67 studies. Ties fatty acid gaps to forage and says many nutrients lacked enough data.",
    },
    {
      title: "Becker and colleagues, Translational Animal Science, 25 July 2024. Pasture rearing and pork composition",
      href: PASTURE_PILOT,
      note: "Pilot of 20 pigs on one ration. Finds little difference in the quality measures, plus thicker indoor backfat.",
    },
    {
      title: "Sampath and colleagues, Food Science and Nutrition, 2026. Dietary fat and pork fatty acids",
      href: FEED_TRIAL,
      note: "Shows a feed-fat change can alter pork fatty acids without a pasture comparison.",
    },
    {
      title: "EFSA Journal, 10 August 2022. Welfare of pigs on farm",
      href: EFSA_PIGS,
      note: "Identifies system-level welfare hazards, including the listed risk factors for tail biting.",
    },
  ],
};

export default article;
