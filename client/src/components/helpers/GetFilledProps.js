const titles = [
	{ title: "Title" },
	{ curriculum: "Curriculum" },
	{ timeInClass: "Time In Class (mins)" },
	{ timePrep: "Time To prepare (mins)" },
	{ procedureBefore: "Procedure Before Class" },
	{ procedureIn: "Procedure In The Classroom" },
	{ followUp: "Follow Up Activities" },
	{ variations: "Variations On The Resource" },
	{ tips: "Tips" },
	{ notes: "Notes" },
	{ objective: "Objective" },
	{ level: "Level" },
	{ languageFocus: "Language Focus" },
	{ targetLanguage: "Target Language" },
	{ pupilTask: "Tasks For Pupils" },
	{ activityUse: "Activity Use" },
	{ materials: "Materials needed" },
	{ preparation: "Time Needed For Preparation (mins)" },
	{ likes: "Likes" },
	{ author_img: "author_img" },
	{ slug: "slug" },
	{ thumb: "thumb" },
];

const getLabel = (name) => {
	const label = titles.filter((x) => name in x);
	return label[0][name];
};

const GetFilledProps = (props) => {
	let filled = [];

	for (let item in props) {
		if (
			(item === ("timeInClass" || item === "timePrep") &&
				props[item] > 0) ||
			(props[item] !== "" &&
				props[item] !== undefined &&
				props[item] !== null &&
				props[item] !== 0 &&
				props[item].length > 0 &&
				item !== "files" &&
				item !== "_id" &&
				item !== "dateCreated" &&
				item !== "dateModified" &&
				item !== "book" &&
				item !== "author_id" &&
				item !== "shared" &&
				item !== "approved" &&
				item !== "filePaths" &&
				item !== "showContinue" &&
				item !== "selectedFiles" &&
				item !== "showUpload" &&
				item !== "loaded" &&
				item !== "author_img" &&
				item !== "slug" &&
				item !== "thumb" &&
				item !== "likes")
		) {
			const label = getLabel(item);
			filled.push({ label: label, value: props[item] });
		}
	}

	return filled;
};

export default GetFilledProps;
