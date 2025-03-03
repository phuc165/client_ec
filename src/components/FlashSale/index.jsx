import { useEffect, useState } from 'react';
import styles from '../../styles/components/flashSale.module.scss';
import clsx from 'clsx';
import CountdownTimer from '../CountdownTimer';
import TitleDecor from '../TitleDecor';
import ProductCard from '../ProductCard';
import LeftArrow from '../../assets/svg/LeftArrow';
import RightArrow from '../../assets/svg/RightArrow';

const FlashSale = () => {
    const [products, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [skip, setSkip] = useState(0); // State to manage how many items to skip

    useEffect(() => {
        setLoading(true);
        fetch(`https://dummyjson.com/products?limit=4&skip=${skip}&select=title,price,rating,discountPercentage,reviews,images`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProduct(data.products);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, [skip]); // Re-fetch products when skip changes

    const handleNextPage = () => {
        setSkip((prevSkip) => prevSkip + 4); // Increment skip to load next 4 items
    };

    const handlePrevPage = () => {
        if (skip >= 4) {
            setSkip((prevSkip) => prevSkip - 4); // Decrement skip to load previous 4 items
        }
    };

    if (loading) {
        return <p>Loading Flash Sale Products...</p>;
    }

    if (!products) {
        return <p>Error loading Flash Sale Products.</p>;
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.title)}>
                <TitleDecor></TitleDecor>Today's
            </div>
            <div className={clsx(styles.subTitle)}>
                <p>Flash Sales</p>
                <CountdownTimer initialDays={3} initialHours={23} initialMinutes={19} initialSeconds={56} />
                <div className={clsx(styles.navigation)}>
                    <button onClick={handlePrevPage} style={{ cursor: skip >= 4 ? 'pointer' : 'default', opacity: skip >= 4 ? 1 : 0.5 }}>
                        <LeftArrow />
                    </button>
                    <button onClick={handleNextPage} style={{ cursor: 'pointer' }}>
                        <RightArrow />
                    </button>
                </div>
            </div>
            <div className={clsx(styles.productContainer)}>
                {Array.isArray(products) && products.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
        </div>
    );
};

export default FlashSale;
