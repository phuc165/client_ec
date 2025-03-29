import styles from '../../styles/core/leftArrowButton.module.scss';
import clsx from 'clsx';
import LeftArrow from '../../assets/svg/LeftArrow';

const LeftArrowButton = ({ skip, onClick }) => {
    return (
        <button onClick={onClick} disabled={skip === 0} className={skip === 0 ? styles.disabledButton : ''}>
            <LeftArrow />
        </button>
    );
};

export default LeftArrowButton;
