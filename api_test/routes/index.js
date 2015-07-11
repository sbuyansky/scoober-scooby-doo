var express = require('express');
var router = express.Router();
var pg = require('pg');
var path= require('path');
var connectionString = process.env.DATABASE_URL || 'postgres://sbuyansky:test_password@localhost:5432/scoober';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

// testing - not sure if this needs to go here or can go in its own file
router.get('/api/users', function(req,res){
	debugger;
	return "hi"; // possibly should return object / array of objects w/ user data?
});

router.post('/api/users', function(req, res) {
    var results = [];
    var test1 = 0;
    console.log('post /api/users req.body: ' + req.body);
	with(req.body){
	    var data = [
			Email,
			Password,
			"First"
	    ];
    }
    if (test1===0) res.send("returning stuff");
    if (test1===2) res.send("returning stuff -> " + data);
    if (test1===1) return res.send("data: " + data);
});

router.delete('/api/users/:uid', function(req, res) {
	console.log("delete user");
	debugger;
	return "success?";
});

// events routes
router.get('/api/events', function(req,res){
    var results = [];
        
    pg.connect(connectionString, function(err, client, done) {
		var query = client.query("SELECT * FROM events ORDER BY eid ASC");

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

router.get('/api/category/:category', function(req,res){
    var results = [];
        
    pg.connect(connectionString, function(err, client, done) {
	//var query = client.query("SELECT unnest(enum_range(NULL::" + req.params.category + "))");
	var query = client.query("SELECT unnest(enum_range(NULL::" + req.params.category + "))");

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

router.post('/api/events', function(req, res) {
        var results = [];
        console.log(req.body);
	with(req.body){
	    /*var data = [
			name,
			'ultimate',
			event_security,
			time_start,
			time_end,
			location_x,
			location_y,
			location_name,
			location_details,
			event_type,
			gendered,
			gender_ratio,
			skill_level_min,
			skill_level_max,
			details,
			event_status,
			min_players,
			max_players,
			,
			false,
			field_picture,
			team_1,
			team_2,
			score_t1,
			score_t2
	       ];*/
	       var data = [
			name,
			sport,
			security,
			"2015-01-08 04:05:06",
			"2015-01-08 05:05:06",
			"43.073052",
			"-89.401230",
			loc.name,
			loc.description,
			type,
			gendered,
			gender_ratio,
			1,
			145000,
			details,
			stat,
			1,
			180000000,
			,
			false,
			"12.jpg",
			1,
			2,
			10,
			13
	       ];
        }
        console.log('he');
        console.log(data);
    pg.connect(connectionString, function(err, client, done) {

        client.query("INSERT INTO events(name, sport, event_security, time_start, time_end, location_x, location_y, location_name, location_details, event_type, gendered, gender_ratio, skill_level_min, skill_level_max, details, status, min_players, max_players, master_eid, is_master, field_picture, team_1, team_2, score_t1, score_t2) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)", data);

        var query = client.query("SELECT * FROM events ORDER BY eid ASC");

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

router.delete('/api/events/:eid', function(req, res) {

    var results = [];

    var id = req.params.eid;

    pg.connect(connectionString, function(err, client, done) {

        client.query("DELETE FROM events WHERE eid=($1)", [id]);

        var query = client.query("SELECT * FROM events ORDER BY eid ASC");

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

module.exports = router;
