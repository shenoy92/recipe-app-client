import React,{useState} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
// import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/recipes.js';
import Auth from './pages/Auth/auth';
import Home from './pages/Home/home.js';

function App() {
  const [currentId, setCurrentId] = useState(0);
  const [count,setCount]=useState(0)
  return (
    <>
      <div className="custom-container">
        <BrowserRouter>
        <Header />
          <Switch>
              <Route exact path="/" >
                <Home setCurrentId={setCurrentId} currentId={currentId} setCount={setCount} count={count}/>
              </Route>
              <Route exact path="/recipes">
                <Recipes setCurrentId={setCurrentId} currentId={currentId}/>
              </Route>
              <Route path="/auth" exact component={Auth} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
