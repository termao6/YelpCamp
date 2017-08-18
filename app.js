// require npms
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

// require routes
var campgroundRoutes    = require("./routes/campgrounds"),
    commentsRoutes      = require("./routes/comments"),
    indexRoutes         = require("./routes/index");


mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://teresa:picklechu@ds149373.mlab.com:49373/yelpcampdb123");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
// 
// seedDB(); // Seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "So this is yelpcamp and what am I doing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

// set to listen at process.env.PORT
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started...");
});