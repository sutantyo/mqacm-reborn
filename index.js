const express = require('express');
const helmet = require('helmet');
const path = require('path');
const schedule = require('node-schedule');

const database = require('./database');

const app =  express();
app.use(helmet())
app.use(express.static(path.join(__dirname, 'client/build')));

database.start_server()
  .then( () => {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
    const port = process.env.PORT || 5000;
    app.listen(port);
    console.log("Listening on PORT " + port);
  })
  .catch( (error) => {console.log(error); } )


schedule.scheduleJob('*/3 * * * *', function(){
  database.update_server();
});
