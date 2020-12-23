const express = require('express');
const usersRoutes = require('./routes/users.route');
const linksRoutes = require('./routes/links.route');
const homeRoutes = require('./routes/home.route'); 
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const pool = require('./database/database');
const flash = require('connect-flash');
const session = require('express-session')
const MySqlStore = require('express-mysql-session');
const { database } = require('./database/keys')



// inicio
const app = express();


// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(session({
    secret: 'Ash1t4k4Dono18021991',
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(database)
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log(req.body);
    next();
})
app.use(flash())

// Global middleware:
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    next();
})

// Routes
app.use('/', homeRoutes);
app.use('/users', usersRoutes);
app.use('/links', linksRoutes);



// Static files
app.use(express.static(path.join(__dirname, '/public')))

// Start the server
app.listen(app.get('port'), () => {
    console.log('······················')
    console.log(`Server is up running on ${app.get('port')} port`);
    console.log('······················')
});