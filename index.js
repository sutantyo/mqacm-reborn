const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app =  express();

app.use(helmet())
app.use(express.static(path.join(__dirname, 'mqacm_client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/mqacm_client/build/index.html'));
});
const port = process.env.PORT || 5000;
console.log("Listening on PORT " + port);
app.listen(3000);
