import { Link, useLocation } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import styles from '../../../styles/core/header.module.scss';
import clsx from 'clsx';

import Search from '../../../assets/svg/Search';
import Whislist from '../../../assets/svg/Whislist';
import Cart from '../../../assets/svg/Cart';
import UserIcon from '../../../assets/svg/UserIcon';
import UserIconWhite from '../../../assets/svg/UserIconWhite';
import UserIconOn from '../../../assets/svg/UserIconOn';
import BagIcon from '../../../assets/svg/BagIcon';
import StarIcon from '../../../assets/svg/StarIcon';
import LogOutIcon from '../../../assets/svg/LogOutIcon';

function Header() {
    let location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const iconRef = useRef(null);
    const dispatch = useDispatch();

    // Get user info from Redux store
    const { userInfo } = useSelector((state) => state.auth);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (iconRef.current && !iconRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.topHeader)}>
                <p className={clsx(styles.quote)}>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
                <Link to='/category' className={clsx(styles.linkQuote)}>
                    ShopNow
                </Link>
            </div>
            <div className={clsx(styles.header)}>
                <Link to='/' className={clsx(styles.logo)}>
                    EPrett
                </Link>
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
                    {!userInfo && (
                        <Link to='/signup' className={clsx(`${styles.navLink} ${location.pathname === '/signup' ? styles.navLinkActive : ''}`)}>
                            Sign Up
                        </Link>
                    )}
                </div>
                <div className={clsx(styles.search)}>
                    <div className={clsx(styles.searchBar)}>
                        <input className={clsx(styles.inputSearch)} type='text' placeholder='What are you looking for?' />
                        <button className={clsx(styles.searchButton)}>
                            <Search />
                        </button>
                    </div>
                    <Link to='/whislist' className={clsx(styles.searchBarIcon)}>
                        <Whislist />
                    </Link>
                    <Link to='/cart' className={clsx(styles.searchBarIcon)}>
                        <Cart />
                    </Link>

                    {userInfo ? (
                        // Show user dropdown only if logged in
                        <div className={clsx(styles.searchBarIcon)} onClick={toggleDropdown} ref={iconRef}>
                            {isOpen ? (
                                <>
                                    <UserIconOn />
                                    <div className={clsx(styles.userDropdown)}>
                                        <Link to='/account' className={clsx(styles.dropdownTitle)}>
                                            <UserIconWhite />
                                            <p>My Account</p>
                                        </Link>
                                        <Link to='/orders' className={clsx(styles.dropdownTitle)}>
                                            <BagIcon />
                                            <p>My Order</p>
                                        </Link>
                                        <Link to='/reviews' className={clsx(styles.dropdownTitle)}>
                                            <StarIcon />
                                            <p>My Reviews</p>
                                        </Link>
                                        <div onClick={handleLogout} className={clsx(styles.dropdownTitle)}>
                                            <LogOutIcon />
                                            <p>Logout</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <UserIcon />
                            )}
                        </div>
                    ) : (
                        // Show login link if not logged in
                        <Link to='/login' className={clsx(styles.searchBarIcon)}>
                            <UserIcon />
                        </Link>
                    )}
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Header;
