import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { customerTheme } from "../Admin/them/customeThem";
import ProductDetails from "../customer/Components/Product/ProductDetails/ProductDetails";
import Product from "../customer/Components/Product/Product/Product";
import Contact from "../Pages/Contact";
import TearmsCondition from "../Pages/TearmsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import About from "../Pages/About";
import Homepage from "../Pages/Homepage";
import NotFound from "../Pages/Notfound";
import Navigation from "../customer/Components/Navbar/Navigation";
import Cart from "../customer/Components/Cart/Cart";
import Order from "../customer/Components/orders/Order";
import OrderDetails from "../customer/Components/orders/OrderDetails";
import Checkout from "../customer/Components/Checkout/Checkout";
import Footer from "../customer/Components/footer/Footer";
import PaymentSuccess from "../customer/Components/paymentSuccess/PaymentSuccess";
import RateProduct from "../customer/Components/ReviewProduct/RateProduct";

// Jump to the top on route changes (but keep position when only the query string changes, e.g. filters).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

const CustomerRoutes = () => {
  return (
    <ThemeProvider theme={customerTheme}>
      <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
        <ScrollToTop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/login" element={<Homepage />} />
            <Route path="/register" element={<Homepage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privaciy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-condition" element={<TearmsCondition />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account/order" element={<Order />} />
            <Route path="/account/order/:orderId" element={<OrderDetails />} />
            <Route path="/account/rate/:productId" element={<RateProduct />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/:orderId" element={<PaymentSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default CustomerRoutes;
