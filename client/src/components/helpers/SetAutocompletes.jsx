import React from "react";
import { getAllMaterials } from "../../actions/materials-share-actions";

export default ({
  setDynamicLevels,
  setDynamicLanguageFocus,
  setDynamicActivityUse,
  setDynamicPupilTask,
  setDynamicCategory
}) => {
  const compareValues = (key, order = "asc") => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  const IsInObject = (value, resultArray) => {
    for (let i = 0; i < resultArray.length; i++) {
      if (resultArray[i]["value"] === value) {
        return true;
      }
    }
    return false;
  };

  React.useEffect(async () => {
    const resultData = await getAllMaterials();
    const columns = [
      "level",
      "languageFocus",
      "activityUse",
      "pupilTask",
      "category"
    ];
    let resultArray = [];
    columns.forEach(column => {
      resultData.forEach(node => {
        if (node[column] !== null) {
          node[column].forEach(item => {
            if (!IsInObject(item.value, resultArray))
              resultArray.push({
                label: item.label,
                value: item.value
              });
          });
        }
      });
      resultArray.sort(compareValues("label"));
      //set state
      switch (column) {
        case "level":
          setDynamicLevels(resultArray);
          resultArray = [];
          break;
        case "languageFocus":
          setDynamicLanguageFocus(resultArray);
          resultArray = [];
          break;
        case "activityUse":
          setDynamicActivityUse(resultArray);
          resultArray = [];
          break;
        case "pupilTask":
          setDynamicPupilTask(resultArray);
          resultArray = [];
          break;
        case "category":
          setDynamicCategory(resultArray);
          resultArray = [];
          break;
        default:
          break;
      }
    });
  }, []); // <-- empty dependency array

  return null;
};
