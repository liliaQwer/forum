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
    getAuthenticatedToken() {
        return localStorage.getItem('authenticationToken');
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
    updatePassword(token, password, confirmPassword){
        return axios.put(RESTORE_API_URL, {token, password, confirmPassword})
    }
    getUserRole(){
        try {
            const claim = JSON.parse(atob(this.getAuthenticatedToken().split('.')[1]));
            return claim.role;
        } catch (e) {
            return null;
        }
    }
    getUserLogin(){
        try {
            const claim = JSON.parse(atob(this.getAuthenticatedToken().split('.')[1]));
            return claim.sub;
        } catch (e) {
            return null;
        }
    }
    isValidAuthentification() {
        try {
            const claim = JSON.parse(atob(this.getAuthenticatedToken().split('.')[1]));
            if (new Date().getTime()/1000 < claim.exp) {
                return true;
            }
        } catch (e) {
        }
        return false;
    }
}

export default new UserService();
