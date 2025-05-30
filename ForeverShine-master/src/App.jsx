import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

import Navbar from './Navbar';
import Slider from './Slider';
import HomeSections from './HomeSections';
import Footer from './Footer';
import CarCare from './CarCare';
import HomeCare from './HomeCare';
import PersonalCare from './PersonalCare';
import AboutUs from './AboutUs';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Account from './Account';
import SearchResults from './SearchResults';
import Chatbot from './components/Chatbot';

// The following components are used in App.jsx but their files were not found in src or src/components directories:
import Contact from './components/Contact';
import Shipping from './components/Shipping';
import Returns from './components/Returns';
import FAQ from './components/FAQ';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Cookies from './components/Cookies';


function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <BrowserRouter>
          <Chatbot />
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <Slider />
                <HomeSections />
                <Footer />
              </>
            } />
            <Route path="/car-care" element={
              <>
                <Navbar />
                <CarCare />
                <Footer />
              </>
            } />
            <Route path="/home-care" element={
              <>
                <Navbar />
                <HomeCare />
                <Footer />
              </>
            } />
            <Route path="/personal-care" element={
              <>
                <Navbar />
                <PersonalCare />
                <Footer />
              </>
            } />
            <Route path="/about-us" element={
              <>
                <Navbar />
                <AboutUs />
                <Footer />
              </>
            } />
            <Route path="/product/:productId" element={
              <>
                <Navbar />
                <ProductDetails />
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar />
                <Cart />
                <Footer />
              </>
            } />
            <Route path="/account" element={
              <>
                <Navbar />
                <Account />
                <Footer />
              </>
            } />
            <Route path="/search" element={
              <>
                <Navbar />
                <SearchResults />
                <Footer />
              </>
            } />
            {/* Footer Links Routes */}
            <Route path="/contact" element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/shipping" element={
              <>
                <Navbar />
                <Shipping />
                <Footer />
              </>
            } />
            <Route path="/returns" element={
              <>
                <Navbar />
                <Returns />
                <Footer />
              </>
            } />
            <Route path="/faq" element={
              <>
                <Navbar />
                <FAQ />
                <Footer />
              </>
            } />
            <Route path="/privacy" element={
              <>
                <Navbar />
                <Privacy />
                <Footer />
              </>
            } />
            <Route path="/terms" element={
              <>
                <Navbar />
                <Terms />
                <Footer />
              </>
            } />
            <Route path="/cookies" element={
              <>
                <Navbar />
                <Cookies />
                <Footer />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </CartProvider>
  )
}

export default App;

