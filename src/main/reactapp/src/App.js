import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Template from "./Template";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signin/SignUp";
import NotFound from "./components/NotFound";
import {POSTS, SIGNIN, SIGNUP} from "./utils/Url";

function App() {
    return (
       <Router>
           <Switch>
               <Route path="/" exact component={SignIn} />
               <Route path={`/${SIGNIN}`} exact component={SignIn} />
               <Route path={`/${SIGNUP}`} exact component={SignUp} />
               <Route path={`/${POSTS}`} exact component={Template} />
               <Route component={NotFound} />
           </Switch>
       </Router>
    );
    //  return (<Template/>);
}

export default App;
