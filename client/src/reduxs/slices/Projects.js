import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  pagination: {},
  favoritesToggle: true,
  reviewed: false,
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
    setProduct: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
      state.error = null;
      state.reviewed = false;
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

export const { setLoading, setError, setProducts, setPagination, setFavorites, setFavoritesToggle, setProduct } =
  ProductSlice.actions;

export default ProductSlice.reducer;

export const ProductSelector = (state) => state.products;
