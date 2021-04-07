// import React from "react";

import { getAllMaterials } from "../../actions/materials-share-actions";
import { getAutoComplete } from "../../actions/materials-share-actions";

export const SetAutocompletes = async column => {
  // console.log("SetAutocompletes column", column);
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

  const materials = await getAllMaterials();
  const autoComp = await getAutoComplete(column);



  console.log('autoComp', autoComp.values)
  //console.log('materials', materials)

  let resultArray = [];
  // columns.forEach(column => {

  // console.log("SetAutocompletes column", column);
  materials.forEach(material => {
    if (material[column] !== null) {
      material[column].forEach(item => {
        if (!IsInObject(item.value, resultArray))
          resultArray.push({
            label: item.label,
            value: item.value
          });
      });
    }
  });
  const result = resultArray.sort(compareValues("label"));
  console.log('autocomplete reuslt', result)
  return result;
};
