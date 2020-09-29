import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import DocsPicsVids from "./DocsPicsVids";
import Splash from "./Splash";
import SaveSecurelyForever from "./SaveSecurelyForever";
import ShareWithOthers from "./ShareWithOthers";
import SearchAndFilter from "./SearchAndFilter";

const useStyles = makeStyles((theme) => ({}));

export default function HomeLayout() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Splash></Splash>
      <DocsPicsVids></DocsPicsVids>
      <SaveSecurelyForever></SaveSecurelyForever>
      <ShareWithOthers></ShareWithOthers>
      <SearchAndFilter></SearchAndFilter>
    </React.Fragment>
  );
}
