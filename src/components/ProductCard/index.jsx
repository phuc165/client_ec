import styles from '../../styles/components/productCard.module.scss';
import clsx from 'clsx';
import StarRatingDisplay from '../StarRatingDisplay';
import ProductHeart from '../../assets/svg/ProductHeart';

const ProductCard = ({ product }) => {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.image)}>
                <img src={product.images} alt={product.title} />
                <div className={clsx(styles.addCartButton)}>Add To Cart</div>
                <div className={clsx(styles.discount)}>-{product.discountPercentage}%</div>
                <div className={clsx(styles.heart)}>
                    <ProductHeart />
                </div>
            </div>
            <div className={clsx(styles.title)}>{product.title}</div>
            <div className={clsx(styles.priceContainer)}>
                <div className={clsx(styles.newPrice)}>{product.price}</div>
                <div className={clsx(styles.oldPrice)}>{product.discountedPrice}</div>
            </div>
            <div className={clsx(styles.rateContainer)}>
                <StarRatingDisplay rating={product.rating} />
                <div className={clsx(styles.rate)}>({product.reviews})</div>
            </div>
        </div>
    );
};

export default ProductCard;
