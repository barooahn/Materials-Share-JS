// server/server.js

/** require dependencies */
const express = require("express");
const routes = require("./server/routes/");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const flash = require("connect-flash");
const dotenv = require("dotenv").config();

const app = express();
const router = express.Router();

// ... other imports
const path = require("path");

//middleware for loggind - dev only
app.use(morgan("dev"));

const db = process.env.MONGODB_URI;
/** connect to MongoDB datastore */
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("db connected...");
    routes(app, db);
  })

  .catch(err => console.log(err));

// /** set up middleware */
app.options("*", cors());
// app.options('/products/:id', cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

//show local files in preview - give access to public dir from /img.jpg api call
var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["pdf", "jpg"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set("Content-type:application/pdf");
  }
};

app.use(express.static("public", options));

// // Connect flash
app.use(flash());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://localhost:3000/api/users/oauth/google, http://localhost:5000, http://127.0.0.1:50697, https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=164931093808-p5"
    // "*"
  );
  res.header("Content-Type", "application/javascript");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/** set up routes {API Endpoints} */
routes(router);

app.use("/api", router);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let port = process.env.PORT || 5000;
/** start server */
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});

//secure but need

// var fs = require('fs')
// var https = require('https')

// https.createServer({
// 	key: fs.readFileSync('server.key'),
// 	cert: fs.readFileSync('server.cert')
// }, app)
// 	.listen(port, () => {
// 		console.log(`Server started at port: ${port}`);
// 	});
