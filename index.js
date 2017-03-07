// https://support.plex.tv/hc/en-us/articles/115002267687-Webhooks

var express = require('express');
var request = require('request');
var multer = require('multer');
var bodyParser = require('body-parser');
var debug = require('debug')('plex-bridge-homebridge-http-webhooks');

var app = express();
var upload = multer({ dest: '/tmp/' });

app.post('/', upload.single('thumb'), function (req, res, next) {
  var payload = JSON.parse(req.body.payload);
  debug('webhook hit', payload);
  console.log('Got webhook for', payload.event);

  if (payload.owner && payload.Player.uuid == process.env.PLAYER && payload.Metadata.type != 'track') {
    var options = {
      method: 'GET',
      json: false,
      url: process.env.HB_WEBHOOK_URL,
    };

    if (payload.event == 'media.play' || payload.event == 'media.resume') {
      console.log(`Opening ${process.env.ACCESSORY} contact sensor.`);
      options.qs = {
        state: false,
        accessoryId: process.env.ACCESSORY
      };
      request(options);
    } else if (payload.event == 'media.pause' || payload.event == 'media.stop') {
      console.log(`Closing ${process.env.ACCESSORY} contact sensor.`);
      options.qs = {
        state: true,
        accessoryId: process.env.ACCESSORY
      };
      request(options);
    }
  }

  res.sendStatus(200);
});

console.log(`point plex webhooks to http://localhost:${process.env.PLEX_WEBHOOK_PORT || 12000} at https://app.plex.tv/web/app##!/account/webhooks`);
app.listen(process.env.PLEX_WEBHOOK_PORT || 12000);
