import styles from '../../styles/components/home.module.scss';
import clsx from 'clsx';

function Home() {
    return (
        <div className={clsx(styles.container)}>
            <h1>HOME</h1>
        </div>
    );
}

export default Home;
