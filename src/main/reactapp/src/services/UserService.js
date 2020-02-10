import axios from "axios";

const FORUM_API_URL = "http://localhost:8080";
const USER_API_URL = `${FORUM_API_URL}/user`;

class UserDataService {
    signUp(email, login, password) {
        console.log(`${USER_API_URL}/signup`);
        return axios.post(`${USER_API_URL}/signup`, {email, login, password} );
    }
}

export default new UserDataService();
