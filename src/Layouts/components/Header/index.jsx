import { Link, useLocation } from 'react-router';
import styles from '../../../styles/components/header.module.scss';
import clsx from 'clsx';

import Search from '../../../assets/svg/Search';
import Whislist from '../../../assets/svg/Whislist';
import Cart from '../../../assets/svg/Cart';

function Header() {
    let location = useLocation();

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.topHeader)}>
                <p className={clsx(styles.quote)}>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
                <Link to='/category' className={clsx(styles.linkQuote)}>
                    ShopNow
                </Link>
            </div>
            <div className={clsx(styles.header)}>
                <div className={clsx(styles.logo)}>EPrett</div>
                <div className={clsx(styles.nav)}>
                    <Link to='/' className={clsx(`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`)}>
                        Home
                    </Link>
                    <Link to='/contact' className={clsx(`${styles.navLink} ${location.pathname === '/contact' ? styles.navLinkActive : ''}`)}>
                        Contact
                    </Link>
                    <Link to='/about' className={clsx(`${styles.navLink} ${location.pathname === '/about' ? styles.navLinkActive : ''}`)}>
                        About
                    </Link>
                    <Link to='/signup' className={clsx(`${styles.navLink} ${location.pathname === '/signup' ? styles.navLinkActive : ''}`)}>
                        Sign Up
                    </Link>
                </div>
                <div className={clsx(styles.search)}>
                    <div className={clsx(styles.searchBar)}>
                        <input className={clsx(styles.inputSearch)} type='text' placeholder='What are you looking for?' />
                        <button className={clsx(styles.searchButton)}>
                            <Search />
                        </button>
                    </div>
                    <Link to='/whislist'>
                        <Whislist />
                    </Link>
                    <Link to='/cart'>
                        <Cart />
                    </Link>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Header;
