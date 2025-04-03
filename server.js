const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const axios = require('axios');

//const utils = require("./utils")

const fs = require('fs');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extented: false }));
app.use(express.json());
app.use(cors());

// TODO work here for calls to the server. connect and print projects
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});


app.get("/", (req, res) => {
  res.json("Welcome to Dev Challenge")
})

// This API will get the list of all projects present in PROJECTS table
app.get("/getWeatherByTown", (req, res, next) => {
    try {
        const townName = req.query.townName;
        // Make a GET request to the JSONPlaceholder API
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WeatherAPIKey}&q=${townName}&aqi=no`)
        .then(response => {
            // Send the response data back to the client
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error fetching data from Weather API:', error);
            res.status(500).send('Error fetching data from the Weather API');
        });
        // Send the response data back to the client

    } catch (error) {
        console.error('Error fetching data from Weather API:', error);
        res.status(500).send('Error fetching data from the Weather API');
    }
});










