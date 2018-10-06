const fs = require('fs');
const readline = require('readline');
const request = require('request');
const gapi = require('./utilities/gapi_authentication');
const firebase = require('./utilities/firebase_authentication');
const {google} = require('googleapis');

let firebase_credentials = 'private/firebase_credentials.json';
let gapi_credentials = 'private/google_api_credentials.json'
let gapi_token = 'private/token.json'

//const firebase = require('firebase');
let participants_data = [];
let problems_data = [];

let problems_1 = new Set();
let problems_2 = new Set();
let problems_3 = new Set();
let problems_4 = new Set();
let problems_5 = new Set();

module.exports = {
  update_data : update_data
}

/*
gapi.authenticate(gapi_credentials, gapi_token)
  .then( (auth) => read_google_spreadsheet(auth) )
  .then( () =>  firebase.authenticate(firebase_credentials) )
  .then( () => update_problems() )
  .then( () => update_participants() )
  .then( () => console.log('chain is done'))
  .catch( (error) => {console.log(error); })
*/


function update_data(){
  return new Promise( (resolve,reject) => {
    gapi.authenticate('private/google_api_credentials.json', 'private/token.json')
      .then( (auth) => read_google_spreadsheet(auth) )
      .then( () =>  firebase.authenticate(firebase_credentials) )
      .then( () => update_problems() )
      .then( () => update_participants() )
      .then( () => resolve() )
      .catch( (error) => {console.log(error); } )
  });
}

function read_google_spreadsheet(auth){
  return new Promise( (resolve,reject) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.batchGet({
      spreadsheetId: process.env.GAPI_SPREADSHEET_ID,
      ranges: [
        'participants!A:F',
        'problems!A:F',
      ],
    }, (err, res) => {
      if (err)
        return reject('The Google API returned an error: ' + err);
      participants_data = res.data.valueRanges[0].values;
      problems_data = res.data.valueRanges[1].values;
      resolve();
    });
  });
}

function update_participants(){
  return new Promise( (resolve,reject) => {

    let participants = {};
    let user_ids = '';

    // harvest all the ids from the spreadsheet
    for(let i = 1; i < participants_data.length; i++){
      user_ids = user_ids + participants_data[i][0] + ',';
      let current_participant = {};
      current_participant['id'] = participants_data[i][0];
      current_participant['name'] = participants_data[i][1];
      current_participant['fullname'] = participants_data[i][2];

      let id = participants_data[i][0];
      participants[id] = current_participant;
    }

    // create a participants JSON object
    //let headers=data[0]; console.log(headers) // uncomment to see headers

    // harvest all the problem ids from the spreadsheet
    let problem_ids = '';
    for(let i = 1; i < problems_data.length; i++){
      problem_ids = problem_ids + problems_data[i][0] + ',';
    }
    //let request_string = 'http://uhunt.felix-halim.net/api/subs-nums/'+user_ids+'/'+problem_ids+'/0';
    let request_string = 'http://uhunt.felix-halim.net/api/solved-bits/'+user_ids;
    //let request_string = 'http://localhost:4000/data.json';
    request
      .get(request_string)
      .on('error', function(err){
        return reject('error obtaining data from uHunt API: ' + error);
      })
      .on('response',
      function(response,body){
        let api_data = JSON.parse(body);

        // The API call returns an array, each array element is a JSON object with
        // fields 'uid' and 'solved'
        for (var i = 0; i < api_data.length; i++){
          let uid = api_data[i].uid;

          let solved = new Set();
          let solved_1 = new Set();
          let solved_2 = new Set();
          let solved_3 = new Set();
          let solved_4 = new Set();
          let solved_5 = new Set();

          if (api_data[i].solved.length == 1){
            participants[uid]['solved'] = [];
            participants[uid]['solved_count'] = 0;
            participants[uid]['solved_listed'] = 0;
            participants[uid]['solved_1_count'] = 0;
            participants[uid]['solved_2_count'] = 0;
            participants[uid]['solved_3_count'] = 0;
            participants[uid]['solved_4_count'] = 0;
            participants[uid]['solved_5_count'] = 0;

            continue;
          }
          let solved_problems = api_data[i].solved;
          for (let j = 0; j < solved_problems.length; j++){
            let p = solved_problems[j];
            let offset = 0;
            while (p > 0){
              if (p % 2 == 1){
                let pid = offset+(j*32);
                solved.add(pid);
                if (problems_1.has(pid)) solved_1.add(pid);
                else if (problems_2.has(pid)) solved_2.add(pid);
                else if (problems_3.has(pid)) solved_3.add(pid);
                else if (problems_4.has(pid)) solved_4.add(pid);
                else if (problems_5.has(pid)) solved_5.add(pid);
              }
              offset++;
              p = p >> 1;
            }
          }
          participants[uid]['solved'] = Array.from(solved);
          participants[uid]['solved_count'] = solved.size;
          participants[uid]['solved_listed'] = solved_1.size + solved_2.size + solved_3.size + solved_4.size + solved_5.size;
          participants[uid]['solved_1'] = Array.from(solved_1);
          participants[uid]['solved_1_count'] = solved_1.size;
          participants[uid]['solved_2'] = Array.from(solved_2);
          participants[uid]['solved_2_count'] = solved_2.size;
          participants[uid]['solved_3'] = Array.from(solved_3);
          participants[uid]['solved_3_count'] = solved_3.size;
          participants[uid]['solved_4'] = Array.from(solved_4);
          participants[uid]['solved_4_count'] = solved_4.size;
          participants[uid]['solved_5'] = Array.from(solved_5);
          participants[uid]['solved_5_count'] = solved_5.size;
        }

        firebase.admin.database().ref().update({
          participants
        })
        .then( () => process.exit(0))
        .then( resolve() );
      });
  });
}

