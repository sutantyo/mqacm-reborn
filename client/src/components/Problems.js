import React, {Component} from 'react';
import ProblemList from 'components/ProblemList';

import {
  Paper,
} from '@material-ui/core/';

import {
  //orange500,
  grey600,
  //greenA700,
  //red500
} from '@material-ui/core/colors';


let paperStyle = {
  fontSize: '14px',
  backgroundColor: 'rgba(255,255,255,0.7)',
  padding: '20px 15px 10px 15px',
  marginBottom: '8px',
  color: grey600
}

/*
let inputBoxStyle = {
  paddingLeft: '18px',
  marginRight: '22px',
  width: '180px',
  fontSize: '14px'
}
*/


class Problems extends Component{
  constructor(){
    super();
    this.state = {
    };
  }

  render(){
    return (
        <div>
              <Paper style={paperStyle}>
                <div style={{marginLeft:'20px'}}>
                <p>
                </p>
                </div>
              </Paper>
              <Paper style={paperStyle}>
                <p style={{marginLeft:'20px'}}>
                  Insert text here later
                </p>
                <ProblemList solved={this.state.solved_easy}
                  title="Level 1"
                  set="level_1_list">
                </ProblemList>
              </Paper>
              <Paper style={paperStyle}>
                <p style={{marginLeft:'20px'}}>
                  Insert text here later
                </p>
                <ProblemList solved={this.state.solved_medium}
                  title="Level 2"
                  set="level_2_list">
                </ProblemList>
              </Paper>
              <Paper style={paperStyle}>
                <p style={{marginLeft:'20px'}}>
                  Insert text here later
                </p>
                <ProblemList solved={this.state.solved_hard}
                  title="Level 3"
                  set="level_3_list">
                </ProblemList>
              </Paper>
            </div>
    )
  }
}
export default Problems
