import { BrowserRouter, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts/layout.js';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchCart, clearCartState } from './redux/slices/cartSlice';
import { logout } from './redux/slices/authSlice';
import './styles/app.scss';

function AppContent() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cart when user is logged in
        if (userInfo) {
            dispatch(fetchCart())
                .unwrap()
                .catch((error) => {
                    // Handle authentication errors
                    if (error === 'Not authorized, token failed' || error === 'Not authorized, no token' || error.includes('Not authorized')) {
                        // Clear auth state and cart, then redirect to login
                        dispatch(logout());
                        dispatch(clearCartState());
                        navigate('/login');
                    }
                });
        } else {
            // Clear cart when user is not logged in
            dispatch(clearCartState());
        }
    }, [userInfo, dispatch, navigate]);

    return (
        <>
            <ToastContainer />
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.Component;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    // Remove withAdminAuth since it's not defined
                    const Element = Page;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Element />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
