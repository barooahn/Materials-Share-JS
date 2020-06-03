import axios from "axios";

export const signUser = async (user) => {
  // console.log("In helpers.jsx sign user");
  const res = await axios
    .post("/api/users/signUser", {
      user: user,
    })
    .catch(function (error) {
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
  console.log("data passed to signUser: ", user);
  console.log("result from signing: ", res);
  localStorage.setItem("JWT_TOKEN", res.data.token || "");
  localStorage.setItem("USER_ID", res.data.id || "");
  localStorage.setItem("USER_IMG", user.img || "");
  localStorage.setItem("USER_NAME", res.data.name || "");
  axios.defaults.headers.common["Authorization"] = res.data.token || "";
  return res;
};

export const register = async (data) => {
  const res = await axios.post("/api/users/register", data);
  console.log("helpers register", res);
  localStorage.setItem("JWT_TOKEN", res.data.token);
  localStorage.setItem("USER_ID", res.data.id);
  axios.defaults.headers.common["Authorization"] = res.data.token;
};

export const logOut = () => {
  localStorage.removeItem("JWT_TOKEN");
  localStorage.removeItem("USER_ID");
  localStorage.removeItem("USER_IMG");
  localStorage.removeItem("USER_NAME");
  axios.defaults.headers.common["Authorization"] = "";
  console.log("logged out");
};

export const logIn = async (data) => {
  console.log(" helpers login data", data);
  try {
    const res = await axios.post("/api/users/login", data);
    localStorage.setItem("JWT_TOKEN", res.data.token || "");
    localStorage.setItem("USER_ID", res.data.user._id || "");
    localStorage.setItem("USER_IMG", res.data.user.img || "");
    localStorage.setItem("USER_NAME", res.data.user.name || "");
    axios.defaults.headers.common["Authorization"] = res.data.token || "";
    console.log(" helpers login result", res);
    return res;
  } catch (err) {
    console.log(err);
    return {
      err: err,
      message: "Please check email and password",
    };
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
