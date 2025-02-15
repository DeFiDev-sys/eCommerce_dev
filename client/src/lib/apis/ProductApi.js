import axios from "axios";

export const getProduct = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    console.log(response.data.products);
    return response.data.products;
  } catch (error) {
    console.error("Error occurred:", error);
    return [];
  }
};
