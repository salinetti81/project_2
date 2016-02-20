//for SoundCloud API
var express = require('express');
var router = express.Router();
var SC = require('../models/soundcloud');

SC.initialize({
  client_id: 'YOUR_CLIENT_ID',
  redirect_uri: 'http://example.com/callback'
});