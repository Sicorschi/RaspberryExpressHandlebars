const express = require('express');
const db = require('./database/database');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Hello world from node bitch');
})

app.listen(app.get('port'), () => {
    db.authenticate().then(() => {
        console.log('Database connected');
    });
    console.log(`Server is up running on ${app.get('port')} port`);
});