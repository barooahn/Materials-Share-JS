export const fileExistsOnS3 = async (file_url) => {
  let response = await fetch(`/api/doesFileExist?url=${file_url}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
};
