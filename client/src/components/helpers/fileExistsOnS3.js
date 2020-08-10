const axios = require("axios").default;

export const fileExistsOnS3 = async (file_url) => {
  const data = new FormData();
  data.append("file", file_url);
  axios
    .get(`/api/material/getSignedUrl?url=${file_url}`)
    .then((res) => {
      return res;
    })
    .catch(function (err) {
      console.log(err);
      return false;
    });
};
