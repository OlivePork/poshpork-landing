import { a, paragraph, t, type Article, type Block, type ListedFilm } from "./types";

const PRESS = "https://www.poshpork.com/press";
const MOVIE = "/movie";
const PLATE = "https://www.rottentomatoes.com/m/whats-on-your-plate";
const PLATE_SITE = "https://www.whatsonyourplateproject.org/about/synopsis";
const CAFETERIA = "https://dceff.org/film/cafeteria-man/";
const KIDS_MENU = "https://www.commonsensemedia.org/movie-reviews/the-kids-menu";
const BIG_FARM = "https://www.intofilm.org/films/19468";
const FOOD_INC = "https://en.wikipedia.org/wiki/Food,_Inc.";
const FOOD_INC_2 = "https://en.wikipedia.org/wiki/Food,_Inc._2";
const SUPER = "https://en.wikipedia.org/wiki/Super_Size_Me";
const FED_UP = "https://en.wikipedia.org/wiki/Fed_Up_(film)";
const KING_CORN = "https://en.wikipedia.org/wiki/King_Corn_(film)";
const JIRO = "https://en.wikipedia.org/wiki/Jiro_Dreams_of_Sushi";
const FORKS = "https://en.wikipedia.org/wiki/Forks_Over_Knives";
const FOOD_2050 =
  "https://www.prnewswire.com/news-releases/rockefeller-foundation-food-2050-documentary-explores-feeding-a-planet-of-10-billion-302662870.html";
const SUGAR = "https://en.wikipedia.org/wiki/That_Sugar_Film";
const BBC = "https://www.bbc.co.uk/programmes/m0025gqs";
const WICKS =
  "https://www.channel4.com/press/news/channel-4-follows-joe-wicks-he-develops-killer-protein-bar-expose-truth-ultra-processed";
const SUNSPRING = "https://www.fkv.de/en/oscar-sharp-with-ross-goodwin-benjamin";
const FROST = "https://thefrost.squarespace.com/";
const CRITTERZ =
  "https://www.animationmagazine.net/2026/05/ai-animated-critterz-feature-launching-sales-at-cannes/";

const OURS: ListedFilm = {
  title: "Which Food Is Killing You?",
  directors: ["Colin Marry"],
  summary:
    "Full-length animated food documentary. Colin Marry wrote the script. The animation was made with AI.",
  sourceName: "Posh Pork press page",
  sourceHref: PRESS,
};

function ourFilmBlocks(): Block[] {
  return [
    { kind: "h2", text: "Which Food Is Killing You?" },
    paragraph([
      t("Which Food Is Killing You? is a full-length animated food documentary."),
    ]),
    paragraph([
      t("Colin Marry wrote the script."),
      t(" The press page says no part of the script was generated."),
    ]),
    paragraph([
      t("The animation was made with AI, using Grok Imagine."),
    ]),
    paragraph([t("It runs 1 hour 23 minutes.")]),
    paragraph([
      t("Viewers sit as a jury and answer questions during the film."),
    ]),
    paragraph([
      t("The site offers it for families. Schools and workplaces can "),
      a("book a licence", "/schools"),
      t("."),
    ]),
    paragraph([
      t("One payment of €15 gives a household permanent access."),
    ]),
    paragraph([
      t("Buy it on "),
      a("this site", MOVIE),
      t(". It is not offered on a streaming service."),
    ]),
  ];
}

function related(links: { text: string; href: string }[]): Block[] {
  const inlines = links.flatMap((link, index) => [
    a(link.text, link.href),
    t(index === links.length - 1 ? "." : ". "),
  ]);
  return [{ kind: "h2", text: "Related pages" }, paragraph(inlines)];
}

