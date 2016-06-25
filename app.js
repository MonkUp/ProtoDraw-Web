var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: "credentials/ProtoDraw-8343e29cc965.json",
  databaseURL: "https://protodraw-c64e7.firebaseio.com/"
});