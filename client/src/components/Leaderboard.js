import React, { Component } from 'react';
import { firebase } from 'utilities/Firebase'
//import withAuthorization from 'utilities/withAuthorization';

import * as Spinner from 'react-spinkit';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core/';

class Leaderboard extends Component {
  constructor(){
    super();
    this.state = {
      participants_loaded : false,
      participants : [],
      problems_loaded : false,
      problems : [],
    }
  }

  componentDidMount(){
    firebase.database().ref('participants').on('value', snapshot =>{
      this.setState({
          participants_loaded : true,
          participants : snapshot.val()
      })
    });
    firebase.database().ref('problems').on('value', snapshot =>{
      this.setState({
          problems_loaded : true,
          problems : snapshot.val()
      })
    });
  }

  generateRowData(data){
    let participants = [];
    for (let key in data){
      participants.push(data[key]);
    }
    participants.sort(function(a,b){
      if (b.solved_listed !== a.solved_listed)
        return b.solved_listed - a.solved_listed;
      /*
      if (b.solved_5 !== a.solved_5)
        return b.solved_5 - a.solved_5;
      if (b.solved_4 !== a.solved_4)
        return b.solved_4 - a.solved_4;
        */
      if (b.solved_3_count !== a.solved_3_count)
        return b.solved_3_count - a.solved_3_count;
      if (b.solved_2_count !== a.solved_2_count)
        return b.solved_2_count - a.solved_2_count;
      if (b.solved_1_count !== a.solved_1_count)
        return b.solved_1_count - a.solved_1_count;
      return a.name.localeCompare(b.name);
      //return (b.solved_easy.length + b.solved_medium.length + b.solved_hard.length) - (a.solved_easy.length + a.solved_medium.length + a.solved_hard.length);
    });
    return participants;
  }

  render(){
      //let date_options = { weekday: 'long', year: 'numeric', month: 'long', day:'numeric', timeZoneName: 'short', hour:'numeric', minute:'numeric',second:'numeric'}
      //let update_time = this.state.last_update.toLocaleString('en-AU',date_options);
    if (this.state.participants_loaded && this.state.problems_loaded){
      let participants = this.generateRowData(this.state.participants);
      //update_time.setUTCSeconds(this.state.last_update);
      return (
        <div style={{opacity:1.0}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{width:'20px'}}>Rank</TableCell>
                <TableCell style={{width:'50px'}}>ID</TableCell>
                <TableCell style={{width:'200px'}}>Name</TableCell>
                <TableCell style={{textAlign:'center'}}>Score</TableCell>
                <TableCell style={{textAlign:'center'}}>Lvl 1</TableCell>
                <TableCell style={{textAlign:'center'}}>Lvl 2</TableCell>
                <TableCell style={{textAlign:'center'}}>Lvl 3</TableCell>
                <TableCell style={{textAlign:'center'}}>Total solved</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              style={{height:'20px'}}
            >
            {participants.map( (participant, index) =>
                <TableRow style={{height:'20px'}} key={participant.id}>
                    <TableCell style={{width:'20px',textAlign:'right'}}>{index+1}</TableCell>
                    <TableCell style={{width:'50px',textAlign:'left'}}>{participant.id}</TableCell>
                    <TableCell style={{width:'200px',textAlign:'left'}}>{participant.name}</TableCell>
                    <TableCell style={{textAlign:'center'}}>{participant.solved_listed}</TableCell>
                    <TableCell style={{textAlign:'center'}}>{participant.solved_1_count}</TableCell>
                    <TableCell style={{textAlign:'center'}}>{participant.solved_2_count}</TableCell>
                    <TableCell style={{textAlign:'center'}}>{participant.solved_3_count}</TableCell>
                    <TableCell style={{textAlign:'center'}}>{participant.solved_count}</TableCell>
                </TableRow>
              )
            }
            </TableBody>
          </Table>

          <div style={{padding:'30px 40px 5px 15px',fontFamily:'Roboto, sans-serif',fontSize:'12px'}}> Last updated: {/*update_time*/}</div>
        </div>
      );
    }
    else{
      return (
        <div style={{margin:'0 auto',width:'800px'}}>
        <Spinner name="circle" />
        </div>
      )
    }
  }
}
//const authCondition = (authUser) => !!authUser;
//export default withAuthorization(authCondition)(Leaderboard);
export default Leaderboard;
