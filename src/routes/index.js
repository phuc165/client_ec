import Home from '../pages/home';
import About from '../pages/about';
import Account from '../pages/account';
import Cart from '../pages/cart';
import CheckOut from '../pages/checkOut';
import Contact from '../pages/contact';
import Error404 from '../pages/error404';
import Login from '../pages/login';
import ProductDetail from '../pages/productDetail';
import Signup from '../pages/signup';
import Whislist from '../pages/whislist';

const publicRoutes = [
    { path: '/', Component: Home },
    { path: '/about', Component: About },
    { path: '/account', Component: Account },
    { path: '/cart', Component: Cart },
    { path: '/checkOut', Component: CheckOut },
    { path: '/contact', Component: Contact },
    { path: '/error404', Component: Error404 },
    { path: '/login', Component: Login },
    { path: '/productDetail', Component: ProductDetail },
    { path: '/signup', Component: Signup },
    { path: '/whislist', Component: Whislist },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
