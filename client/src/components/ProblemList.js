import React from 'react';


import {
  Card,
  CardHeader,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

import DoneIcon from '@material-ui/icons/Done';

import {
  greenA700,
} from '@material-ui/core/colors';

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
      problemset : [],
    }
  }

  tickbox(solved){
  if (solved){
    return <DoneIcon style={{fontSize:'18px',color:greenA700}}>done</DoneIcon>
  }
  else {
    return <div></div>
  }
}

  componentWillUpdate(){
  }

  generateRowData(problems_data,solved_data){
    let problems = [];
    for (let key in problems_data){
      problems.push(problems_data[key]);
      if (solved_data)
        problems[problems.length-1].solved = solved_data.includes(parseInt(key,10));
    }

    problems.sort(function(a,b){
      return (a.num - b.num);
    });
    return problems;
  }


  render(){
      let problems = this.generateRowData(this.props.problemset, this.props.solved);
      let solved_count;
      if (this.props.solved)
        solved_count = this.props.solved.length;
      else {
        solved_count = 0;
      }
      let cardTitle = this.props.title + " (" + problems.length + " problems, " +  solved_count + " solved)";
      return (
        <div>
          <Card style = {cardStyle}>
          <CardHeader
              title = {cardTitle}
          />
            <Table>
              <TableHead>
                <TableRow style={{height:'28px'}}>
                  <TableCell style={{minWidth:'20px'}}>ID</TableCell>
                    <TableCell></TableCell>
                  <TableCell style={{minWidth:'200px'}}>Title</TableCell>
                  <TableCell style={{minWidth:'10px'}}>Level</TableCell>
                  <TableCell style={{minWidth:'30px'}}>Tags</TableCell>
                  <TableCell style={{minWidth:'200px'}}>Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {problems.map( problem =>
                  <TableRow key={problem.num} style={{height:'20px'}}>
                      <TableCell style={{minWidth:'20px',textAlign:'left'}}>{problem.num}</TableCell>
                      <TableCell style={{textAlign:'left'}}>{this.tickbox(problem.solved)}</TableCell>
                      <TableCell style={{minWidth:'200px'}} >
                        <a href={"https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem="+problem.pid} target={'_blank'}>
                        {problem.title}</a><
                      /TableCell>
                      <TableCell style={{minWidth:'10px'}}>{problem.level}</TableCell>
                      <TableCell style={{minWidth:'30px',whiteSpace:'normal',wordWrap:'break-word'}}>{problem.tags}</TableCell>
                  <TableCell style={{minWidth:'200px'}}>{problem.comment}</TableCell>
                  </TableRow>
                )
              }
              </TableBody>
            </Table>
          </Card>
        </div>
      );
  }
}

export default ProblemList;
