/*
 *
 * Order actions
 *
 */

import { push } from 'connected-react-router';
import axios from 'axios';
import { success } from 'react-notification-system-redux';

import {
  FETCH_ORDERS,
  FETCH_SEARCHED_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER_STATUS,
  SET_ORDERS_LOADING,
  SET_ADVANCED_FILTERS,
  CLEAR_ORDERS
} from './constants';

import { clearCart, getCartId, fetchCartFromServer } from '../Cart/actions';
import { toggleCart } from '../Navigation/actions';
import handleError from '../../utils/error';
import { API_URL } from '../../constants';

export const updateOrderStatus = value => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: value
  };
};

export const setOrderLoading = value => {
  return {
    type: SET_ORDERS_LOADING,
    payload: value
  };
};

export const fetchOrders = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`${API_URL}/order`, {
        params: {
          page: page ?? 1,
          limit: 20
        }
      });

      const { orders, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_ORDERS,
        payload: orders
      });

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count }
      });
    } catch (error) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const fetchAccountOrders = (isAdmin = false, page = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const url = isAdmin ? `${API_URL}/order/all` : `${API_URL}/order`;
      const response = await axios.get(url, {
        params: {
          page: page ?? 1,
          limit: 20
        }
      });

      const { orders, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_ORDERS,
        payload: orders
      });

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count }
      });
    } catch (error) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const searchOrders = filter => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`${API_URL}/order/search`, {
        params: {
          search: filter.value
        }
      });

      dispatch({
        type: FETCH_SEARCHED_ORDERS,
        payload: response.data.orders
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const fetchOrder = (id, withLoading = true) => {
  return async (dispatch, getState) => {
    try {
      if (withLoading) {
        dispatch(setOrderLoading(true));
      }

      const response = await axios.get(`${API_URL}/order/${id}`);

      dispatch({
        type: FETCH_ORDER,
        payload: response.data.order
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      if (withLoading) {
        dispatch(setOrderLoading(false));
      }
    }
  };
};

export const fetchOrderById = (orderId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      console.log('Fetching order by ID:', orderId);
      const response = await axios.get(`${API_URL}/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Order response:', response.data);

      dispatch({
        type: FETCH_ORDER,
        payload: response.data.order
      });
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      console.error('Error response:', error.response?.data);
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const cancelOrder = () => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      await axios.delete(`${API_URL}/order/cancel/${orderid}`);

      dispatch(push(`/dashboard/orders`));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const updateOrderItemStatus = (itemId, status) => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      const response = await axios.put(
        `${API_URL}/order/status/item/${itemId}`,
        {
          orderId: orderid,
          cartId: order.cartId,
          status
        }
      );

      if (response.data.orderCancelled) {
        dispatch(push(`/dashboard/orders`));
      } else {
        dispatch(updateOrderStatus({ itemId, status }));
        dispatch(fetchOrder(orderid, false));
      }

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const addOrder = (shippingInfo) => {
  return async (dispatch, getState) => {
    try {
      const cartItems = getState().cart.cartItems;
      
      console.log('Cart items before order:', cartItems);
      
      if (!cartItems || cartItems.length === 0) {
        dispatch(success({ 
          title: 'Giỏ hàng trống!', 
          position: 'tr', 
          autoDismiss: 2 
        }));
        return;
      }

      // Chuẩn bị dữ liệu sản phẩm cho order
      const orderItems = cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      console.log('Order items to send:', orderItems);
      
      // Gửi đơn hàng với thông tin địa chỉ giao hàng và sản phẩm
      const response = await axios.post(`${API_URL}/order`, {
        notes: '',
        full_name: shippingInfo.full_name,
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        items: orderItems // Gửi thông tin sản phẩm từ frontend
      });
      
      console.log('Order response:', response.data);
      
      dispatch(success({ title: 'Đặt hàng thành công!', position: 'tr', autoDismiss: 2 }));
      dispatch(clearCart());
      dispatch(push(`/order/success/${response.data.order.id || response.data.order.order_number}`));
    } catch (error) {
      console.error('Order error:', error.response?.data || error.message);
      handleError(error, dispatch);
    }
  };
};

export const placeOrder = () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token');
    const cartItems = getState().cart.cartItems;
    if (token && cartItems.length > 0) {
      Promise.all([dispatch(getCartId())]).then(() => {
        dispatch(push('/checkout'));
      });
    }
  };
};

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS
  };
};
