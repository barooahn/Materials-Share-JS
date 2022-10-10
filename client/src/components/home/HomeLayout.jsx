import React, { lazy } from "react";

const DocsPicsVids = lazy(() => import("./DocsPicsVids"));
const Splash = lazy(() => import("./Splash"));
const SaveSecurelyForever = lazy(() => import("./SaveSecurelyForever"));
const ShareWithOthers = lazy(() => import("./ShareWithOthers"));
const SearchAndFilter = lazy(() => import("./SearchAndFilter"));

export default function HomeLayout() {
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
