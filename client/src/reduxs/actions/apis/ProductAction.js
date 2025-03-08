import {
  setProducts,
  setError,
  setLoading,
  setPagination,
  setFavorites,
  setFavoritesToggle,
  setProduct,
} from "../../slices/Projects";
import axios from "axios";

const BaseURL = "http://localhost:5000";

export const getProduct = (page, favoriteToggle) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`${BaseURL}/api/products/${page}/${10}`);
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

export const addToFavorites = (id) => async (dispatch, getState) => {
  const {
    products: { favorites },
  } = getState();

  const newFavorites = [...favorites, id];
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  dispatch(setFavorites(newFavorites));
};

export const removeFromFavorites = (id) => async (dispatch, getState) => {
  const {
    products: { favorites },
  } = getState();

  const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  dispatch(setFavorites(newFavorites));
};

export const toggleFavorites = (toggle) => async (dispatch, getState) => {
  const {
    products: { favorites, products },
  } = getState();

  if (toggle) {
    const filteredProducts = products.filter((product) => favorites.includes(product._id));
    dispatch(setFavoritesToggle(toggle));
    dispatch(setProducts(filteredProducts));
  } else {
    dispatch(setFavoritesToggle(false));
    dispatch(getProduct(1));
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await axios.get(`${BaseURL}/api/products/${id}`);
    dispatch(setProduct(data));
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
