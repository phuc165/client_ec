import styles from '../../styles/core/productCardSkeleton.module.scss';
import clsx from 'clsx';

const ProductCardSkeleton = () => {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.image)}>
                <div className={styles.skeletonImageContent}></div>
                <div className={styles.addCartButton}>Add To Cart</div>
                <div className={styles.discount}>-00%</div>
                <div className={styles.heart}></div>
            </div>
            <div className={styles.title}></div>
            <div className={styles.priceContainer}>
                <div className={styles.newPrice}></div>
                <div className={styles.oldPrice}></div>
            </div>
            <div className={styles.rateContainer}>
                <div className={styles.stars}></div>
                <div className={styles.rate}></div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
