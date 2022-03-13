import propositionsList from "../data/propositions/propositionsList"; // Prendre le bon fichier, et pas celui pour le swipe

var newPropositionsList = JSON.parse(JSON.stringify(propositionsList));

export default getPropositionsListForCandidat = (
  idTheme,
  idCandidat,
  limit
) => {
  if (limit) {
    var filteredPropositions = newPropositionsList.filter(
      (d) => d.theme === idTheme,
      (c) => c.idCandidat === idCandidat
    );

    filteredPropositions.slice(0,limit);

    return filteredPropositions;

  } else {
  }
};
