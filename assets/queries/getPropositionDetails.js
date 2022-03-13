import propositionsList from "../data/propositions/propositionsList";

const firsThirteeProps = [
  {
    id: 3,
    theme: 2,
    title: "Instaurer un SMIC à 2000€",
    articleContent:
      "Le salaire minimum (SMIC) s’élève actuellement à 1589,47€ bruts mensuels. Cette proposition vise à l’augmenter à hauteur de 2000€.",
    source: "Les Echos, Le Monde",
    idCandidat: 5,
  },
  {
    id: 51,
    theme: 8,
    title: "Autoriser le port du voile au lycée",
    articleContent:
      "Actuellement, la loi du 15 mars 2004 interdit pour les élèves le port de tout signe religieux dit “ostensible”, à l’image du voile islamique, dans les écoles, collèges et lycées publics. Néanmoins, cette loi ne s'applique pas aux établissements publics d'enseignement supérieur. En ce sens, le port du voile est uniquement autorisé à partir de l’université.",
    source: "Le Monde. Proposition du programme de 2017",
    idCandidat: 9,
  },
  {
    id: 71,
    theme: 2,
    title: "Tripler l’ISF et créer un impôt COVID pour les multinationales",
    articleContent:
      "L’impôt de solidarité sur la fortune est un ancien impôt payé par les personnes et les couples détenant un patrimoine net supérieur à un certain seuil d’entrée fixé chaque année. Créé en 1989, il avait été remplacé par un impôt sur la fortune immobilière en 2018. Selon le candidat, rétablir cet impôt et tripler son montant permettrait de récupérer 15 milliards d’euros chaque année. Il souhaite également instaurer un impôt COVID sur les bénéfices dépassant 500 000 euros, doublé pendant deux ans (2022 et 2023), pour les multinationales dont les chiffres d’affaires représentent plus de 250 millions d‘euros par an. Il estime un gain potentiel de 6 milliards d’euros pour l’État.",
    source: "Discours du ou de la candidate",
    idCandidat: 15,
  },
  {
    id: 33,
    theme: 2,
    title: "Instaurer la gratuité des transports en commun",
    articleContent:
      "L’objet de cette proposition est de permettre l’usage de transports gratuitement. Ainsi, les impôts versés pour les financer ne bénéficieront pas à des investisseurs privés qui - selon le candidat - risquent d’augmenter les tarifs afin d’avoir de meilleurs profits.",
    source: "Les Echos",
    idCandidat: 9,
  },
  {
    id: 143,
    theme: 6,
    title:
      "Affirmer la supériorité du droit national sur celui de l’UE dans la Constitution",
    articleContent:
      "L’Union européenne affirme la supériorité de son droit (qui passe par la ratification de traités, l’application de directives) sur les droits internes des pays membres. L’article 55 de la Constitution française dispose d’ailleurs clairement qu’une fois ratifiés ou approuvés, les traités et accords européens ont une autorité supérieure à celle des lois. La mesure ici évoquée vise justement à modifier cet article, en y inscrivant la supériorité du droit national lorsque des intérêts vitaux de la nation, comme l’indépendance de la France, sont en jeu.",
    source: "Libération",
    idCandidat: 7,
  },
  {
    id: 162,
    theme: 2,
    title: "Établir un impôt sur la fortune (ISF) climatique",
    articleContent:
      "Cette proposition instaurerait un impôt sur la fortune qui serait indexé sur les émissions de gaz à effet de serre issues des placements financiers des ménages les plus aisés.",
    source: "Programme du ou de la candidate",
    idCandidat: 3,
  },
  {
    id: 195,
    theme: 3,
    title: "Doubler le salaire des enseignants",
    articleContent:
      "Cette proposition a pour but de rendre le métier d’enseignant plus attractif. Le salaire moyen d’un enseignant en France est actuellement de 2490 € par mois. Le projet est qu’il atteigne 4 980 € nets mensuels d’ici la fin du quinquennat. .",
    source: "Le Monde",
    idCandidat: 2,
  },
  {
    id: 219,
    theme: 3,
    title: "Instaurer un service national universel",
    articleContent:
      "Il s’agirait d’un service obligatoire de 3 à 6 mois, plus civique que militaire, qui remplacerait la journée défense et citoyenneté. Son objectif est la création d’une cohésion nationale de toutes les classe sociales au moyen d’une camaraderie formée autour des valeurs républicaines.",
    source: "L’Express, proposition du programme de 2017",
    idCandidat: 1,
  },
  {
    id: 429,
    theme: 2,
    title: "Passer à la semaine de 39 heures",
    articleContent:
      "Le temps minimum de travail hebdomadaire est actuellement fixé à 35 heures en France. Cette proposition vise à l’augmenter de quatre heures afin de passer à une semaine de 39 heures de travail. Cependant, il serait possible de conserver la semaine de 35 heures par un accord entre l’employeur et l’employé. L’objectif de cette proposition est de permettre une plus grande souplesse sur le temps de travail, qui pourra être directement négocié au sein des entreprises.",
    source: "BFM",
    idCandidat: 8,
  },
  {
    id: 256,
    theme: 6,
    title:
      "Interrompre la négociation des traités de libre-échange et retirer à la Commission européenne la mission de représenter la France dans la négociation de traités commerciaux internationaux",
    articleContent:
      "Les traités de libre-échange instaurent des échanges commerciaux avec très peu de restrictions normatives entre États pour favoriser le développement du commerce international. Actuellement, la Commission Européenne a pour mission de représenter la France dans les traités de protection des investissements internationaux (à l’image du TAFTA et du CETA). Cette proposition vise à supprimer cette représentation afin qu’une délégation française exerce souverainement cette mission.",
    source: "Le Monde, proposition du programme de 2017",
    idCandidat: 10,
  },
  {
    id: 304,
    theme: 10,
    title:
      "Exiger pour tout candidat à un mandat électif un casier judiciaire vierge",
    articleContent:
      "Actuellement en France, avoir un casier judiciaire sans peine complémentaire d’inéligibilité ne prive pas le citoyen concerné du droit de pouvoir se présenter à des élections. S’inspirant de l’exemple de certaines professions uniquement accessibles avec un casier judiciaire vierge, l’objectif de cette proposition est d’obliger les candidats électoraux à avoir un casier judiciaire vierge dans une logique de moralisation de la vie publique.",
    source: "Site du ou de la candidate",
    idCandidat: 11,
  },
  {
    id: 324,
    theme: 8,
    title:
      "Interdire le recours à la procréation médicalement assistée (PMA) sans père",
    articleContent:
      "L'AMP (assistance médicale à la procréation), plus communément appelée PMA (procréation médicalement assistée) permet à un couple qui ne le peut pas d'avoir un enfant, au moyen de différentes techniques médicales (insémination artificielle, fécondation in vitro, accueil d'embryon). Depuis le 29 septembre 2021, la PMA est accessible à toutes les femmes, qu’elles soient hétérosexuelles, homosexuelles ou célibataires. Le candidat souhaite empêcher le recours à cette technique médicale dans les situations où il n’y aurait pas de père (i.e pour les couples de femmes et les femmes seules), et la restreindre aux seuls couples hétérosexuels.",
    source: "Le Figaro",
    idCandidat: 13,
  },
  {
    id: 352,
    theme: 6,
    title:
      "Suspendre la participation de la France à l’Organisation mondiale de la santé",
    articleContent:
      "L’Organisation mondiale de la santé (OMS) est une agence spécialisée de l’ONU pour la santé publique créée en 1948, organisation internationale dont la France fait partie. Elle a pour objectif d’améliorer le niveau de santé des populations de ses États Membres via des recommandations sanitaires. S’inscrivant dans une logique souverainiste, le candidat s’oppose à l’OMS qu’il juge colonisée par les lobbies des laboratoires pharmaceutiques (défendant donc des intérêts privés). Cette proposition vise donc à suspendre la participation de la France à l’OMS.",
    source: "Le Monde",
    idCandidat: 6,
  },
  {
    id: 397,
    theme: 10,
    title: "Retirer le drapeau européen des bâtiments publics",
    articleContent:
      "Actuellement, sur tous les bâtiments publics, sont supposés se trouver deux drapeaux : celui de la France et celui de l’Union européenne, afin de montrer l’appartenance à une double citoyenneté. Cette proposition vise à supprimer la possibilité d’installer le drapeau européen sur les bâtiments publics.",
    source: "Le Monde",
    idCandidat: 12,
  },
  {
    id: 399,
    theme: 2,
    title: "Faire du franc la nouvelle monnaie nationale",
    articleContent:
      "Après avoir quitté la zone euro cette proposition a pour but de revenir au franc. Pour cela, le franc serait inscrit dans notre Constitution comme la monnaie nationale de la République française. Au départ, le taux de conversion serait de 1 franc pour 1 euro puis, le franc serait déprécié de 10%.",
    source: "Le Monde",
    idCandidat: 14,
  },
  {
    id: 11,
    theme: 1,
    title: "Interdire la chasse à courre",
    articleContent:
      "La chasse à courre - ou “vénerie - consiste à chasser un animal sauvage à l’aide d’une meute de chiens le poursuivant jusqu’à son épuisement. En France, cette méthode est réglementée par plusieurs lois, qui se sont succédées depuis le début des années 2000. Le candidat se prononce en faveur de son interdiction totale.",
    source: "Le Monde. Proposition du programme de 2017",
    idCandidat: 5,
  },
  {
    id: 63,
    theme: 10,
    title:
      "Octroyer le droit de vote à toutes les élections aux étrangers résidant en France",
    articleContent:
      "Pour voter en France, il est nécessaire de disposer de la nationalité française, d’être majeur, de jouir de ses droits civils et politiques et d’être inscrit sur les listes électorales. Toutefois, les ressortissants d’un État membre de l’Union européenne résidant en France ont le droit de voter pour les élections municipales et européennes. Par cette mesure, le candidat souhaite donner la possibilité à toute personne résidant en France de participer aux élections présidentielle, législatives, européennes, régionales, départementales et municipales, ainsi qu’aux referendums.",
    source: "Le Monde. Proposition du programme de 2017",
    idCandidat: 9,
  },
  {
    id: 93,
    theme: 8,
    title:
      "Avancer l’âge de la retraite à 60 ans et réduire le temps de travail à 32h/semaine",
    articleContent:
      "Actuellement, l’âge légal de départ à la retraite est fixé à 62 ans, et le temps de travail hebdomadaire à 35 heures. Pour le candidat, la réduction de ces deux valeurs serait “un nouveau progrès social”, par ailleurs permis par les révolutions technologique et informationnelle, qui devraient être employées pour alléger la charge de travail des employés.",
    source: "Discours du ou de la candidate",
    idCandidat: 15,
  },
  {
    id: 130,
    theme: 10,
    title: "Passer à une VIème République",
    articleContent:
      "Le candidat souhaite convoquer un référendum (article 11 de la Constitution) pour engager un processus constituant et permettre aux citoyens de décider des modalités de formation d’une Assemblée constituante. Celle-ci serait chargée de proposer un nouveau projet de Constitution, soumise au peuple par voie référendaire après deux ans de travaux. Le candidat souhaite ainsi remplacer la Constitution de la Ve République, adoptée le 4 octobre 1958 et dont il critique la trop forte présidentialisation, pour mettre en place une VIe République plus parlementaire.",
    source: "Programme du ou de la candidate",
    idCandidat: 4,
  },
  {
    id: 144,
    theme: 6,
    title: "Quitter l’OTAN",
    articleContent:
      "L’OTAN (Organisation du traité de l'Atlantique nord) est une alliance politique et militaire qui vise à assurer la défense, la sécurité et la protection de la démocratie des pays qui en sont membres. La France, un de ses membres fondateurs, est aussi un des pays qui contribuent le plus à son budget. Quitter l’OTAN aurait pour but d’économiser de l’argent sur ce plan, tout en essayant d’affirmer notre indépendance et la souveraineté française.",
    source: "Ouest-France Proposition du programme de 2017",
    idCandidat: 7,
  },
  {
    id: 167,
    theme: 1,
    title:
      "Sortir de l'élevage intensif et en cage, avec notamment les animaux à fourrure",
    articleContent:
      "L'élevage intensif est une des conséquence de l’industrialisation moderne, problématique sous-jacente de la mondialisation. Il pousse les éleveurs à augmenter la densité d'animaux sur une même exploitation, par soucis de rentabilité et de productivité. Ce mode d’élevage a suscité l’indignation des citoyens, grandement sensibles au bien-être animal.",
    source: "France Inter",
    idCandidat: 3,
  },
  {
    id: 198,
    theme: 1,
    title: "Diminuer la vitesse sur les autoroutes de 130 à 110km/h",
    articleContent:
      "En 2018, le gouvernement avait abaissé la vitesse maximale autorisée sur les routes secondaires de 90 à 80km/h. Cette proposition vise à réduire également la vitesse de circulation sur les autoroutes, pour limiter le risque d’accidents. Cette proposition avait également été formulée par la Convention citoyenne pour le climat en 2020.",
    source: "Ouest-France",
    idCandidat: 2,
  },
  {
    id: 230,
    theme: 7,
    title: "Mettre en place un “Pass culture” pour les jeunes",
    articleContent:
      "Ce “Pass culture” à pour objectif d’offrir à tous les jeunes de 15 à 18 ans une valeur de 500€ (actuellement 300) pour des biens culturels. Il s’agit de rendre accessible la culture à tous, et de stimuler l’économie française. Exemples : Cours de musique, livres, séances de cinéma, places de concert...",
    source: "Proposition du programme de 2017",
    idCandidat: 1,
  },
  {
    id: 446,
    theme: 8,
    title: "Fixer l’âge de départ à la retraite à 65 ans",
    articleContent:
      "En 2021, l’âge minimum de la retraite est fixé à 62 ans par le code de la sécurité sociale. Pour une personne née après 1973, il faut avoir cotisé 172 semestres, soit un peu plus de 42 années. Il est possible de partir plus tôt pour diverses raisons : carrière longue, handicap, incapacité permanente d'origine professionnelle (...). Dans l’objectif de faire face aux déficits des caisses de retraite, cette proposition rehausserait l’âge minimal en l’augmentant de 3 ans, ainsi que le nombre d’années de cotisation par la même occasion.",
    source: "Capital.fr",
    idCandidat: 8,
  },
  {
    id: 262,
    theme: 7,
    title: "Ratifier la Charte européenne des langues régionales",
    articleContent:
      "La Charte européenne des langues régionales ou minoritaires est destinée à protéger et favoriser les langues historiques régionales et les langues des minorités en Europe. Elle a été signée par la France en 1999 mais n’a toujours pas été ratifiée. Sa ratification permettrait son application effective en France. Le candidat précise qu’il souhaite conserver le français comme seule langue de l'administration.",
    source: "Le Monde, proposition du programme de 2017",
    idCandidat: 10,
  },
  {
    id: 302,
    theme: 9,
    title: "Créer 40 000 places de prison supplémentaires",
    articleContent:
      "Selon les données statistiques de la Chancellerie (ministère de la Justice), la France disposerait au 1er juin 2021 d’un total de 60.794 places de prisons opérationnelles pour un ensemble de 66.591 détenus. Face à ce phénomène de surpopulation carcérale, cette proposition vise à construire de nouvelles places de prison afin d’incarcérer la totalité des individus condamnés à de la prison ferme.",
    source: "Site du ou de la candidate",
    idCandidat: 11,
  },
  {
    id: 322,
    theme: 7,
    title: "Supprimer la contribution à l’audiovisuel public",
    articleContent:
      "La contribution à l’audiovisuel public est une taxe payée par chaque foyer fiscal, d’un montant de 138€ en métropole et de 88€ en Outre-Mer, qui sert à financer, entre autres, France Télévisions, Radio France et l’institut national de l’audiovisuel. Selon le candidat, cette taxe ne se justifie plus car le service public de l’audiovisuel est ‘’pris en otage par une camarilla gauchiste et idéologique qui crache sur la France, les Français, et qui a décidé de les rééduquer’’. Le candidat envisage par suite une privatisation du service public de la télévision et de la radio.",
    source: "Discours du ou de la candidate",
    idCandidat: 13,
  },
  {
    id: 344,
    theme: 3,
    title: "Rendre obligatoire le port de l’uniforme dans les écoles",
    articleContent:
      "Dans un souci d’égalité des enfants sur la question de leur habillement, cette proposition vise à faire porter un uniforme à chaque écolier, comme c’est déjà le cas en Angleterre par exemple.",
    source: "Programme du ou de la candidate",
    idCandidat: 6,
  },
  {
    id: 380,
    theme: 6,
    title:
      "Expulser les parents de mineurs étrangers ayant commis des actes d’une particulière gravité",
    articleContent:
      "Les étrangers qui commettent une infraction en France s'exposent non seulement aux peines prévues par la loi pour cette infraction, mais peuvent également être renvoyés dans leur pays d'origine, à la suite d'un arrêté d'expulsion ou d'une peine d'interdiction d’entrée sur le territoire. Avec cette proposition, les parents de mineurs étrangers qui commettent des actes graves seront désormais également expulsés.",
    source: "Ifrap",
    idCandidat: 12,
  },
  {
    id: 407,
    theme: 6,
    title: "Sortir la France de l'Union Européenne",
    articleContent:
      "Cette proposition vise à retrouver l’indépendance politique française par la sortie unilatérale et juridique de l’Union européenne. Cela passerait par la mise en œuvre de l’article 50 du traité sur l’Union européenne (TUE).",
    source: "Le Monde",
    idCandidat: 14,
  },
  {
    id: 17,
    theme: 7,
    title: "Ne pas participer aux Jeux olympiques 2024",
    articleContent:
      "Les Jeux olympiques d'été de 2024 seront organisés à Paris, du 26 juillet au 11 août 2024. Leur budget est de 6,6 milliards d’euros. Pour le candidat, les JO sont un gaspillage financier, économique et écologique. Il estime que l’argent qui sera généré par le tourisme, le rayonnement culturel de la France et les festivités qui en découleront n’en valent pas la peine.",
    source: "Le Monde. Proposition du programme de 2017",
    idCandidat: 5,
  },
  {
    id: 65,
    theme: 10,
    title:
      "Limiter l’indemnité des députés au salaire moyen d’un ouvrier ou d’un employé",
    articleContent:
      "Le candidat estime que la fonction parlementaire doit avoir un salaire moyen pour que les parlementaires représentent réellement la population : ainsi, selon le candidat, légiférer est un travail qui n’a pas besoin d’être davantage rémunéré qu’un autre.",
    source: "Le Monde. Proposition du programme de 2017",
    idCandidat: 9,
  },
  {
    id: 99,
    theme: 10,
    title: "Instaurer un revenu étudiant de 850 euros",
    articleContent:
      "Ce revenu serait financé à 50% par l’Etat, et à 50% par une nouvelle cotisation sociale. Le candidat estime que cette mesure pourra ainsi “inciter les entreprises à embaucher ces jeunes, puisqu’elles auront contribué à financer leur formation”.",
    source: "l’Humanité",
    idCandidat: 15,
  },
  {
    id: 132,
    theme: 10,
    title:
      "Reconnaître le vote blanc, mettre en place le vote obligatoire et instaurer un seuil de votes exprimés pour valider une élection",
    articleContent:
      "Cette série de proposition entend lutter contre le problème de l’abstention en France. Actuellement, les votes blancs sont décomptés mais ne sont pas comptabilisés dans le calcul des suffrages exprimés. Le candidat souhaite donc que ceux-ci soient pris en compte. Cette mesure s’accompagnerait de l’instauration du vote obligatoire, et de la possibilité d’invalider une élection si elle n’atteint un seuil minimum de participation. Le niveau de ce seuil n’a cependant pas encore été précisé par le candidat.",
    source: "Programme du ou de la candidate",
    idCandidat: 4,
  },
  {
    id: 155,
    theme: 9,
    title:
      "Interdire les transferts d’argent vers les pays qui refusent d’accueillir leurs ressortissants",
    articleContent:
      "Cette mesure vise à bloquer tous les transferts d'argent privé vers les pays qui refusent de rapatrier leurs ressortissants visés par une obligation de quitter le territoire français (OQTF). Cette interdiction pour les individus d’envoyer, par exemple, de l’argent à leur famille dans leur pays d’origine, doit permettre de faire pression sur les États concernés afin qu’ils accueillent les ressortissants expulsés.",
    source: "Le Figaro",
    idCandidat: 7,
  },
  {
    id: 189,
    theme: 10,
    title: "Créer un Vice-Premier ministre à l’écologie",
    articleContent:
      "Ce dernier regrouperait les sujets de l’alimentation, de la santé, et de l’environnement, très liés. Il permettrait de sortir de l’influence des multinationales et d’agir plus efficacement.",
    source: "LCI",
    idCandidat: 3,
  },
  {
    id: 216,
    theme: 10,
    title: "Instaurer le droit de vote à 16 ans",
    articleContent:
      "Depuis 1974, le droit de vote est attribué à tous les citoyens à partir de 18 ans. Cette proposition vise à abaisser l’âge légal du droit de vote à 16 ans.",
    source: "Ouest-France",
    idCandidat: 2,
  },
  {
    id: 243,
    theme: 10,
    title: "Supprimer l’ENA",
    articleContent:
      'L’Ecole Nationale d’Administration (ENA) forme les hauts fonctionnaires de l’Etat depuis 1945. En raison des critiques récurrentes qui lui sont faites, le candidat souhaite la remplacer par l’Institut National du Service Public (INSP), dans le but de "favoriser des parcours plus ouverts et moins cloisonnés, mieux suivis et régulièrement évalués tout au long de la carrière", ainsi que d’"améliorer la gestion des cadres supérieurs de l\'Etat, selon une logique fondée sur les parcours et les compétences, plus que sur l\'appartenance à des corps ou à des statuts".',
    source: "Les Echos",
    idCandidat: 1,
  },
  {
    id: 460,
    theme: 10,
    title: "Réduire le nombre de fonctionnaires",
    articleContent:
      "La fonction publique est actuellement composée de 5,56 millions d’agents répartis en 3 catégories – la fonction publique d’Etat, la fonction publique territoriale et la fonction publique hospitalière – pour l’exercice de missions de service public. Cette proposition vise à supprimer 200000 postes de fonctionnaires dans l’administration de l’État et des collectivités territoriales. En parallèle, le candidat propose de créer 50000 postes supplémentaires pour protéger, éduquer et soigner.",
    source: "Programme officiel",
    idCandidat: 8,
  },
  {
    id: 270,
    theme: 4,
    title: "Créer un Ticket Paysan",
    articleContent:
      "L’objet de cette proposition vise à créer un “Ticket Paysan” permettant de davantage développer les marchés de proximité en achetant des produits frais. Son coût serait en partie assumé par l’État et les professionnels.",
    source: "Discours du ou de la candidate",
    idCandidat: 10,
  },
  {
    id: 294,
    theme: 7,
    title:
      "Lancer un plan de sauvegarde des églises et des établissements culturels ruraux",
    articleContent:
      "L’objectif de cette proposition vise à consacrer un budget spécifique à la rénovation et à la conservation des établissements culturels (musées, cinémas) et du patrimoine cultuel (les églises) dans les zones rurales.",
    source: "Site du ou de la candidate",
    idCandidat: 11,
  },
  {
    id: 317,
    theme: 1,
    title: "Arrêter les installations d’éoliennes",
    articleContent:
      "En 2021, on estime le nombre d'éoliennes terrestres en France à 8000, réparties sur 1380 parcs. Le candidat proteste avec véhémence contre leur installation, considérant notamment qu’elles nuisent à la santé des habitants ainsi qu’à la beauté des paysages. Il a également souligné que leurs socles en béton n’étaient pas renouvelables, et que l’énergie produite par les éoliennes était selon lui trop faible.",
    source: "BFM",
    idCandidat: 13,
  },
  {
    id: 342,
    theme: 3,
    title: "Instaurer un enseignement spécifique de morale à l’école",
    articleContent:
      "Les cours de morale en France ont été introduits dans la foulée des lois Jules Ferry de 1881 et 1882. Ces cours avaient pour objectif d'inculquer uniformément certaines valeurs aux élèves. Après les événements de Mai 1968, les enseignements de morale ont été abolis du système scolaire français. L’objet de cette proposition est de réinstaurer un enseignement de morale au sein de l’école.",
    source: "Discours du ou de la candidate",
    idCandidat: 6,
  },
  {
    id: 379,
    theme: 6,
    title: "Inscrire la préférence nationale dans la Constitution",
    articleContent:
      "Cette proposition vise à faire voter, par référendum, une modification de la Constitution pour y inscrire “la maîtrise de l'immigration”, “la priorité nationale et le principe d'une supériorité du droit français sur le droit international pour refondre \"l'ensemble du droit applicable aux étrangers\". Le candidat souhaite adresser cette question au peuple directement, sans respecter la procédure prévue par l’article 89 de la Constitution, à l’image de la méthode employée par Charles de Gaulle en 1962.",
    source: "20 minutes",
    idCandidat: 12,
  },
  {
    id: 412,
    theme: 6,
    title: "Rétablir de bonnes relations politiques avec la Russie",
    articleContent:
      "Depuis la guerre froide les relations entre la France et la Russie ne sont pas très bonnes. En effet, de nombreux désaccords quant à l’attitude à adopter vis-à-vis de certains pays du Moyen-Orient (par exemple en Syrie) divisent ces deux pays. Cette proposition vise à rétablir une véritable “politique d'amitié” entre la Russie et la France mais également avec des pays comme la Chine et les pays arabes.",
    source: "Le Monde",
    idCandidat: 14,
  },  
];

var newPropositionsList = JSON.parse(JSON.stringify(propositionsList));

newPropositionsList.push.apply(newPropositionsList, firsThirteeProps);

export default getPropositionDetails = (idProposition) => {
  if (idProposition) {
    const newFilteredPropositionsList = newPropositionsList.filter(
      (prop) => prop.id === idProposition
    );

    return newFilteredPropositionsList;
  }
};
