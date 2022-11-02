import { useNavigate, useSearchParams} from "react-router-dom";
import UserService from "../../services/UserService";
import {POSTS, POSTS_API_URL, SIGNIN_API_URL} from "../../utils/Url";
import {useEffect} from "react";

export default function () {
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    const error = searchParams.get('error');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            UserService.setAuthenticatedToken(token);
            navigate(`${POSTS_API_URL}`);
        }
        if (error) {
            navigate(`${SIGNIN_API_URL}?error=${error}`);
        }
    });

    return null;
}
