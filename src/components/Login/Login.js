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
const toastConfig = { position: "top-right", autoClose: 2000 };

const Login = () => {

    // use nagivate
    const navigate = useNavigate();

    // handle email login
    const [SignIn, , loading, error] = useSignInWithEmailAndPassword(auth);
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
    const [signInWithGoogle, , loading2, error2] = useSignInWithGoogle(auth);
    const [signInWithTwitter, , loading3, error3] = useSignInWithTwitter(auth);

    // set JWT and navigate user on successfull registration
    const [userx] = useAuthState(auth);
    useEffect(() => {
        if (userx) {
            console.log(userx);
            navigate(JSON.parse(localStorage.getItem("toLocation"))?.pathname || '/');
            localStorage.removeItem("toLocation");
        }
    }, [userx]);

    // showing error if any
    useEffect(() => { error && toast.error(`${error.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [error]);
    useEffect(() => { error2 && toast.error(`${error2.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [error2]);
    useEffect(() => { error3 && toast.error(`${error3.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [error3]);

    // showing loading screen if registering
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => { setShowLoading(!!loading) }, [loading]);
    useEffect(() => { setShowLoading(!!loading2) }, [loading2]);
    useEffect(() => { setShowLoading(!!loading3) }, [loading3]);

    return (
        <div className='site-mw mx-auto my-5'>
            <div className='register d-flex flex-column align-items-center pt-4 pb-5 mb-5'>

                <h2>Login</h2>

                {
                    showLoading ?
                        <>
                            <p className='mt-5'><Loading></Loading></p>
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