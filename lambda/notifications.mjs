export const handler = async (event) => {
  let body = JSON.parse(event.body);
  let key = process.env.SERVER_KEY;
  let to = body["token"];

  let notification = {
    title: "A New Notification!",
    body: "Hello World!",
    click_action: "https://echopad.netlify.app/",
  };
  /*global fetch */

  try {
    const fetchResponse = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: "key=" + key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: notification,
        to: to,
      }),
    });

    return fetchResponse;
  } catch (error) {
    console.error(error);
    return "error";
  }
};
