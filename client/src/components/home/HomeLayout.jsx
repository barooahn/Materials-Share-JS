import React, { Suspense, lazy } from "react";
import { makeStyles } from "@material-ui/core/styles";

const DocsPicsVids = lazy(() => import("./DocsPicsVids"));
const Splash = lazy(() => import("./Splash"));
const SaveSecurelyForever = lazy(() => import("./SaveSecurelyForever"));
const ShareWithOthers = lazy(() => import("./ShareWithOthers"));
const SearchAndFilter = lazy(() => import("./SearchAndFilter"));

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