const families: Article = {
  slug: "food-documentaries-for-families",
  title: "Food documentaries for kids and families",
  description:
    "A short selection of real food documentaries that children and families can watch together, plus what each one actually covers.",
  answer: paragraph([
    t(
      "A few food documentaries are made with children in the story, or are clear enough for a family to watch together.",
    ),
  ]),
  films: [
    {
      title: "What's on Your Plate?",
      year: "2009",
      directors: ["Catherine Gund"],
      summary: "Two 11-year-old friends follow their food from farms, shops, and school meals.",
      sourceName: "Rotten Tomatoes",
      sourceHref: PLATE,
    },
    {
      title: "Cafeteria Man",
      year: "2011",
      directors: ["Richard Chisolm", "Sheila Kinkade"],
      summary: "Tony Geraci tries to replace processed school meals in Baltimore with food cooked from local farms.",
      sourceName: "DC Environmental Film Festival",
      sourceHref: CAFETERIA,
    },
    {
      title: "The Kids Menu",
      year: "2016",
      directors: ["Kurt Engfehr"],
      summary: "Profiles US projects that involve children in choosing and growing healthier food.",
      sourceName: "Common Sense Media",
      sourceHref: KIDS_MENU,
    },
    {
      title: "The Biggest Little Farm",
      year: "2018",
      directors: ["John Chester"],
      summary: "John Chester records the years spent building a biodiverse farm.",
      sourceName: "Into Film",
      sourceHref: BIG_FARM,
    },
    OURS,
  ],
  blocks: [
    paragraph([
      t("This is a selection, not a ranking. It does not use search volume or chart position."),
    ]),
    { kind: "h2", text: "What's on Your Plate?" },
    paragraph([
      t("Catherine Gund directed What's on Your Plate? Rotten Tomatoes dates it to 2009."),
    ]),
    paragraph([
      t("The "),
      a("film's own site", PLATE_SITE),
      t(" says two 11-year-old friends spend a year asking where their food comes from."),
    ]),
    paragraph([
      t("They visit shops, school lunches, farms, and markets. The camera stays with the children."),
    ]),
    { kind: "h2", text: "Cafeteria Man" },
    paragraph([
      t("The "),
      a("DC Environmental Film Festival", CAFETERIA),
      t(" lists Cafeteria Man as a 2011 documentary."),
    ]),
    paragraph([
      t("It credits Richard Chisolm and Sheila Kinkade as director and producer."),
    ]),
    paragraph([
      t("Chef Tony Geraci tries to change meals for students in Baltimore's public schools."),
    ]),
    paragraph([
      t("Students grow food and help design meals. The subject is school lunch, so families can use it as a prompt."),
    ]),
    { kind: "h2", text: "The Kids Menu" },
    paragraph([
      t("Common Sense Media lists The Kids Menu as a 2016 documentary directed by Kurt Engfehr."),
    ]),
    paragraph([
      t("It visits projects that teach children how food choices are made, including gardens and school meals."),
    ]),
    paragraph([
      t("The review suggests it from about age 10. This page does not name a current streaming home for it."),
    ]),
    { kind: "h2", text: "The Biggest Little Farm" },
    paragraph([
      t("Into Film lists The Biggest Little Farm as a 2018 documentary directed by John Chester."),
    ]),
    paragraph([
      t("It follows the work of building one farm that supports many plants and animals."),
    ]),
    paragraph([
      t("Into Film says it explains life and death on a farm in a way young audiences can follow."),
    ]),
    paragraph([
      t("The same page says the film can be streamed on Into Film+, a UK service for schools and clubs."),
    ]),
    ...ourFilmBlocks(),
    ...related([
      { text: "Documentaries like Food, Inc.", href: "/articles/documentaries-like-food-inc" },
      { text: "Ultra-processed food documentaries", href: "/articles/ultra-processed-food-documentaries" },
      { text: "School licences", href: "/schools" },
    ]),
  ],
  faqs: [
    {
      question: "Is every food documentary suitable for a young child?",
      answer:
        "No. Some food films show slaughter or illness. Read a description first, and watch with the child if the subject is heavy.",
    },
    {
      question: "Does this page rank the films?",
      answer:
        "No. The films are here because a reliable page confirms the title, year, and maker. Order on the page is not a score.",
    },
    {
      question: "Where can a family watch Which Food Is Killing You?",
      answer:
        "On this site. One payment of €15 gives the household permanent access. It is not offered on a streaming service.",
    },
    {
      question: "Can a school play these films from a household login?",
      answer:
        "Not this film. The household purchase does not cover a class. Schools book a licence.",
    },
  ],
  limits: [
    "A current streaming home is named only when the source page still says the film is available there.",
    "Into Film+ is a UK education service. It is not a promise that every household can play The Biggest Little Farm.",
    "No ratings, awards, or viewer quotes are added.",
    "This page is not medical advice, and it is not a complete list of every family food film.",
  ],
  references: [
    {
      title: "Rotten Tomatoes: What's on Your Plate?",
      href: PLATE,
      note: "Dates the film to 2009 and names Catherine Gund as director.",
    },
    {
      title: "What's on Your Plate? project site",
      href: PLATE_SITE,
      note: "Describes the two children and the year they spend tracing their food.",
    },
    {
      title: "DC Environmental Film Festival: Cafeteria Man",
      href: CAFETERIA,
      note: "Gives the 2011 date, the school-meal story, and the Chisolm and Kinkade credit.",
    },
    {
      title: "Common Sense Media: The Kids Menu",
      href: KIDS_MENU,
      note: "Dates the 2016 release, names Kurt Engfehr, and describes the projects in the film.",
    },
    {
      title: "Into Film: The Biggest Little Farm",
      href: BIG_FARM,
      note: "Gives the 2018 date, John Chester, the farm story, and the Into Film+ listing.",
    },
    {
      title: "Posh Pork press page",
      href: PRESS,
      note: "States the runtime, the director, the script, and the Grok Imagine animation.",
    },
  ],
};

