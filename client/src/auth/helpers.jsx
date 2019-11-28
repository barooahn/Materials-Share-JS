import axios from "axios";

export const oauthGoogle = async data => {
  const res = await axios.get("/api/users/oauth/google", {
    access_token: data
  });

  localStorage.setItem("JWT_TOKEN", res.data.token);
  localStorage.setItem("USER_ID", res.data.id);
  axios.defaults.headers.common["Authorization"] = res.data.token;
};

export const oauthFacebook = async data => {
  const res = await axios.post("/api/users/oauth/facebook", {
    access_token: data
  });
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
