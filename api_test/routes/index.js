var express = require('express');
var router = express.Router();
var path= require('path');

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/events', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'event_create.html'));
});

module.exports = router;
