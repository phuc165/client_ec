import styles from '../../styles/core/homeTitle.module.scss';
import clsx from 'clsx';

const HomeTitle = ({ title, subTitle }) => {
    return (
        <>
            <div className={clsx(styles.titleContainer)}>
                <div className={clsx(styles.mainTitle)}>
                    <div className={clsx(styles.titleDecor)}></div>
                    {title}
                </div>
                <div className={clsx(styles.subTitle)}>
                    <p>{subTitle}</p>
                </div>
            </div>
        </>
    );
};
export default HomeTitle;
