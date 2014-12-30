var express = require('express');
var mysql = require('mysql');
var client = mysql.createConnection({ //수정요
	user: 'root',
	password: '0525',
	'database': 'booklist' //table name is crew_info in yunseo's local db.
});

var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();

router.get('/', function (request, response, next) {
	console.log('hello ');
	client.query('SELECT movie_title FROM moviedata where movie_title="daeboo";', function (error, db_title_result, fields) {
		console.log(db_title_result);
		if(error) console.log('movie_title error');
		client.query('SELECT name, picture, role FROM crew_info where type = "director";', function (error, db_director_result, fields) {
			if(error) console.log('director error');
			client.query('SELECT name, picture, role FROM crew_info where type = "actor";', function (error, db_actor_result, fields) {
				if(error) console.log('actor error');
				client.query('SELECT name, picture, role FROM crew_info where type = "story";', function (error, db_story_result, fields) {
					if(error) console.log('story error');
					client.query('SELECT name, picture, role  FROM crew_info where type = "music";', function (error, db_music_result, fields) {
						if(error) console.log('music error');
						client.query('SELECT name, picture, role FROM crew_info where type = "visual";', function (error, db_visual_result, fields) {
							if(error) console.log('visual error');
							response.render('more_evaluation', {title_result:db_title_result, director_result:db_director_result, actor_result:db_actor_result,story_result:db_story_result, music_result:db_music_result, visual_result:db_visual_result} );
						});
					});
				});
			});
		});
	});
});

module.exports = router;