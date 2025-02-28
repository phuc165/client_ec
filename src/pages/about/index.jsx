import styles from '../../styles/components/about.module.scss';
import clsx from 'clsx';

function About() {
    return (
        <div className={clsx(styles.container)}>
            <h1>About</h1>
        </div>
    );
}

export default About;
