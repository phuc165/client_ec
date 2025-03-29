import React, { useEffect, useState, useMemo, useCallback } from 'react'; // Added useCallback
import styles from '../../styles/core/flashSale.module.scss';
import clsx from 'clsx';
import axios from 'axios';

import Timer from '../Timer';
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
    const [totalProducts, setTotalProducts] = useState(0); // Still keep totalProducts for Navigation component if needed, but logic will change

    // Fetch products function (reusable) - using useCallback for performance optimization
    const fetchProducts = useCallback(
        async (currentSkip) => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/product?limit=${limit}&skip=${currentSkip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price`,
                );

                const { data, total } = response.data; // Destructure total - might be still useful for totalProducts state

                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format from API');
                }

                const validProducts = data.map((product) => ({
                    id: product.id || product._id,
                    title: product.name,
                    price: product.actual_price,
                    discountedPrice: product.discount_price,
                    rating: product.ratings,
                    reviews: product.no_of_ratings,
                    images: product.image,
                }));

                setTotalProducts(total || 0); // Still update totalProducts if backend provides it
                setLoading(false);
                return validProducts; // Return the fetched products
            } catch (err) {
                setError(err.message || 'Failed to fetch products');
                setLoading(false);
                return []; // Return empty array in case of error
            }
        },
        [limit],
    );

    // Initial fetch
    useEffect(() => {
        const initialLoad = async () => {
            const initialProducts = await fetchProducts(skip);
            setProducts(initialProducts);
        };
        initialLoad();
    }, [fetchProducts, skip]); // skip dependency is still needed for initial load from skip 0

    // Pagination handlers
    const handleNextPage = async () => {
        const nextSkip = skip + limit;
        const nextProducts = await fetchProducts(nextSkip);

        if (nextProducts.length > 0) {
            setProducts(nextProducts); // Replace current products with next page products
            setSkip(nextSkip);
        } else {
            console.log('No more products to load');
            // Optionally disable next page button or show message to user
        }
    };

    const handlePrevPage = () => {
        setSkip((prevSkip) => Math.max(0, prevSkip - limit));
    };
    // Memoized rendering
    const productCards = useMemo(() => products.map((product) => <ProductCard key={product.id} product={product} />), [products]);
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.headerContainer)}>
                <HomeTitle title={`Today's`} subTitle={`Flash Sales`} />
                <Timer timerName='flash sale timer' styleType='flash-sale' />
                <Navigation limit={limit} skip={skip} totalProducts={totalProducts} onNextPage={handleNextPage} onPrevPage={handlePrevPage} />{' '}
                {/* totalProducts might not be fully accurate anymore */}
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
