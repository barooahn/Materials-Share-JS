import axios from "axios";

export const oauthGoogle = async data => {
  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  // headers.append(
  //   "Authorization",
  //   "Basic " + base64.encode(username + ":" + password)
  // );
  headers.append("Origin", "http://localhost:3000");

  const res = await axios
    .get("/api/users/oauth/google", {
      access_token: data,
      headers: headers
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  console.log("result from google: ", res);
  console.log("data sent to google: ", data.profileObj.googleId);
  localStorage.setItem("JWT_TOKEN", data.accessToken);
  localStorage.setItem("USER_ID", data.googleId);
  axios.defaults.headers.common["Authorization"] = data.accessToken;
};

export const oauthFacebook = async data => {
  const res = await axios
    .post("/api/users/oauth/facebook", {
      access_token: data
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  console.log("data passed to facebook: ", data);
  console.log("result from facebook: ", res);
  localStorage.setItem("JWT_TOKEN", res.data.token);
  localStorage.setItem("USER_ID", res.data.id);
  axios.defaults.headers.common["Authorization"] = res.data.token;
};

export const register = async data => {
  try {
    const res = await axios.post("/api/users/register", data);
    localStorage.setItem("JWT_TOKEN", res.data.token);
    localStorage.setItem("USER_ID", res.data.id);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  } catch (err) {
    console.log(err);
  }
};

export const logOut = () => {
  localStorage.removeItem("JWT_TOKEN");
  localStorage.removeItem("USER_ID");
  axios.defaults.headers.common["Authorization"] = "";
  console.log("logged out");
};

export const logIn = async data => {
  try {
    const res = await axios.post("/api/users/login", data);
    localStorage.setItem("JWT_TOKEN", res.data.token);
    localStorage.setItem("USER_ID", res.data.id);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  } catch (err) {
    console.log(err);
  }
};

export const getSecret = async () => {
  try {
    const res = await axios.get("/api/users/protected");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("err", err);
  }
};
