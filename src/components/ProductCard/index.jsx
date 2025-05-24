import styles from '../../styles/core/productCard.module.scss';
import { Link } from 'react-router';
import clsx from 'clsx';
import StarRatingDisplay from '../StarRatingDisplay';
import ProductHeart from '../../assets/svg/ProductHeart';
import TrashIcon from '../../assets/svg/TrashIcon';
const ProductCard = ({ product, isWishlist }) => {
    // Calculate discount percentage
    const discountPercentage = ((1 - product.discount_price / product.actual_price) * 100).toFixed();

    return (
        <div className={styles.container}>
            <Link to={`/product/${[product._id]}`} className={styles.image}>
                <img src={product.image} alt={product.title} />
                <div className={styles.addCartButton}>Add To Cart</div>
                <div className={styles.discount}>-{discountPercentage}%</div>
                <div className={styles.heart}>{isWishlist ? <TrashIcon /> : <ProductHeart />}</div>
            </Link>
            <Link to={`/product/${[product._id]}`} className={styles.title}>
                {product.name}
            </Link>
            <div className={styles.priceContainer}>
                <div className={styles.newPrice}>${product.actual_price}</div>
                <div className={styles.oldPrice}>${product.discount_price}</div>
            </div>
            <div className={styles.rateContainer}>
                <StarRatingDisplay rating={product.ratings} />
                <div className={styles.rate}>({product.no_of_ratings})</div>
            </div>
        </div>
    );
};

export default ProductCard;
