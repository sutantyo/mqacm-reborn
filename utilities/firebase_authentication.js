const admin = require("firebase-admin");
const fs = require('fs');


function authenticate(credentials_path){
  return new Promise( (resolve,reject) => {
    //console.log(credentials_path);

    fs.readFile(credentials_path, (err, content) => {
      if (err){
        return reject('Error loading firebase credentials file:' + err);
      }
      const serviceAccount = JSON.parse(content);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://mqacm-reborn.firebaseio.com"
      });
      resolve();

      /*
      admin.database().ref('test').update({
        dione : 'nick',
      }).then( () => process.exit(0))
      */
    });
  });
}

module.exports = {
  authenticate : authenticate,
  admin: admin,
}
