import React, {useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { SignUpProps } from '../models/propInterface';
import { auth, provider } from '../config/firebase';
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, updateProfile } from '@firebase/auth';
import { AuthObject, AuthReturnObject } from '../models/ApiInterfaces';

const SignUpPage = ({ userUID, setUserUID, setIsAuth, isAuth }: SignUpProps) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [createAccountErr, setCreateAccountErr] = useState<boolean>(true);
    const [isEmailExist, setIsEmailExist] = useState<boolean>(false);

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const currentAuth = getAuth();
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup (auth, provider).then((result) => {
            setIsAuth(!(auth as AuthObject).currentUser.isAnonymous);
            localStorage.setItem("isAuth", `${!(auth as AuthObject).currentUser.isAnonymous}`);
            setUserUID((auth as AuthObject).currentUser.uid);
            navigate("/home");
        });
    };

    const registerUser = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if(!emailRegex.test(email)) return

            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(user);
            setUserUID(user.user.uid);

            await updateProfile(currentAuth.currentUser!, {
                displayName: `${name}`
            });

            setIsAuth(true);
            localStorage.setItem(
                "isAuth",
                `${!(auth as AuthObject).currentUser.isAnonymous}`
            );

            navigate("/home");
        } catch (error) {
            setCreateAccountErr(!createAccountErr);
            setIsEmailExist(true);
        }
    };
    return( 
        <>
            {isAuth ?
            <div>
                {isEmailExist ? <p>Account Exists</p> : null}
                <button onClick={signInWithGoogle}>Sign in with google</button>
                <form
                    aria-label="form"
                    name="createAccount"
                    onSubmit={(e) => {
                        registerUser(e);
                    }}
                >
                    <label htmlFor="name" className="sr-only">
                        Enter your name
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="email" className="sr-only">
                        Enter your email
                    </label>
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password" className="sr-only">
                        Enter your password
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Create an account</button>
                </form>
            </div> : 
            <Navigate to="/home" replace />}
        </>
    )
};

export default SignUpPage