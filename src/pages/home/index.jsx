import styles from '../../styles/home.module.scss';
import clsx from 'clsx';

function Home() {
    return (
        <div>
            <h1 className={clsx(styles.home)}>Home</h1>
        </div>
    );
}

export default Home;
