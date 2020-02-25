import axios from "axios";
import {POSTS_API_URL} from "../utils/Url";

class PostService {
    getPostList(page, size) {
        const config = {
            params: {page, size}
        };
        return axios.get(`${POSTS_API_URL}`, config );
    }
}

export default new PostService();