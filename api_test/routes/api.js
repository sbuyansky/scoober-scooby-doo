var express = require('express');
var router = express.Router();
var pg = require('pg');
var path= require('path');
var connectionString = process.env.DATABASE_URL || 'postgres://sbuyansky:test_password@localhost:5432/scoober';

/*
//
// Scoober.io API v0.1 
// Supports: events, users
// DBMS: PostgreSQL
//
*/

/*
//
// Events
//
*/

router.get('/events', function(req,res){
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

router.get('/category/:category', function(req,res){
    var results = [];
        
    pg.connect(connectionString, function(err, client, done) {
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

router.post('/events', function(req, res) {
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

        var query = client.query("SELECT * FROM events ORDER BY eid ASC"); //not select all find way to only add new event to existing table

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

router.delete('/events/:eid', function(req, res) {

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

router.get('/events/:eid', function(req, res) {

    var results = [];

    var id = req.params.eid;

    pg.connect(connectionString, function(err, client, done) {

        var query = client.query("SELECT * FROM events WHERE eid=($1)", [id]);

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

/*
//
//  Users
//
*/

router.get('/users', function(req,res){
    var results = [];

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

router.post('/users', function(req, res) {
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
router.post('/users', function(req, res) {
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

router.delete('/users/:uid', function(req, res) {
	console.log("delete user");
	debugger;
	res.send("success?");
});

module.exports = router;

