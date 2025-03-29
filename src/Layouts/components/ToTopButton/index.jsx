import styles from '../../../styles/core/toTopArrow.module.scss';
import clsx from 'clsx';
import UpArrow from '../../../assets/svg/UpArrow';

function ToTopButton() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button onClick={scrollToTop} className={styles.toTopButton}>
            <UpArrow />
        </button>
    );
}

export default ToTopButton;
