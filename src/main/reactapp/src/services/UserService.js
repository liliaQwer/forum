import axios from "axios";
import {SIGNIN, SIGNUP, USER_API_URL} from "../utils/Url";

class UserDataService {
    signUp(email, login, password) {
        return axios.post(`${USER_API_URL}/${SIGNUP}`, {email, login, password} );
    }

    signIn(login, password) {
        return axios.post(`${USER_API_URL}/${SIGNIN}`, {login, password} );
    }
}

export default new UserDataService();
