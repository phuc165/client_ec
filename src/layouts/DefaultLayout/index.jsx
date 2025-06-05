import Header from '../components/Header';
import Footer from '../components/Footer';
import ToTopButton from '../components/ToTopButton';
import Breadcrumb from '../../components/Breadcrumbs';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <Breadcrumb />
            <>{children}</>
            <ToTopButton />
            <Footer />
        </>
    );
}

export default DefaultLayout;
