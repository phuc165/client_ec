import React from 'react';
import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import styles from '../../styles/core/breadcrumbs.module.scss';
import clsx from 'clsx';

const Breadcrumb = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');

    // Get product data from Redux store
    const { singleProduct } = useSelector((state) => state.products);

    const getDisplayName = (segment, index, segments) => {
        // Check if this is a product detail page (pattern: /product/:id)
        if (segments[index - 1] === 'product' && singleProduct && singleProduct._id === segment) {
            return singleProduct.name || segment.charAt(0).toUpperCase() + segment.slice(1);
        }

        // Default formatting: capitalize first letter
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    };

    const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const displayName = getDisplayName(segment, index, pathSegments);

        return (
            <li
                key={index}
                className={clsx(styles.breadcrumb__item, {
                    [styles['breadcrumb__item--last']]: isLast,
                })}
            >
                {!isLast ? (
                    <Link to={path} className={styles.breadcrumb__link}>
                        {displayName}
                    </Link>
                ) : (
                    <span>{displayName}</span>
                )}
                {!isLast && <span className={styles.breadcrumb__separator}>/</span>}
            </li>
        );
    });

    return (
        <nav aria-label='breadcrumb'>
            <ol className={styles.breadcrumb}>
                <li key='home' className={styles.breadcrumb__item}>
                    <Link to='/' className={styles.breadcrumb__link}>
                        Home
                    </Link>
                    {breadcrumbItems.length > 0 && <span className={styles.breadcrumb__separator}>/</span>}
                </li>
                {breadcrumbItems}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
