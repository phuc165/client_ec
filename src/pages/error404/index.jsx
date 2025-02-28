import styles from '../../styles/components/error404.module.scss';
import clsx from 'clsx';

function Error404() {
    return (
        <div className={clsx(styles.container)}>
            <h1>Error404</h1>
        </div>
    );
}

export default Error404;
