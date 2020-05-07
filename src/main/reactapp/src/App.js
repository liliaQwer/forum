import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage2 from "./components/MainPage2";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signin/SignUp";
import {SIGNIN, SIGNUP, RESTORE, RESTORE_API_URL} from "./utils/Url";
import RestorePassword from "./components/signin/RestorePassword";
import UpdatePassword from "./components/signin/UpdatePassword";

function App() {
    return (
       <Router>
           <Switch>
               <Route path={`/${SIGNIN}`} exact component={SignIn} />
               <Route path={`/${SIGNUP}`} exact component={SignUp} />
               <Route path={`/${RESTORE}`} exact component={RestorePassword} />
               <Route path={`${RESTORE_API_URL}`} component={UpdatePassword} />
               <Route path="/"  component={MainPage2} />
           </Switch>
       </Router>
    );
    //  return (<Template/>);
}

export default App;
