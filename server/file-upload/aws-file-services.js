const AWS = require("aws-sdk");
const fs = require("fs");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

var s3 = new AWS.S3();

module.exports = {
  uploadAws: async (file) => {
    //configuring the AWS environment
    const name = file.name.replace(/[/\\?%*:|"<>" "]/g, "-");
    const filePath = file.path;

    // console.log("aws-file-service uploadAWS - file", file);
    //configuring parameters
    var params = {
      Bucket: process.env.S3_BUCKET,
      Body: fs.createReadStream(filePath),
      Key: "uploads/" + Date.now() + "_" + name,
      ACL: "public-read",
    };
    const response = await s3
      .upload(params)
      .on("httpUploadProgress", function (evt) {
        console.log("Progress:", evt.loaded, "/", evt.total);
      })
      .promise();
    console.log("aws-file-services uploadAWS:", response);
    return { path: response.Location, name: response.Key };
  },

  /* The following example deletes an object from an S3 bucket. */
  deleteAws: async (file) => {
    console.log("deleting aws file");
    var params = {
      Bucket: process.env.S3_BUCKET,
      Key: file,
    };
    try {
      console.log("key ", params.Key);
      await s3.deleteObject(params).promise();
      return { path: params.Key };
    } catch (err) {
      return err; // TypeError: failed to fetch
    }
  },

  getSignedUrlAws: async (file) => {
    const key = file.replace(
      "https://matshre-assets.s3.eu-west-2.amazonaws.com/",
      ""
    );
    console.error("checking if aws file exists", key);
    var params = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
    };

    try {
      const headCode = await s3.headObject(params).promise();
      console.error("head code", headCode);
      const signedUrl = s3.getSignedUrl("getObject", params);
      // Do something with signedUrl
      console.error("checking if aws file exists signedUrl", signedUrl);
      return { signedUrl: true };
    } catch (headErr) {
      if (headErr.code === "NotFound") {
        console.error("can't find file");
        return { signedUrl: false };
      }
    }
  },
};
