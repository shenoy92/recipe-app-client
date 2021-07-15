import React, { useState,useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost,updatePost} from '../../actions/posts';
import useStyles from './styles';




const Form = ({currentId,setCurrentId}) => {
  const [postData,setPostData]=useState({ title: '',ingrediants: [''], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
 
 
 
  

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const addRecipe=()=>{
    setPostData({...postData, ingrediants: [...postData.ingrediants, ''] })
  }
  
  
  const clear = () => {
    setCurrentId(0)
    setPostData({ title: '',ingrediants: '', selectedFile: '' });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({...postData,name:user?.result?.name}));
      clear();
    } else {
      dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
      clear();
    }
  }

  const setIngrediants = (e, i) => {
    let dataIngrediants = postData.ingrediants;
    dataIngrediants[i] =  e.target.value;
    setPostData({ ...postData, ingrediants: [...dataIngrediants] })
    console.log(postData);
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to post.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off"  className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{ 'Recipe'}</Typography>
        <TextField name="title" variant="outlined" label="Title"  fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        
        <label >Click the below add Recipe button to add steps</label>
        <Button variant="contained" color="primary" size="small" onClick={addRecipe} fullWidth>Add Recipe</Button>
        {
          postData && postData.ingrediants.length && postData.ingrediants.map((data, i) => {
            return (
              
              <TextField name="ingrediants" variant="outlined" label=" add recipe steps"   fullWidth value={data} onChange={(e) => setIngrediants(e, i)}/>
              
            )
          })
        }
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;