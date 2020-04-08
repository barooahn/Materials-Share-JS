const AWS = require("aws-sdk");
const fs = require("fs");
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3();

module.exports = {
	uploadAws: async file => {
		//configuring the AWS environment
		const name = file.name.replace(/[/\\?%*:|"<>" "]/g, "-");
		const filePath = file.path;

		//configuring parameters
		var params = {
			Bucket: process.env.S3_BUCKET,
			Body: await fs.createReadStream(filePath),
			Key: "uploads/" + Date.now() + "_" + name,
			ACL: "public-read"
		};
		const response = await s3
			.upload(params)

			.on("httpUploadProgress", function(evt) {
				console.log("Progress:", evt.loaded, "/", evt.total);
			})
			.promise();

		// console.log("response:", response);

		return { path: response.Location, name: response.Key };
	},

	/* The following example deletes an object from an S3 bucket. */
	deleteAws: async file => {
		console.log("deleting aws file");
		var params = {
			Bucket: process.env.S3_BUCKET,
			Key: file
		};
		try {
			console.log("key ", params.Key);
			await s3.deleteObject(params).promise();
			return { path: params.Key };
		} catch (err) {
			return err; // TypeError: failed to fetch
		}
	}
};
