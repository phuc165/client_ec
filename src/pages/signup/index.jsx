import styles from '../../styles/core/signup.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { register, resetAuthState } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';

import SideImage from '../../components/SideImage';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        // If user is already logged in, redirect to home page
        if (userInfo) {
            navigate('/');
        }

        // Show error message if registration fails
        if (error) {
            toast.error(error);
            dispatch(resetAuthState());
        }
    }, [navigate, userInfo, error, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password }));
    };

    return (
        <div className={clsx(styles.container)}>
            <SideImage />
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.title)}>Create an account</div>
                <div className={clsx(styles.subTitle)}>Enter your details below</div>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type='email' placeholder='Email or Phone Number' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type='submit' className={clsx(styles.createAcc)} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <div
                        id='g_id_onload'
                        data-client_id='YOUR_GOOGLE_CLIENT_ID'
                        data-login_uri='https://your.domain/your_login_endpoint'
                        data-auto_prompt='false'
                    ></div>
                    <div
                        className='g_id_signin'
                        data-type='standard'
                        data-size='large'
                        data-theme='outline'
                        data-text='sign_in_with'
                        data-shape='rectangular'
                        data-logo_alignment='left'
                    ></div>
                </form>
                <div className={clsx(styles.loginContainer)}>
                    <div className={clsx(styles.loginSession)}>Already have an account?</div>
                    <Link to='/login' className={clsx(styles.loginLink)}>
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
