const FORUM_API_URL = "";
const USER_API_URL = `${FORUM_API_URL}/user`;
const POSTS_API_URL = `${FORUM_API_URL}/posts`;
const POST_API_URL = `${FORUM_API_URL}/post`;
const RESTORE_API_URL = `${FORUM_API_URL}/restore`;
const SIGNIN_API_URL = `${FORUM_API_URL}/signin`;
const SIGNUP_API_URL = `${FORUM_API_URL}/signup`;
const RESTORE_PASSWORD_URL = `${FORUM_API_URL}/restore-password`;

const POSTS = "posts";
const SIGNIN = "signin";
const SIGNUP = "signup";
const CATEGORY_LIST = "/post_categories";
const API_BASE_URL = 'http://localhost:8080';
const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook';//?redirect_uri=' + OAUTH2_REDIRECT_URI;


export {
    FORUM_API_URL, USER_API_URL, POSTS_API_URL,
    POSTS, SIGNIN, SIGNUP, RESTORE_API_URL, SIGNIN_API_URL, SIGNUP_API_URL, RESTORE_PASSWORD_URL, POST_API_URL,
    CATEGORY_LIST, FACEBOOK_AUTH_URL
}
