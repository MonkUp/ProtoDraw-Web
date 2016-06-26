// API Router
var config = require('../config');
var path = require('path');
var firebase = require('firebase');
var express = require('express');
var router = express.Router();//gs://protodraw-c64e7.appspot.com/

firebase.initializeApp({
  serviceAccount: path.join(__dirname, '..', config.FIREBASE_CREDENTIALS_PATH),
  databaseURL: config.FIREBASE_URL
});

var firebaseAppsRef = firebase.database().ref('apps');

router.get('/:username/:appName', function(req, res) {
  firebaseAppsRef.once('value', function(appsDataSnapshot) {
    var apps = appsDataSnapshot.val();
    for(var i = 0; i < apps.length; i++) {
      if(apps[i].username == req.params.username && apps[i].appName == req.params.appName) {
        res.json(apps[i]);
        return;
      }
    }
    res.sendStatus(404);
  });
});

module.exports = router;