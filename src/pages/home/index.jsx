import styles from '../../styles/components/home.module.scss';
import clsx from 'clsx';

import Category from '../../components/Category';
import Banner from '../../components/Banner';
import FlashSale from '../../components/FlashSale';
import UpperFooter from '../../components/UpperFooter';
import HorizontalLine from '../../components/HorizontalLine';
import Categories from '../../components/Categories';
function Home() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.belowHeader)}>
                <Category></Category>
                <Banner></Banner>
            </div>

            <FlashSale initLimit={4}></FlashSale>
            <HorizontalLine></HorizontalLine>
            <Categories></Categories>
            <HorizontalLine></HorizontalLine>
            <UpperFooter></UpperFooter>
        </div>
    );
}

export default Home;
