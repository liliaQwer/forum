import axios from "axios";
import {CATEGORY_LIST, POSTS_API_URL} from "../utils/Url";
import UserService from "./UserService";

class PostService {
    getPostList(page, size) {
        const config = {
            params: {page, size}
        };
        return axios.get(`${POSTS_API_URL}`, config );
    }
    getPostById(id) {
        return axios.get(`${POSTS_API_URL}/${id}`);
    }
    getCategoryList() {
        return axios.get(`${CATEGORY_LIST}`);
    }
    addPost(title, category, description, content) {
        const headers =  {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserService.getAuthenticatedToken()}`
        }
        return axios.post(`${POSTS_API_URL}`, {title, category, description, content}, {headers: headers});
    }
}

export default new PostService();