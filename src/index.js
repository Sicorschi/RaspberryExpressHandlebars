const express = require('express');
const usersRoutes = require('./routes/users.route');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const pool = require('./database/database');



// inicio
const app = express();


// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
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
app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log(req.body);
    next();
})


// Routes
app.use('/users', usersRoutes);


// Static files
app.use(express.static(path.join(__dirname, '/public')))

// Start the server
app.listen(app.get('port'), () => {
    console.log('······················')
    console.log(`Server is up running on ${app.get('port')} port`);
    console.log('······················')
});