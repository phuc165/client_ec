import styles from '../../styles/components/login.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router';

import SideImage from '../../components/SideImage';
function Login() {
    return (
        <div className={clsx(styles.container)}>
            <SideImage />
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.title)}>Login To EPrett</div>
                <div className={clsx(styles.subTitle)}>Enter your details below</div>
                <form action=''>
                    <input type='email' placeholder='Email of Phone Number' />
                    <input type='password' placeholder='Password' />
                    <div className={clsx(styles.buttonContainer)}>
                        <button className={clsx(styles.createAcc)}>Login </button>
                        <Link className={clsx(styles.forgetPass)}>Forget Password ?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
