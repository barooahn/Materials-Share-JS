export const sendEmail = async (body) => {
  let response = await fetch("/api/email/sendEmail", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: body }),
  });
  return response.json();
};
