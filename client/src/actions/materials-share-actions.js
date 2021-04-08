import { fileExistsOnS3 } from "../components/helpers/fileExistsOnS3";
const axios = require("axios").default;

export const SaveData = (payload, type, setCompleted, setSaved) => {
  console.log("ms-share-actions- save ", payload);

  function isFileImage(file) {
    return file && file["type"].split("/")[0] === "image";
  }

  if (Array.isArray(payload.localFiles) && payload.localFiles.length > 0) {
    //if file is docx payload.thumb = file + ".pdf" + ".jpg"
    //if file is pdf payload.thumb = file + ".jpg"
    if (isFileImage(payload.localFiles[0].raw)) {
      //make a thumbnail
      makeThumb(payload.localFiles[0].raw).then((thumb) => {
        //save the thumb
        handleThumbUpload(thumb).then((result) => {
          payload.thumb = result.path;
        });
      });
    }

    handleFileUpload(type, payload.localFiles, payload, setCompleted, setSaved);
  } else {
    //save data to db
    if (type === "Edit") {
      setCompleted(1);
      editMaterial(payload, setSaved);
      return true;
    }
    return false;
  }
  return true;
};

const editMaterial = (material, setSaved) => {
  console.log('materialsactionshare- material',material)
  axios
    .put(`/api/material/update/${material.id}`, material, {})
    .then((res) => {
      console.log("saved edit to db", res.data);
      setSaved(true);
    })
    .catch(function (err) {
      throw err;
    });
};

const createMaterial = (material, setSaved) => {
  material.author_id = localStorage.getItem("USER_ID");
  material.author_img = localStorage.getItem("USER_IMG");
  console.log("materials-share-actions creatematerial - material", material);
  axios
    .post(`/api/material`, material, {})
    .then((res) => {
      // console.log("saved new material to db", res.data);
      setSaved(true);
    })
    .catch(function (err) {
      throw err;
    });
};

const handleThumbUpload = async (thumbFile) => {
  let response = await fetch("/api/material/thumbUpload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ file: thumbFile }),
  });
  // console.log("materials-share-actions handleThumbUpload response", response);
  return response.json();
};

const handleFileUpload = async (
  type = "Create",
  files,
  payload,
  setCompleted,
  setSaved
) => {
  const data = new FormData();
  data.append("saveType", "awsUpload");
  files.forEach((file, index) => {
    data.append(`files[${index}]`, file.raw);
  });
  const uploadedFiles = await axios.post("/api/material/file/upload", data, {
    onUploadProgress: (ProgressEvent) => {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = (ProgressEvent.loaded / ProgressEvent.total) * 100;
        return Math.min(oldCompleted + diff, 100);
      });
    },
  });

  console.log("uploaded files", uploadedFiles);
  uploadedFiles.data.forEach((file) => {
    payload.files.push(file.path);

    const ext = getFileExt(file);

    if (ext === "docx" || ext === "pdf") {
      let path =
        ext === "docx"
          ? file.path + ".pdf_thumb.jpg"
          : file.path + "_thumb.jpg";

      payload.thumb = path;
    }

    //remove from material
    delete payload.localFiles;
  });

  if (type === "Create") createMaterial(payload, setSaved);
  if (type === "Edit") editMaterial(payload, setSaved);
};

// const getDocThumb = (file, ext, callback) => {
//   let path =
//     ext === "docx" ? file.path + ".pdf_thumb.jpg" : file.path + "_thumb.jpg";
//   let timeout = 0;
//   var findFile = setInterval(myTimer, 200);
//   function myTimer() {
//     console.log("searching for file: ", path);
//     timeout++;

//     let img = fileExistsOnS3(path);
//     console.log("could not find file trying again: ", timeout);
//     if (img) {
//       myStopFunction();
//       console.log("found file: ", path);
//       callback(path);
//     }
//     if (timeout >= 15) {
//       myStopFunction();
//       console.log("could not find file: ", path);
//     }
//   }

//   function myStopFunction() {
//     clearInterval(findFile);
//   }
// };

const getFileExt = (file) => {
  const reExtension = /(?:\.([^.]+))?$/;
  const ext = file.name.match(reExtension)[1].toLowerCase();
  console.log("file ext = ", ext);
  return ext;
};

export const makeThumb = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  // console.log("materials-share-actions makeThumb file", file);
  let response = await fetch("/api/material/makeThumb", {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const getAllMaterials = async () => {
  let response = await fetch(`/api/materials`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
};

export const getAutoComplete = async (field) => {
  let response = await fetch(`/api/materialsAutocomplete?field=${field}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
};



export const getPaginatedMaterials = async (page, limit) => {
  let response = await fetch(
    `/api/materialsPaginated?page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.json();
};

export const getPaginatedIBMaterials = async (page, limit) => {
  let response = await fetch(
    `/api/materialsPaginatedIB?page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.json();
};

export const getMaterial = async (slug) => {
  let response = await fetch(`/api/material/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
};
export const getMaterialId = async (id) => {
  let response = await fetch(`/api/materialId/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
};

export const getPaginatedUserMaterials = async (id, page, limit) => {
  let response = await fetch(
    `/api/getUserMaterialsPaginated?id=${id}&page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.json();
};

export const getUserLikes = async (id, page, limit) => {
  let response = await fetch(
    `/api/getlikedMaterialsPaginated/?id=${id}&page=${page}&limit=${limit}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const deleteRemoteFile = async (file) => {
  let response = await fetch(`/api/material/file/delete`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({ file: file }),
  });
  return response.json();
};

export const deleteMaterial = async (id) => {
  let response = await fetch(`/api/material/delete/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "DELETE",
  });
  return response.json();
};

export const getSearchQueries = async () => {
  let response = await fetch(`/api/getSearchQueries`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
// console.log("materials-share-actions - saveSearchResult search", searchQuery);

export const saveSearchQuery = async (searchQuery) => {
  let response = await fetch("/api/saveSearchQuery", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search: searchQuery }),
  });
  return response.json();
};

export const getSearchResults = async (search) => {
  let response = await fetch(`api/searchResults`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search: search }),
  });
  return response.json();
};

export const getFilterResults = async (
  search,
  timeInClass,
  timePrep,
  level,
  languageFocus,
  activityUse,
  pupilTask,
  category, 
  curriculum,
) => {
  let response = await fetch(
    // `api/search?search=${search}&timeInClass=${timeInClass}&timePrep=${timePrep}&level=${level}&languageFocus=${languageFocus}&activityUse=${activityUse}&pupilTask=${pupilTask}&category=${category}`,
    `api/filterResults`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: search,
        timeInClass: timeInClass,
        timePrep: timePrep,
        level: level,
        languageFocus: languageFocus,
        activityUse: activityUse,
        pupilTask: pupilTask,
        category: category,
        curriculum: curriculum,
      }),
    }
  );
  return response.json();
};

export const getAvatar = async (id) => {
  let response = await fetch("/api/avatar/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
