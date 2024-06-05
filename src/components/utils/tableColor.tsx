const tableColor = (key: string): string => {
  let value = "";
  switch (key) {
    case "26":
    case "25":
    case "19":
    case "1":
      value = "#b0488";
      break;
    case "18":
    case "2":
      value = "#bf6c9f";
      break;
    case "15":
    case "3":
      value = "#cf91b7";
      break;
    case "12":
    case "4":
      value = "#dfb5cf";
      break;
    case "10":
    case "5":
      value = "#efdae7";
      break;
    default:
      value = "#efdaff";
      break;
  }
  return value;
};

export default tableColor;
