import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Post from './Post/post'


const Posts=({setCurrentId})=>{
  const posts = useSelector((state) => state.posts);

  return(
    !posts.length?<CircularProgress/>:(
    <div className="Container">
      
        {posts.map((post)=>(<Post post={post} setCurrentId={setCurrentId}/>))}
    </div>
    )
  )
}

export default Posts;