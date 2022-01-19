import candidatesList from "../data/candidates/candidatesList";

const findCandidateDetails = (idCandidat) => {
  /* Trouver les infos du candidat (filtre le tableau avec tous les candidats et ne retient que celui qui doit être affiché) */
  let candidateProfileDetails = candidatesList.filter(
    (d) => d.id == idCandidat
  );

  return candidateProfileDetails;
};

export default findCandidateDetails;
