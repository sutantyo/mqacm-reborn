import React, {Component} from 'react';
import ProblemList from 'components/ProblemList';
import * as Spinner from 'react-spinkit';
import {firebase} from 'utilities/Firebase';


import {
  Paper,
  TextField,
} from '@material-ui/core/';



import {
  orange500,
  grey600,
  greenA700,
  red500
} from '@material-ui/core/colors';


let paperStyle = {
  fontSize: '14px',
  backgroundColor: 'rgba(255,255,255,0.7)',
  padding: '20px 15px 10px 15px',
  marginBottom: '8px',
  color: grey600
}

class Problems extends Component{
  constructor(){
    super();
    this.state = {
      user_id: null,
      ready_to_render: false,
      problemset : {},
      participants : {},
    };
  }
  componentWillUpdate(){
  }

  componentDidMount(){
    firebase.database().ref().on('value', snapshot =>{
      this.setState({
          ready_to_render: true,
          problemset : snapshot.val().problem_set,
          participants : snapshot.val().participants,
          //problemset : testdata
          id_input_helper :{
            message: 'Enter UVA id to see which problems you have solved',
            text_colour: orange500,
          },
      })
    })
  }

  showSolved(event){
    if (event.charCode === 13){
      event.preventDefault();
      let id = parseInt(event.target.value,10);
      if (id > 0 && this.state.participants[id]){
        this.setState({
          user_id : id,
          id_input_helper : {
            message: 'Retrieved data for ' + id,
            text_colour: greenA700,
          },
        });
      }
      else {
        this.setState({
          id_input_helper : {
            message: 'User ' + id + ' not found',
            text_colour: red500,
          },
        });
      }
    }
  }

  render(){
    if (this.state.ready_to_render){
      return (
            <div>
              <Paper style={paperStyle}>
                <div style={{marginLeft:'20px'}}>
                  <TextField
                     id="uva-id-input"
                     label="Insert your UVA id here"
                     helperText={this.state.id_input_helper.message}
                     margin="normal"
                     onKeyPress={this.showSolved.bind(this)  }
                  />
                </div>
              </Paper>
              <Paper style={paperStyle}>
                <p style={{marginLeft:'20px'}}>
                  Insert text here later
                </p>
                <ProblemList
                  title="Level 0"
                  user_id={this.state.user_id}
                  problemset={this.state.problemset.level_0_list}
                  participants={this.state.participants}
                  solved={this.state.user_id == null ? [] : this.state.participants[this.state.user_id].solved_0}>
                </ProblemList>
              </Paper>
              <Paper style={paperStyle}>
                <p style={{marginLeft:'20px'}}>
                  Insert text here later
                </p>
                <ProblemList
                  title="Level 1"
                  user_id={this.state.user_id}
                  problemset={this.state.problemset.level_1_list}
                  participants={this.state.participants}
                  solved={this.state.user_id == null ? [] : this.state.participants[this.state.user_id].solved_1}>
                </ProblemList>
              </Paper>
              <Paper style={paperStyle}>
                <p style={{marginLeft:'20px'}}>
                  Insert text here later
                </p>
                <ProblemList
                  title="Level 2"
                  user_id={this.state.user_id}
                  problemset={this.state.problemset.level_2_list}
                  participants={this.state.participants}
                  solved={this.state.user_id == null ? [] : this.state.participants[this.state.user_id].solved_2}>
                </ProblemList>
              </Paper>
              <Paper style={paperStyle}>
                <p style={{marginLeft:'20px'}}>
                  Insert text here later
                </p>
                <ProblemList
                  title="Level 3"
                  user_id={this.state.user_id}
                  problemset={this.state.problemset.level_3_list}
                  participants={this.state.participants}
                  solved={this.state.user_id == null ? [] : this.state.participants[this.state.user_id].solved_3}>
                  >
                </ProblemList>
              </Paper>
            </div>
      )
    }
    else{
      return(
        <div>
        <Spinner name="circle" />
        </div>
      )
    }
  }
}
export default Problems
