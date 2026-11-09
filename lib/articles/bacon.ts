import { a, paragraph, t, type Article } from "./types";

const FSIS_CELERY =
  "https://www.fsis.usda.gov/sites/default/files/media_file/2021-03/FPLIC_4b_Sausage_Operations.pdf";
const FSIS_2020 =
  "https://www.fsis.usda.gov/sites/default/files/media_file/2021-04/19-03-fsis-final-response.pdf";
const FSIS_2025 =
  "https://www.fsis.usda.gov/sites/default/files/media_file/documents/FSIS-GD-2025-0006.pdf";
const EFSA_PLAIN =
  "https://www.efsa.europa.eu/sites/default/files/corporate_publications/files/nitrates-nitrites-170614.pdf";
const EFSA_OPINION = "https://www.efsa.europa.eu/en/efsajournal/pub/4786";
const IARC = "https://www.iarc.who.int/wp-content/uploads/2018/07/Monographs-QA_Vol114.pdf";
const WHO =
  "https://www.who.int/news-room/questions-and-answers/item/cancer-carcinogenicity-of-the-consumption-of-red-meat-and-processed-meat";

const article: Article = {
  slug: "uncured-bacon-celery-powder",
  title: "Uncured bacon and celery powder: is it safer than nitrates?",
  description:
    "Bacon cured with celery powder still contains nitrite. US labels can say uncured only with an exception. It has not been shown to be safer.",
  answer: paragraph([
    t(
      "Celery-powder bacon is not nitrite-free, and it has not been shown to be safer than bacon cured with added nitrite.",
    ),
  ]),
  blocks: [
    {
      kind: "h2",
      text: "What the label is doing",
    },
    paragraph([
      t("In the United States, bacon is regulated by the Food Safety and Inspection Service."),
    ]),
    paragraph([
      t("An "),
      a("FSIS questions document", FSIS_CELERY),
      t(" says celery powder is approved as a flavoring and, with a natural ascorbate source, as an antimicrobial."),
    ]),
    paragraph([
      t("It is not listed as an approved curing agent in the curing-agent table."),
      t(" Products that are normally cured, but use celery powder instead, must be labeled uncured."),
    ]),
    paragraph([
      t("The same document requires the phrase no nitrates or nitrites added."),
      t(" That phrase must be qualified by except for those naturally occurring in the named source, such as celery powder."),
    ]),
    paragraph([
      t("A shopper who reads only the large words can miss the exception."),
      t(" The exception is the part that says a nitrate source was used."),
    ]),
    paragraph([
      t("In December 2020, "),
      a("FSIS wrote to the Center for Science in the Public Interest", FSIS_2020),
      t("."),
    ]),
    paragraph([
      t("It said it intended to propose a rule stopping uncured and no nitrate or nitrite added on products made with any nitrate or nitrite source."),
      t(" Celery powder was named."),
    ]),
    paragraph([
      t("A "),
      a("December 2025 FSIS label guide", FSIS_2025),
      t(" still describes the exception statement for no nitrites or nitrates added."),
    ]),
    paragraph([
      t("This page treats the 2020 letter as a plan, not as a finished change to the label rule."),
    ]),
    {
      kind: "h2",
      text: "What celery powder does in the meat",
    },
    paragraph([
      t("Celery powder is used because it supplies nitrate or nitrite."),
      t(" Some powders are already converted to nitrite."),
      t(" Others are used with bacteria that reduce nitrate to nitrite."),
    ]),
    paragraph([
      t("Nitrite forms nitric oxide."),
      t(" That reaction creates the pink color and the cured flavor."),
    ]),
    paragraph([
      t("The "),
      a("European Food Safety Authority", EFSA_PLAIN),
      t(" says nitrite and nitrate salts are added to preserve food and to hinder harmful microorganisms, including Clostridium botulinum."),
    ]),
    paragraph([
      t("That is a safety function, not only a color function."),
      t(" This page does not describe how to cure meat at home."),
    ]),
    paragraph([
      t("The nitrite ion that takes part in curing is the same ion whether the plant supplied it or a curing salt did."),
      t(" FSIS regulates the source and the words on the label. It does not describe a second, safer nitrite."),
    ]),
    {
      kind: "h2",
      text: "What the safety reviews say",
    },
    paragraph([
      t("EFSA's 2017 plain-language summary kept an acceptable daily intake for nitrite of 0.07 milligrams per kilogram of body weight per day."),
      t(" The intake for nitrate stayed at 3.7 milligrams per kilogram per day."),
    ]),
    paragraph([
      t("Those figures are based on methaemoglobin, which reduces the blood's ability to carry oxygen."),
      t(" EFSA said the existing additive limits were protective for that effect."),
    ]),
    paragraph([
      t("The same summary says nitrite can contribute to nitrosamines, and that some nitrosamines are carcinogenic."),
      t(" Using conservative assumptions, it called nitrosamines from approved nitrite levels of low concern."),
    ]),
    paragraph([
      t("For nitrosamines formed in the body from nitrite at the acceptable intake, the panel estimated a margin above 10,000."),
    ]),
    paragraph([
      t("The "),
      a("full nitrite opinion", EFSA_OPINION),
      t(" estimated the margin for nitrosamines already in meat products as below 10,000 at high exposure, in every age group."),
    ]),
    paragraph([
      t("The panel said research could not clearly separate nitrosamines from added nitrite from nitrosamines already in the meat."),
      t(" It found some evidence linking dietary nitrite with gastric cancer."),
      t(" It found some evidence linking nitrite plus nitrate from processed meat with colorectal cancer."),
    ]),
    paragraph([
      t("Some evidence is not a verdict on every shopper and every package."),
    ]),
    paragraph([
      t("EFSA estimated that nitrate from additive use was under 5 percent of all nitrate exposure from food."),
      t(" A vegetable and a cured meat are different exposures."),
      t(" This page does not treat ordinary vegetables as processed meat."),
    ]),
    {
      kind: "h2",
      text: "Hazard and risk",
    },
    paragraph([
      t("The "),
      a("International Agency for Research on Cancer", IARC),
      t(" classifies processed meat as Group 1, carcinogenic to humans."),
    ]),
    paragraph([
      t("Processed meat means meat changed by salting, curing, fermentation, smoking, or other processes that keep it or change its flavor."),
      t(" Bacon sits in that group because it is cured."),
    ]),
    paragraph([
      t("IARC says Group 1 does not mean processed meat is as dangerous as tobacco smoking or asbestos."),
      t(" The class scores how strong the evidence is that an agent can cause cancer."),
      t(" It does not score how large the risk is for one person."),
    ]),
    paragraph([
      t("That is the difference between hazard and risk."),
      t(" Hazard means capable of causing harm."),
      t(" Risk means the chance of harm at a stated exposure."),
    ]),
    paragraph([
      t("The "),
      a("World Health Organization question page", WHO),
      t(" uses the same distinction."),
    ]),
    paragraph([
      t("Its classes measure whether something is capable of causing cancer."),
      t(" They do not measure how likely cancer is at a particular intake."),
    ]),
    paragraph([
      t("WHO says risk rises as the amount eaten rises."),
      t(" It says the original assessment could not decide whether a safe level exists."),
      t(" A guideline on animal-source foods is still being developed."),
    ]),
    {
      kind: "h2",
      text: "Association and causation",
    },
    paragraph([
      t("IARC said the Group 1 rating rests on sufficient evidence from epidemiological studies that processed meat causes colorectal cancer."),
      t(" An association with stomach cancer was also seen, and IARC called that evidence inconclusive."),
    ]),
    paragraph([
      t("Those human studies observe diets. They do not assign people to eat bacon."),
      t(" IARC still judged the colorectal evidence sufficient for a causal statement about the group."),
    ]),
    paragraph([
      t("Its question sheet says the studies showed small increases in risk."),
      t(" An analysis of 10 studies estimated that each 50 gram daily portion was linked with about an 18 percent higher risk of colorectal cancer."),
    ]),
    paragraph([
      t("Eighteen percent is a relative change, not an absolute risk."),
      t(" If the starting risk is low, a relative rise can still be a small absolute change."),
      t(" That question sheet does not give a personal lifetime percentage, so this page will not invent one."),
    ]),
    paragraph([
      t("IARC did not publish a separate class for celery-cured bacon and nitrite-cured bacon."),
      t(" No figure on this page claims they have the same risk, or that one has been proven safer."),
    ]),
  ],
  faqs: [
    {
      question: "Does uncured mean the bacon has no nitrite?",
      answer:
        "No. US rules require uncured when the nitrite source is not an approved curing agent. Celery powder is in that position, and the label must name it in the exception.",
    },
    {
      question: "Is nitrite from celery a different molecule?",
      answer:
        "No. The curing reaction uses nitrite. The plant source supplies nitrate that is converted to nitrite, or the powder is sold already converted.",
    },
    {
      question: "Is no nitrates added a health claim?",
      answer:
        "It is a labeling phrase that must carry an exception when a natural source is used. FSIS said in 2020 that it planned to stop that phrase on foods made with any nitrate or nitrite source.",
    },
    {
      question: "Does Group 1 mean bacon is as dangerous as smoking?",
      answer:
        "No. IARC says the shared group is about the strength of evidence, not equal danger. The agency also said the increases in cancer risk were small.",
    },
    {
      question: "Does a small relative risk mean processed meat is unimportant?",
      answer:
        "IARC called the increases small and still pointed to advice to moderate processed meat. This page cannot set a personal portion.",
    },
  ],
  limits: [
    "The label rules cited here are US rules. Another country can word the same product differently.",
    "The 2020 FSIS letter announced an intention to propose a rule. This page does not claim that rule is in force.",
    "EFSA's low-concern statement and its margin-of-exposure estimate answer different parts of the nitrite question. This page reports both and does not merge them into one claim.",
    "IARC's 18 percent figure is a relative estimate from observational studies of processed meat as a group.",
    "There is no separate IARC classification for celery-powder bacon.",
    "This page is not medical advice, and it is not a home-curing guide.",
  ],
  references: [
    {
      title: "FSIS: use of celery powder and other natural sources of nitrite",
      href: FSIS_CELERY,
      note: "Explains the uncured label and the required exception for naturally occurring nitrate or nitrite.",
    },
    {
      title: "FSIS response to petition 19-03, 10 December 2020",
      href: FSIS_2020,
      note: "Says the agency intended to propose ending uncured and no nitrate or nitrite added claims when any source is used.",
    },
    {
      title: "FSIS guideline for label approval, December 2025",
      href: FSIS_2025,
      note: "Still describes the exception statement on no nitrite or nitrate claims.",
    },
    {
      title: "EFSA: Nitrites and nitrates added to food, plain-language summary, 2017",
      href: EFSA_PLAIN,
      note: "Gives the acceptable daily intakes, the botulism reason for use, and the low-concern wording on nitrosamines.",
    },
    {
      title: "EFSA journal: re-evaluation of potassium nitrite and sodium nitrite, 15 June 2017",
      href: EFSA_OPINION,
      note: "Reports the margin of exposure below 10,000 at high exposure and the limited cancer evidence.",
    },
    {
      title: "IARC: Q&A on red meat and processed meat, 2015 monograph volume 114",
      href: IARC,
      note: "States Group 1, the unequal-danger point, the small risk increases, and the 18 percent relative estimate.",
    },
    {
      title: "WHO: Carcinogenicity of red and processed meat",
      href: WHO,
      note: "Defines hazard assessment as distinct from risk and says a safe level was not set.",
    },
  ],
};

export default article;
