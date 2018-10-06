const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

//const firebase = require('firebase');


// If modifying these scopes, delete token.json.
const GAPI_SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const GAPI_TOKEN_PATH = './private/token.json';


// Load client secrets from a local file.
fs.readFile('./private/google_api_credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), readGoogleSpreadsheet);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const google_auth = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(GAPI_TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(google_auth, callback);
    google_auth.setCredentials(JSON.parse(token));
    callback(google_auth);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} google_auth The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(google_auth, callback) {
  const authUrl = google_auth.generateAuthUrl({
    access_type: 'offline',
    scope: GAPI_SCOPES,
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
      fs.writeFile(GAPI_TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', GAPI_TOKEN_PATH);
      });
      callback(google_auth);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function readGoogleSpreadsheet(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GAPI_SPREADSHEET_ID,
    range: ['test!A:A']//,'Participants!A:F'],
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
        console.log('sheet done');
      });
    } else {
      console.log('No data found.');
    }
  });
  console.log('sheet done');
}

/*
const config = {
  apiKey: "AIzaSyAj7DYUjvN2pLCUmxY-O7dns92kMrOZIyo",
  authDomain: "mqacm-reborn.firebaseapp.com",
  databaseURL: "https://mqacm-reborn.firebaseio.com",
  projectId: "mqacm-reborn",
  storageBucket: "mqacm-reborn.appspot.com",
  messagingSenderId: "857133548781"
};
firebase.initializeApp(config);
*/
testFirebase();

function testFirebase() {

  const admin = require("firebase-admin");
  const serviceAccount = require("./private/firebase_credentials.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mqacm-reborn.firebaseio.com"
  });

  admin.database().ref('test').update({
    dione : 'morales',
  }).then( () => process.exit(0))
}
