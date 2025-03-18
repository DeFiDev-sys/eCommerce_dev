import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
  serverMsg: null,
  serverResStatus: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    userLogin: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userInfo = payload;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    verificationEmail: (state) => {
      state.userInfo.active = true;
      state.loading = false;
      state.error = null;
    },
    setServerResponseMsg: (state, { payload }) => {
      state.serverMsg = payload;
      state.loading = false;
    },
    setServerResponseStatus: (state, { payload }) => {
      state.serverResStatus = payload;
      state.loading = false;
    },
    setUserOrder: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.order = payload;
    },
    setReset: (state) => {
      state.loading = false;
      state.serverMsg = null;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  userLogin,
  setReset,
  setServerResponseMsg,
  setServerResponseStatus,
  setUserOrder,
  userLogout,
  verificationEmail,
} = UserSlice.actions;

export default UserSlice.reducer;

export const UserSelector = (state) => state.user;
