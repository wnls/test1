// {id: , username: "", date: new Date(), msg: "", mention: null, reply: null, retweet: null, hashtag: []}
var tweets = [
{id: 0, username: "weini", date: new Date(), msg: "I'm in #Ford !", mention: null, reply: null, retweet: null, hashtag: ["#Ford"]},
{id: 1, username: "rae", date: new Date(), msg: "Let's meet in CC tmr for web programming.@weini @lala@ho @P_12 @JI-sd", mention: ["@weini"], reply: null, retweet: null, hashtag: ["#Ford"]},
{id: 2, username: "yoshie", date: new Date(), msg: "testing @rae", mention: ["@rae"], reply: null, retweet: null, hashtag: null}
]; //time?
exports.tweets = tweets;

var conversation = [
{id: 0, convlist: [0,1]}
]

var hashtags = [
{label: "#Ford", tweetID: [0]}
]

function addTweet(tweetId, user, message, rep, ret) {
	var tweet = {
		id: tweetId,
		username: user,
		date: new Date(),
		msg: message, 
		mention: message.match(/@\b[\w]*/gi), //only allow underscore in username
		reply: rep,
		retweet: ret,
		hashtag: message.match(/#\b[\w]*/gi)}; // #one#two -> #one, #two
	tweets.push(tweet);
	// add to hashtag
	// add to conversation
}
exports.addTweet = addTweet;


function getTByUser(username) {
	var len = tweets.length;
	var tlist = [];
	for (var i=len-1; i >= 0; i--) {
		var t = tweets[i];
		if (t.username === username) {
			tlist.push(t);
		}
	}
	return tlist;
}
exports.getTByUser = getTByUser;

function getTByHashtag(hashtag) {
	var len = hashtags.length;
	var tlist = [];
	for (var i=len-1; i >= 0; i--) {
		var ht = hashtags[i];
		if (ht.label === hashtag) {
			var tl = ht.tweetID;
			console.log("tl: ", tl);
			var l = tl.length;
			for (var n=l-1; n >= 0; n--) {
				tlist.push(tweets[tl[n]]);
				console.log("tweetid list: "+tl[n]);
				console.log("tlist element: "+tweets[0]);
				console.log(tweets);
			}
			
		}
		break;

	}
	console.log("tlist: ", tlist);
	console.log("element: ", tlist[0]);
	return tlist;
}
exports.getTByHashtag = getTByHashtag;

