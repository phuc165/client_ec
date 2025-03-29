import styles from '../../styles/core/leftArrowButton.module.scss';
import clsx from 'clsx';
import RightArrow from '../../assets/svg/RightArrow';

const RightArrowButton = ({ skip, totalProducts, onClick }) => {
    return (
        <button onClick={onClick} disabled={skip + 4 >= totalProducts} className={skip + 4 >= totalProducts ? styles.disabledButton : ''}>
            <RightArrow />
        </button>
    );
};

export default RightArrowButton;
