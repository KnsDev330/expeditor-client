import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './Register.css';
import googleSvg from '../../images/google.svg';
import twitterSvg from '../../images/twitter.svg';
import { toast } from 'react-toastify';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithGoogle, useSignInWithTwitter, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { URLS } from '../../Constants/CONSTS';
const toastConfig = { position: "top-right", autoClose: 2000 };

const Register = () => {

    // use navigate
    const navigate = useNavigate();

    // handle email registration
    const [updateProfile, updatingProfile, updateProfileError] = useUpdateProfile(auth);
    const [createUser, , emailLoading, emailError] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const HandleRegister = async e => {
        e.preventDefault();
        const [nameBox, emailBox, passwordBox] = [e.target.name, e.target.email, e.target.password];
        const [name, email, password] = [nameBox.value, emailBox.value, passwordBox.value];
        let updateName = false; // updates name if any
        if (name !== "" && name.length < 4) {
            toast.error(`Name must be at least 4 characters long`, toastConfig);
            nameBox.focus();
            return;
        } else {
            updateName = true;
        }
        if (password.length < 6) {
            toast.error(`Password must be at least 6 characters long`, toastConfig);
            passwordBox.focus();
            return;
        }
        await createUser(email, password);
        if (updateName) await updateProfile({ displayName: name });
    }

    // handle social registration
    const [signInWithGoogle, , googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithTwitter, , twitterLoading, twitterError] = useSignInWithTwitter(auth);

    // set JWT and navigate user on successfull registration
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            async function myFunc() {
                // console.log(user)
                const res = await axios({
                    url: `${URLS.serverRoot}${URLS.getJwt}`,
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    data: { accessToken: user.accessToken }
                });

                // show error and return if JWT token not found on response
                const jwtToken = res?.data?.data?.token;
                if (!jwtToken) return toast.error(`${res?.statusText}`, toastConfig);

                // set JWT to localstorage and navigate user
                localStorage.setItem('jwt', jwtToken);
                navigate(JSON.parse(localStorage.getItem("toLocation"))?.pathname || '/');
                localStorage.removeItem("toLocation");
            }
            myFunc();
        }
    }, [user, navigate]);

    // showing error if any
    useEffect(() => { emailError && toast.error(`${emailError.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [emailError]);
    useEffect(() => { googleError && toast.error(`${googleError.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [googleError]);
    useEffect(() => { twitterError && toast.error(`${twitterError.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [twitterError]);
    useEffect(() => { updateProfileError && toast.error(`${updateProfileError.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [updateProfileError]);

    // showing loading screen if registering
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => { setShowLoading(!!emailLoading) }, [emailLoading]);
    useEffect(() => { setShowLoading(!!googleLoading) }, [googleLoading]);
    useEffect(() => { setShowLoading(!!twitterLoading) }, [twitterLoading]);
    useEffect(() => { setShowLoading(!!updatingProfile) }, [updatingProfile]);

    return (
        <div className='site-mw mx-auto my-5'>
            <div className='register d-flex flex-column align-items-center pt-4 pb-5 mb-5'>

                <h2>Register</h2>

                {
                    showLoading ?
                        <>
                            <p className='mt-5'><Loading></Loading></p>
                        </>
                        :
                        <>
                            <small className='mb-4'>Register now to book an event with us and much more</small>

                            <form className='w-100' onSubmit={HandleRegister}>
                                <label htmlFor="name" className='text-label'>Name:</label>
                                <input type="text" autoComplete='on' className='form-control mx-auto mb-2' name="name" id="name" placeholder='Your Name' />
                                <label htmlFor="email" className='text-label'>Email:</label>
                                <input type="email" autoComplete='on' className='form-control mx-auto mb-2' name="email" id="email" placeholder='Enter Email' required />
                                <label htmlFor="name" className='text-label'>Password:</label>
                                <input type="password" autoComplete='on' className='form-control mx-auto' name="password" id="password" placeholder='Enter Password' required />
                                <Button variant='success' type='submit' className='my-3 px-5'>Register</Button><br />
                                <small>Already have account? <Link to='/login'>Login</Link></small>
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

export default Register;