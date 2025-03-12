import React from "react";
import ProductsScreen from "./Screens/ProductsScreen";
import { Provider } from "./Components/ui/provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import LandingScreen from "./Screens/LandingScreen.jsx";
import ProductScreen from "./Screens/ProductScreen.jsx";
import Footer from "./Components/Footer.jsx";
import CartScreen from "./Screens/CartScreen.jsx";

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
          </Routes>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
