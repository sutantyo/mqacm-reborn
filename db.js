const fs = require('fs');
const readline = require('readline');
const request = require('request');
const gapi = require('./utilities/gapi_authentication');
const firebase = require('./utilities/firebase_authentication');
const {google} = require('googleapis');

//const firebase = require('firebase');
let participants_data = [];
let problems_data = [];

let firebase_credentials = 'private/firebase_credentils.json';
console.log(firebase_credentials.constructor);

gapi.authenticate('private/google_api_credentials.json', 'private/token.json')
  .then( () =>  firebase.authenticate(firebase_credentials) )
  .then( (auth) => read_google_spreadsheet(auth) )
  .then( () => upload_participants() )
  .catch( (error) => {console.log(error); } )
  /*
  .then( () => {
    console.log(participants);
    firebase.admin.database().ref('test').update({
      dione : 'warick',
    }).then( () => process.exit(0));

  });
  */

function read_google_spreadsheet(auth){
  console.log("calling read_google_spreadsheet");
  return new Promise( (resolve,reject) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.batchGet({
      spreadsheetId: process.env.GAPI_SPREADSHEET_ID,
      ranges: [
        'participants!A:F',
        'problems!A:F',
      ],
    }, (err, res) => {
      if (err) return console.log('The Google API returned an error: ' + err);
        participants_data = res.data.valueRanges[0];
        problems_data = res.data.valueRanges[1];
        resolve();
    });
  });
}

function upload_participants(){
  console.log("upload_participants");
  return new Promise( (resolve,reject) => {
    let participants_from_google_sheets  = participants_data.values;
    let fb_participants = {};
    let user_ids = '';

    for(let i = 1; i < participants_from_google_sheets.length; i++){
      user_ids = user_ids + participants_from_google_sheets[i][0] + ',';
      let current_participant = {};
      current_participant['name'] = participants_from_google_sheets[i][1];
      current_participant['fullname'] = participants_from_google_sheets[i][1];

      let id = participants_from_google_sheets[i][0];
      fb_participants[id] = current_participant;
    }

    let problems_from_google_sheets = problems_data.values;

    // create a participants JSON object
    //let headers=data[0]; console.log(headers) // uncomment to see headers

    // harvest all the ids from the spreadsheet
    // harvest all the problem ids from the spreadsheet
    let problem_ids = '';
    for(let i = 1; i < problems_from_google_sheets.length; i++){
      problem_ids = problem_ids + problems_from_google_sheets[i][0] + ',';
    }
    //let request_string = 'http://uhunt.felix-halim.net/api/subs-nums/'+user_ids+'/'+problem_ids+'/0';
    let request_string = 'http://uhunt.felix-halim.net/api/solved-bits/'+user_ids;
    request(request_string,
      function(error,response,body){
        if (error) console.log('error fetching api/solved-bits ' + error);
        let returned_data = JSON.parse(body);

        // The API call returns an array, each array element is a JSON object with
        // fields 'uid' and 'solved'
        console.log(returned_data[1].solved.length);
        console.log(returned_data[32].solved.length);
        for (var i = 0; i < returned_data.length; i++){
          let solved = [];
          if (returned_data[i].solved.length == 1){
            fb_participants[returned_data[i].uid]['solved'] = [];
            continue;
          }
          let solved_problems = returned_data[i].solved;
          for (let j = 0; j < solved_problems.length; j++){
          //for (let j = 1; j < 2; j++){
            let p = solved_problems[j];
            let offset = 0;
            while (p > 0){
              if (p % 2 == 1)
                solved.push(offset+(j*32));
              offset++;
              p = p >> 1;
            }
          }
          fb_participants[returned_data[i].uid]['solved'] = solved;
        }

        //console.log(returned_data[32]);
        //let solved_probs = returned_data[32].solved;
        //console.log("size : " + solved_probs.length);
              //console.log(returned_data[0].solved);

        firebase.admin.database().ref().update({
          fb_participants
        })
        .then( () => process.exit(0))
        .then( resolve() );
      });


      /*
    for(let i = 1; i < participants_data.length; i++){
      let participant = {};
      participant['name'] = data[i][1];
      participant['solved'] = {};
      let id = data[i][0];
      //request('http://uhunt.felix-halim.net/api/solved-bits'
      participants[id] = participant;
    }
    resolve();
    */
  });
}
