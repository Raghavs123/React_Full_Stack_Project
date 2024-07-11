import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");  // Display error while entering create account/signup details

    const navigate = useNavigate();

    const createAccount = async () => {
        try{
            if(password !== confirmPassword){
                setError("Password and confirm password do not match");
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate("/articles");   // navigate the user to ArticleListPage after successful create-account/signup
        } catch (e) {
            setError(e.message);
        }
    }

    return(
        <>
        <div id="signup-form">
            <h1>Create Account</h1>
            {error && <p className="error">{error}</p>} 
            <input placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Your password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input placeholder="Confirm password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button onClick={createAccount}>Create Account</button>            
        </div>
        <br/>
        Already have an account? <Link to="/login">Log in</Link>            
        </>
    );
}

export default CreateAccountPage;