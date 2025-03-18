import React, { useEffect, useState, useMemo, useCallback } from 'react'; // Added useCallback
import styles from '../../styles/components/productShowcase.module.scss';
import clsx from 'clsx';
import axios from 'axios';

import HomeTitle from '../HomeTitle';

function ProductShowcase() {
    const products = [
        {
            id: 'playstation',
            title: 'PlayStation 5',
            description: 'Black and White version of the PS5 coming out on sale.',
            image: '/images/playstation.jpg',
            className: styles.playstation,
            isLarge: true,
        },
        {
            id: 'women',
            title: "Women's Collections",
            description: 'Featured woman collections that give you another vibe.',
            image: '/images/womens-collection.jpg',
            className: styles.womensCollection,
            isLarge: false,
        },
        {
            id: 'speakers',
            title: 'Speakers',
            description: 'Amazon wireless speakers',
            image: '/images/speakers.jpg',
            className: styles.speakers,
            isLarge: false,
        },
        {
            id: 'perfume',
            title: 'Perfume',
            description: 'GUCCI INTENSE OUD EDP',
            image: '/images/perfume.jpg',
            className: styles.perfume,
            isLarge: false,
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <HomeTitle title={`Featured`} subTitle={`New Arrival`} />
            </div>
            <div className={styles.productShowcase}>
                <div className={styles.grid}>
                    {products.map((product) => (
                        <div key={product.id} className={clsx(styles.productCard, product.className, { [styles.large]: product.isLarge })}>
                            <div className={styles.productContent}>
                                <h2 className={styles.productTitle}>{product.title}</h2>
                                <p className={styles.productDescription}>{product.description}</p>
                                <button className={styles.shopButton}>Shop Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductShowcase;
