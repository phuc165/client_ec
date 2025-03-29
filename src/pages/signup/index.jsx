import styles from '../../styles/core/signup.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router';

import SideImage from '../../components/SideImage';
function Signup() {
    return (
        <div className={clsx(styles.container)}>
            <SideImage />
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.title)}>Create an account</div>
                <div className={clsx(styles.subTitle)}>Enter your details below</div>
                <form action=''>
                    <input type='text' placeholder='Name' />
                    <input type='email' placeholder='Email of Phone Number' />
                    <input type='password' placeholder='Password' />
                    <button className={clsx(styles.createAcc)}>Create Account</button>
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
