import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from '../../styles/components/banner.module.scss';

const Banner = () => {
    const slidesData = [
        {
            index: 0,
            imageUrl: '/images/home/belowHeader/banner1.png',
            altTex: 'iPhone 11 Series',
        },
        {
            index: 1,
            imageUrl: '/images/home/belowHeader/banner2.png',
            altTex: 'iPhone 12 Series',
        },
        {
            index: 2,
            imageUrl: '/images/home/belowHeader/banner3.png',
            altTex: 'iPhone 32 Series',
        },
        {
            index: 3,
            imageUrl: '/images/home/belowHeader/banner4.png',
            altTex: 'iPhone 14 Series',
        },
    ];
    const delay = 3000;
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
        }, delay);

        return () => clearInterval(interval);
    }, [delay]);

    const goToSlide = (index) => {
        setSlide(index);
    };

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.slide)}>
                <img src={slidesData[slide].imageUrl} alt={slidesData[slide].altTex} />
                <div className={clsx(styles.navigation)}>
                    {slidesData.map((item, index) => {
                        const isActiveDot = index === slide;
                        return (
                            <span
                                key={index}
                                className={clsx(styles.dot, isActiveDot ? styles['active-dot'] : styles['inactive-dot'])}
                                onClick={() => goToSlide(index)}
                            ></span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Banner;
