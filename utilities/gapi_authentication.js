const fs = require('fs');
const readline = require('readline');
const path = require('path');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

module.exports = {
  authenticate : authenticate,
}

// create a google auth object after authorising
function authenticate(credentials_path, token_path){
  return new Promise( (resolve,reject) => {
    // load client secrets from a local file.
    fs.readFile(credentials_path, (err, content) => {
      if (err)
        return reject('error loading client secret file: ' + err);
      // create an OAuth2 client with the given credentials
      const {client_secret, client_id, redirect_uris} = JSON.parse(content).installed;
      const google_auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

      // check if we have previously stored a token.
      fs.readFile(token_path, (err, token) => {
        if (err){
          return reject(
            'possibly missing token file for Google API authentication\n' +
            'generate a new token using the getNewToken() in '
             + __dirname + '/' +  path.basename(__filename) + '\n'
             + 'Error message: ' + err);
        }
        google_auth.setCredentials(JSON.parse(token));
        resolve(google_auth)
      });
    });
  });
}

// To generate a new token, uncomment the following code and run it locally
// You need to set the appropriate path for the google API credentials and
// token paths
/*
const TOKEN_PATH = '../private/token.json';
const CREDENTIALS_PATH = '../private/google_api_credentials.json';
getNewToken()
function getNewToken() {
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    const {client_secret, client_id, redirect_uris} = JSON.parse(content).installed;
    const google_auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    const authUrl = google_auth.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      google_auth.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        google_auth.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log('Token stored in', TOKEN_PATH);
        });
      });
    });
  });
}
*/
