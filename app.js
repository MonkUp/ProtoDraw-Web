var config = require('./config');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./api/router');


var app = express();
app.use(function(req, res, next) {
  if(req.params.username){
    req.rawBody = '';

    req.on('data', function(chunk) { 
      req.rawBody += chunk;
    });

    
  }
      next();
});
app.use(bodyParser.json({limit: '50mb'}));
app.set('json spaces', 2);

app.use(express.static('public'));
app.use('/api', apiRouter);

app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'app.html'));
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

config.PORT = process.env.OPENSHIFT_NODEJS_PORT || config.PORT;
config.HOST = process.env.OPENSHIFT_NODEJS_IP || config.HOST;

app.listen(config.PORT, config.HOST, function(err) {
  if(err) {
    return console.error(err);
  }
  console.log('app listening on '+config.HOST+':'+config.PORT);
})

