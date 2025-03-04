import React, { useEffect, useState, useMemo } from 'react';
import styles from '../../styles/components/flashSale.module.scss';
import clsx from 'clsx';

import CountdownTimer from '../CountdownTimer';
import TitleDecor from '../TitleDecor';
import ProductCard from '../ProductCard';
import ViewAllButton from '../ViewAllButton';
import LeftArrowButton from '../LeftArrowButton';
import RightArrowButton from '../RightArrowButton';
import ProductCardSkeleton from '../ProductCardSkeleton';

const FlashSale = () => {
    // State management
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [skip, setSkip] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    // Fetch products with improved error handling and data management
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://dummyjson.com/products?limit=4&skip=${skip}&select=title,price,rating,discountPercentage,reviews,images`,
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();

                // Validate and transform product data
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
    }, [skip]);

    // Helper function to calculate discounted price
    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
        return ((originalPrice * (100 - discountPercentage)) / 100).toFixed(2);
    };

    // Pagination handlers with safety checks
    const handleNextPage = () => {
        if (skip + 4 < totalProducts) {
            setSkip((prevSkip) => prevSkip + 4);
        }
    };

    const handlePrevPage = () => {
        setSkip((prevSkip) => Math.max(0, prevSkip - 4));
    };

    // Memoized rendering of product cards for performance
    const productCards = useMemo(
        () =>
            products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={{
                        ...product,
                        discountedPrice: calculateDiscountedPrice(product.price, product.discountPercentage),
                    }}
                />
            )),
        [products],
    );

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.title)}>
                <TitleDecor />
                Today's
            </div>
            <div className={clsx(styles.subTitle)}>
                <p>Flash Sales</p>
                <CountdownTimer />
                <div className={clsx(styles.navigation)}>
                    <LeftArrowButton onClick={handlePrevPage} skip={skip} />
                    <RightArrowButton onClick={handleNextPage} skip={skip} totalProducts={totalProducts} />
                </div>
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
