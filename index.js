const express = require('express');
const helmet = require('helmet');
const path = require('path');
const schedule = require('node-schedule');

const database = require('./database');

const app =  express();
app.use(helmet())
app.use(express.static(path.join(__dirname, 'mqacm_client/build')));

database.update_data()
  .then( () => {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/mqacm_client/build/index.html'));
    });
    const port = process.env.PORT || 5000;
    console.log("Listening on PORT " + port);
    app.listen(port);
  })
  .catch( (error) => {console.log(error); } )
