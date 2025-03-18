import React from "react";
import ProductsScreen from "./Screens/ProductsScreen";
import { Provider } from "./Components/ui/provider";
import EmailVerificationScreen from "./Screens/EmailVerificationScreen.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import LandingScreen from "./Screens/LandingScreen.jsx";
import ProductScreen from "./Screens/ProductScreen.jsx";
import Footer from "./Components/Footer.jsx";
import CartScreen from "./Screens/CartScreen.jsx";
import LoginScreen from "./Screens/LoginScreen.jsx";
import PasswordResetScreen from "./Screens/PasswordResetScreen.jsx";
import RegisterScreen from "./Screens/RegisterScreen.jsx";

function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<LandingScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/products' element={<ProductsScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
            <Route path='/password-reset/:token' element={<PasswordResetScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