const like: Article = {
  slug: "documentaries-like-food-inc",
  title: "Documentaries like Food, Inc., Super Size Me and Fed Up",
  description:
    "What those three films examine, which verified films sit near them, and how this site's film differs.",
  answer: paragraph([
    t(
      "Food, Inc., Super Size Me, and Fed Up all examine industrial food. Later films return to that system from different angles.",
    ),
  ]),
  films: [
    {
      title: "Food, Inc.",
      year: "2008",
      directors: ["Robert Kenner"],
      summary: "Examines industrial food production in the United States.",
      sourceName: "Wikipedia",
      sourceHref: FOOD_INC,
    },
    {
      title: "Super Size Me",
      year: "2004",
      directors: ["Morgan Spurlock"],
      summary: "Morgan Spurlock directs and stars in this fast-food documentary.",
      sourceName: "Wikipedia",
      sourceHref: SUPER,
    },
    {
      title: "Fed Up",
      year: "2014",
      directors: ["Stephanie Soechtig"],
      summary: "Stephanie Soechtig directs this documentary. Katie Couric narrates it.",
      sourceName: "Wikipedia",
      sourceHref: FED_UP,
    },
    {
      title: "Food, Inc. 2",
      year: "2023",
      directors: ["Robert Kenner", "Melissa Robledo"],
      summary: "A sequel about corporate consolidation in the American food system.",
      sourceName: "Wikipedia",
      sourceHref: FOOD_INC_2,
    },
    {
      title: "King Corn",
      year: "2007",
      directors: ["Aaron Woolf"],
      summary: "Two friends grow an acre of corn in Iowa and follow where the crop goes.",
      sourceName: "Wikipedia",
      sourceHref: KING_CORN,
    },
    OURS,
  ],
  blocks: [
    paragraph([
      t("This page groups films by subject. It is not a ranked list of the best films."),
    ]),
    { kind: "h2", text: "The three films people name" },
    paragraph([
      t("Wikipedia dates Food, Inc. to 2008 and names Robert Kenner as director."),
    ]),
    paragraph([
      t("Michael Pollan and Eric Schlosser narrate it. The film looks at industrial food production."),
    ]),
    paragraph([
      t("Super Size Me is a 2004 documentary directed by and starring Morgan Spurlock."),
    ]),
    paragraph([
      t("He records his own fast-food diet. That is one person's experiment, not a trial of every viewer."),
    ]),
    paragraph([
      t("Wikipedia also dates his sequel, Super Size Me 2: Holy Chicken!, to 2017."),
    ]),
    paragraph([
      t("Fed Up is a 2014 documentary directed by Stephanie Soechtig. Katie Couric narrates it."),
    ]),
    paragraph([
      t("It sits with the other films about processed food and the companies that sell it."),
    ]),
    { kind: "h2", text: "Films that continue the inquiry" },
    paragraph([
      t("Food, Inc. 2 is a 2023 documentary directed by Robert Kenner and Melissa Robledo."),
    ]),
    paragraph([
      t("Wikipedia says it looks at corporate consolidation, and that a limited US release followed in April 2024."),
    ]),
    paragraph([
      t("King Corn, directed by Aaron Woolf, was released in 2007."),
    ]),
    paragraph([
      t("Ian Cheney and Curt Ellis grow an acre of corn in Iowa and trace where that corn goes."),
    ]),
    ...ourFilmBlocks(),
    paragraph([
      t("This film uses an animated trial, not interviews in factories. The script is Colin Marry's."),
    ]),
    ...related([
      { text: "Food documentaries for families", href: "/articles/food-documentaries-for-families" },
      { text: "Food documentaries in 2026", href: "/articles/food-documentaries-2026" },
      { text: "Ultra-processed food documentaries", href: "/articles/ultra-processed-food-documentaries" },
    ]),
  ],
  faqs: [
    {
      question: "Is Food, Inc. 2 the same film as Food, Inc.?",
      answer:
        "No. The first film is from 2008 and is directed by Robert Kenner. The sequel is from 2023 and adds Melissa Robledo as co-director.",
    },
    {
      question: "Does Super Size Me prove that fast food harms every person in the same way?",
      answer:
        "No. Spurlock records his own diet. One filmed experiment is not a clinical trial of the whole population.",
    },
    {
      question: "Are these films the same as Which Food Is Killing You?",
      answer:
        "No. They are live-action reports. This site's film is animated, interactive, and sold here rather than through a streamer.",
    },
    {
      question: "Why is a streaming app not listed for these titles?",
      answer:
        "Rights change. This page names a place to watch only when a current source still says the film is available there.",
    },
  ],
  limits: [
    "Wikipedia is used for title, year, director, and the film's stated subject.",
    "A 2017 sequel is named, but this page does not retell a plot that the source extract did not give.",
    "No box-office figures, awards, or star ratings are used as a reason to watch.",
    "This is not a complete list of every film about industrial food.",
  ],
  references: [
    {
      title: "Wikipedia: Food, Inc.",
      href: FOOD_INC,
      note: "Dates the film to 2008, names Robert Kenner, and describes the industrial-food subject.",
    },
    {
      title: "Wikipedia: Food, Inc. 2",
      href: FOOD_INC_2,
      note: "Dates the sequel to 2023, names both directors, and notes the April 2024 US release.",
    },
    {
      title: "Wikipedia: Super Size Me",
      href: SUPER,
      note: "Dates the film to 2004, names Morgan Spurlock, and dates the sequel to 2017.",
    },
    {
      title: "Wikipedia: Fed Up",
      href: FED_UP,
      note: "Dates the film to 2014 and names Stephanie Soechtig, with narration by Katie Couric.",
    },
    {
      title: "Wikipedia: King Corn",
      href: KING_CORN,
      note: "Dates the 2007 release and describes the acre of corn in Iowa.",
    },
    {
      title: "Posh Pork press page",
      href: PRESS,
      note: "Gives the facts used here for Which Food Is Killing You?",
    },
  ],
};

