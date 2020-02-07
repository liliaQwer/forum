import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Template from "./Template";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signin/SignUp";
import NotFound from "./components/NotFound";

function App() {
    return (
       <Router>
           <Switch>
               <Route path="/" exact component={SignIn} />
               <Route path="/signin" exact component={SignIn} />
               <Route path="/signup" exact component={SignUp} />
               <Route path="/posts" exact component={Template} />
               <Route component={NotFound} />
           </Switch>
       </Router>
    );
    //  return (<Template/>);
}

export default App;
