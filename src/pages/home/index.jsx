import styles from '../../styles/components/home.module.scss';
import clsx from 'clsx';

import Category from '../../components/Category';

function Home() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.belowHeader)}>
                <Category></Category>
                <div className={clsx(styles.verticalLine)}></div>
            </div>

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
        </div>
    );
}

export default Home;
