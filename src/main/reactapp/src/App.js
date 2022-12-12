import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage2 from "./components/MainPage2";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signin/SignUp";
import {RESTORE_API_URL, SIGNUP_API_URL, SIGNIN_API_URL, RESTORE_PASSWORD_URL} from "./utils/Url";
import RestorePassword from "./components/signin/RestorePassword";
import UpdatePassword from "./components/signin/UpdatePassword";
import OAuth2RedirectHandler from "./components/signin/OAuth2RedirectHandler";

function App() {
    return (
       <Router>
           <Routes>
               <Route path={`${SIGNIN_API_URL}`}  element={<SignIn/>} />
               <Route path={`${SIGNUP_API_URL}`}  element={<SignUp/>} />
               <Route path={`${RESTORE_PASSWORD_URL}`}  element={<RestorePassword/>} />
               <Route path={`${RESTORE_API_URL}`} element={<UpdatePassword/>} />
               <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>} />
               <Route path="/error"  element={<MainPage2/>} />
               <Route path="/*"  element={<MainPage2/>} />
           </Routes>
       </Router>
    );
}

export default App;
