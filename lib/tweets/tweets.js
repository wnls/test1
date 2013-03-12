var tweetdasd = [
{id: 0, username: "weini", date: new Date(), msg: "I'm in #Ford !", mention: null, reply: null, retweet: null, hashtag: ["#Ford"]},
{id: 1, username: "rae", date: new Date(), msg: "Let's meet in CC tmr for web programming.@weini @lala@ho @P_12 @JI-sd", mention: ["@weini"], reply: null, retweet: null, hashtag: ["#Ford"]},
{id: 2, username: "yoshie", date: new Date(), msg: "testing @rae", mention: ["@rae"], reply: null, retweet: null, hashtag: null}
]; //time?

var tweetdb = [
{id: 0, name: 'Tim Berners-Lee', username: "tim", date: new Date(), msg: "I'm in #Ford !", mention: null, reply: null, retweet: null, hashtag: ["#Ford"], convo:0},
{id: 1, name: 'Hazel Rozetta', username: "hazel", date: new Date(), msg: "@tim Good for you! Let's meet in CC tmr for web programming. @caleb", mention: ["@tim","@caleb"], reply: 0, retweet: null, hashtag: null, convo:0},
{id: 2, name: 'Caleb Marks', username: "caleb", date: new Date(), msg: "@tim @hazel Got it! See you both there!", mention: ["@tim","@hazel"], reply: 1, retweet: null, hashtag: null, convo:0},
{id: 3, name: 'Caleb Marks', username: "caleb", date: new Date(), msg: "Web programming #ftw", mention: null, reply: null, retweet: null, hashtag: ["#ftw"], convo:null},
{id: 4, name: 'Tim Berners-Lee', username: "tim", date: new Date(), msg: "#Nutella is great! Another all nighter!", mention: null, reply: null, retweet: null, hashtag: ["#Nutella"], convo:null},
{id: 5, name: 'Hazel Rozetta', username: "hazel", date: new Date(), msg: "This is just a boring tweet. You got some problem with that?", mention: null, reply: null, retweet: null, hashtag: null, convo:null}
];
exports.tweetdb = tweetdb;

var conversation = [
{id: 0, convlist: [0,1]}
];

var hashtags = [
{label: "#Ford", tweetID: [0]},
{label: "#ftw", tweetID: [3]},
{label: "#Nutella", tweetID: [4]}
];



function addTweet(inid, inname, inuser, inmsg, inrep, inret, inconvo) {
	console.log("in");
	var tweet = {
		id: inid,
		name: inname,
		username: inuser,
		date: new Date(),
		msg: inmsg, 
		mention: inmsg.match(/@\b[\w]*/gi), //only allow underscore in username, returns null if no match
		reply: inrep,
		retweet: inret,
		hashtag: inmsg.match(/#\b[\w]*/gi),
		convo: inconvo}; // #one#two -> #one, #two
	tweetdb.push(tweet);
	// add to hashtag
	if (tweet.hashtag !== null) {
		for (var i=0; i < tweet.hashtag.length; i++) {
			updateHashtags(tweet.hashtag[i], id);
		}
	}
	// add to conversation
	if (tweet.convo !== null) {
		for (var i=conversation.length-1; i >= 0; i--) {
			if (conversation[i] === tweet.convo) {
				tweet.convo.convlist.push(tweet.id);
				break;
			}
		}
	}
}
exports.addTweet = addTweet;

// update hashtags list
function updateHashtags (hashtag, tweetid) {
	for (var i=hashtags.length-1; i >= 0; i--) {
		if (hashtags[i] === hashtag) {
			hashtags[i].tweetID.push(tweetid);
			break;
		}
	}
}

function getTByUser(username, number) {
	var len = tweetdb.length;
	var tlist = [];
	for (var i=len-1; i >= 0 && i >= len-number; i--) {
		var t = tweetdb[i];
		if (t.username === username) {
			tlist.push(t);
		}
	}
	return tlist;
}
exports.getTByUser = getTByUser;

function getTByHashtag(hashtag, number) {
	var len = hashtags.length;
	var tlist = [];
	for (var i=len-1; i >= 0; i--) {
		var ht = hashtags[i];
		if (ht.label === hashtag) {
			var tl = ht.tweetID;
			var l = tl.length;
			for (var n=l-1; n >= 0 && i >= len-number; n--) {
				tlist.push(tweetdb[tl[n]]);
			}
			break;
		}
	}
	return tlist;
}
exports.getTByHashtag = getTByHashtag;

function getTByMention(username, number) {
	var len = tweetdb.length;
	var tlist = [];
	for (var i = len-1; i >= 0 && i >= len-number; i--) {
		if (tweetdb[i].mention !== null && (tweetdb[i].mention).indexOf("@"+username) > -1) {
			tlist.push(tweetdb[i]);
		}
	}
	console.log("mention: "+tlist);
	return tlist;
}
exports.getTByMention = getTByMention;

// get most recent tweets no matter following them or not
function getRecentT(self, following, number) {
	var len = tweetdb.length;
	var tlist = [];
	for (var i = len-1; i >= 0 && i >= len-number; i--) {
		if (following.indexOf(tweetdb[i].username) > -1 || self === tweetdb[i].username) {
			// if following contains the user who composed the tweet 
			tlist.push(tweetdb[i]);
		}
	}
	//console.log("timeline: "+tlist);
	return tlist;
}
exports.getRecentT = getRecentT;

function searchTweetsByHT (ht) {
	var tweetList = [];
	var i = 0
	var found = [];
	
	if (len !== 0) {
		//try to look for ht in hashtags 
		while (hashtags[i].label !== ht) {
			i++;
		}
		
		if (hashtags[i].label === ht) {
			found = hashtags[i].tweetID;
			var len = found.length;
			for (var j=0; j<=len-1; j++) {
				tweetList.push(tweetdb[found[j]]);
			}
			console.log(tweetList);
			return tweetList;
		} 
		// return null if no tweets have hashtag ht
		return null;
		
	} else {
		//return null if there are no hashtags in the db
		return null;
	}
}
exports.searchTweetsByHT = searchTweetsByHT;

function getTweetConvoByTweetID(tweetID) {
	var tweetList = [];
	var myConvo = tweetdb[tweetID].convo;
	var myConvList = conversation[myConvo].convlist;
	
	var len = myConvList.length;
	
	for (var i=0; i < len; i++) {
		tweetList.push(tweetdb[myConvList[i]]);
	}
	
	return tweetList;
}
exports.getTweetConvoByTweetID = getTweetConvoByTweetID;