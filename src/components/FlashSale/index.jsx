import React, { useEffect, useState, useMemo, useCallback } from 'react'; // Added useCallback
import styles from '../../styles/core/flashSale.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';

import Timer from '../Timer';
import HomeTitle from '../HomeTitle';
import ProductCard from '../ProductCard';
import ViewAllButton from '../ViewAllButton';
import Navigation from '../Navigation';
import ProductCardSkeleton from '../ProductCardSkeleton';

const FlashSale = ({ initLimit }) => {
    const dispatch = useDispatch();
    const { products, loading, error, totalProducts } = useSelector((state) => state.products);
    const [limit] = useState(initLimit);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        dispatch(fetchProducts({ limit, skip, type: 'flashSale' }));
    }, [dispatch, limit, skip]);

    const handleNextPage = useCallback(() => {
        const nextSkip = skip + limit;
        dispatch(fetchProducts({ limit, skip: nextSkip, type: 'flashSale' }));
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
        if (loading.flashSale) {
            return skeletonCards;
        }

        if (error.flashSale) {
            return <div>Error: {error.flashSale}</div>;
        }

        if (products.flashSale.length === 0) {
            return <div>No products available</div>;
        }

        return products.flashSale.map((product) => <ProductCard key={product._id} product={product} />);
    }, [loading.flashSale, error.flashSale, products.flashSale, skeletonCards]);
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.headerContainer)}>
                <HomeTitle title={`Today's`} subTitle={`Flash Sales`} />
                <Timer timerName='flash sale timer' styleType='flash-sale' />
                <Navigation limit={limit} skip={skip} totalProducts={totalProducts} onNextPage={handleNextPage} onPrevPage={handlePrevPage} />{' '}
                {/* totalProducts might not be fully accurate anymore */}
            </div>
            <div className={clsx(styles.productContainer)}>
                {loading.flashSale ? (
                    skeletonCards
                ) : error.flashSale ? (
                    <div className={styles.errorContainer}>
                        <p>Error: {error.flashSale}</p>
                        <button onClick={() => window.location.reload()}>Try Again</button>
                    </div>
                ) : products.flashSale.length > 0 ? (
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
