// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js"
);


importScripts("/serviceWorker.js"); 


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCCdkkz3iSvlP6po19JkRIDeMA44FX8SuI",
  authDomain: "echopad-60294.firebaseapp.com",
  projectId: "echopad-60294",
  storageBucket: "echopad-60294.appspot.com",
  messagingSenderId: "976983505081",
  appId: "1:976983505081:web:7dea36d79bed8769010368",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// background message handler
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
