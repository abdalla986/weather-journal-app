// Setup empty JS object to act as endpoint for all routes (app API endpoint).
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Note: we also can use express as: app.use(express.urlencoded({ extended: true }));

// Cors for cross origin allowance and let the browser and server talk to each other without any security interruptions.
const cors = require('cors');
// setup the instance of the app to use cors.
app.use(cors());

// Initialize the main project folder
// The Express app instance pointed to the project folder.
app.use(express.static('website'));

// Setup the localhost port number
const port = 3030;
// Spin up the server
const server = app.listen(port, theServerWorking);
// Callback to debug
function theServerWorking() {
    console.log('The Server working on localhost port: ' + port);
}

// Initialize all route with a callback function
app.get('/all', weatherData);

// Callback function to complete GET '/all'
function weatherData(request, response) {
    // Return Endpoint Data
    response.send(projectData);
}

// Add the sent data to our app
// Post Route
app.post('/add', addInfo);

function addInfo(req, res) {
    // create a new entry in the apps endpoint
    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userFeel: req.body.userFeel
    }

    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
};
