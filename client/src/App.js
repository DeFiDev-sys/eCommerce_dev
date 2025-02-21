import React from "react";
import ProductsScreen from "./Screens/ProductsScreen";
import { Provider } from "./Components/ui/provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";

function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<ProductsScreen />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
