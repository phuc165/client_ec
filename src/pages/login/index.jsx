import styles from '../../styles/components/login.module.scss';
import clsx from 'clsx';

function Login() {
    return (
        <div className={clsx(styles.container)}>
            <h1>Login</h1>
        </div>
    );
}

export default Login;
