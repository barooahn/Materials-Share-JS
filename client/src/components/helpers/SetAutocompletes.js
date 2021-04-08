import { getAutoComplete } from "../../actions/materials-share-actions";

export const SetAutocompletes = async column => {

  const autoComp = await getAutoComplete(column);

  return autoComp;
};
