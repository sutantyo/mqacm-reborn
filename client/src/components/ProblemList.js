import React from 'react';
import {firebase} from 'utilities/Firebase';

import * as Spinner from 'react-spinkit';

import {
  Card,
  CardHeader,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

let cardStyle = {
  opacity: 0.7,
  borderRadius: '4px',
  marginLeft: '2%',
  marginRight: '2%'
}

class ProblemList extends React.Component {
  constructor(){
    super();
    this.state = {
      ready_to_render : false,
      problemset : []
    }
  }

  componentWillMount(){
    firebase.database().ref('problem_set').on('value', snapshot =>{
      this.setState({
          ready_to_render: true,
          problemset : snapshot.val()
          //problemset : testdata
      })
    })
  }

  generateRowData(data,solved){
    let problems = [];

    for (let key in data[this.props.set]){
      problems.push(data[this.props.set][key]);
    }

    problems.sort(function(a,b){
      return (a.num - b.num);
    });
    return problems;
  }


  render(){
    if (this.state.ready_to_render){
      let problems = this.generateRowData(this.state.problemset);
      let cardTitle = this.props.title + " (" + problems.length + " problems)";
      return (
        <div>
          <Card style = {cardStyle}>
          <CardHeader
              title = {cardTitle}
          />
            <Table>
              <TableHead>
                <TableRow style={{height:'28px'}}>
                  <TableCell style={{width:'20px'}}>ID</TableCell>
                  <TableCell style={{width:'200px'}}>Title</TableCell>
                  <TableCell style={{width:'10px'}}>Level</TableCell>
                  <TableCell style={{width:'30px'}}>Tags</TableCell>
                  <TableCell style={{width:'200px'}}>Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {problems.map( problem =>
                  <TableRow key={problem.num} style={{height:'20px'}}>
                      <TableCell style={{width:'20px',textAlign:'left'}}>{problem.num}</TableCell>
                      <TableCell style={{width:'200px'}} >
                        <a href={"https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem="+problem.pid} target={'_blank'}>
                        {problem.title}</a><
                      /TableCell>
                      <TableCell style={{width:'10px'}}>{problem.level}</TableCell>
                      <TableCell style={{width:'30px',whiteSpace:'normal',wordWrap:'break-word'}}>{problem.tags}</TableCell>
                  <TableCell style={{width:'200px'}}>{problem.comment}</TableCell>
                  </TableRow>
                )
              }
              </TableBody>
            </Table>
          </Card>
        </div>
      );
    }
    else{
      return (
        <div>
        <Spinner name="circle" />
        </div>
      )
    }
  }
}

export default ProblemList;
