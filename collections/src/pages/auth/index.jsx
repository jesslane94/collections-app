import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserID } from '../../hooks/useGetUserID';

export const Auth = () => {
    const navigate = useNavigate();
    const { isAuth } = useGetUserID();

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
          };
          localStorage.setItem("auth", JSON.stringify(authInfo));
          navigate("/collections");
    };

    if (isAuth) {
        return < Navigate to="/collections" />;
    }

    return (
        <div className ="login-page">
        <p>Sign In with Google to Continue</p>
        <button className="login-google-button" onClick={signInWithGoogle}>
            {" "}
            Sign in with Google
        </button>
    </div>
    );
};