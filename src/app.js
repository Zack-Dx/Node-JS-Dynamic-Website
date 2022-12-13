const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./db/conn');
const User = require('./models/usermessage');
const app = express();
const PORT = process.env.PORT;
const path = require('path');
const hbs = require('hbs');
const { urlencoded } = require('express');

//Middlewares

const static_path = path.join(__dirname, '../public');
app.use(express.static(static_path));
app.use(
    '/css',
    express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'))
);
app.use(express.urlencoded({ extended: false }));

// /View engine

// (PATH)
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

// Routing
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/contact', async (req, res) => {
    try {
        const userData = await new User(req.body);
        await userData.save();
        res.status(201).render('index');
    } catch (error) {
        res.status(500).json({
            error: 'Please make sure all fields are filled in correctly.',
        });
    }
});

// PORT
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
