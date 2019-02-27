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
    // console.log("file: ", file);
    const filePath = file.path;

    //configuring parameters
    var params = {
      Bucket: process.env.S3_BUCKET,
      Body: await fs.createReadStream(filePath),
      Key: "uploads/" + Date.now() + "_" + file.name,
      ACL: "public-read"
    };

    const response = await s3
      .upload(params)

      .on("httpUploadProgress", function(evt) {
        console.log("Progress:", evt.loaded, "/", evt.total);
      })
      .promise();

    console.log("response:");
    console.log(response);

    return { path: response.Location, name: response.Key };
  }
};

// const aws = require("aws-sdk");
// /*
//  * Configure the AWS region of the target bucket.
//  * Remember to change this to the relevant region.
//  */
// aws.config.region = "us-east-1";

// /*
//  * Load the S3 information from the environment variables.
//  */
// const S3_BUCKET = process.env.S3_BUCKET;

// module.exports = {
//   uploadAws: file => {
//     const s3 = new aws.S3();
//     const fileName = file.name;
//     const fileType = file.type;
//     const s3Params = {
//       Bucket: S3_BUCKET,
//       Key: fileName,
//       Expires: 60,
//       ContentType: fileType,
//       ACL: "public-read"
//     };

//     s3.getSignedUrl("putObject", s3Params, (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.end();
//       }
//       const returnData = {
//         signedRequest: data,
//         url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
//       };
//       console.log(returnData);
//       return JSON.stringify(returnData);
//     });
//   }
// };
// /*
//  * Respond to GET requests to /sign-s3.
//  * Upon request, return JSON containing the temporarily-signed S3 request and
//  * the anticipated URL of the image.
//  */
