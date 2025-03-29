import styles from '../../styles/core/upperFooter.module.scss';
import clsx from 'clsx';

const UpperFooter = () => {
    return (
        <div className={clsx(styles.upperFooter)}>
            <div className={clsx(styles.upperFooterContent)}>
                <div className={clsx(styles.image)}>
                    <img src='/images/home/upperFooter/Services_1.png' alt='' />
                </div>
                <h1>FREE AND FAST DELIVERY</h1>
                <p>Free delivery for all orders over $140</p>
            </div>
            <div className={clsx(styles.upperFooterContent)}>
                <div className={clsx(styles.image)}>
                    <img src='/images/home/upperFooter/Services_2.png' alt='' />
                </div>
                <h1>24/7 CUSTOMER SERVICE</h1>
                <p>Friendly 24/7 customer support</p>
            </div>
            <div className={clsx(styles.upperFooterContent)}>
                <div className={clsx(styles.image)}>
                    <img src='/images/home/upperFooter/Services_3.png' alt='' />
                </div>
                <h1>MONEY BACK GUARANTEE</h1>
                <p>We return money within 30 days</p>
            </div>
        </div>
    );
};

export default UpperFooter;
