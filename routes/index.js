//var users = require('../lib/users');
var users = [
{name: 'Weini Yu', 
 username: 'weini', 
 email: 'weini@domain.com', 
 password: 'weini_pw', 
 location: 'weini_location', 
 website: 'weini_website', 
 profileImage: 'weini_image.jpg', 
 follower: ['rae', 'yoshie'], 
 following: ['rae', 'yoshie'], 
 tweets: [000, 001] },
{name: 'Rae Recto', 
 username: 'rae', 
 email: 'rae@domain.com', 
 password: 'rae_pw', 
 location: 'rae_location', 
 website: 'rae_website', 
 profileImage: 'rae_image.jpg', 
 follower: ['weini', 'yoshie'], 
 following: ['weini', 'yoshie'], 
 tweets: [010, 011] },
];

var loggedInUser;

/*
 * GET home page.
 */
exports.home = function(req, res){
	var username = req.params.id;
	var i;
	console.log(username);
	for (i=0; i<users.length; i++) {
		if (users[i].username === username) {
			//console.log(users[i].username);
			loggedInUser = username;
			break;
		}
	}
	res.render('home', 
  			{ title: 'Home',
  			  name: users[i].name,
  			  username: username,
  			  followerN: users[i].follower.length,
  			  followingN: users[i].following.length,
  			   } );
	
};

exports.follower = function(req, res) {
	//console.log(req.params);
	res.render('follower', 
  			{ title: 'Follower',
  			  //name: users[i].name,
  			  //username: username,
  			  //followerN: users[i].follower.length,
  			  //followingN: users[i].following.length,
  			   } );
}

exports.following = function(req, res) {
	//console.log(req.params);
	res.render('following', 
  			{ title: 'Following',
  			  //name: users[i].name,
  			  //username: username,
  			  //followerN: users[i].follower.length,
  			  //followingN: users[i].following.length,
  			   } );
}

exports.index = function(req, res){
  res.render('index', { title: 'Home' });
};

exports.form = function(req, res) {

};