import axios from "axios";

import { setError, setLoading, setShippingCost, cartItemAdd, cartItemRemove, clearCart } from "../../slices/CartSlice";

const BaseURL = "http://localhost:5000";

export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await axios.get(`${BaseURL}/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      subtitle: data.subtitle,
      image: data.images[0],
      price: data.price,
      stock: data.stock,
      brand: data.brand,
      qty,
      stripeId: data.stripeId,
    };
    dispatch(cartItemAdd(itemToAdd));
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
  }
};

export const removeItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemove(id));
};

export const shippingItem = (value) => async (dispatch) => {
  dispatch(setShippingCost(value));
};

export const clearItems = () => async (dispatch) => {
  dispatch(clearCart());
};
