
/*
 * GET home page.
 */
exports.home = function(req, res){
	var id = req.params.id;
	res.render('home', 
  			{ title: 'Home Page',
  			  user: 'Weini'//users[i].name,
  			  //id: id //id,
  			  //followerN: 2 //users[i].follower.length,
  			  //followingN: 1// users[i].following.length,
  			   }
  			);
	
};

exports.index = function(req, res){
  res.render('index', { title: 'Home' });
};

exports.form = function(req, res) {

};