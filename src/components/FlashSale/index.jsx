import React, { useEffect, useState, useMemo } from 'react';
import styles from '../../styles/components/flashSale.module.scss';
import clsx from 'clsx';
import axios from 'axios';

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

    // Fetch products with axios
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/product?limit=${limit}&skip=${skip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price`,
                );

                // Assuming your backend returns { success: true, message: "...", data: [...] }
                const { data } = response.data;

                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format from API');
                }

                // Map the products to match ProductCard expectations
                const validProducts = data.map((product) => ({
                    id: product.id || product._id, // Handle MongoDB _id if present
                    title: product.name, // Map 'name' to 'title' for consistency
                    price: product.actual_price, // Original price
                    discountedPrice: product.discount_price, // Already calculated by backend
                    rating: product.ratings,
                    reviews: product.no_of_ratings, // Map to reviews for consistency
                    images: product.image, // Assuming image is a single URL or array
                }));

                setProducts(validProducts);
                setTotalProducts(response.data.total || data.length); // Adjust based on your API response
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [skip, limit]);

    // Pagination handlers with safety checks
    const handleNextPage = () => {
        setSkip((prevSkip) => prevSkip + limit);
    };

    const handlePrevPage = () => {
        setSkip((prevSkip) => Math.max(0, prevSkip - limit));
    };

    // Memoized rendering of product cards for performance
    const productCards = useMemo(() => products.map((product) => <ProductCard key={product.id} product={product} />), [products]);

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.headerContainer)}>
                <HomeTitle title={`Today's`} subTitle={`Flash Sales`} />
                {/* <CountdownTimer /> */}
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
