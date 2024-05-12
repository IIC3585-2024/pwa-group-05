export const handler = async (event) => {
  let body = JSON.parse(event.body);
  let key = process.env.SERVER_KEY;
  let to = body["token"];
  let title = body["title"];
  let message = body["message"];

  let notification = {
    title: title,
    body: message,
    click_action: "https://echopad.netlify.app/",
  };

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

    const responseJson = await fetchResponse.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS, POST",
      },
      body: JSON.stringify(responseJson),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Internal Server Error",
    };
  }
};
