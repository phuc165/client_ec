import { useState } from 'react';
import clsx from 'clsx';
import styles from '../../styles/components/category.module.scss';
import { Link } from 'react-router';

const Category = () => {
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
            subcategories: [
                'Furniture',
                'Kitchen & Dining',
                'Home Decor',
                'Bedding & Bath',
                'Appliances',
                'Home Improvement',
                'Storage & Organization',
            ],
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

    const [activeCategory, setActiveCategory] = useState(null);

    const handleMouseEnter = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const handleMouseLeave = () => {
        setActiveCategory(null);
    };
    return (
        <div className={styles.wrapper} onMouseLeave={handleMouseLeave}>
            <div className={styles.container}>
                <ul className={styles.categoryList}>
                    {categories.map((item, index) => (
                        <li
                            key={index}
                            className={clsx(
                                styles.categoryItem,
                                item.subcategories.length > 0 && styles.categoryWithSub,
                                activeCategory === item.category && styles.activeCategory,
                            )}
                            onMouseEnter={() => handleMouseEnter(item.category)}
                        >
                            <Link className={styles.categoryLink}>
                                <span className={styles.categoryName}>{item.category}</span>
                            </Link>
                            {item.subcategories.length > 0 && (
                                <svg xmlns='http://www.w3.org/2000/svg' className={styles.chevron} viewBox='0 0 20 20' fill='currentColor'>
                                    <path
                                        fillRule='evenodd'
                                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            )}

                            {/* Render subcategories if this category is active and has subcategories */}
                            {activeCategory === item.category && item.subcategories.length > 0 && (
                                <div className={styles.subCategoryContainer} onMouseEnter={() => handleMouseEnter(item.category)}>
                                    <ul className={styles.subCategoryList}>
                                        {item.subcategories.map((subCategory, subIndex) => (
                                            <li key={subIndex} className={styles.subCategoryItem}>
                                                <Link className={styles.categoryLink}>{subCategory}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Category;
