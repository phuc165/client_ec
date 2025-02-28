import { Link } from 'react-router';
import styles from '../../../styles/components/footer.module.scss';
import clsx from 'clsx';

import Ggbadge from '../../../assets/svg/Ggbadge.jsx';
import Apbadge from '../../../assets/svg/Apbadge.jsx';
import Send from '../../../assets/svg/Send.jsx';
import FbIcon from '../../../assets/svg/FbIcon.jsx';
import InsIcon from '../../../assets/svg/InsIcon.jsx';
import XIcon from '../../../assets/svg/XIcon.jsx';
import LinIcon from '../../../assets/svg/LinIcon.jsx';

function Footer() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.footer)}>
                <div className={clsx(styles.utils)}>
                    <div className={clsx(styles.logo)}>EPrett</div>
                    <div className={clsx(styles.title)}>Subscribe</div>
                    <p className={clsx(styles.info)}>Get 10% off your first order</p>
                    <form className={clsx(styles.subscribe)}>
                        <input type='text' placeholder='Enter your email' />
                        <button>
                            <Send />
                        </button>
                    </form>
                </div>
                <div className={clsx(styles.utils)}>
                    <div className={clsx(styles.title)}>Support</div>
                    <p className={clsx(styles.info)}>
                        117 Nguyen Huu Canh,
                        <br />
                        F22, BT, HCMC.
                    </p>
                    <p className={clsx(styles.info)}>exclusive@gmail.com</p>
                    <p className={clsx(styles.info)}>+84888-888-888</p>
                </div>
                <div className={clsx(styles.utils)}>
                    <div className={clsx(styles.title)}>Account</div>
                    <Link className={clsx(styles.info)}>My Account</Link>
                    <div className={clsx(styles.info)}>
                        <Link className={clsx(styles.info)}>Login </Link>/<Link className={clsx(styles.info)}> Register</Link>
                    </div>
                    <Link className={clsx(styles.info)}>Cart</Link>
                    <Link className={clsx(styles.info)}>Wishlist</Link>
                    <Link className={clsx(styles.info)}>Shop</Link>
                </div>
                <div className={clsx(styles.utils)}>
                    <div className={clsx(styles.title)}>Quick Link</div>
                    <Link className={clsx(styles.info)}>Privacy Policy</Link>
                    <Link className={clsx(styles.info)}>Terms Of Use</Link>
                    <Link className={clsx(styles.info)}>FAQ</Link>
                    <Link className={clsx(styles.info)}>Contact</Link>
                </div>
                <div className={clsx(styles.utils)}>
                    <div className={clsx(styles.title)}>Download App</div>
                    <h6>Save $3 with App New User Only</h6>
                    <div className={clsx(styles.download)}>
                        <div className={clsx(styles.qrImg)}>
                            <img src='/images/footer/qrcode.png' alt='qrcode' />
                        </div>
                        <div className={clsx(styles.downloadLink)}>
                            <Link>
                                <Ggbadge />
                            </Link>
                            <Link>
                                <Apbadge />
                            </Link>
                        </div>
                    </div>
                    <div className={clsx(styles.socialMedia)}>
                        <Link to='https://www.facebook.com/646564696E73696465'>
                            <FbIcon />
                        </Link>
                        <Link to='https://www.instagram.com/t.phuc_l/'>
                            <InsIcon />
                        </Link>
                        <Link>
                            <XIcon />
                        </Link>
                        <Link to='https://www.linkedin.com/in/t%E1%BA%A5n-ph%C3%BAc-h%C3%A0-5444a0349/'>
                            <LinIcon />
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
            <p className={clsx(styles.credit)}>Made by Phuc with love &#10084;</p>
        </div>
    );
}

export default Footer;
