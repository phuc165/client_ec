import styles from '../../styles/core/home.module.scss';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../redux/slices/categorySlice';

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
    const dispatch = useDispatch();
    const { category, loading, error } = useSelector((state) => state.categories); // Note: 'categorys' matches the store config

    useEffect(() => {
        // Dispatch the fetchCategory thunk to get category data
        dispatch(fetchCategory({ type: 'category' }));
    }, [dispatch]);
    console.log(category);
    // Get the categories array from the state
    const categoriesData = category.category || [];

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.belowHeader)}>
                <Category categories={categoriesData} />
                <Banner />
            </div>
            <FlashSale initLimit={4} />
            <HorizontalLine />
            <Categories categories={categoriesData} />
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
