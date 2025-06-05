import styles from '../../styles/core/categories.module.scss';
import clsx from 'clsx';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import Navigation from '../Navigation';
import HomeTitle from '../HomeTitle';
import ProductCard from '../ProductCard';
import ProductCardSkeleton from '../ProductCardSkeleton';
import ViewAllButton from '../ViewAllButton';

function Categories({ categories = [] }) {
    // Convert the comma-separated sub_category string into an array and create subcategory objects
    const allSubcategories = useMemo(() => {
        return Array.isArray(categories)
            ? categories.flatMap((cat) => {
                  const subCategories = cat.sub_category.split(',').map((item) => item.trim());
                  return subCategories.map((subcat) => ({
                      main_category: cat.main_category,
                      sub_category: subcat,
                  }));
              })
            : [];
    }, [categories]);

    // Set default subcategory from the first available subcategory
    const defaultSubcategory = allSubcategories.length > 0 ? allSubcategories[0] : null;

    //category display
    const [selectedCategory, setSelectedCategory] = useState(defaultSubcategory);
    const [currentPage, setCurrentPage] = useState(0);
    const [subCategory, setSubCategory] = useState(defaultSubcategory?.sub_category || '');

    // Update selectedCategory and subCategory when categories prop changes
    useEffect(() => {
        if (allSubcategories.length > 0 && !selectedCategory) {
            const firstSubcategory = allSubcategories[0];
            setSelectedCategory(firstSubcategory);
            setSubCategory(firstSubcategory.sub_category);
        }
    }, [allSubcategories, selectedCategory]);

    const ITEMS_PER_PAGE = 6;
    const paginatedSubcategories = allSubcategories.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    const handleCategoryClick = (categoryObj) => {
        setSelectedCategory(categoryObj);
        setSubCategory(categoryObj.sub_category);
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * ITEMS_PER_PAGE < allSubcategories.length) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    //product by category display
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit] = useState(4);
    const [skip, setSkip] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        // Don't fetch if subCategory is empty
        if (!subCategory) {
            setLoading(false);
            return;
        }

        const fetchProductsBySubCategory = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://ecommerce-server-u4uh.onrender.com/api/v1/product/subcategory/${subCategory}?limit=${limit}&skip=${skip}&select=id,name,image,ratings,no_of_ratings,discount_price,actual_price`,
                );

                // Assuming your backend returns { success: true, message: "...", data: [...] }
                const { data } = response.data;

                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format from API');
                }

                setProducts(data);
                setTotalProducts(response.data.total || data.length); // Adjust based on your API response
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProductsBySubCategory();
    }, [skip, limit, subCategory]); // Changed from selectedCategory to subCategory

    const handleNextProductPage = () => {
        setSkip((prevSkip) => prevSkip + limit);
    };

    const handlePrevProductPage = () => {
        setSkip((prevSkip) => Math.max(0, prevSkip - limit));
    };

    const productCards = useMemo(() => products.map((product) => <ProductCard key={product._id} product={product} />), [products]);

    // Don't render if categories are not loaded yet
    if (!categories || categories.length === 0) {
        return (
            <div className={styles.container}>
                <div className={clsx(styles.headerContainer)}>
                    <HomeTitle title='Categories' subTitle='Browse By Category' />
                </div>
                <div className={styles.loadingContainer}>Loading categories...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={clsx(styles.headerContainer)}>
                <HomeTitle title='Categories' subTitle='Browse By Category' />
                <Navigation
                    limit={ITEMS_PER_PAGE}
                    skip={currentPage * ITEMS_PER_PAGE}
                    totalProducts={allSubcategories.length}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                />
            </div>
            <div className={styles.subcategoriesList}>
                {paginatedSubcategories.map((categoryObj, index) => (
                    <button
                        key={`${categoryObj.main_category}-${categoryObj.sub_category}-${index}`}
                        className={clsx(styles.subcategoryItem, {
                            [styles.selected]:
                                selectedCategory?.sub_category === categoryObj.sub_category &&
                                selectedCategory?.main_category === categoryObj.main_category,
                        })}
                        onClick={() => handleCategoryClick(categoryObj)}
                    >
                        <span className={styles.subcategoryName}>{categoryObj.sub_category}</span>
                    </button>
                ))}
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
                        <p>No products available for this category</p>
                    </div>
                )}
            </div>
            <div className={clsx(styles.productHeader)}>
                <Navigation
                    limit={limit}
                    skip={skip}
                    totalProducts={totalProducts}
                    onNextPage={handleNextProductPage}
                    onPrevPage={handlePrevProductPage}
                />
                <ViewAllButton content='View All Products' page='homeFlashSale' />
            </div>
        </div>
    );
}

export default Categories;
