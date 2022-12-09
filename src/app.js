const express = require('express');
require('./db/conn');
const User = require('./models/usermessage');
const app = express();
const PORT = process.env.PORT || 5100;
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
        res.status(500).json({ error: error.message });
    }
});

// PORT
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
