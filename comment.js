// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Create web server
const app = express();

// Set port
const port = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');

// Set views folder
app.set('views', path.join(__dirname, 'views'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Get data from JSON file
const data = fs.readFileSync('data.json', 'utf-8');
const comments = JSON.parse(data);

// Get method
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Comment',
        comments: comments
    });
});

// Post method
app.post('/', (req, res) => {
    // Get data from form
    const comment = {
        name: req.body.name,
        message: req.body.message,
        time: new Date()
    };

    // Add data to array
    comments.unshift(comment);

    // Add data to JSON file
    const data = JSON.stringify(comments, null, 2);
    fs.writeFileSync('data.json', data);

    // Redirect to index page
    res.redirect('/');
});

// Listen port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




