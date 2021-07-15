import { Card, CardActions, CardContent, CardMedia, Button, Typography,Grid } from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import useStyles from '../styles'
import {useState} from 'react'
import { likePost, deletePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import '../posts.css'

const Display = ({element}) => (
  <>
    <span className="list-group-item list-group-item-secondary">{element}</span>
  </>
);


const Post=({post,setCurrentId})=>{
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(post)

  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return(
        <div>
            <div className="heading"><span className="recipeName">{post.title}</span></div>
            <img className="pic" src={post.selectedFile} alt=""/>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
        <Button onClick= {() =>setCurrentId(post._id)}  style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>)}
            <div className="itemContainer">
                <button type="button" className="btn btn-dark" onClick={() => setCurrentId(post._id)}><Link to="/recipes" > Recipe steps</Link></button>
            </div>
            <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
            <Likes />
            </Button>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button  className={classes.delete} id="delete" size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
            </Button>
        )}
      </div>
    
  )
}

export default Post;