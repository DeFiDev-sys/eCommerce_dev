import axios from "axios";

import {
  setLoading,
  setError,
  userLogin,
  setReset,
  setServerResponseMsg,
  setServerResponseStatus,
  setUserOrder,
  userLogout,
  verificationEmail,
} from "../../slices/UserSlice";
import { clearCart } from "../../slices/CartSlice";

const BaseURL = "http://localhost:5000";

//Login action
export const LoginUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${BaseURL}/api/users/login`, { email, password }, config);

    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
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

//logout
export const LogoutUser = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch(clearCart());
  dispatch(userLogout());
};

//register
export const RegisterUser = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${BaseURL}/api/users/register`, { name, email, password }, config);

    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
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

//verify email
export const VerifyEmail = (token) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } };

    await axios.get(`${BaseURL}/api/users/verify-email`, config);

    dispatch(verificationEmail());
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userInfo.active = true;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
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

//send email for password change request
export const SendRestEmail = (email) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data, status } = await axios.post(`${BaseURL}/api/users/password-reset-request`, { email }, config);

    dispatch(setServerResponseMsg(data));
    dispatch(setServerResponseStatus(status));
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

//password reset request
export const RestPassword = (password, token) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } };

    const { data, status } = await axios.post(`${BaseURL}/api/users/password-reset`, { password }, config);

    dispatch(setServerResponseMsg(data, status));
    dispatch(setServerResponseStatus(status));
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

//reset state
export const ResetState = () => async (dispatch) => {
  dispatch(setReset());
};
