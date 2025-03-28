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
import { GoogleOAuthProvider } from "@react-oauth/google";
import { VStack, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "./reduxs/actions/apis/UserAction.js";

function App() {
  const [googleClinet, setGoogleClinet] = useState(null);

  useEffect(() => {
    const googleKey = async () => {
      const { data: googleId } = await axios.get(`${BaseURL}/api/config/google`);
      setGoogleClinet(googleId);
    };
    googleKey();
  }, [googleClinet]);

  //remember the spinner

  return !googleClinet ? (
    <Provider>
      <VStack>
        <Spinner
          mt={"20"}
          textDecorationThickness={"2px"}
          speed={"0.65s"}
          emptyColor='gray.200'
          color={"cyan.500"}
          size={"xl"}
        />
      </VStack>
    </Provider>
  ) : (
    <GoogleOAuthProvider clientId={googleClinet}>
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
    </GoogleOAuthProvider>
  );
}

export default App;
