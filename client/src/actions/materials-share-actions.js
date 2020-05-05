const axios = require("axios").default;

export const SaveData = (payload, type, setCompleted = 0, setSaved = false) => {
  console.log("ms-share-actions- save ", payload);

  if (Array.isArray(payload.localFiles) && payload.localFiles.length > 0) {
    handleFileUpload(type, payload.localFiles, payload, setCompleted, setSaved);
  } else {
    //save data to db
    if (type === "Create") {
      console.log("ms-share-actions - Error - Should have files", payload);
    } else if (type === "Edit") {
      console.log("ms-share-actions -Saving edit material", payload);
      editMaterial(payload, setSaved);
    }
  }
  return true;
};

const editMaterial = (material, setSaved) => {
  axios
    .put(`/api/material/update/${material.id}`, material, {})
    .then((res) => {
      console.log("saved edit to db", res.data);
      setSaved = true;
    })
    .catch(function (err) {
      throw err;
    });
};

const createMaterial = (material) => {
  material.author_id = localStorage.getItem("USER_ID");
  material.author_img = localStorage.getItem("USER_IMG");
  axios
    .post(`/api/material`, material, {})
    .then((res) => {
      console.log("saved new material to db", res.data);
    })
    .catch(function (err) {
      throw err;
    });
};

const handleFileUpload = (type, files, payload, setCompleted, setSaved) => {
  console.log("files in handle upload ", files);
  const data = new FormData();
  data.append("saveType", "awsUpload");
  files.forEach((file, index) => {
    // console.log("files raw: " + file.raw)
    data.append(`files[${index}]`, file.raw);
  });
  axios
    .post("/api/material/file/upload", data, {
      onUploadProgress: (ProgressEvent) => {
        setCompleted((oldCompleted) => {
          if (oldCompleted === 100) {
            return 0;
          }
          const diff = (ProgressEvent.loaded / ProgressEvent.total) * 100;
          return Math.min(oldCompleted + diff, 100);
        });
      },
    })
    .then((res) => {
      res.data.forEach((file) => {
        payload.files.push(file.path);
        setSaved(true);
      });
      //remove from material
      delete payload.localFiles;

      if (type === "Create") createMaterial(payload);
      if (type === "Edit") editMaterial(payload);
    })
    .catch(function (err) {
      console.log(err);
    });
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

export const getMaterial = async (slug) => {
  let response = await fetch(`/api/material/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
};

export const getUserMaterials = async (id) => {
  let response = await fetch(`/api/getUserMaterials/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
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
  let response = await fetch(`api/search/${search}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
  category
) => {
  let response = await fetch(
    `api/search?search=${search}&timeInClass=${timeInClass}&timePrep=${timePrep}&level=${level}&languageFocus=${languageFocus}&activityUse=${activityUse}&pupilTask=${pupilTask}&category=${category}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(" material-share-actions - getFilterResults results", response);
  return response.json();
};

export const getUserLikes = async (id) => {
  let response = await fetch("/api/materials/user/likes/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
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
