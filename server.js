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
const compression = require("compression");
const Material = require("./server/models/Material");
const fs = require("fs");

const app = express();
const router = express.Router();

app.use(compression());

// ... other imports
const path = require("path");

//middleware for logging - dev only
app.use(morgan("dev"));

const db = process.env.MONGODB_URI;
/** connect to MongoDB datastore */
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("db connected...");
		routes(app, db);
	})

	.catch((err) => console.log(err));

/** set up middleware */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect flash
app.use(flash());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	// res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header(
			"Access-Control-Allow-Methods",
			"PUT, POST, PATCH, DELETE, GET"
		);
		return res.status(200).json({});
	}
	next();
});

app.use(helmet());

// app.get("", (req, res, next) => {
// 	console.log("getting html");
// 	// let responseCode = 200;
// 	let responseData;

// 	fs.readFile(indexPath, "utf8", (err, htmlData) => {
// 		if (err) {
// 			console.error("Error during file reading", err);
// 			return res.status(404).end();
// 		}
// 		Material.find(req.params).exec((err, material) => {
// 			console.log("sending headers from server");
// 			if (material) {
// 				// return res.send(material);
// 				console.log("material", material[0].title);
// 				htmlData = htmlData
// 					.replace(/__META_OG_TITLE__/g, material[0].title)
// 					.replace(
// 						/__META_OG_DESCRIPTION__/g,
// 						material[0].objective
// 					)
// 					.replace(
// 						/__META_DESCRIPTION__/g,
// 						material[0].objective
// 					)
// 					.replace(/__META_OG_IMAGE__/g, material[0].files)
// 					.replace(/__META_OG_URL__/g, material[0].files);

// 				if (htmlData) return res.send(htmlData);
// 				else if (err) {
// 					responseData = 400;
// 				} else responseData = 404;
// 			}
// 		});
// 	});
// 	console.log("html head", responseData);
// 	return res.send(responseData);
// });

/** set up routes {API Endpoints} */
routes(router);

app.use("/api", router);

const indexPath = path.resolve(__dirname, "client/build", "index.html");
console.log("server IndexPath", indexPath);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(
		express.static("client/build", {
			etag: true, // Just being explicit about the default.
			lastModified: true, // Just being explicit about the default.
			setHeaders: (res, path) => {
				const hashRegExp = new RegExp("\\.[0-9a-f]{8}\\.");

				if (path.endsWith(".html")) {
					// All of the project's HTML files end in .html
					res.setHeader("Cache-Control", "no-cache");
				} else if (hashRegExp.test(path)) {
					// If the RegExp matched, then we have a versioned URL.
					res.setHeader("Cache-Control", "max-age=31536000");
				}
			},
		})
	);

	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "client", "build", "index.html")
		);
	});
}

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use(function (req, res, next) {
	if (req.get("X-Forwarded-Proto") !== "https") {
		res.redirect("https://" + req.get("Host") + req.url);
	} else next();
});

const port = process.env.PORT || 5000;
/** start server */
app.listen(port, () => {
	console.log(`Server started at port: ${port}`);
});
