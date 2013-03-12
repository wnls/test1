var users = require('../lib/users');
var tweets = require('../lib/tweets')

var loggedInUser = "tim";
var ul = users.ul;
/*
 * GET home page.
 */
exports.home = function(req, res){
	var username = req.params.id;
  //loggedInUser = username;
  
  var u = users.getUserById(loggedInUser);
  var tl = tweets.getRecentT(loggedInUser, u.following, 20);
  // display timeline tweets

	res.render('home', 
  			{ title: 'Home',
  			  name: u.name,
  			  username: username,
  			  followerN: u.follower.length,
  			  followingN: u.following.length,
          tweets: tweetsToHtml(tl)
  			   } );

}


exports.newtweet = function(req, res) {
  //console.log(req.body.message);
  tweets.addTweet(tweets.tweetdb.length, users.getUserById(loggedInUser).name, loggedInUser, req.body.message, null, null, null);
  users.addUserT(loggedInUser, tweets.tweetdb.length-1);
  //console.log(tweets.tweetdb);
  res.redirect('/'+loggedInUser+'/home');
}

exports.id = function(req, res) {
  res.redirect('/'+req.params.id+'/profile');
}

exports.profile = function(req, res) {
  var username = req.params.id;
  var u = users.getUserById(username);
  if (u !== undefined ) {
    var tl = tweets.getTByUser(username, 20);
    var j = tl.length;

    // display tweets
    var content='';
    for (var i=0; i < j; i++) {
      var t = tl[i];
      var usr = users.getUserById(t.username);
      content += '<p><b>'+usr.name+'</b> <a href="/'+username+'/profile">@'+username+'</a><br>'
                //+t.msg+'<br>'
                +msgToHtml(t.msg)+'<br>'
                +t.date+'</p>';
    }
    res.render('profile',
              {title: 'Profile',
               name: u.name,
               username: username,
               followerN: u.follower.length,
               followingN: u.following.length,
               tweets: content
               }
      );
  } else {
    res.render('error',
               {title: 'Error',
                msg: "Oops, this user does not exist."});
  }
}

exports.search = function(req, res) {
  var query = "#"+req.params.query;
  var result = tweets.getTByHashtag(query, 20);
  //console.log("query: "+query);
  //console.log("result: "+result[0]);
  
  //var u = users.getUserById(username);
  //var t = users.getTByUser(username);
  var j = result.length-1;
  var content='';
  // display timeline tweets
  for (var i=j; i >= j-10 && i >= 0; i--) {
    //console.log("i="+i);
    var t = result[i];
    var usr = users.getUserById(t.username);
    //console.log(usr.name);
    //console.log(i+" la");
    // data.replace(/(.)/g, '<img src="$1.png" />')
    //var htmlmsg = t.msg;
    var a = t.msg.split(" ");
    //console.log("split: "+a);
    content += '<p><b>'+usr.name+'</b> <a href="/'+t.username+'/profile">@'+t.username+'</a><br>'
              //+t.msg+'<br>'
              +msgToHtml(t.msg)+'<br>'
              +t.date+'</p>';
    //console.log("finish "+i);
  }
  res.render('search',
             {title: 'Search Result',
              query: query,
              msg: content
             });
}

exports.follower = function(req, res) {
	//console.log(req.params);
  var username = req.params.id;
  var user = users.getUserById(username);
  var followerlist = user.follower;
  var content = '';
  //console.log("followerlist: ",followerlist);
  if (followerlist.length !== 0) {
    content += userToHtml(followerlist);

  }
  //console.log("content: ", content);
	res.render('follower', 
  			{ title: 'Follower',
  			  name: user.name,
  			  username: username,
  			  content: content
  			   } );
}

exports.following = function(req, res) {
	var username = req.params.id;
  var user = users.getUserById(username);
  var followinglist = user.following;
  var content = '';
  console.log("followinglist: ",followinglist);
  if (followinglist.length !== 0) {
    content += userToHtml(followinglist);

  }
  console.log("content: ", content);
  res.render('following', 
        { title: 'Following',
          name: user.name,
          username: username,
          content: content
           } );
}

exports.interaction = function(req, res) {
  console.log("loggedinuser: "+loggedInUser);
  var user = users.getUserById(loggedInUser);
  var tl = getTByMention(loggedInUser, 20);

  res.render('interaction',
            { title: 'Interaction',
              name: user.name,
              username: user.username,
              });

}

exports.to_interaction = function(req, res) {
  res.redirect('/'+loggedInUser+'/interaction');
}

exports.to_home = function(req, res){
  res.redirect('/'+loggedInUser+'/home');
};

exports.form = function(req, res) {

};

function userToHtml(userlist) {
  //console.log("userlist: ", userlist);
  var content = '';
  var len = userlist.length-1;
  console.log("len ",len);
  for (var i=len; i >= 0; i--) {
    //console.log("userlist[i]: ",userlist[i]);
    var u = users.getUserById(userlist[i]);
    //console.log("u: ",u);
    content += '<p><b>'+u.name+'</b> <a href="/'+u.username+'/profile">@'+u.username+'</a><br>';
    content += '<button onclick="deleteFollower()">Delete</button></p>';
  }
  return content;
}

function tweetsToHtml(tl) {
  var j = tl.length;
  var content='';
  for (var i=0; i < j; i++) {
    var t = tl[i];
    var usr = users.getUserById(t.username);
    var a = t.msg.split(" ");
    content += '<p><b>'+t.name+'</b> <a href="/'+t.username+'/profile">@'+t.username+'</a><br>'
              //+t.msg+'<br>'
              +msgToHtml(t.msg)+'<br>'
              +t.date+'</p>';
  }
  return content;
}
/**
 * Find @username and #hashtag in a tweet message and convert them to a html href link.
 * In order to be recognized as a @username mention, @ symbol must be the start
 * of a word. And @username@username is considered invalid and is ignored.
 * #hashtag starts with # and end before a space. #ford! is considered a hashtag.
 */
function msgToHtml(msg) {
  msg = msg.split(" ");
  var content = '';
  var len = msg.length;
  for (var i=0; i < len; i++) {
    var word = msg[i];
    //console.log("");
    if (word.charAt(0) === "@" && word.split("\@").length === 2) {
      content += ' <a href="/'+word.substring(1)+'/profile">'+word+'</a> ';
    } else if (word.charAt(0) === "#" && word.split("\#").length === 2) { //#ford! <- !
      content += ' <a href="/search/'+word.substring(1)+'">'+word+'</a> ';
    } else {
      content += word+" ";
    } 
  }
  //console.log("html content: "+content);
  return content;
}