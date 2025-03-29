import styles from '../../styles/core/home.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Category from '../../components/Category';
import Banner from '../../components/Banner';
import FlashSale from '../../components/FlashSale';
import UpperFooter from '../../components/UpperFooter';
import HorizontalLine from '../../components/HorizontalLine';
import Categories from '../../components/Categories';
import BestSeller from '../../components/BestSeller';
import SaleOffProduct from '../../components/SaleOffProduct';
import ExploreProduct from '../../components/ExploreProduct';
import ProductShowcase from '../../components/ProductShowcase';

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/v1/category')
            .then(function (response) {
                // handle success
                setData(response.data.data);
                setLoading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.belowHeader)}>
                <Category categories={data} />
                <Banner />
            </div>
            <FlashSale initLimit={4} />
            <HorizontalLine />
            <Categories categories={data} />
            <HorizontalLine />
            <BestSeller />
            <HorizontalLine />
            <SaleOffProduct />
            <HorizontalLine />
            <ExploreProduct initLimit={8} />
            <HorizontalLine />
            <ProductShowcase />
            <UpperFooter />
        </div>
    );
}

export default Home;
