import React from "react";
import ProductsScreen from "./Screens/ProductsScreen";
import { Provider } from "./Components/ui/provider";

function App() {
  return (
    <Provider>
      <ProductsScreen />
    </Provider>
  );
}

export default App;
