import React, { useEffect, useState, useMemo } from 'react';
import styles from '../../styles/components/flashSale.module.scss';
import clsx from 'clsx';

import CountdownTimer from '../CountdownTimer';
import HomeTitle from '../HomeTitle';
import ProductCard from '../ProductCard';
import ViewAllButton from '../ViewAllButton';
import Navigation from '../Navigation';
import ProductCardSkeleton from '../ProductCardSkeleton';

const FlashSale = ({ initLimit }) => {
    // State management
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit] = useState(initLimit);
    const [skip, setSkip] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    // Fetch products with improved error handling and data management
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=id,title,price,rating,discountPercentage,reviews,images`,
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();

                const validProducts = data.products.map((product) => ({
                    ...product,
                    discountedPrice: calculateDiscountedPrice(product.price, product.discountPercentage),
                }));

                setProducts(validProducts);
                setTotalProducts(data.total);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [skip, limit]);

    // Helper function to calculate discounted price
    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
        return ((originalPrice * (100 - discountPercentage)) / 100).toFixed(2);
    };

    // Pagination handlers with safety checks
    const handleNextPage = () => {
        if (skip + limit < totalProducts) {
            setSkip((prevSkip) => prevSkip + limit);
        }
    };

    const handlePrevPage = () => {
        setSkip((prevSkip) => Math.max(0, prevSkip - limit));
    };

    // Memoized rendering of product cards for performance
    const productCards = useMemo(
        () =>
            products.map((product) => (
                <ProductCard key={product.id} product={product} /> // Simplified, as discountedPrice is already in product
            )),
        [products],
    );

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.headerContainer)}>
                <HomeTitle title={`Today's`} subTitle={`Flash Sales`} />
                <CountdownTimer />
                <Navigation limit={limit} skip={skip} totalProducts={totalProducts} onNextPage={handleNextPage} onPrevPage={handlePrevPage} />
            </div>
            <div className={clsx(styles.productContainer)}>
                {loading ? (
                    <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                ) : error ? (
                    <div className={styles.errorContainer}>
                        <p>Error: {error}</p>
                        <button onClick={() => window.location.reload()}>Try Again</button>
                    </div>
                ) : products.length > 0 ? (
                    productCards
                ) : (
                    <div className={styles.noProductsContainer}>
                        <p>No products available</p>
                    </div>
                )}
            </div>
            <ViewAllButton content='View All Products' page='homeFlashSale' />
        </div>
    );
};

export default FlashSale;
