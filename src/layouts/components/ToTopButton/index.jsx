import { useEffect } from 'react';
import { useLocation } from 'react-router';
import styles from '../../../styles/core/toTopArrow.module.scss';
import clsx from 'clsx';
import UpArrow from '../../../assets/svg/UpArrow';

function ToTopButton() {
    const { pathname } = useLocation();

    // Automatically scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
