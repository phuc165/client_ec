import { Link, useLocation } from 'react-router';
import styles from '../../../styles/components/header.module.scss';
import clsx from 'clsx';

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
                <div className={clsx(styles.logo)}>EPretty</div>
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
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z'
                                    stroke='black'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                />
                            </svg>
                        </button>
                    </div>
                    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M3.97738 9.84C4.0176 9.33881 4.24513 8.87115 4.61465 8.53017C4.98417 8.18918 5.46857 7.9999 5.97138 8H18.0294C18.5322 7.9999 19.0166 8.18918 19.3861 8.53017C19.7556 8.87115 19.9832 9.33881 20.0234 9.84L20.8264 19.84C20.8485 20.1152 20.8133 20.392 20.7232 20.6529C20.6331 20.9139 20.4899 21.1533 20.3027 21.3562C20.1155 21.5592 19.8883 21.7211 19.6354 21.8319C19.3825 21.9427 19.1095 21.9999 18.8334 22H5.16738C4.8913 21.9999 4.61823 21.9427 4.36536 21.8319C4.11249 21.7211 3.88529 21.5592 3.69808 21.3562C3.51086 21.1533 3.36768 20.9139 3.27755 20.6529C3.18742 20.392 3.15229 20.1152 3.17438 19.84L3.97738 9.84V9.84Z'
                            stroke='black'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M16 11V6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6V11'
                            stroke='black'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z'
                            stroke='black'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z'
                            stroke='black'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path d='M2.25 3.75H5.25L7.5 16.5H19.5' stroke='black' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        <path
                            d='M7.5 12.5H19.1925C19.2792 12.5001 19.3633 12.4701 19.4304 12.4151C19.4975 12.3601 19.5434 12.2836 19.5605 12.1986L20.9105 5.44859C20.9214 5.39417 20.92 5.338 20.9066 5.28414C20.8931 5.23029 20.8679 5.18009 20.8327 5.13717C20.7975 5.09426 20.7532 5.05969 20.703 5.03597C20.6528 5.01225 20.598 4.99996 20.5425 5H6'
                            stroke='black'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Header;
