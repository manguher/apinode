const express = require('express');
const morgan = require('morgan');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use(require('./src/routes'));
app.use('/api/mail', require('./src/routes/mail'));
app.use('/api/eventos', require('./src/routes/eventos'));
// app.use('/api/users', require('./routes/users'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});