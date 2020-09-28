import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import DocsPicsVids from "./DocsPicsVids";
import Splash from "./Splash";

const useStyles = makeStyles((theme) => ({}));

export default function HomeLayout() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Splash></Splash>
      <DocsPicsVids></DocsPicsVids>
    </React.Fragment>
  );
}
