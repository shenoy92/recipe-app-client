import React, { useState, useEffect } from 'react';
import {Button } from '@material-ui/core';
import styles from './Header.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();


  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
    return (
        <div className="HeaderContainer">
            <span  ><a className="Title" href="/" >Hell's Kitchen</a></span>
            {user?.result ? (
          <div className="button" >
            <Button  variant="contained"  color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div className="button" >
          <Button  component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          </div>
        )}
        </div>
    );
  }
  
  export default Header;
  











