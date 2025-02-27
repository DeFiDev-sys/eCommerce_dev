import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  pagination: {},
  favoritesToggle: true,
  favorites: JSON.parse(localStorage.getItem("favorites")) ?? [],
};

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setPagination: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.pagination = payload;
    },

    setFavorites: (state, { payload }) => {
      state.favorites = payload;
    },

    setFavoritesToggle: (state, { payload }) => {
      state.favoritesToggle = payload;
    },
  },
});

export const { setLoading, setError, setProducts, setPagination, setFavorites, setFavoritesToggle } =
  ProductSlice.actions;

export default ProductSlice.reducer;

export const ProductSelector = (state) => state.products;
