import axios from "axios";
import {POSTS_API_URL} from "../utils/Url";

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
}

export default new PostService();