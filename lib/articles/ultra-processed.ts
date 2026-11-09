import { a, paragraph, t, type Article } from "./types";

const GOV_UPF = "https://www.gov.uk/government/publications/ultra-processed-foods";
const FAO =
  "https://openknowledge.fao.org/server/api/core/bitstreams/5277b379-0acb-4d97-a6a3-602774104629/content";
const SACN_2023 =
  "https://www.gov.uk/government/publications/sacn-statement-on-processed-foods-and-health/sacn-statement-on-processed-foods-and-health-summary-report";
const SACN_2025 =
  "https://www.gov.uk/government/publications/processed-foods-and-health-sacns-rapid-evidence-update/processed-foods-and-health-sacns-rapid-evidence-update-summary";
const LANE = "https://pmc.ncbi.nlm.nih.gov/articles/PMC10899807/";
const HALL = "https://pmc.ncbi.nlm.nih.gov/articles/PMC7946062/";

const article: Article = {
  slug: "ultra-processed-food",
  title: "Is ultra-processed food really that bad?",
  description:
    "Higher intake is linked with worse health in observational studies. A short trial supports extra calories and weight gain. Processing itself is not proven to cause each disease.",
  answer: paragraph([
    t(
      "Ultra-processed food is associated with worse health, but that does not prove processing itself causes every linked disease.",
    ),
  ]),
  blocks: [
    {
      kind: "h2",
      text: "What the name means",
    },
    paragraph([
      t("The "),
      a("GOV.UK page on ultra-processed foods", GOV_UPF),
      t(" says there is no single agreed definition."),
    ]),
    paragraph([
      t("Most research uses the NOVA system."),
      t(" A "),
      a("Food and Agriculture Organization report", FAO),
      t(
        " describes these foods as formulations of ingredients, mostly of exclusive industrial use, made by industrial techniques.",
      ),
    ]),
    paragraph([
      t("The GOV.UK page gives examples such as sweetened breakfast cereals, soft drinks, and confectionery."),
      t(" It also names some flavoured yogurts and low-fat spreads."),
    ]),
    paragraph([
      t("Some foods in the group are high in fat, sugar, or salt."),
      t(" The same page says that is not true of all of them."),
    ]),
    {
      kind: "h2",
      text: "What the disease studies show",
    },
    paragraph([
      t("A "),
      a("2024 umbrella review in The BMJ", LANE),
      t(" pooled 45 meta-analyses of NOVA-defined ultra-processed food."),
    ]),
    paragraph([
      t("The pooled data included 9,888,373 people."),
      t(" Direct associations appeared in 32 of the 45 analyses."),
    ]),
    paragraph([
      t("The authors' strongest class covered four outcomes."),
    ]),
    {
      kind: "ul",
      items: [
        "Cardiovascular death had a risk ratio of 1.50, with a 95 percent interval of 1.37 to 1.63. GRADE quality was very low.",
        "Type 2 diabetes, in a dose-response analysis, had a risk ratio of 1.12, with an interval of 1.11 to 1.13. GRADE quality was moderate.",
        "Anxiety outcomes had an odds ratio of 1.48, with an interval of 1.37 to 1.59. GRADE quality was low.",
        "Combined common mental disorder outcomes had an odds ratio of 1.53, with an interval of 1.43 to 1.63. GRADE quality was low.",
      ],
    },
    paragraph([
      t("A risk ratio of 1.50 means a 50 percent higher relative risk in the groups compared."),
      t(" It is not a person's chance of developing the disease."),
    ]),
    paragraph([
      t("Across all 45 analyses, four were moderate quality, 22 were low, and 19 were very low."),
      t(" None were rated high quality."),
    ]),
    paragraph([
      t("A lower class in the same review linked higher intake with all-cause death, depression, poor sleep, wheezing, and obesity."),
      t(" The authors rated those analyses as low quality."),
    ]),
    paragraph([
      t("The "),
      a("UK Scientific Advisory Committee on Nutrition", SACN_2023),
      t(" reviewed this field in 2023."),
    ]),
    paragraph([
      t("It said the studies were almost all observational."),
      t(" Energy intake, body mass index, smoking, and socioeconomic status may not be fully accounted for."),
    ]),
    paragraph([
      t("Diets high in these foods are often high in saturated fat, salt, or free sugars."),
      t(" They are often low in fruit, vegetables, and fiber."),
    ]),
    paragraph([
      t("The committee called the associations concerning."),
      t(" It also said the evidence needs caution."),
    ]),
    paragraph([
      t("A "),
      a("2025 update from the same committee", SACN_2025),
      t(" found the same pattern of associations."),
    ]),
    paragraph([
      t("It still could not say whether processing itself is the cause."),
      t(" Calories, saturated fat, salt, and free sugars may explain the links."),
    ]),
    paragraph([
      t("That update also noted one small trial in nine people."),
      t(" They gained 1.1 kilograms more on an ultra-processed diet than on the comparison diet."),
      t(" The committee did not formally grade that trial."),
    ]),
    {
      kind: "h2",
      text: "The trial that measured eating",
    },
    paragraph([
      t("A "),
      a("2019 inpatient trial led by Kevin Hall", HALL),
      t(" is the clearest test of intake itself."),
    ]),
    paragraph([
      t("Twenty weight-stable adults lived at the NIH Clinical Center."),
      t(" Each person ate an ultra-processed diet for two weeks and an unprocessed diet for two weeks."),
    ]),
    paragraph([
      t("The meals were matched for calories offered, energy density, macronutrients, sugar, sodium, and fiber."),
      t(" People could eat as much or as little as they wanted."),
    ]),
    paragraph([
      t("Energy intake was 508 ± 106 kilocalories per day higher on the ultra-processed diet."),
      t(" People gained 0.9 ± 0.3 kilograms on that diet."),
      t(" They lost 0.9 ± 0.3 kilograms on the unprocessed diet."),
    ]),
    paragraph([
      t("The trial was not designed to identify which feature of the food caused the extra intake."),
      t(" A ward menu is not the same as choosing food at home."),
      t(" Two weeks cannot show cancer, diabetes, or heart disease."),
    ]),
    {
      kind: "h2",
      text: "Association and causation",
    },
    paragraph([
      t("An association means two things occur together."),
      t(" Causation means one thing produces the other."),
    ]),
    paragraph([
      t("The disease results above are associations from observational studies."),
      t(" People who eat more ultra-processed food may also differ in income, smoking, activity, and the rest of the diet."),
    ]),
    paragraph([
      t("The Hall trial supports a causal effect on short-term calories and weight in that setting."),
      t(" It does not show that ultra-processed food causes diabetes, anxiety, or cancer."),
    ]),
    paragraph([
      t("The BMJ authors said more randomised trials are needed before cause is settled for the disease outcomes."),
    ]),
    {
      kind: "h2",
      text: "Hazard and risk",
    },
    paragraph([
      t("A hazard is something that can cause harm."),
      t(" Risk is the chance of harm at a given amount, in a given person."),
    ]),
    paragraph([
      t("Ultra-processed food is a broad category, not one chemical with one hazard label."),
      t(" A soft drink and a fortified yogurt can both fall in the group and still be different exposures."),
    ]),
    paragraph([
      t("Saying the whole category is dangerous states a hazard without stating a risk."),
      t(" Amount, the specific food, and the rest of the diet all change the risk."),
    ]),
    {
      kind: "h2",
      text: "What advisers already say",
    },
    paragraph([
      t("The 2025 UK update pointed to the Eatwell Guide."),
      t(" That guide already treats crisps, biscuits, cakes, confectionery, and ice cream as foods to limit."),
    ]),
    paragraph([
      t("Many of those foods are ultra-processed."),
      t(" The guide is a UK model."),
      t(" It is not a personal prescription."),
    ]),
  ],
  faqs: [
    {
      question: "Are all ultra-processed foods the same?",
      answer:
        "No. The GOV.UK page says some, but not all, are high in fat, sugar, or salt. The group also mixes products with different recipes.",
    },
    {
      question: "Do these studies prove that processing causes disease?",
      answer:
        "No. The disease studies show associations. The short feeding trial supports extra calories and weight gain. It does not measure long-term disease.",
    },
    {
      question: "Should the observational studies be ignored?",
      answer:
        "No. The links repeat across reviews, and UK advisers call them concerning. Those advisers also say the evidence cannot yet separate processing from the foods' nutrient profile.",
    },
    {
      question: "Does a risk ratio of 1.50 mean a 50 percent chance of death?",
      answer:
        "No. It means the compared groups had a 50 percent higher relative risk. It does not state any one person's absolute chance.",
    },
    {
      question: "What can a reader do with this?",
      answer:
        "Existing advice already says to limit foods high in saturated fat, salt, and free sugars. This page cannot plan a diet or replace a clinician.",
    },
  ],
  limits: [
    "Studies do not always place the same product in the same NOVA group.",
    "The 2025 US Dietary Guidelines Advisory Committee, as summarised by the UK committee, called the certainty limited partly because the definition is unclear.",
    "Confounding can remain even after statistical adjustment.",
    "Few randomised trials exist, and the main inpatient trial lasted two weeks in 20 adults.",
    "This page summarises the sources below. It is not a new systematic review.",
    "This page is not medical advice.",
  ],
  references: [
    {
      title: "GOV.UK: Ultra-processed foods",
      href: GOV_UPF,
      note: "States the lack of one definition, gives examples, and says the health link is not yet explained.",
    },
    {
      title: "FAO: Ultra-processed foods, diet quality and health using the NOVA classification system",
      href: FAO,
      note: "Gives the NOVA description of industrial formulations used on the GOV.UK page.",
    },
    {
      title: "Lane and colleagues, BMJ, 28 February 2024. Ultra-processed food exposure and adverse health outcomes",
      href: LANE,
      note: "Umbrella review of 45 meta-analyses. Reports the ratios, GRADE ratings, and the need for more trials.",
    },
    {
      title: "Hall and colleagues, Cell Metabolism, 2019. Inpatient randomised trial of ultra-processed diets",
      href: HALL,
      note: "Reports the 20-adult crossover, the 508 kilocalorie difference, and the 0.9 kilogram weight changes.",
    },
    {
      title: "SACN statement on processed foods and health, summary, 11 July 2023",
      href: SACN_2023,
      note: "Says the associations are concerning and that the observational evidence needs caution.",
    },
    {
      title: "SACN rapid evidence update on processed foods and health, summary, 2025",
      href: SACN_2025,
      note: "Keeps the 2023 caution and notes the nine-person trial and the Eatwell Guide.",
    },
  ],
};

export default article;
