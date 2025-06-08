import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styles from '../../styles/core/whislist.module.scss';
import clsx from 'clsx';
import axios from 'axios';

import HomeTitle from '../../components/HomeTitle';
import ProductCard from '../../components/ProductCard';
import ProductCardSkeleton from '../../components/ProductCardSkeleton';
import Navigation from '../../components/Navigation';

function Whislist() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit] = useState(4);
    const [skip, setSkip] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    const fetchProducts = useCallback(
        async (currentSkip) => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `${API_BASE_URL}/product?limit=${limit}&skip=${currentSkip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price`,
                );

                const { data, total } = response.data; // Destructure total - might be still useful for totalProducts state

                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format from API');
                }

                setTotalProducts(total || 0); // Still update totalProducts if backend provides it
                setLoading(false);
                return data; // Return the fetched products
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
    const productCards = useMemo(() => products.map((product) => <ProductCard key={product._id} product={product} isWishlist={true} />), [products]);
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.whislistContainer)}>
                <div className={clsx(styles.headerContainer)}>
                    <div className={clsx(styles.title)}>
                        Wishlist <span>(4)</span>
                    </div>
                    <button className={clsx(styles.moveToBag)}>Move All To Bag</button>
                </div>
                <div className={clsx(styles.navigation)}>
                    <Navigation limit={limit} skip={skip} totalProducts={totalProducts} onNextPage={handleNextPage} onPrevPage={handlePrevPage} />
                </div>

                <div className={clsx(styles.productContainer)}>
                    {loading ? (
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
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
            </div>
            <div className={clsx(styles.just4uContainer)}>
                <HomeTitle title={`Just For You`} />
                <div className={clsx(styles.spacing)}></div>
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
            </div>
        </div>
    );
}

export default Whislist;
