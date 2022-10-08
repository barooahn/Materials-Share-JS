import React from "react";
import GetFilledProps from "../helpers/GetFilledProps";
import StackGrid from "react-stack-grid";
import Typography from "@mui/material/Typography";
import Mobile from "../helpers/mobile";

const DisplayMaterialList = (props) => {
	const colWid = Mobile() ? "100%" : "50%";

	let filledValues = GetFilledProps(props);

	return (
		<StackGrid columnWidth={colWid}>
			{filledValues.map((item) => {
				return (
					<React.Fragment key={item.label + Date.now()}>
						<Typography
							variant='h6'
							style={{ paddingLeft: 10 }}
							component='h6'
						>
							{item.label}
						</Typography>
						<Typography
							gutterBottom
							variant='body1'
							style={{
								padding: 10,
								whiteSpace: "pre-wrap",
							}}
							component='p'
						>
							{Array.isArray(item.value) &&
								item.value.map((x) => {
									return (
										<span
											key={
												x.label + Date.now()
											}
										>
											{x.label}
											<br />
										</span>
									);
								})}
							{!Array.isArray(item.value) && item.value}
						</Typography>
					</React.Fragment>
				);
			})}
		</StackGrid>
	);
};

export default DisplayMaterialList;
