import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import * as firebase from 'firebase';

class TopNavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
    };
  }
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { auth } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return(
      <div>
        <AppBar position="fixed">
          <Toolbar>
          <Button>
            <Link to="/problems">Problems</Link>
          </Button>
          <Button>
            <Link to="/leaderboard">Leaderboard</Link>
          </Button>
          <Button>
            <Link to="/profile">Profile</Link>
          </Button>
          <Button>
            <Link to="/resources">Resources</Link>
          </Button>
          <Button>
            <Link to="/">Home</Link>
          </Button>
          <Button>
            <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
          </Button>
          {auth &&
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default TopNavBar;
