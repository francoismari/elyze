const firstPropositions = [
  {
    id: 230,
    articleContent:
      "Ce “Pass culture” à pour objectif d’offrir à tous les jeunes de 15 à 18 ans une valeur de 500€ (actuellement 300) pour des biens culturels. Il s’agit de rendre accessible la culture à tous, et de stimuler l’économie française. Exemples : Cours de musique, livres, séances de cinéma, places de concert...",
    firstPropositions: 1,
    idCandidat: 1,
    idTheme: 7,
    source: "Proposition du programme de 2017",
    title: "Mettre en place un “Pass culture” pour les jeunes",
  },
  {
    id: 219,
    articleContent:
      "Il s’agirait d’un service obligatoire de 3 à 6 mois, plus civique que militaire, qui remplacerait la journée défense et citoyenneté. Son objectif est la création d’une cohésion nationale de toutes les classe sociales au moyen d’une camaraderie formée autour des valeurs républicaines.",
    firstPropositions: 1,
    idCandidat: 1,
    idTheme: 3,
    source: "L’Express, proposition du programme de 2017",
    title: "Instaurer un service national universel",
  },
  {
    id: 195,
    articleContent:
      "Cette proposition vise à valoriser davantage le métier d’enseignant et le rendre plus attractif. Le salaire moyen d’un enseignant en France est actuellement de 2490 € par mois. Le projet est qu’il atteigne 4 980 € nets mensuels d’ici la fin du quinquennat. Cela s’accompagnera d’une formation initiale complète ainsi que d’une formation continue.",
    firstPropositions: 1,
    idCandidat: 2,
    idTheme: 3,
    source: "Programme officiel",
    title: "Doubler le salaire des enseignants",
  },
  {
    id: 216,
    articleContent:
      "Depuis 1974, le droit de vote est attribué à tous les citoyens à partir de 18 ans. Cette proposition vise à abaisser l’âge légal du droit de vote à 16 ans.",
    firstPropositions: 1,
    idCandidat: 2,
    idTheme: 10,
    source: "Ouest-France",
    title: "Instaurer le droit de vote à 16 ans",
  },
  {
    id: 167,
    articleContent:
      "Cette mesure interdit toute nouvelle “méga-installation” en élevage et, progressivement, les pratiques d’élevage industriels en cage, en box ou sur caillebotis. En accord avec les objectifs fixés par l’ADEME, elle s’inscrit dans l’objectif de réduction de -15% du cheptel bovin total en 2035.",
    firstPropositions: 1,
    idCandidat: 3,
    idTheme: 1,
    source: "Programme du ou de la candidate",
    title:
      "En finir avec l’élevage industriel intensif d’ici à 2025, en commençant par l'interdiction de l’élevage en cage",
  },
  {
    id: 189,
    articleContent:
      "Ce dernier regrouperait les sujets de l’alimentation, de la santé, et de l’environnement, très liés. Il permettrait de sortir de l’influence des multinationales et d’agir plus efficacement.",
    firstPropositions: 1,
    idCandidat: 3,
    idTheme: 10,
    source: "LCI",
    title: "Créer un Vice-Premier ministre à l’écologie",
  },
  {
    id: 162,
    articleContent:
      "Cette proposition instaurerait un impôt sur la fortune qui serait indexé sur les émissions de gaz à effet de serre issues des placements financiers des ménages les plus aisés.",
    firstPropositions: 1,
    idCandidat: 3,
    idTheme: 2,
    source: "Programme du ou de la candidate",
    title: "Établir un impôt sur la fortune (ISF) climatique",
  },
  {
    id: 130,
    articleContent:
      "Le candidat souhaite convoquer un référendum (article 11 de la Constitution) pour engager un processus constituant et permettre aux citoyens de décider des modalités de formation d’une Assemblée constituante. Celle-ci serait chargée de proposer un nouveau projet de Constitution, soumise au peuple par voie référendaire après deux ans de travaux. Le candidat souhaite ainsi remplacer la Constitution de la Ve République, adoptée le 4 octobre 1958 et dont il critique la trop forte présidentialisation, pour mettre en place une VIe République plus parlementaire.",
    firstPropositions: 1,
    idCandidat: 4,
    idTheme: 10,
    source: "Programme du ou de la candidate",
    title: "Passer à une VIème République",
  },
  {
    id: 132,
    articleContent:
      "Cette série de proposition entend lutter contre le problème de l’abstention en France. Actuellement, les votes blancs sont décomptés mais ne sont pas comptabilisés dans le calcul des suffrages exprimés. Le candidat souhaite donc que ceux-ci soient pris en compte. Cette mesure s’accompagnerait de l’instauration du vote obligatoire, et de la possibilité d’invalider une élection si elle n’atteint un seuil minimum de participation. Le niveau de ce seuil n’a cependant pas encore été précisé par le candidat.",
    firstPropositions: 1,
    idCandidat: 4,
    idTheme: 10,
    source: "Programme du ou de la candidate",
    title:
      "Reconnaître le vote blanc, mettre en place le vote obligatoire et instaurer un seuil de votes exprimés pour valider une élection",
  },
  {
    id: 11,
    articleContent:
      "La chasse à courre - ou “vénerie - consiste à chasser un animal sauvage à l’aide d’une meute de chiens le poursuivant jusqu’à son épuisement. En France, cette méthode est réglementée par plusieurs lois, qui se sont succédées depuis le début des années 2000. Le candidat se prononce en faveur de son interdiction totale.",
    firstPropositions: 1,
    idCandidat: 5,
    idTheme: 1,
    source: "Le Monde. Proposition du programme de 2017",
    title: "Interdire la chasse à courre",
  },
  {
    id: 17,
    articleContent:
      "Les Jeux olympiques d'été de 2024 seront organisés à Paris, du 26 juillet au 11 août 2024. Leur budget est de 6,6 milliards d’euros. Pour le candidat, les JO sont un gaspillage financier, économique et écologique. Il estime que l’argent qui sera généré par le tourisme, le rayonnement culturel de la France et les festivités qui en découleront n’en valent pas la peine.",
    firstPropositions: 1,
    idCandidat: 5,
    idTheme: 7,
    source: "Le Monde. Proposition du programme de 2017",
    title: "Ne pas participer aux Jeux olympiques 2024",
  },
  {
    id: 446,
    articleContent:
      "En 2021, l’âge minimum de la retraite est fixé à 62 ans par le code de la sécurité sociale. Pour une personne née après 1973, il faut avoir cotisé 172 semestres, soit un peu plus de 42 années. Il est possible de partir plus tôt pour diverses raisons : carrière longue, handicap, incapacité permanente d'origine professionnelle (...). Dans l’objectif de faire face aux déficits des caisses de retraite, cette proposition rehausserait l’âge minimal en l’augmentant de 3 ans, ainsi que le nombre d’années de cotisation par la même occasion.",
    firstPropositions: 1,
    idCandidat: 8,
    idTheme: 8,
    source: "Capital.fr",
    title: "Reculer l’âge de départ à la retraite à 65 ans",
  },
  {
    id: 460,
    articleContent:
      "La fonction publique est actuellement composée de 5,56 millions d’agents répartis en 3 catégories – la fonction publique d’Etat, la fonction publique territoriale et la fonction publique hospitalière – pour l’exercice de missions de service public. Cette proposition vise à supprimer 200000 postes de fonctionnaires dans l’administration de l’État et des collectivités territoriales. En parallèle, le candidat propose de créer 50000 postes supplémentaires pour protéger, éduquer et soigner.",
    firstPropositions: 1,
    idCandidat: 8,
    idTheme: 10,
    source: "Programme officiel",
    title: "Réduire le nombre de fonctionnaires",
  },
  {
    id: 63,
    articleContent:
      "Pour voter en France, il est nécessaire de disposer de la nationalité française, d’être majeur, de jouir de ses droits civils et politiques et d’être inscrit sur les listes électorales. Toutefois, les ressortissants d’un État membre de l’Union européenne résidant en France ont le droit de voter pour les élections municipales et européennes. Par cette mesure, le candidat souhaite donner la possibilité à toute personne résidant en France de participer aux élections présidentielle, législatives, européennes, régionales, départementales et municipales, ainsi qu’aux referendums.",
    firstPropositions: 1,
    idCandidat: 9,
    idTheme: 10,
    source: "Le Monde. Proposition du programme de 2017",
    title:
      "Octroyer le droit de vote à toutes les élections aux étrangers résidant en France",
  },
  {
    id: 51,
    articleContent:
      "Actuellement, la loi du 15 mars 2004 interdit pour les élèves le port de tout signe religieux dit “ostensible”, à l’image du voile islamique, dans les écoles, collèges et lycées publics. Néanmoins, cette loi ne s'applique pas aux établissements publics d'enseignement supérieur. En ce sens, le port du voile est uniquement autorisé à partir de l’université.",
    firstPropositions: 1,
    idCandidat: 9,
    idTheme: 8,
    source: "Le Monde. Proposition du programme de 2017",
    title: "Autoriser le port du voile au lycée",
  },
  {
    id: 65,
    articleContent:
      "Le candidat estime que la fonction parlementaire doit avoir un salaire moyen pour que les parlementaires représentent réellement la population : ainsi, selon le candidat, légiférer est un travail qui n’a pas besoin d’être davantage rémunéré qu’un autre.",
    firstPropositions: 1,
    idCandidat: 9,
    idTheme: 10,
    source: "Le Monde. Proposition du programme de 2017",
    title:
      "Limiter l’indemnité des députés au salaire moyen d’un ouvrier ou d’un employé",
  },
  {
    id: 256,
    articleContent:
      "Les traités de libre-échange instaurent des échanges commerciaux avec très peu de restrictions normatives entre États pour favoriser le développement du commerce international. Actuellement, la Commission Européenne a pour mission de représenter la France dans les traités de protection des investissements internationaux (à l’image du TAFTA et du CETA). Cette proposition vise à supprimer cette représentation afin qu’une délégation française exerce souverainement cette mission.",
    firstPropositions: 1,
    idCandidat: 10,
    idTheme: 6,
    source: "Programme du ou de la candidate",
    title:
      "Interrompre la négociation des traités de libre-échange et retirer à la Commission européenne la mission de représenter la France dans la négociation de traités commerciaux internationaux",
  },
  {
    id: 262,
    articleContent:
      "La Charte européenne des langues régionales ou minoritaires est destinée à protéger et favoriser les langues historiques régionales et les langues des minorités en Europe. Elle a été signée par la France en 1999 mais n’a toujours pas été ratifiée. Sa ratification permettrait son application effective en France. Le candidat précise qu’il souhaite conserver le français comme seule langue de l'administration.",
    firstPropositions: 1,
    idCandidat: 10,
    idTheme: 7,
    source: "Le Monde, proposition du programme de 2017",
    title: "Ratifier la Charte européenne des langues régionales",
  },
  {
    id: 270,
    articleContent:
      "Le candidat propose d'ouvrir 20 000 lits (y compris de réserve) avec le personnel soignant afférant et de recruter 100 000 infirmiers et aides-soignants pendant la durée de son mandat.",
    firstPropositions: 1,
    idCandidat: 10,
    idTheme: 4,
    source: "Programme du ou de la candidate",
    title: "Ouvrir 20 000 lits et recruter 100 000 soignants",
  },
  {
    id: 304,
    articleContent:
      "Actuellement en France, avoir un casier judiciaire sans peine complémentaire d’inéligibilité ne prive pas le citoyen concerné du droit de pouvoir se présenter à des élections. S’inspirant de l’exemple de certaines professions uniquement accessibles avec un casier judiciaire vierge, l’objectif de cette proposition est d’obliger les candidats électoraux à avoir un casier judiciaire vierge dans une logique de moralisation de la vie publique.",
    firstPropositions: 1,
    idCandidat: 11,
    idTheme: 10,
    source: "Site du ou de la candidate",
    title:
      "Exiger pour tout candidat à un mandat électif un casier judiciaire vierge",
  },
  {
    id: 302,
    articleContent:
      "Selon les données statistiques de la Chancellerie (ministère de la Justice), la France disposerait au 1er juin 2021 d’un total de 60.794 places de prisons opérationnelles pour un ensemble de 66.591 détenus. Face à ce phénomène de surpopulation carcérale, cette proposition vise à construire de nouvelles places de prison afin d’incarcérer la totalité des individus condamnés à de la prison ferme.",
    firstPropositions: 1,
    idCandidat: 11,
    idTheme: 9,
    source: "Site du ou de la candidate",
    title: "Créer 40 000 places de prison supplémentaires",
  },
  {
    id: 294,
    articleContent:
      "L’objectif de cette proposition vise à consacrer un budget spécifique à la rénovation et à la conservation des établissements culturels (musées, cinémas) et du patrimoine cultuel (les églises) dans les zones rurales.",
    firstPropositions: 1,
    idCandidat: 11,
    idTheme: 7,
    source: "Site du ou de la candidate",
    title:
      "Lancer un plan de sauvegarde des églises et des établissements culturels ruraux",
  },
  {
    id: 380,
    articleContent:
      "Les étrangers qui commettent une infraction en France s'exposent non seulement aux peines prévues par la loi pour cette infraction, mais peuvent également être renvoyés dans leur pays d'origine, à la suite d'un arrêté d'expulsion ou d'une peine d'interdiction d’entrée sur le territoire. Avec cette proposition, les parents de mineurs étrangers qui commettent des actes graves seront désormais également expulsés.",
    firstPropositions: 1,
    idCandidat: 12,
    idTheme: 6,
    source: "Ifrap",
    title:
      "Expulser les parents de mineurs étrangers ayant commis des actes d’une particulière gravité",
  },
  {
    id: 397,
    articleContent:
      "Actuellement, sur tous les bâtiments publics, sont supposés se trouver deux drapeaux : celui de la France et celui de l’Union européenne, afin de montrer l’appartenance à une double citoyenneté. Cette proposition vise à supprimer la possibilité d’installer le drapeau européen sur les bâtiments publics.",
    firstPropositions: 1,
    idCandidat: 12,
    idTheme: 10,
    source: "Le Monde",
    title: "Retirer le drapeau européen des bâtiments publics",
  },
  {
    id: 324,
    articleContent:
      "L'AMP (assistance médicale à la procréation), plus communément appelée PMA (procréation médicalement assistée) permet à un couple qui ne le peut pas d'avoir un enfant, au moyen de différentes techniques médicales (insémination artificielle, fécondation in vitro, accueil d'embryon). Depuis le 29 septembre 2021, la PMA est accessible à toutes les femmes, qu’elles soient hétérosexuelles, homosexuelles ou célibataires. Le candidat souhaite empêcher le recours à cette technique médicale dans les situations où il n’y aurait pas de père (i.e pour les couples de femmes et les femmes seules), et la restreindre aux seuls couples hétérosexuels.",
    firstPropositions: 1,
    idCandidat: 13,
    idTheme: 8,
    source: "Le Figaro",
    title:
      "Interdire le recours à la procréation médicalement assistée (PMA) sans père",
  },
  {
    id: 322,
    articleContent:
      "La contribution à l’audiovisuel public est une taxe payée par chaque foyer fiscal, d’un montant de 138€ en métropole et de 88€ en Outre-Mer, qui sert à financer, entre autres, France Télévisions, Radio France et l’institut national de l’audiovisuel. Selon le candidat, cette taxe ne se justifie plus car le service public de l’audiovisuel est ‘’pris en otage par une camarilla gauchiste et idéologique qui crache sur la France, les Français, et qui a décidé de les rééduquer’’. Le candidat envisage par suite une privatisation du service public de la télévision et de la radio.",
    firstPropositions: 1,
    idCandidat: 13,
    idTheme: 7,
    source: "Discours du ou de la candidate",
    title: "Supprimer la contribution à l’audiovisuel public",
  },
  {
    id: 317,
    articleContent:
      "En 2021, on estime le nombre d'éoliennes terrestres à 8000 en France. Le candidat proteste avec véhémence contre leur installation, considérant qu’elles nuisent à la santé des habitants, en référence au syndrome éolien, ainsi qu’à la beauté des paysages. Il souligne également que leurs socles en béton ne sont pas renouvelables, et juge l’énergie produite trop faible par rapport au coût investi qui selon lui serait mieux dépensé dans d’autres énergies. Le candidat propose donc d’interdire tout nouveau projet de construction d’éoliennes sur terre et en mer, ainsi que de geler les projets éoliens en mer en cours.",
    firstPropositions: 1,
    idCandidat: 13,
    idTheme: 1,
    source: "Programme officiel du ou de la candidate",
    title:
      "Interdire tout nouveau projet d’éoliennes et geler les projets en cours",
  },
  {
    id: 99,
    articleContent:
      "Ce revenu serait financé à 50% par l’Etat, et à 50% par une nouvelle cotisation sociale. Le candidat estime que cette mesure pourra ainsi “inciter les entreprises à embaucher ces jeunes, puisqu’elles auront contribué à financer leur formation”.",
    firstPropositions: 1,
    idCandidat: 15,
    idTheme: 10,
    source: "l’Humanité",
    title: "Instaurer un revenu étudiant de 850 euros",
  },
];

export default firstPropositions;