const year2026: Article = {
  slug: "food-documentaries-2026",
  title: "Food documentaries to watch in 2026",
  description:
    "Older food documentaries that still define the subject, plus a 2026 premiere whose director was not named in the announcement.",
  answer: paragraph([
    t(
      "In 2026 the useful set still includes older films with confirmed makers, plus new work whose release a primary source states.",
    ),
  ]),
  films: [
    {
      title: "Super Size Me",
      year: "2004",
      directors: ["Morgan Spurlock"],
      summary: "A first-person fast-food documentary from 2004.",
      sourceName: "Wikipedia",
      sourceHref: SUPER,
    },
    {
      title: "Food, Inc.",
      year: "2008",
      directors: ["Robert Kenner"],
      summary: "A 2008 examination of industrial food production.",
      sourceName: "Wikipedia",
      sourceHref: FOOD_INC,
    },
    {
      title: "Jiro Dreams of Sushi",
      year: "2011",
      directors: ["David Gelb"],
      summary: "David Gelb follows sushi chef Jiro Ono in his small Tokyo restaurant.",
      sourceName: "Wikipedia",
      sourceHref: JIRO,
    },
    {
      title: "Forks Over Knives",
      year: "2011",
      directors: ["Lee Fulkerson"],
      summary: "Argues for a whole-food, plant-based diet and against processed food and animal food.",
      sourceName: "Wikipedia",
      sourceHref: FORKS,
    },
    {
      title: "FOOD 2050",
      year: "2026",
      directors: [],
      maker: "The Rockefeller Foundation",
      summary: "A January 2026 documentary, narrated by Viola Davis, about feeding a larger population.",
      sourceName: "Rockefeller Foundation announcement",
      sourceHref: FOOD_2050,
    },
    OURS,
  ],
  blocks: [
    paragraph([
      t("The title is a viewing guide for this year. It is not a claim that these films rank first."),
    ]),
    { kind: "h2", text: "Films that still set the subject" },
    paragraph([
      t("Super Size Me (2004, Morgan Spurlock) and Food, Inc. (2008, Robert Kenner) remain the films people use as a starting point."),
    ]),
    paragraph([
      t("Jiro Dreams of Sushi is a 2011 documentary directed by David Gelb."),
    ]),
    paragraph([
      t("It follows sushi chef Jiro Ono, then 85, in a 10-seat restaurant in a Tokyo station."),
    ]),
    paragraph([
      t("Wikipedia records a streaming date of August 2012. A past date is not a current offer."),
    ]),
    paragraph([
      t("Forks Over Knives is a 2011 documentary directed by Lee Fulkerson."),
    ]),
    paragraph([
      t("The film argues that a whole-food, plant-based diet can prevent some diseases."),
    ]),
    paragraph([
      t("That is the film's case. This page does not treat the case as settled medicine."),
    ]),
    { kind: "h2", text: "A 2026 premiere" },
    paragraph([
      t("On 15 January 2026 the Rockefeller Foundation announced the premiere of FOOD 2050."),
    ]),
    paragraph([
      t("Media RED and Food Tank worked on it with the foundation. Viola Davis narrates it."),
    ]),
    paragraph([
      t("The announcement asks how to feed a population of 10 billion. It does not name a director."),
    ]),
    paragraph([
      t("This page therefore names the organisations, not an invented director."),
    ]),
    ...ourFilmBlocks(),
    ...related([
      { text: "Documentaries like Food, Inc.", href: "/articles/documentaries-like-food-inc" },
      { text: "Films made with AI", href: "/articles/films-made-with-ai" },
    ]),
  ],
  faqs: [
    {
      question: "Is this a list of the best food documentaries of all time?",
      answer:
        "No. It is a small set of films whose titles, years, and makers were checked. Best would need a method this page does not have.",
    },
    {
      question: "Why is a 2004 film on a 2026 page?",
      answer:
        "Because people still start with it, and the record of who made it is solid. New does not erase a clear older film.",
    },
    {
      question: "Who directed FOOD 2050?",
      answer:
        "The January 2026 announcement does not say. Naming a director here would be a guess.",
    },
    {
      question: "Is Jiro Dreams of Sushi still streaming where it was in 2012?",
      answer:
        "This page does not know. A 2012 date is not proof of a current offer.",
    },
  ],
  limits: [
    "Films without a checked year or maker were left off, including titles that appeared only on a fan list.",
    "FOOD 2050 is included from the funder's announcement. A director credit was not in that text.",
    "No award counts or viewer scores are used.",
    "Availability is omitted unless a current page states it.",
  ],
  references: [
    {
      title: "Wikipedia: Jiro Dreams of Sushi",
      href: JIRO,
      note: "Dates the film to 2011, names David Gelb, and records an August 2012 streaming date.",
    },
    {
      title: "Wikipedia: Forks Over Knives",
      href: FORKS,
      note: "Dates the film to 2011, names Lee Fulkerson, and states the diet argument.",
    },
    {
      title: "Rockefeller Foundation: FOOD 2050 announcement, 15 January 2026",
      href: FOOD_2050,
      note: "Announces the premiere, the partners, and narration by Viola Davis.",
    },
    {
      title: "Wikipedia: Super Size Me",
      href: SUPER,
      note: "Used for the 2004 date and Morgan Spurlock's director credit.",
    },
    {
      title: "Wikipedia: Food, Inc.",
      href: FOOD_INC,
      note: "Used for the 2008 date and Robert Kenner's director credit.",
    },
    {
      title: "Posh Pork press page",
      href: PRESS,
      note: "Source for the facts about Which Food Is Killing You?",
    },
  ],
};

