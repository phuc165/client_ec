import React, { useEffect, useState, useMemo } from 'react';
import styles from '../../styles/core/bestSeller.module.scss';
import clsx from 'clsx';
import axios from 'axios';

import HomeTitle from '../HomeTitle';
import ProductCard from '../ProductCard';
import ProductCardSkeleton from '../ProductCardSkeleton';
import ViewAllButton from '../ViewAllButton';

function BestSeller() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit] = useState(4);
    const [skip, setSkip] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/product/bestSeller?limit=${limit}&skip=${skip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price,sales`,
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

    const productCards = useMemo(() => products.map((product) => <ProductCard key={product.id} product={product} />), [products]);

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.headerContainer)}>
                <HomeTitle title={`This Month`} subTitle={`Best Selling Product`} />
                <ViewAllButton content='View All' page='homeBestSeller' />
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
        </div>
    );
}

export default BestSeller;
