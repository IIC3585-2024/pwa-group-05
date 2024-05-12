// TODO: Add SDKs for Firebase products that you want to use
// See: https://firebase.google.com/docs/web/learn-more#config-object
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging.js";


const firebaseConfig = {
  apiKey: "AIzaSyCCdkkz3iSvlP6po19JkRIDeMA44FX8SuI",
  authDomain: "echopad-60294.firebaseapp.com",
  projectId: "echopad-60294",
  storageBucket: "echopad-60294.appspot.com",
  messagingSenderId: "976983505081",
  appId: "1:976983505081:web:7dea36d79bed8769010368",
};

let token = null;

const setupFireBase = () => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app)
    
    getToken(messaging, {
      vapidKey:
        "BFOEklRfM_JmP0YdF5Zc_uUu2Hzsrg7tmfdHsGnlhwgAAEEHYI6GaXptR00KQlvTcdn3kQhYqtCmfkggC9YXHcY",
    })
      .then((currentToken) => {
        console.log("Token received: \n", currentToken);
        if (currentToken) {
          token = currentToken;
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });

      onMessage(messaging, (payload) => {
        console.log("Message received. \n", payload);
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          // icon: payload.notification.icon,
        });

        // ...
      });

}

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};

export { setupFireBase, requestNotificationPermission, token };