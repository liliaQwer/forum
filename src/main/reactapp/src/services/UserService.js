import axios from "axios";
import {SIGNIN, SIGNUP, USER_API_URL, RESTORE_API_URL} from "../utils/Url";

class UserService {
    signUp(email, login, password) {
        return axios.post(`${USER_API_URL}/${SIGNUP}`, {email, login, password} );
    }

    signIn(login, password) {
        return axios.post(`${USER_API_URL}/${SIGNIN}`, {login, password} );
    }
    signOut() {
        localStorage.removeItem("authenticationToken");
    }
    setAuthenticatedToken(token) {
        localStorage.setItem('authenticationToken', token);
    }
    isAuthenticated() {
        if (localStorage.getItem("authenticationToken")){
            return true;
        };
        return false;
    }
    sendMailForRecover(email) {
        return axios.post(RESTORE_API_URL, {email})
    }
    updatePassword(token, password, confirmedPassword){
        return axios.put(RESTORE_API_URL, {token, password, confirmedPassword})
    }

}

export default new UserService();
