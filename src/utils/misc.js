const getIconColor = (idTheme) => {
  switch (idTheme) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return "white";

    case 5:
     return "#FAFC91";

    default:
      return null;
  }
}

export default {
  getIconColor
}
