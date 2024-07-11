import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // Display error while entering login details

    const navigate = useNavigate();

    const logIn = async () => {
        try{
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate("/articles");   // navigate the user to ArticleListPage after successful login
        } catch (e) {
            setError(e.message);
        }
    }

    return(
        <>
        <div id="login-form">
            <h1>Log In</h1>
            {error && <p className="error">{error}</p>} 
            <input placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Your password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={logIn}>Log In</button>            
        </div>
        <br/>
        Don't have an account? <Link to="/create-account">Create one here</Link>            
        </>
    );
}

export default LoginPage;