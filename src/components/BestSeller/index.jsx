import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styles from '../../styles/core/bestSeller.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';

import HomeTitle from '../HomeTitle';
import ProductCard from '../ProductCard';
import ProductCardSkeleton from '../ProductCardSkeleton';
import ViewAllButton from '../ViewAllButton';

function BestSeller({ initLimit }) {
    const dispatch = useDispatch();
    const { products, loading, error, totalProducts } = useSelector((state) => state.products);
    const [limit] = useState(initLimit);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        dispatch(fetchProducts({ limit, skip, type: 'bestSeller' }));
    }, [dispatch, limit, skip]);

    const skeletonCards = useMemo(() => {
        return Array(limit)
            .fill(null)
            .map((_, index) => <ProductCardSkeleton key={index} />);
    }, [limit]);

    const productCards = useMemo(() => {
        if (loading.bestSeller) {
            return skeletonCards;
        }

        if (error.bestSeller) {
            return <div>Error: {error.bestSeller}</div>;
        }

        if (products.bestSeller.length === 0) {
            return <div>No products available</div>;
        }

        return products.bestSeller.map((product) => <ProductCard key={product._id} product={product} />);
    }, [loading.bestSeller, error.bestSeller, products.bestSeller, skeletonCards]);

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.headerContainer)}>
                <HomeTitle title={`This Month`} subTitle={`Best Selling Product`} />
                <ViewAllButton content='View All' page='homeBestSeller' />
            </div>
            <div className={clsx(styles.productContainer)}>
                {loading.bestSeller ? (
                    skeletonCards
                ) : error.bestSeller ? (
                    <div className={styles.errorContainer}>
                        <p>Error: {error.bestSeller}</p>
                        <button onClick={() => window.location.reload()}>Try Again</button>
                    </div>
                ) : products.bestSeller.length > 0 ? (
                    productCards
                ) : (
                    <div className={styles.noProductsContainer}>
                        <p>No products available</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BestSeller;
