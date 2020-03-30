import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from "./components/MainPage";
import MainPage2 from "./components/MainPage2";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signin/SignUp";
import NotFound from "./components/NotFound";
import {POSTS, SIGNIN, SIGNUP} from "./utils/Url";
import PostContent from "./components/postcontent/PostContent";

function App() {
    return (
       <Router>
           <Switch>
               <Route path="/" exact component={MainPage2} />
               <Route path={`/${SIGNIN}`} exact component={SignIn} />
               <Route path={`/${SIGNUP}`} exact component={SignUp} />
               <Route path={`/${POSTS}`} exact component={MainPage} />
               <Route path={`/${POSTS}/:postId`} component={PostContent} />
               <Route component={NotFound} />
           </Switch>
       </Router>
    );
    //  return (<Template/>);
}

export default App;
