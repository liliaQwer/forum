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
    editPost(id, title, category, description, content, version) {
        const headers =  {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserService.getAuthenticatedToken()}`
        }
        return axios.put(`${POSTS_API_URL}/${id}`, {id, title, category, description, content, version}, {headers: headers});
    }
    deletePost(id) {
        const config = {
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${UserService.getAuthenticatedToken()}`
            },
            data: id
        }
        return axios.delete(`${POSTS_API_URL}`, config);
    }
    getPostComments(postId, page, size) {
        const config = {
            params: {page, size}
        };
        return axios.get(`${POSTS_API_URL}/${postId}/comments`, config);
    }
    addComment(postId, comment) {
        const headers =  {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserService.getAuthenticatedToken()}`
        }
        return axios.post(`${POSTS_API_URL}/${postId}/comments`, {content: comment, postId: postId}, {headers: headers});
    }
    deleteComment(postId, commentId) {
        const config = {
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${UserService.getAuthenticatedToken()}`
            },
            data: commentId
        }
        return axios.delete(`${POSTS_API_URL}/${postId}/comments`, config);
    }
    addCommentLike(postId, commentId) {
        return axios.post(`${POSTS_API_URL}/${postId}/comments/${commentId}/like`);
    }
    addCommentDislike(postId, commentId) {
        return axios.post(`${POSTS_API_URL}/${postId}/comments/${commentId}/dislike`);
    }
}

export default new PostService();