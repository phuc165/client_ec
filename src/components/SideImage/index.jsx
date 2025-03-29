import styles from '../../styles/core/sideImage.module.scss';
import clsx from 'clsx';
function SideImage() {
    return (
        <div className={clsx(styles.sideImage)}>
            <img src='../../../public/images/login/sideImage.png' alt='' />
        </div>
    );
}

export default SideImage;
