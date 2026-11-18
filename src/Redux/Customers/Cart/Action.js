import axios from "axios";


import { API_BASE_URL } from "../../../config/api";
import {
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const addItemToCart = (reqData) => async (dispatch) => {
    console.log("req data ",reqData)
  try {
   
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`${API_BASE_URL}/api/cart/add`, 
      reqData.data,
      config,
    );
dispatch({
      type: ADD_ITEM_TO_CART_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    // API errors look like { error, fieldErrors? }; return the message so the page can show it
    const body = error?.response?.data;
    const message = (body?.fieldErrors && Object.values(body.fieldErrors)[0]) || body?.error || error.message;
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload: message,
    });
    return message;
  }
};

export const getCart = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });
    const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type":"application/json"
        },
      };
    const { data } = await axios.get(`${API_BASE_URL}/api/cart/`,config);
console.log("cart ",data)
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeCartItem = (reqData) => async (dispatch) => {
    try {
      dispatch({ type: REMOVE_CART_ITEM_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
          "Content-Type":"application/json"
        },
      };
      await axios.delete(`${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`,config);
  
      dispatch({
        type: REMOVE_CART_ITEM_SUCCESS,
        payload: reqData.cartItemId,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_CART_ITEM_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const updateCartItem = (reqData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CART_ITEM_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
          "Content-Type":"application/json"
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/api/cart_items/${reqData.cartItemId}`,
        reqData.data,config
      );
  console.log("udated cartitem ",data)
      dispatch({
        type: UPDATE_CART_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CART_ITEM_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  