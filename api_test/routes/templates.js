var express = require('express');
var router = express.Router();
var path= require('path');

router.get('/templates/:name', function(req, res, next){
    console.log("send" + req.params.name);
    res.sendFile(path.join(__dirname, '../', 'views', 'templates', req.params.name));
});

module.exports = router;
