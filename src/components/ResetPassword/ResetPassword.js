import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import './ResetPassword.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase.init';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
const toastConfig = { position: "top-right", autoClose: 2000 };

const ResetPassword = () => {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    useEffect(() => { error && toast.error(`${error.code.slice(5).replace(/-/g, ' ')}`, toastConfig) }, [error]);
    useEffect(() => { sending && toast.info(`Sending your password reset email`, toastConfig) }, [sending]);

    const ResetPassword = e => {
        e.preventDefault();
        const email = e.target.email.value;
        sendPasswordResetEmail(email);
    }

    return (
        <div className='site-mw mx-auto my-5'>
            <div className='register d-flex flex-column align-items-center pt-4 pb-5 mb-5'>

                <h2>Reset Password</h2>
                <small className='mb-4'>Reset your account password</small>

                <form className='w-100' onSubmit={ResetPassword}>
                    <label htmlFor="email" className='text-label'>Email:</label>
                    <input type="email" autoComplete='on' className='form-control mx-auto mb-2' name="email" id="email" placeholder='Enter Email' required />
                    <Button variant='success' type='submit' className='my-3 px-5 out'>Reset</Button><br />
                    <small>Return to <Link to='/login'>Login</Link></small><br />
                </form>

            </div>
        </div >
    );
};

export default ResetPassword;