var express = require('express');
var router = express.Router();

/* GET users listing. */

console.log("inside users.js route");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/users/api/users', function(req,res){
    var results = [];

    console.log('oh snap, now in users.js');
        
    pg.connect(connectionString, function(err, client, done) {
		var query = client.query("SELECT * FROM users2 ORDER BY uid ASC");

	        query.on('row', function(row) {
	            results.push(row);
	        });

	        query.on('end', function() {
	            client.end();
	            return res.json(results);
	        });

	        if(err) {
	          console.log(err);
		}
    });
});

router.post('/api/users', function(req, res) {
    var results = [];
    console.log(req.body);
	/*with(req.body){
	    var data = [
			Email,
			Password,
			"First"
	    ];
	    return data;
    }*/
    res.send('hello there');
});

// probs won't ever use this... just thought i'd try it for fun
router.post('/users/api/users', function(req, res) {
    var results = [];
    console.log(req.body);
	/*with(req.body){
	    var data = [
			Email,
			Password,
			"First"
	    ];
	    return data;
    }*/
    res.send('hello there2');
});

router.delete('/api/users/:uid', function(req, res) {
	console.log("delete user");
	debugger;
	res.send("success?");
});

module.exports = router;
