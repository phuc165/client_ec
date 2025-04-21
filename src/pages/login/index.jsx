import styles from '../../styles/core/login.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login, resetAuthState } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';

import SideImage from '../../components/SideImage';

function Login() {
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

        // Show error message if login fails
        if (error) {
            toast.error(error);
            dispatch(resetAuthState());
        }
    }, [navigate, userInfo, error, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className={clsx(styles.container)}>
            <SideImage />
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.title)}>Login To EPrett</div>
                <div className={clsx(styles.subTitle)}>Enter your details below</div>
                <form onSubmit={handleSubmit}>
                    <input type='email' placeholder='Email or Phone Number' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className={clsx(styles.buttonContainer)}>
                        <button type='submit' className={clsx(styles.createAcc)} disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        <Link className={clsx(styles.forgetPass)}>Forget Password ?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
