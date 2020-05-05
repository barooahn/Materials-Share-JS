const titles = [
  { title: "Title" },
  { timeInClass: "Time In Class (mins)" },
  { timePrep: "Time To prepare (mins)" },
  { procedureBefore: "Procedure Before Class" },
  { procedureIn: "Procedure In The Classroom" },
  { followUp: "Follow Up Activities" },
  { variations: "Variations On The Resource" },
  { tips: "Tips" },
  { notes: "Notes" },
  { category: "Institute" },
  { objective: "Objective" },
  { level: "Level" },
  { languageFocus: "Language Focus" },
  { pupilTask: "Tasks For Pupils" },
  { activityUse: "Activity Use" },
  { materials: "Materials needed" },
  { preparation: "Time Needed For Preperation (mins)" },
  { likes: "Likes" },
  { author_img: "author_img" },
  { slug: "slug" },
];

const getLabel = (name) => {
  const label = titles.filter((x) => name in x);
  //   console.log("label ", label[0][name]);
  return label[0][name];
};

const GetFilledProps = (props) => {
  let filled = [];

  for (var item in props) {
    if (
      props[item] !== "" &&
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
      item !== "filePaths" &&
      item !== "showContinue" &&
      item !== "selectedFiles" &&
      item !== "showUpload" &&
      item !== "loaded" &&
      item !== "author_img" &&
      item !== "slug"
    ) {
      const label = getLabel(item);
      filled.push({ label: [label], name: item, value: props[item] });
    }
  }

  console.log("filled... ", filled);

  return filled;
};

export default GetFilledProps;
