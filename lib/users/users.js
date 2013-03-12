// # Users Module
// This is a module for accessing user data. We are using
// [Docker](https://github.com/jbt/docker), a documentation generation
// library, that will convert the inline documentation in [Markdown
// format](http://daringfireball.net/projects/markdown/syntax) into
// HTML that can be used to display documentation alongside the source
// code. You will use this to document your projects.

// ## In Memory User Database
// We will use a simple array `users` to record user data.
// We could easily replace this with calls to a *database layer*

var userdb = [
{name: 'Tim Berners-Lee' ,username: 'tim', password: 'mit', uid: 1, email: "timb@yahoo.com", location: "Massachusetts", website: "amazon.com", profilePic: "defaultProfilePic.jpg", follower: ["caleb","hazel"], following: ["caleb","hazel"], tweets: [0,4], profVis: "Public", folPerm: "Public", mentionPerm: "Public", pmPerm: "Public"},

{name: 'Hazel Rozetta', username: 'hazel', password: 'lezah', uid: 2, email: "hrozetta@smith.edu", location: "United States", website: "petco.com", profilePic: "defaultProfilePic.jpg", follower: ["tim","caleb"], following: ["tim", "caleb"], tweets: [1,5], profVis: "Public", folPerm: "Public", mentionPerm: "Public", pmPerm: "Public"},

{name: 'Caleb Marks', username: 'caleb', password: 'belac', uid: 3, email: "calebm@gmail.com", location: "Asia", website: "ebay.com", profilePic: "defaultProfilePic.jpg", follower: ["hazel","tim"], following: ["hazel","tim"], tweets: [2,3], profVis: "Public", folPerm: "Public", mentionPerm: "Public", pmPerm: "Public"}
];
exports.userdb = userdb;

function getUserById(username) {
    var len = userdb.length;
    for (i=0; i < len; i++) {
        if (userdb[i].username === username) {
            //console.log(userdb[i].username);
            break;
        }
    }
    return userdb[i];
}
exports.getUserById = getUserById;

function addUserT(username, id) {
    getUserById(username).tweets.push(id);
}
exports.addUserT = addUserT;

/*
function getUserList() {
    var len = ul.length;
    for (var i = 0; i < len; i++) {
    var u = ul[i];
    list.push(u.fname + ' ' + u.lname);
    }
    return list;
}
exports.getUserList = getUserList;*/

// ## Exported Functions

// ### *function*: addUser
/**
 * Adds a user to the "database". The `userData` is an object with
 * the following properties:
 *
 * - `fname` The user's first name
 * - `lname` The user's last name
 * - `pass` The user's password
 * - `sex` The user's gender (male|female)
 *
 * @param {object} userData The user data
 */
function addUser(userData) {
    userData.date = new Date();
    users.push(userData);
    users.sort(function (u1, u2) {
	return u1.lname < u2.lname;
    });
}

// Export the `addUser` function.
exports.addUser = addUser;


// ### *function*: getUserInfo
/**
 * Gets the information for all users. This function expects a callback
 * to be received with the signature: `function (array)`, where the `array`
 * is a populated array of strings containing each user's information.
 * @param {array} list An empty list
 * @param {callback} callback function to receive the populated array
 */
function getUserInfo(list, callback) {
    var len = users.length;
    for (var i = 0; i < len; i++) {
	var u = users[i];
	list.push(u.fname + ' ' + u.lname);
    }
    callback(list);
}

// Export the `getUserInfo` function.
exports.getUserInfo = getUserInfo;


// ### *function*: validateUser
/**
 * Validates a user. It returns `true` if the user is **valid**; 
 *   `false` otherwise
 * @param {object} user A user object
 */
function validateUser(user) {
    return user.fname &&
	   user.lname &&
	   user.pass;
}

// Export the `validateUser` function.
exports.validateUser = validateUser;
