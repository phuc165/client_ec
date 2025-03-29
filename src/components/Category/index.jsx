import { useState } from 'react';
import clsx from 'clsx';
import styles from '../../styles/core/category.module.scss';
import { Link } from 'react-router';

const Category = ({ categories = [] }) => {
    // Added default value
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
                    {categories.map((item, index) => {
                        // Convert sub_category string to array
                        const subCategories = typeof item.sub_category === 'string' ? item.sub_category.split(',').map((sub) => sub.trim()) : [];

                        return (
                            <li
                                key={index}
                                className={clsx(
                                    styles.categoryItem,
                                    subCategories.length > 0 && styles.categoryWithSub,
                                    activeCategory === item.main_category && styles.activeCategory,
                                )}
                                onMouseEnter={() => handleMouseEnter(item.main_category)}
                            >
                                <Link className={styles.categoryLink}>
                                    <span className={styles.categoryName}>{item.main_category}</span>
                                </Link>
                                {subCategories.length > 0 && (
                                    <svg xmlns='http://www.w3.org/2000/svg' className={styles.chevron} viewBox='0 0 20 20' fill='currentColor'>
                                        <path
                                            fillRule='evenodd'
                                            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                )}

                                {/* Render subcategories if this category is active and has subcategories */}
                                {activeCategory === item.main_category && subCategories.length > 0 && (
                                    <div className={styles.subCategoryContainer} onMouseEnter={() => handleMouseEnter(item.main_category)}>
                                        <ul className={styles.subCategoryList}>
                                            {subCategories.map((subCategory, subIndex) => (
                                                <li key={subIndex} className={styles.subCategoryItem}>
                                                    <Link className={styles.categoryLink}>{subCategory}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Category;
