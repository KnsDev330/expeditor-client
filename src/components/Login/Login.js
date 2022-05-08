import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './Login.css';
import googleSvg from '../../images/google.svg';
import twitterSvg from '../../images/twitter.svg';
import { toast } from 'react-toastify';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle, useSignInWithTwitter } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.init';
import Loading from '../Loading/Loading';
import { URLS } from '../../Constants/CONSTS';
import axios from 'axios';
import { signOut } from 'firebase/auth';
const toastConfig = { position: "top-right", autoClose: 2000 };

const Login = () => {

    // use nagivate
    const navigate = useNavigate();

    // handle email login
    const [SignIn, , emailLoading, emailError] = useSignInWithEmailAndPassword(auth);
    const HandleLogin = e => {
        e.preventDefault();
        const [emailBox, passwordBox] = [e.target.email, e.target.password];
        const [email, password] = [emailBox.value, passwordBox.value];
        if (password.length < 6) {
            toast.error(`Password must be at least 6 characters long`, toastConfig);
            passwordBox.focus(); return;
        }
        SignIn(email, password);
    }

    // handle signinwith xxx
    const [signInWithGoogle, , googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithTwitter, , twitterLoading, twitterError] = useSignInWithTwitter(auth);

    // set JWT and navigate user on successfull registration
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (!user) return; // abort if user is not signed in
        axios.post(`${URLS.serverRoot}${URLS.getJwt}`, { uid: user.uid }, { headers: { 'content-type': 'application/json' } })
            .then(res => {

                // show error and sign out on no token
                const jwtToken = res.data?.token;
                if (!jwtToken) { toast.error(`Error: ${res?.data?.text}`, toastConfig); signOut(auth); return; }

                // set JWT to localstorage and navigate user
                localStorage.setItem('jwt', jwtToken);
                navigate(JSON.parse(localStorage.getItem("toLocation"))?.pathname || '/');
                localStorage.removeItem("toLocation");
                toast.success(`Success`, toastConfig);

            })
            .catch(err => toast.error(`Error: ${err?.response?.data?.data}`, toastConfig))
    }, [user, navigate]);

    // showing error if any
    useEffect(() => { emailError && toast.error(`${emailError.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [emailError]);
    useEffect(() => { googleError && toast.error(`${googleError.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [googleError]);
    useEffect(() => { twitterError && toast.error(`${twitterError.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [twitterError]);

    // showing loading screen if registering
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => { setShowLoading(!!emailLoading) }, [emailLoading]);
    useEffect(() => { setShowLoading(!!googleLoading) }, [googleLoading]);
    useEffect(() => { setShowLoading(!!twitterLoading) }, [twitterLoading]);

    return (
        <div className='site-mw mx-auto my-5'>
            <div className='register d-flex flex-column align-items-center pt-4 pb-5 mb-5'>

                <h2>Login</h2>

                {
                    showLoading ?
                        <>
                            <div className='mt-5'><Loading></Loading></div>
                        </>
                        :
                        <>
                            <small className='mb-4'>Log in to your account</small>

                            <form className='w-100' onSubmit={HandleLogin}>
                                <label htmlFor="email" className='text-label'>Email:</label>
                                <input type="email" autoComplete='on' className='form-control mx-auto mb-2' name="email" id="email" placeholder='Enter Email' required />
                                <label htmlFor="name" className='text-label'>Password:</label>
                                <input type="password" autoComplete='on' className='form-control mx-auto' name="password" id="password" placeholder='Enter Password' required />
                                <Button variant='success' type='submit' className='my-3 px-5 out'>Login</Button><br />
                                <small>New here? <Link to='/register'>Register</Link></small><br />
                                <small>Forgot Password? <Link to='/reset-password'>Reset</Link></small>
                            </form>

                            <div className='my-3'>
                                <hr className='login-hr' /> OR <hr className='login-hr' />
                            </div>

                            <button className='continue-with-button d-flex align-items-center' onClick={() => signInWithGoogle()}>
                                <img src={googleSvg} alt="Google" />
                                <p>Continue with Google</p>
                            </button>
                            <button className='continue-with-button d-flex align-items-center' onClick={() => signInWithTwitter()}>
                                <img src={twitterSvg} alt="Twitter" />
                                <p>Continue with Twitter</p>
                            </button>
                        </>
                }


            </div>
        </div >
    );
};

export default Login;