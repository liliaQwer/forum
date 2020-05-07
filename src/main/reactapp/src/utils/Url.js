//const FORUM_API_URL = "http://localhost:8080";
const FORUM_API_URL = "";
const USER_API_URL = `${FORUM_API_URL}/user`;
const POSTS_API_URL = `${FORUM_API_URL}/posts`;
const RESTORE_API_URL = `${FORUM_API_URL}/restore`;

const POSTS = "posts";
const SIGNIN = "signin";
const SIGNUP = "signup";
const RESTORE = "restore-password";

export {
    FORUM_API_URL, USER_API_URL, POSTS_API_URL,
    POSTS, SIGNIN, SIGNUP, RESTORE, RESTORE_API_URL
}
