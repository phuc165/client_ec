import styles from '../../styles/core/viewAllButton.module.scss';
import clsx from 'clsx';

const ViewAllButton = ({ content, page, className, ...prop }) => {
    return (
        <button className={clsx(styles.button, styles[page], className)} {...prop}>
            {content}
        </button>
    );
};

export default ViewAllButton;
