/** server/controllers/material.ctrl.js*/
const Material = require("../models/Material");
const fs = require("fs");
const {
	uploadAws,
	deleteAws,
	getSignedUrlAws,
} = require("../file-upload/aws-file-services");
const sharp = require("sharp");

const escapeRegex = (text) => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {
	getFiles: (req, res) => {
		req.body.map((file) => {
			fs.readFile(file, (err, data) => {
				if (!err) {
					res.writeHead(200, {
						"Content-Type": "text/html",
					});
					res.write(data);
					res.end();
				} else {
					console.log(err);
				}
			});
		});
	},

	fileUpload: async (req, res) => {
		if (req.files.files) {
			Promise.all(
				req.files.files.map((file) => {
					return uploadAws(file);
				})
			).then((result) => {
				//save to DB
				return res.json(result);
			});
		}
	},

	thumbUpload: async (req, res) => {
		uploadAws(req.body.file).then((result) => {
			return res.json(result);
		});
	},

	makeThumb: async (req, res, next) => {
		const file = req.files.file;
		sharp(file.path)
			.resize(300, 200)
			.toFile(`/tmp/thumb_${file.name}`)
			.then((info) => {
				const thumb = {
					name: `thumb_${req.files.file.name}`,
					path: `/tmp/thumb_${req.files.file.name}`,
				};
				return res.json(thumb);
			})
			.catch((err) => {
				console.log(
					"Material ctrl make thumb - err thumb not made ",
					err
				);
			});
	},

	deleteFile: async (req, res, next) => {
		const result = await deleteAws(req.body.file);
		if (result) {
			return res.json({
				deleted: req.body.file,
			});
		} else {
			console.log("err file not deleted");
			return res.err;
		}
	},

	getSignedUrlIfExists: async (req, res, next) => {
		const signedUrl = await getSignedUrlAws(req.query.url);
		return res.json(signedUrl);
	},

	addMaterial: (req, res, next) => {
		new Material(req.body).save((err, material) => {
			if (err) res.send(err);
			else if (!material) res.send(400);
			else {
				return res.send(material);
				// });
			}
			next();
		});
	},

	getMaterials: async (req, res, next) => {
		var query = {
			// shared: true,
			// approved: true,
		};
		await Material.find(query)
			.sort({
				dateModified: -1,
			})
			.exec((err, doc) => {
				if (err) {
					return res.json(err);
				}
				return res.json({ materials: doc });
			});
	},

	getUserMaterials: async (req, res, next) => {
		var page = parseInt(req.query.page) || 0; //for next page pass 1 here
		var limit = parseInt(req.query.limit) || 3;
		var query = {
			author_id: req.query.id,
		};
		await Material.find(query)
			.sort({
				dateModified: -1,
			})
			.skip(page * limit) //Notice here
			.limit(limit)
			.exec((err, doc) => {
				if (err) {
					return res.json(err);
				}
				Material.countDocuments(query).exec(
					(count_error, count) => {
						if (err) {
							return res.json(count_error);
						}
						return res.json({
							total: count,
							page: page,
							pageSize: doc.length,
							materials: doc,
						});
					}
				);
			});
	},

	getUserLikes: async (req, res, next) => {
		var page = parseInt(req.query.page) || 0; //for next page pass 1 here
		var limit = parseInt(req.query.limit) || 3;
		var query = {
			likes: req.query.id,
		};
		await Material.find(query)
			.sort({
				dateModified: -1,
			})
			.skip(page * limit) //Notice here
			.limit(limit)
			.exec((err, doc) => {
				if (err) {
					return res.json(err);
				}
					Material.countDocuments(query).exec(
					(count_error, count) => {
						if (err) {
							return res.json(count_error);
						}
						return res.json({
							total: count,
							page: page,
							pageSize: doc.length,
							materials: doc,
						});
					}
				);
			});
	},

	materialsPaginated: async (req, res, next) => {
		var page = parseInt(req.query.page) || 0; //for next page pass 1 here
		var limit = parseInt(req.query.limit) || 3;
		var query = {
			shared: true,
			// approved: true,
		};
		await Material.find(query)
			.sort({
				dateModified: -1,
			})
			.skip(page * limit) //Notice here
			.limit(limit)
			.exec((err, doc) => {
				if (err) {
					return res.json(err);
				}
				Material.countDocuments(query).exec(
					(count_error, count) => {
						if (err) {
							return res.json(count_error);
						}
						return res.json({
							total: count,
							page: page,
							pageSize: doc.length,
							materials: doc,
						});
					}
				);
			});
	},

	materialsPaginatedIB: async (req, res, next) => {
		var page = parseInt(req.query.page) || 0; //for next page pass 1 here
		var limit = parseInt(req.query.limit) || 3;
		var query = {
			shared: true,
			"curriculum.value": "internationalbaccalaureateib",
			// approved: true,
		};
		await Material.find(query)
			.sort({
				dateModified: -1,
			})
			.skip(page * limit) //Notice here
			.limit(limit)
			.exec((err, doc) => {
				if (err) {
					return res.json(err);
				}
				Material.countDocuments(query).exec(
					(count_error, count) => {
						if (err) {
							return res.json(count_error);
						}
						return res.json({
							total: count,
							page: page,
							pageSize: doc.length,
							materials: doc,
						});
					}
				);
			});
	},

	getMaterialsAwaitingApproval: async (req, res, next) => {
		var page = parseInt(req.query.page) || 0; //for next page pass 1 here
		var limit = parseInt(req.query.limit) || 3;
		var query = {
			// shared: true,
			approved: false,
		};
		await Material.find(query)
			.sort({
				dateModified: -1,
			})
			.skip(page * limit) //Notice here
			.limit(limit)
			.exec((err, doc) => {
				if (err) {
					return res.json(err);
				}
				Material.countDocuments(query).exec(
					(count_error, count) => {
						if (err) {
							return res.json(count_error);
						}
						return res.json({
							total: count,
							page: page,
							pageSize: doc.length,
							materials: doc,
						});
					}
				);
			});
	},

	getMaterialId: (req, res, next) => {
		Material.findById(req.params.id).exec((err, material) => {
			if (material) return res.send(material);
			else if (err) return res.send(err);
			else return res.send(404);
		});
	},

	getMaterialSlug: (req, res, next) => {
		Material.find({
			slug: req.params.slug,
		})
			// .populate("author")
			.exec((err, material) => {
				if (material) return res.send(material);
				else if (err) return res.send(err);
				else return res.send(404);
			});
	},

	updateMaterial: (req, res, next) => {
		Material.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				$set: req.body,
			},
			{
				upsert: true,
			},
			function (err, material) {
				if (err) return next(err);

				return res.send(material);
			}
		);
	},

	deleteMaterial: (req, res, next) => {
		Material.findOneAndDelete(
			{
				_id: req.params.id,
			},
			function (err) {
				if (err) {
					return res.err;
				}
				return res;
			}
		);
	},

	getDistinct: (req, res, next) => {
		const IsInObject = (value, resultArray) => {
			for (let i = 0; i < resultArray.length; i++) {
				if (resultArray[i]["value"] === value) {
					return true;
				}
			}
			return false;
		};

		const compareValues = (key, order = "asc") => {
			return function innerSort(a, b) {
				if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
					// property doesn't exist on either object
					return 0;
				}

				const varA =
					typeof a[key] === "string"
						? a[key].toUpperCase()
						: a[key];
				const varB =
					typeof b[key] === "string"
						? b[key].toUpperCase()
						: b[key];

				let comparison = 0;
				if (varA > varB) {
					comparison = 1;
				} else if (varA < varB) {
					comparison = -1;
				}
				return order === "desc" ? comparison * -1 : comparison;
			};
		};

		const field = req.query.field + ".label";
		const value1 = req.query.field + ".value";
		let distinct = [];

		Material.find({
			[req.query.field]: {
				$ne: null,
				$ne: [],
				$ne: {},
			},
		})
			.select({
				[field]: 1,
				[value1]: 1,
				_id: 0,
			})
			.exec((err, materials) => {
				if (materials) {
					materials.forEach((x) => {
						if (x[req.query.field]) {
							x[req.query.field].forEach((y) => {
								if (!IsInObject(y.value, distinct)) {
									distinct.push({
										label: y.label,
										value: y.value,
									});
								}
							});
						}
					});

					const result = distinct.sort(compareValues("label"));
					return res.send(result);
				} else if (err) return res.send(err);
				else return res.send(404);
			});
	},

	getSearchResults: (req, res, next) => {
		const regex = new RegExp(escapeRegex(req.body.search), "gi");
		Material.find(
			{
				$text: {
					$search: regex,
				},
				shared: true,
			},
			function (err, materials) {
				if (materials) return res.send(materials);
				if (err) console.log("there was a search error", err);
				res.json({
					message: "No results",
				});
			}
		);
	},

	getFilterResults: (req, res, next) => {
		let {
			search,
			timeInClass,
			timePrep,
			level,
			languageFocus,
			activityUse,
			pupilTask,
			category,
			curriculum,
		} = req.body;
		queryCond = {
			...(search && {
				$text: {
					$search: new RegExp(escapeRegex(search), "gi"),
				},
			}),
			...(level.length > 0 && {
				"level.value": `${level}`,
			}),
			...(curriculum.length > 0 && {
				"curriculum.value": `${curriculum}`,
			}),
			...(activityUse.length > 0 && {
				"activityUse.value": `${activityUse}`,
			}),
			...(category.length > 0 && {
				"category.value": `${category}`,
			}),
			...(pupilTask.length > 0 && {
				"pupilTask.value": `${pupilTask}`,
			}),
			...(languageFocus.length > 0 && {
				"languageFocus.value": `${languageFocus}`,
			}),
			...(timeInClass && {
				timeInClass: {
					$gte: timeInClass[0],
					$lte: timeInClass[1],
				},
			}),
			...(timePrep && {
				timePrep: {
					$gte: timePrep[0],
					$lte: timePrep[1],
				},
			}),
		};

		Material.find(queryCond, function (err, materials) {
			if (materials) return res.send(materials);
			if (err) console.log("there was a search error", err);
		});
	},

	getTitles: async (req, res, next) => {
		await Material.find()
			.select({
				title: 1,
				_id: 0,
			})
			.sort({
				dateModified: -1,
			})
			.exec((err, titles) => {
				if (titles) return res.send(titles);
				else if (err) return res.send(err);
				else return res.send(404);
			});
	},
};
