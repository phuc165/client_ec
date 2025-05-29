// src/components/ProductCard.js
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import styles from '../../styles/core/productCard.module.scss';
import { Link } from 'react-router';
import clsx from 'clsx';
import StarRatingDisplay from '../StarRatingDisplay';
import ProductHeart from '../../assets/svg/ProductHeart';
import TrashIcon from '../../assets/svg/TrashIcon';

const ProductCard = ({ product, isWishlist }) => {
    const dispatch = useDispatch();
    const discountPercentage = ((1 - product.discount_price / product.actual_price) * 100).toFixed();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(
            addToCart({
                productId: product._id,
                attributes: { color: 'Black', size: 'Small' },
                quantity: 1,
                productData: {
                    name: product.name,
                    image: product.image,
                    price: product.discount_price,
                },
            }),
        );
    };

    return (
        <div className={styles.container}>
            <Link to={`/product/${product._id}`} className={styles.image}>
                <img src={product.image} alt={product.name} />
                <div className={styles.discount}>-{discountPercentage}%</div>
                <div className={styles.heart}>{isWishlist ? <TrashIcon /> : <ProductHeart />}</div>
                <button className={styles.addCartButton} onClick={handleAddToCart}>
                    Add To Cart
                </button>
            </Link>
            <Link to={`/product/${product._id}`} className={styles.title}>
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