const upf: Article = {
  slug: "ultra-processed-food-documentaries",
  title: "Ultra-processed food documentaries worth watching",
  description:
    "Documentaries that look at sugar, fast food, or ultra-processed products, with the maker and year taken from a primary page.",
  answer: paragraph([
    t(
      "Several documentaries examine packaged food, sugar, or ultra-processed products. They do not all use the same definition.",
    ),
  ]),
  films: [
    {
      title: "That Sugar Film",
      year: "2014",
      directors: ["Damon Gameau"],
      summary: "Damon Gameau looks at sugar hidden in foods and how it affects the body.",
      sourceName: "Wikipedia",
      sourceHref: SUGAR,
    },
    {
      title: "Fed Up",
      year: "2014",
      directors: ["Stephanie Soechtig"],
      summary: "A 2014 documentary about the processed-food supply, narrated by Katie Couric.",
      sourceName: "Wikipedia",
      sourceHref: FED_UP,
    },
    {
      title: "Super Size Me",
      year: "2004",
      directors: ["Morgan Spurlock"],
      summary: "A 2004 fast-food experiment filmed by its director.",
      sourceName: "Wikipedia",
      sourceHref: SUPER,
    },
    {
      title: "Irresistible: Why We Can't Stop Eating",
      year: "2024",
      directors: ["Stuart Elliott"],
      summary: "Chris van Tulleken asks why ultra-processed food is hard to resist.",
      sourceName: "BBC",
      sourceHref: BBC,
    },
    {
      title: "Joe Wicks: Licensed to Kill",
      year: "2025",
      directors: ["Storm Theunissen"],
      summary: "Joe Wicks and Chris van Tulleken build a protein bar to challenge UK food rules.",
      sourceName: "Channel 4",
      sourceHref: WICKS,
    },
    OURS,
  ],
  blocks: [
    paragraph([
      t("Read the "),
      a("evidence page on ultra-processed food", "/articles/ultra-processed-food"),
      t(" before treating any film as proof."),
    ]),
    paragraph([
      t("A film can show a real factory or a real diet and still not prove a disease in every viewer."),
    ]),
    { kind: "h2", text: "Sugar and fast food" },
    paragraph([
      t("That Sugar Film is a 2014 Australian documentary directed by and starring Damon Gameau."),
    ]),
    paragraph([
      t("Wikipedia says it looks at hidden sugar in foods and the effect that sugar can have on the body."),
    ]),
    paragraph([
      t("Fed Up, directed by Stephanie Soechtig in 2014, is narrated by Katie Couric."),
    ]),
    paragraph([
      t("Super Size Me, directed by Morgan Spurlock in 2004, records his fast-food diet."),
    ]),
    paragraph([
      t("Those two films predate the wide use of the ultra-processed label. They still show the products the label later grouped."),
    ]),
    { kind: "h2", text: "Films that use the ultra-processed label" },
    paragraph([
      t("The BBC lists Irresistible: Why We Can't Stop Eating as a 2024 documentary."),
    ]),
    paragraph([
      t("Stuart Elliott directs it. Chris van Tulleken presents it."),
    ]),
    paragraph([
      t("He asks why ultra-processed food is hard to resist and how it came to dominate food culture."),
    ]),
    paragraph([
      t("The BBC programme page says the film is on iPlayer. Playback depends on rights and on where you live."),
    ]),
    paragraph([
      t("Channel 4 announced Joe Wicks: Licensed to Kill for 6 October 2025."),
    ]),
    paragraph([
      t("Storm Theunissen directs it. KEO Films produced it."),
    ]),
    paragraph([
      t("Wicks and van Tulleken make a protein bar from ingredients that UK rules still allow."),
    ]),
    paragraph([
      t("The aim is to push for a change in those rules. The press note is not a clinical trial."),
    ]),
    ...ourFilmBlocks(),
    paragraph([
      t("The film is about evidence in food. It is not a medical lecture, and it is not a substitute for the studies on the evidence page."),
    ]),
    ...related([
      { text: "Is ultra-processed food really that bad?", href: "/articles/ultra-processed-food" },
      { text: "Documentaries like Food, Inc.", href: "/articles/documentaries-like-food-inc" },
    ]),
  ],
  faqs: [
    {
      question: "Does a documentary prove that ultra-processed food causes disease?",
      answer:
        "No. A documentary can explain a study or show a diet. Cause still depends on the study design, which the evidence page separates from association.",
    },
    {
      question: "Is Super Size Me an ultra-processed-food film?",
      answer:
        "It is a fast-food film from 2004. The ultra-processed category became common later. The overlap is the products, not the label.",
    },
    {
      question: "Can I watch the BBC film outside the UK?",
      answer:
        "Maybe not. The BBC lists it on iPlayer. Rights differ by country, and the page can change.",
    },
    {
      question: "Where is Which Food Is Killing You? streaming?",
      answer:
        "It is not on a streaming service. The household copy is sold on this site for €15.",
    },
  ],
  limits: [
    "What Are We Feeding Our Kids? was left off because the pages opened here did not confirm a year.",
    "Channel 4's announcement gives the broadcast date. It is not treated as proof the film is still online.",
    "Health claims in the films are the films' claims. This page does not upgrade them into medical advice.",
    "No fear-based death statistics from the press notes are repeated here.",
  ],
  references: [
    {
      title: "Wikipedia: That Sugar Film",
      href: SUGAR,
      note: "Dates the film to 2014 and describes Gameau's look at hidden sugar.",
    },
    {
      title: "BBC programme page: Irresistible: Why We Can't Stop Eating",
      href: BBC,
      note: "Names Stuart Elliott, Chris van Tulleken, the 2024 broadcasts, and the iPlayer listing.",
    },
    {
      title: "Channel 4 press note: Joe Wicks: Licensed to Kill, 30 September 2025",
      href: WICKS,
      note: "Gives the 6 October 2025 slot, the director, and the protein-bar premise.",
    },
    {
      title: "Wikipedia: Fed Up",
      href: FED_UP,
      note: "Used for the 2014 date, the director, and the narrator.",
    },
    {
      title: "Wikipedia: Super Size Me",
      href: SUPER,
      note: "Used for the 2004 date and the director.",
    },
    {
      title: "Posh Pork press page",
      href: PRESS,
      note: "Source for the on-site film facts.",
    },
  ],
};

