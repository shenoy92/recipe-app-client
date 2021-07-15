import { useSelector } from 'react-redux';
import './styles.css'

const Display = ({element}) => (
  <>
    <ul>
    <li className="steps">{element}</li>
    </ul>
  </>
);

const Recipes=({currentId})=>{
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
  console.log(post)
  return(
    <div className="recipeContainer">
    <div>
    <div className="heading"><span className="recipeName">{post.title}</span></div>
    <img className="pic" src={post.selectedFile} alt=""/>
    {post.ingrediants.length > 0 ? post.ingrediants.map((element) => <Display element={element}/>) : ""}
    </div>
    </div>
    )
  
}

export default Recipes;

