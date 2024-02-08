// Express requirements
const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./models/utils/ExpressError');
const mongoSanitize = require('express-mongo-sanitize');
const sanitizeHtml = require('sanitize-html');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

// Requiring passport for Auth

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//Separate routers for question and review routes
const questions = require("./routes/questions");
const reviews = require("./routes/reviews");
const users = require("./routes/users");

// Middleware setup
app.use(helmet({contentSecurityPolicy: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// To remove data using these dollarsign or mongo injection

app.use(mongoSanitize());

// mongoose connection

// password = llZ9musVbLJ71sAb

//local host: mongodb://localhost:27017/physicsworld

// mongodb+srv://jewelsyriac:<password>@cluster0.iorbrgj.mongodb.net/?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://jewelsyriac:llZ9musVbLJ71sAb@cluster0.iorbrgj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Serving static files

app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',ejsMate);

//Saving sessions to mongodb



// Session declaration

const sessionConfig = {
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://jewelsyriac:llZ9musVbLJ71sAb@cluster0.iorbrgj.mongodb.net/?retryWrites=true&w=majority' }),
    secret : "secret",
    resave : false ,
    saveUninitialized : true ,
    cookie : {
        httpOnly :true,
        expires : Date.now()+ 1000*60*60*24*7,
        maxAge : 1000*60*60*24*7
    }
}

app.use(session(sessionConfig));

// Auth use passport

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Using flash 

app.use(flash());


//Setting middleware to flash 

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//Middleware to store the log status of user

app.use((req, res, next) => {
    // Assuming req.user holds the user session information.
    res.locals.user = req.user; // Makes 'user' available in all views
    next();
});


// Home route ( localhost/3000)

app.get('/', (req, res) => {
    // Fetch your quizzes data here. This is just an example array.
    // Replace this with your actual method of fetching quizzes.
    const quizzes = [
        { _id: '1', name: 'Physics' },
        { _id: '2', name: 'Chemistry' },
        { _id: '3', name: 'Maths' },
        // ... other quizzes
    ];

    res.render('home', { quizzes: quizzes }); // Pass the quizzes array to the EJS template
});

// Express routers usage.

app.use('/questions',questions);
app.use('/questions/:id/reviews',reviews);
app.use('/',users);


// Express error

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

// listening port for server

const port = process.env.PORT || 3000;

app.listen("3000",()=>{
    console.log(`listening to port ${port}`)
})
