import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice'; // Ensure the correct path
import styles from '../../styles/core/exploreProduct.module.scss';
import clsx from 'clsx';
import HomeTitle from '../HomeTitle';
import ProductCard from '../ProductCard';
import ViewAllButton from '../ViewAllButton';
import Navigation from '../Navigation';
import ProductCardSkeleton from '../ProductCardSkeleton';

function ExploreProduct({ initLimit }) {
    const dispatch = useDispatch();
    const { products, loading, error, totalProducts } = useSelector((state) => state.products);
    const [limit] = useState(initLimit);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        dispatch(fetchProducts({ limit, skip, type: 'explore' }));
    }, [dispatch, limit, skip]);

    const handleNextPage = useCallback(() => {
        const nextSkip = skip + limit;
        dispatch(fetchProducts({ limit, skip: nextSkip, type: 'explore' }));
        setSkip(nextSkip);
    }, [dispatch, limit, skip]);

    const handlePrevPage = useCallback(() => {
        setSkip((prevSkip) => Math.max(0, prevSkip - limit));
    }, [limit]);

    const skeletonCards = useMemo(() => {
        return Array(limit)
            .fill(null)
            .map((_, index) => <ProductCardSkeleton key={index} />);
    }, [limit]);

    const productCards = useMemo(() => {
        if (loading.explore) {
            return skeletonCards;
        }

        if (error.explore) {
            return <div>Error: {error.explore}</div>;
        }

        if (products.explore.length === 0) {
            return <div>No products available</div>;
        }

        return products.explore.map((product) => <ProductCard key={product._id} product={product} />);
    }, [loading.explore, error.explore, products.explore, skeletonCards]);

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.headerContainer)}>
                <HomeTitle title={`Our Products`} subTitle={`Explore Our Products`} />
                <Navigation limit={limit} skip={skip} totalProducts={totalProducts} onNextPage={handleNextPage} onPrevPage={handlePrevPage} />{' '}
                {/* totalProducts might not be fully accurate anymore */}
            </div>
            <div className={clsx(styles.productContainer)}>
                {loading.explore ? (
                    skeletonCards
                ) : error.explore ? (
                    <div className={styles.errorContainer}>
                        <p>Error: {error.explore}</p>
                        <button onClick={() => window.location.reload()}>Try Again</button>
                    </div>
                ) : products.explore.length > 0 ? (
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
}

export default ExploreProduct;
