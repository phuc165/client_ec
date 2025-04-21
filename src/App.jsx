import { useState } from 'react';

//routing import
import { BrowserRouter, Routes, Route } from 'react-router';
import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './styles/app.scss';
function App() {
    return (
        <Provider store={store}>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.Component;

                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Element = route.admin ? withAdminAuth(Page) : Page;

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
            </BrowserRouter>
        </Provider>
    );
}

export default App;
