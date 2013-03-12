/**
 * --Tweetee Application Main File, app.js--
 * -ADD TWEETEE DESCRIPTION/BLURB HERE-
 *
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , entry = require('./routes/entry')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
/*
 * Entry-related Routes
 *   '/'             -> renders login.ejs
 *   '/userAuth'     -> from login form, redirect to login.ejs or :user/home.ejs
 *   '/register'     -> renders register.ejs
 *   '/forgotlogin'  -> renders forgotlogin.ejs
 *   '/:user/home'   -> renders :user/home.ejs
 *   '/logout'       -> redirect to login.ejs
 *   '/verify'       -> from register form, redirect to register.ejs or render varifyCode
 *   '/verifyCode'   -> renders varifyCode.ejs
 *   '/codeCheck'    -> from verifyCode form, redirect to login.ejs or verifyCode.ejs
 *   '/forgotlogin'  -> renders forgotlogin.ejs
 *   '/forgetloginProcess -> from forgotlogin form, directs to the forgotlogin.ejs
 */
app.get('/', entry.login);    
app.post('/userAuth',entry.userAuth);
app.get('/register', entry.register);
app.get('/forgotlogin', entry.forgotlogin);
app.get('/logout', entry.logout);
app.post('/verify',entry.verify);
app.get('/verifyCode',entry.verifyCode);
app.post('/codeCheck',entry.codeCheck);
app.get('/forgotlogin', entry.forgotlogin);
app.post('/forgotloginProcess', entry.forgotloginProcess);

/*
 * Specific UserInterf. Related Routes
 *   '/newtweet'        ->
 *   '/:user/profile'   ->
 *   '/:user/follower'  ->
 *   '/:user/following' ->
 */
//app.get('/', routes.to_home);
//app.get('/home', routes.to_home);
app.get('/:id/home', routes.home);
app.get('/:id/interaction', routes.interaction);
//app.get('/interaction', routes.to_interaction);
app.get('/:id/profile', routes.profile);
app.get('/:id/follower', routes.follower);
app.post('/:id/follower', routes.follower);
app.get('/:id/following', routes.following);
app.post('/:id/newtweet', routes.newtweet);

app.get('/help',routes.help);
app.get('/search/:query', routes.search);
app.post('/searchBox',routes.searchBox);
app.get('/detailedTweet', routes.detailedTweet);
app.post('/detailedTweetFakeReply', routes.detailedTweetFakeReply);

app.get('/:id/editProfile', routes.editProfile);
app.get('/:id/editSettings', routes.editSettings);

app.post('/:id/changeSettings', routes.changeSettings);
app.post('/:id/changeProfile', routes.changeProfile);
app.post('/:id/changeProfilePic', routes.changeProfilePic);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});