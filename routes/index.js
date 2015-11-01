var express = require('express');
var router = express.Router();
var path= require('path');

router.get('/', function(req, res, next) {
    console.log(req.route.path);
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});
module.exports = router;
