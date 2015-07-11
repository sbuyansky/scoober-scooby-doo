var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    console.log("inside users.js route");
    debugger;
    //res.send('respond with a resource');
});

router.get('/api/users', function(req,res){
	debugger;
	return "hi"; // possibly should return object / array of objects w/ user data?
});

router.post('/api/users', function(req, res) {
    var results = [];
    console.log(req.body);
	with(req.body){
	    var data = [
			Email,
			Password,
			"First"
	    ];
	    return data;
    }
});

// probs won't ever use this... just thought i'd try it for fun
router.post('/users/api/users', function(req, res) {
    var results = [];
    console.log(req.body);
	with(req.body){
	    var data = [
			Email,
			Password,
			"Second"
	    ];
	    return data;
    }
});

router.delete('/api/users/:uid', function(req, res) {
	console.log("delete user");
	debugger;
	return "success?";
});

module.exports = router;
