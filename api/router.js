// API Router
var config = require('../config');
var path = require('path');
var firebase = require('firebase');
var express = require('express');

var router = express.Router();

firebase.initializeApp({
  serviceAccount: path.join(__dirname, '..', config.FIREBASE_CREDENTIALS_PATH),
  databaseURL: config.FIREBASE_URL
});

var firebaseAppsRef = firebase.database().ref('apps')

router.get('/:username/:appName', function(req, res) {
  /*firebaseAppsRef.once('value', function(appsDataSnapshot) {
    var apps = appsDataSnapshot.val();
    for(var i = 0; i < apps.length; i++) {
      if(apps[i].username == req.params.username && apps[i].appName == req.params.appName) {
        res.json(apps[i]);
        return;
      }
    }
    res.sendStatus(404);
  })*/
  res.json({
    username: 'avik',
    appName: 'MyTestApp',
    initialViewName: 'login',
    views: [
      {
        viewName: 'login',
        image: 'login.png',
        links: [
          {
            href: 'main',
            top: 0,
            left: 90,
            width: 10,
            height: 7
          }
        ]
      },{
        viewName: 'main',
        image: 'login.png',
        links: [
          {
            href: 'login',
            top: 45,
            left: 40,
            width: 20,
            height: 10
          }
        ]
      }
    ]
  })
});

module.exports = router;