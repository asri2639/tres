import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';

const Layout = ({ children, menuData }) => {
    return (<>
        <Header />
        {children}
        <Footer footerData={menuData.footer} />
    </>)
}

export default Layout;