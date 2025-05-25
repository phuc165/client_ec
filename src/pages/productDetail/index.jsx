import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchRelatedProducts } from '../../redux/slices/productSlice';
import styles from '../../styles/core/productDetail.module.scss';
import clsx from 'clsx';

import ImageGallery from '../../components/ProductGallery';
import StarRatingDisplay from '../../components/StarRatingDisplay';
import ProductHeart from '../../assets/svg/ProductHeart';
import Delivery from '../../assets/svg/Delivery';
import Return from '../../assets/svg/Return';
import ProductCard from '../../components/ProductCard';
import ProductCardSkeleton from '../../components/ProductCardSkeleton';
import HomeTitle from '../../components/HomeTitle';

function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleProduct, products, loading, error } = useSelector((state) => state.products);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (singleProduct?._id) {
            dispatch(fetchRelatedProducts({ productId: singleProduct._id, limit: 5, skip: 0 }));
        }
    }, [singleProduct, dispatch]);

    const [selectedColor, setSelectedColor] = useState(() => {
        if (singleProduct && singleProduct.attributes) {
            return singleProduct.attributes.find((attr) => attr.name === 'color')?.options[0] || null;
        }
        return null;
    });
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        if (singleProduct && singleProduct.attributes) {
            const defaultColor = singleProduct.attributes.find((attr) => attr.name === 'color')?.options[0];
            setSelectedColor((prev) => prev || defaultColor);
            if (singleProduct.variations?.length) {
                const firstVariation = singleProduct.variations[0];
                setSelectedSize((prev) => prev || firstVariation.attributes?.size?.[0]);
            }
        }
    }, [singleProduct]);

    if (loading.singleProduct) {
        return <div className={clsx(styles.container)}>Loading...</div>;
    }

    if (error.singleProduct) {
        return <div className={clsx(styles.container)}>Error: {error.singleProduct}</div>;
    }

    if (!singleProduct) {
        return <div className={clsx(styles.container)}>No product found</div>;
    }

    const selectedVariation =
        singleProduct.variations?.find((variation) => variation.attributes.color === selectedColor) || singleProduct.variations?.[0];

    const images =
        selectedVariation?.images || [singleProduct.image, singleProduct.image_2, singleProduct.image_3, singleProduct.image_4].filter(Boolean);

    const handleAttributeSelect = (attributeName, value) => {
        if (attributeName === 'color') {
            setSelectedColor(value);
        } else if (attributeName === 'size') {
            setSelectedSize(value);
        }
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const formatPrice = (price) => {
        return `$${parseFloat(price).toFixed(2)}`;
    };

    // Create skeleton cards for loading state (5 items to match limit)
    const skeletonCards = Array(5)
        .fill(null)
        .map((_, index) => <ProductCardSkeleton key={index} />);

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.product)}>
                <div className={clsx(styles.imageContainer)}>
                    <ImageGallery images={images} />
                </div>
                <div className={clsx(styles.infoContainer)}>
                    <div>{singleProduct.name}</div>
                    <div>
                        <StarRatingDisplay rating={singleProduct.ratings} />
                        <div>({singleProduct.no_of_ratings} Reviews)</div>
                    </div>
                    <div>{formatPrice(selectedVariation?.price || singleProduct.actual_price)}</div>
                    <div>{singleProduct.description}</div>
                    <hr />

                    {singleProduct.attributes?.map((attr, index) => (
                        <div key={`attr-${index}`} className={clsx(styles.attributeSection)}>
                            <h3>{attr.name === 'color' ? 'Colours:' : `${attr.name}:`}</h3>
                            <div>
                                {attr.options.map((option, optionIndex) => (
                                    <button
                                        key={`option-${index}-${optionIndex}`}
                                        onClick={() => handleAttributeSelect(attr.name, option)}
                                        className={clsx(styles.optionButton, {
                                            [styles.selected]: (attr.name === 'color' ? selectedColor : selectedSize) === option,
                                        })}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className={clsx(styles.buyContainer)}>
                        <div className={clsx(styles.quantityContainer)}>
                            <div onClick={decreaseQuantity}>-</div>
                            <div>{quantity}</div>
                            <div onClick={increaseQuantity}>+</div>
                        </div>
                        <button className={clsx(styles.buyNow)}>Buy Now</button>
                        <ProductHeart />
                    </div>

                    <div className={clsx(styles.afterBuyContainer)}>
                        <div className={clsx(styles.shippingContainer)}>
                            <div className={styles.icon}>
                                <Delivery />
                            </div>
                            <div className={styles.textBlock}>
                                <div className={styles.title}>Free Delivery</div>
                                <div className={styles.desc}>Enter your postal code for Delivery Availability</div>
                            </div>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={clsx(styles.returnContainer)}>
                            <div className={styles.icon}>
                                <Return />
                            </div>
                            <div className={styles.textBlock}>
                                <div className={styles.title}>Return Delivery</div>
                                <div className={styles.desc}>
                                    Free 30 Days Delivery Returns. <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Details</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.relatedProducts)}>
                <HomeTitle title={`Related Item`} />
                {loading.related ? (
                    <div className={clsx(styles.productContainer)}>{skeletonCards}</div>
                ) : error.related ? (
                    <div>Error: {error.related}</div>
                ) : products?.related?.length > 0 ? (
                    <div className={clsx(styles.productContainer)}>
                        {products.related.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div>No related products found</div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
