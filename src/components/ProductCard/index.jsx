import styles from '../../styles/components/productCard.module.scss';
import clsx from 'clsx';
import StarRatingDisplay from '../StarRatingDisplay';
import ProductHeart from '../../assets/svg/ProductHeart';

const ProductCard = ({ product }) => {
    // Calculate discount percentage
    const discountPercentage = ((1 - product.discountedPrice / product.price) * 100).toFixed();

    return (
        <div className={styles.container}>
            {/* Product image with overlay elements */}
            <div className={styles.image}>
                <img src={product.images} alt={product.title} />

                {/* Action buttons and badges */}
                <div className={styles.addCartButton}>Add To Cart</div>
                <div className={styles.discount}>-{discountPercentage}%</div>
                <div className={styles.heart}>
                    <ProductHeart />
                </div>
            </div>

            {/* Product information */}
            <div className={styles.title}>{product.title}</div>

            {/* Price information */}
            <div className={styles.priceContainer}>
                <div className={styles.newPrice}>${product.price}</div>
                <div className={styles.oldPrice}>${product.discountedPrice}</div>
            </div>

            {/* Rating information */}
            <div className={styles.rateContainer}>
                <StarRatingDisplay rating={product.rating} />
                <div className={styles.rate}>({product.reviews})</div>
            </div>
        </div>
    );
};

export default ProductCard;
