import Header from '../components/Header';
import Footer from '../components/Footer';
import ToTopButton from '../components/ToTopButton';

function HomeLayout({ children }) {
    return (
        <>
            <Header />
            <>{children}</>
            <ToTopButton />
            <Footer />
        </>
    );
}

export default HomeLayout;
