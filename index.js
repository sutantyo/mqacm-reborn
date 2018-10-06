const express = require('express');
const helmet = require('helmet');
const path = require('path');

const firebase = require('firebase');
const schedule = require('node-schedule');
const google = require('googleapis');


const app =  express();

console.log(process.env.TEST);

const config = {
  apiKey: "AIzaSyAj7DYUjvN2pLCUmxY-O7dns92kMrOZIyo",
  authDomain: "mqacm-reborn.firebaseapp.com",
  databaseURL: "https://mqacm-reborn.firebaseio.com",
  projectId: "mqacm-reborn",
  storageBucket: "mqacm-reborn.appspot.com",
  messagingSenderId: "857133548781"
};

app.use(helmet())
app.use(express.static(path.join(__dirname, 'mqacm_client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/mqacm_client/build/index.html'));
});

const port = process.env.PORT || 5000;
console.log("Listening on PORT " + port);
app.listen(3000);
