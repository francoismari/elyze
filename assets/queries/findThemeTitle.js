import themesCategories from "../data/themes/themesCategories";

const findThemeTitle = (themeID) => {
  /* Trouver les infos du thème (filtre le tableau avec tous les thèmes et ne retient que celui qui doit être affiché) */
  let themeDetails = themesCategories.filter(
    (d) => d.id == themeID
  );

  return themeDetails;
};

export default findThemeTitle;
