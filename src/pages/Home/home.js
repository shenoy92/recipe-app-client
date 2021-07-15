import React, { useEffect,useState} from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Form from '../Form/form';
import Posts from '../Posts/posts';
import { useDispatch} from 'react-redux';
import { getPosts} from '../../actions/posts';
import useStyles from './styles';

const Home = ({currentId,setCurrentId,setCount,count}) => {
  
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

 
  return (
    <Grow in>
      <Container>
        <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
              <Posts  setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} setCount={setCount} count={count}/>
          </Grid>
        </Grid>
        
      </Container>
    </Grow>
  
  );
};

export default Home;