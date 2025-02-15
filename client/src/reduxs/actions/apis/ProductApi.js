import { setProducts, setError, setLoading, setPagination } from "../../slices/Projects";
import axios from "axios";

export const getProduct = (page, favouriteToggle) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get("http://localhost:5000/api/products");
    console.log(data.products);
    const { products, pagination } = data;
    dispatch(setProducts(products));
    dispatch(setPagination(pagination));
    return data.products;
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An expected has error occured Please try again later"
      )
    );
    console.error("Error occurred:", error);
    return [];
  }
};

// For tanstack react query
// export const getProduct = async () => {
//   try {
//     const { data } = await axios.get("http://localhost:5000/api/products");
//     return data.products;
//   } catch (error) {
//     console.error("Error occurred:", error);
//     return [];
//   }
// };
