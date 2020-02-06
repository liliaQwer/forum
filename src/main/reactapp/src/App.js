import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
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