function update_problems(){
  return new Promise( (resolve,reject) => {
    let problems = {};
    let problems_1_list = {};
    let problems_2_list = {};
    let problems_3_list = {};
    let problems_4_list = {};
    let problems_5_list = {};

    // harvest all the ids from the spreadsheet
    for(let i = 1; i < problems_data.length; i++){
      let current_problem = {};
      current_problem['num'] = problems_data[i][0] ? problems_data[i][0] : '';
      current_problem['pid'] = problems_data[i][1] ? problems_data[i][1] : '';
      current_problem['title'] = problems_data[i][2] ? problems_data[i][2] : '';
      current_problem['level'] = problems_data[i][3] ? problems_data[i][3] : '';
      current_problem['comp'] = problems_data[i][4] ? problems_data[i][4] : '';
      current_problem['tags'] = problems_data[i][5] ? problems_data[i][5] : '';
      current_problem['comments'] = problems_data[i][6] ? problems_data[i][6] : '';

      problems[current_problem['pid']] = current_problem;

      // for each problem, classify it according to difficulty (level 1-5)
      switch(current_problem['level']){
        case '1': problems_1.add(parseInt(current_problem['pid']));
                  problems_1_list[parseInt(current_problem['pid'])] = current_problem;
                  break;
        case '2': problems_2.add(parseInt(current_problem['pid']));
                  problems_2_list[parseInt(current_problem['pid'])] = current_problem;
                  break;
        case '3': problems_3.add(parseInt(current_problem['pid']));
                  problems_3_list[parseInt(current_problem['pid'])] = current_problem;
                  break;
        case '4': problems_4.add(parseInt(current_problem['pid']));
                  problems_4_list[parseInt(current_problem['pid'])] = current_problem;
                  break;
        case '5': problems_5.add(parseInt(current_problem['pid']));
                  problems_5_list[parseInt(current_problem['pid'])] = current_problem;
                  break;
      }
    }

    let problem_set = {};
    problem_set['level_1'] = Array.from(problems_1);
    problem_set['level_2'] = Array.from(problems_2);
    problem_set['level_3'] = Array.from(problems_3);
    problem_set['level_4'] = Array.from(problems_4);
    problem_set['level_5'] = Array.from(problems_5);
    problem_set['level_1_list'] = problems_1_list;
    problem_set['level_2_list'] = problems_2_list;
    problem_set['level_3_list'] = problems_3_list;
    problem_set['level_4_list'] = problems_4_list;
    problem_set['level_5_list'] = problems_5_list;

    firebase.admin.database().ref().update({
      problems, problem_set
    })
    .then( () => process.exit(0))
    .then( resolve() );
  });
}