const ai: Article = {
  slug: "films-made-with-ai",
  title: "Films made with AI, including AI-animated work",
  description:
    "Short films where a credible page says what the AI did and what people still did, plus this site's AI-animated documentary.",
  answer: paragraph([
    t(
      "A film made with AI still has people in the credit. The verified examples below say which part the tool made.",
    ),
  ]),
  films: [
    {
      title: "Sunspring",
      year: "2017",
      directors: ["Oscar Sharp"],
      summary: "An AI system wrote the script. People directed and acted the short.",
      sourceName: "Frankfurter Kunstverein",
      sourceHref: SUNSPRING,
    },
    {
      title: "The Frost",
      year: "2023",
      directors: ["Josh Rubin"],
      summary: "DALL-E 2 generated the images. People wrote, directed, and edited the short.",
      sourceName: "Waymark",
      sourceHref: FROST,
    },
    {
      title: "Critterz",
      year: "2023",
      directors: ["Chad Nelson"],
      summary: "DALL-E generated character and background art. Animators then built a 3D short.",
      sourceName: "Animation Magazine",
      sourceHref: CRITTERZ,
    },
    OURS,
  ],
  blocks: [
    paragraph([
      t("This is not a ranking of the best AI films. A title is here only when a credible page confirms it."),
    ]),
    { kind: "h2", text: "Sunspring" },
    paragraph([
      t("The Frankfurter Kunstverein records Sunspring as a 2017 short by Oscar Sharp with Ross Goodwin and an AI they called Benjamin."),
    ]),
    paragraph([
      t("The museum says the AI wrote the script from other science-fiction scripts."),
    ]),
    paragraph([
      t("Sharp and three actors then filmed that script. The pictures were not generated by the model."),
    ]),
    { kind: "h2", text: "The Frost" },
    paragraph([
      t("Waymark's page says Josh Rubin wrote, produced, and directed The Frost in 2023."),
    ]),
    paragraph([
      t("DALL-E 2 generated the images. Another tool moved still faces. People edited the film."),
    ]),
    paragraph([
      t("The page calls the imagery AI-generated. It still prints a human crew."),
    ]),
    { kind: "h2", text: "Critterz" },
    paragraph([
      t("Animation Magazine describes the Critterz short as a 2023 film that used DALL-E for the first art."),
    ]),
    paragraph([
      t("Chad Nelson and Nik Kleverov made that short. Animators turned the images into 3D."),
    ]),
    paragraph([
      t("In May 2026 the same magazine said a feature version was offered for sale at Cannes."),
    ]),
    paragraph([
      t("That feature is not listed here as a film you can watch. The announcement is a sale, not a release."),
    ]),
    ...ourFilmBlocks(),
    paragraph([
      t("Say the animation was made with AI. Do not collapse the written script into the image tool."),
    ]),
    ...related([
      { text: "Food documentaries in 2026", href: "/articles/food-documentaries-2026" },
      { text: "Food documentaries for families", href: "/articles/food-documentaries-for-families" },
    ]),
  ],
  faqs: [
    {
      question: "Did an AI write Which Food Is Killing You?",
      answer:
        "No. Colin Marry wrote the script. Grok Imagine was used for the animation. People still decided the argument, the edit, and the questions.",
    },
    {
      question: "Is the Critterz feature out?",
      answer:
        "Not in the source used here. Animation Magazine reported a sales launch at Cannes in May 2026. The short from 2023 is the finished film.",
    },
    {
      question: "Does an AI script mean nobody directed the film?",
      answer:
        "No. Sunspring is the clear case. A model wrote the words. Oscar Sharp directed, and actors performed them.",
    },
    {
      question: "Where do I watch the Posh Pork film?",
      answer:
        "On this site, for €15, with permanent access for the household. It is not on a streaming service.",
    },
  ],
  limits: [
    "The Last Screenwriter and The Diary of Sisyphus were left off. A journal mentioned them, and no primary page was opened.",
    "Films that only depict AI, or that used AI for a small repair, are not included.",
    "The Frost's own site says 2023. Another database has listed 2024. This page follows the makers.",
    "No awards are cited. A prize is not required to show that a film exists.",
  ],
  references: [
    {
      title: "Frankfurter Kunstverein: Sunspring",
      href: SUNSPRING,
      note: "Credits Oscar Sharp, Ross Goodwin, and the AI script, and dates the work 2017.",
    },
    {
      title: "Waymark: The Frost",
      href: FROST,
      note: "Credits Josh Rubin and states that DALL-E 2 generated the imagery in 2023.",
    },
    {
      title: "Animation Magazine: Critterz feature sales, 4 May 2026",
      href: CRITTERZ,
      note: "Describes the 2023 short, the DALL-E art, and the 2026 feature sale.",
    },
    {
      title: "Posh Pork press page",
      href: PRESS,
      note: "Names Grok Imagine for the animation and Colin Marry for the script.",
    },
  ],
};

export const LIST_ARTICLES: Article[] = [families, like, year2026, upf, ai];
