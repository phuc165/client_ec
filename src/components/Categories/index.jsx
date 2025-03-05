import styles from '../../styles/components/categories.module.scss';
import clsx from 'clsx';
import React, { useState } from 'react';
import Navigation from '../Navigation';
import HomeTitle from '../HomeTitle';

const categories = [
    {
        category: "Woman's Fashion",
        subcategories: ['Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories'],
    },
    {
        category: "Men's Fashion",
        subcategories: ['Shirts', 'Pants', 'Jackets', 'Shoes', 'Accessories'],
    },
    {
        category: 'Electronics',
        subcategories: [
            'Computers & Accessories',
            'Mobile Phones',
            'TV & Home Theater',
            'Audio & Headphones',
            'Cameras & Photography',
            'Wearable Technology',
            'Video Games',
        ],
    },
    {
        category: 'Home & Lifestyle',
        subcategories: ['Furniture', 'Kitchen & Dining', 'Home Decor', 'Bedding & Bath', 'Appliances', 'Home Improvement', 'Storage & Organization'],
    },
    {
        category: 'Medicine',
        subcategories: ['First Aid', 'Pain Relief', 'Cough & Cold', 'Vitamins & Supplements', 'Personal Care', 'Health Devices'],
    },
    {
        category: 'Sports & Outdoor',
        subcategories: ['Outdoor Clothing', 'Sports Shoes', 'Fitness Equipment', 'Camping & Hiking', 'Cycling', 'Team Sports', 'Water Sports'],
    },
    {
        category: "Baby's & Toys",
        subcategories: ['Baby Clothing', 'Baby Gear', 'Baby Toys', 'Toys for Kids', 'Educational Toys', 'Stuffed Animals'],
    },
    {
        category: 'Groceries & Pets',
        subcategories: ['Pantry Staples', 'Snacks & Beverages', 'Fresh Produce', 'Pet Food', 'Pet Toys', 'Pet Care'],
    },
    {
        category: 'Health & Beauty',
        subcategories: ['Skincare', 'Makeup', 'Haircare', 'Bath & Body', 'Fragrances', 'Beauty Tools', 'Vitamins & Supplements'],
    },
];

function Categories() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    // Create a list of objects with both main category and subcategory
    const allSubcategories = categories.flatMap((cat) =>
        cat.subcategories.map((subcat) => ({
            mainCategory: cat.category,
            subcategory: subcat,
        })),
    );

    // Items per page
    const ITEMS_PER_PAGE = 6;

    // Paginate the subcategories
    const paginatedSubcategories = allSubcategories.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    const handleCategoryClick = (categoryObj) => {
        setSelectedCategory(categoryObj);
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

    return (
        <div className={styles.container}>
            <div className={clsx(styles.headerContainer)}>
                <HomeTitle title={`Categories`} subTitle={`Browse By Category`} />
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
                        key={index}
                        className={clsx(styles.subcategoryItem, {
                            [styles.selected]: selectedCategory && selectedCategory.subcategory === categoryObj.subcategory,
                        })}
                        onClick={() => handleCategoryClick(categoryObj)}
                    >
                        <span className={styles.mainCategory}>{categoryObj.mainCategory}</span>
                        <span className={styles.subcategoryName}>{categoryObj.subcategory}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Categories;
