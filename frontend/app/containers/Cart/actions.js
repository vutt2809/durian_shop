/*
 *
 * Cart actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  HANDLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  HANDLE_CART_TOTAL,
  SET_CART_ID,
  CLEAR_CART
} from './constants';

import {
  SET_PRODUCT_SHOP_FORM_ERRORS,
  RESET_PRODUCT_SHOP
} from '../Product/constants';

import { API_URL, CART_ID, CART_ITEMS, CART_TOTAL } from '../../constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { toggleCart } from '../Navigation/actions';

// Handle Add To Cart
export const handleAddToCart = product => {
  return (dispatch, getState) => {
    product.quantity = Number(getState().product.productShopData.quantity);
    product.totalPrice = product.quantity * product.price;
    product.totalPrice = parseFloat(product.totalPrice.toFixed(2));
    const inventory = getState().product.storeProduct.inventory;

    const result = calculatePurchaseQuantity(inventory);

    const rules = {
      quantity: `min:1|max:${result}`
    };

    const { isValid, errors } = allFieldsValidation(product, rules, {
      'min.quantity': 'Quantity must be at least 1.',
      'max.quantity': `Quantity may not be greater than ${result}.`
    });

    if (!isValid) {
      return dispatch({ type: SET_PRODUCT_SHOP_FORM_ERRORS, payload: errors });
    }

    dispatch({
      type: RESET_PRODUCT_SHOP
    });

    dispatch({
      type: ADD_TO_CART,
      payload: product
    });

    const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS));
    let newCartItems = [];
    if (cartItems) {
      newCartItems = [...cartItems, product];
    } else {
      newCartItems.push(product);
    }
    localStorage.setItem(CART_ITEMS, JSON.stringify(newCartItems));

    dispatch(calculateCartTotal());
    
    // Thông báo thành công
    dispatch(success({ 
      title: `Đã thêm ${product.name} vào giỏ hàng!`, 
      position: 'tr', 
      autoDismiss: 2 
    }));
  };
};

// Handle Remove From Cart
export const handleRemoveFromCart = product => {
  return (dispatch, getState) => {
    const { authenticated } = getState().authentication;
    
    if (authenticated) {
      // Nếu user đã đăng nhập, xóa khỏi server
      dispatch(removeFromCartServer(product.id));
    } else {
      // Nếu user chưa đăng nhập, xóa khỏi localStorage
      const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];
      const newCartItems = cartItems.filter(item => item.id !== product.id);
      localStorage.setItem(CART_ITEMS, JSON.stringify(newCartItems));

      dispatch({
        type: REMOVE_FROM_CART,
        payload: product
      });
      dispatch(calculateCartTotal());
    }
    
    // Thông báo thành công
    dispatch(success({ 
      title: `Đã xóa ${product.name} khỏi giỏ hàng!`, 
      position: 'tr', 
      autoDismiss: 2 
    }));
  };
};

// Remove from cart server
export const removeFromCartServer = (productId) => {
  return async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token');
      }

      // Trước tiên, lấy danh sách cart items để tìm cart item ID
      const cartResponse = await axios.get(`${API_URL}/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (cartResponse.data.success) {
        const cartItems = cartResponse.data.cart || [];
        const cartItem = cartItems.find(item => item.product_id === productId);
        
        if (cartItem) {
          // Gọi API để xóa cart item
          await axios.delete(`${API_URL}/cart/${cartItem.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          // Cập nhật Redux state
          dispatch({
            type: REMOVE_FROM_CART,
            payload: { id: productId }
          });
          
          dispatch(calculateCartTotal());
        } else {
          throw new Error('Cart item not found');
        }
      }
      
    } catch (error) {
      console.error('Error removing from cart:', error);
      handleError(error, dispatch);
    }
  };
};

export const calculateCartTotal = () => {
  return (dispatch, getState) => {
    const cartItems = getState().cart.cartItems || [];

    let total = 0;

    cartItems.map(item => {
      total += item.price * item.quantity;
    });

    total = parseFloat(total.toFixed(2));
    localStorage.setItem(CART_TOTAL, total);
    dispatch({
      type: HANDLE_CART_TOTAL,
      payload: total
    });
  };
};

// set cart store from local storage
export const handleCart = () => {
  const cart = {
    cartItems: JSON.parse(localStorage.getItem(CART_ITEMS)) || [],
    cartTotal: localStorage.getItem(CART_TOTAL) || 0,
    cartId: localStorage.getItem(CART_ID) || null
  };

  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_CART,
      payload: cart
    });
    dispatch(calculateCartTotal());
  };
};

export const handleCheckout = () => {
  return (dispatch, getState) => {
    const successfulOptions = {
      title: `Please Login to proceed to checkout`,
      position: 'tr',
      autoDismiss: 1
    };

    dispatch(toggleCart());
    dispatch(push('/login'));
    dispatch(success(successfulOptions));
  };
};

// Continue shopping use case
export const handleShopping = () => {
  return (dispatch, getState) => {
    dispatch(push('/shop'));
    // dispatch(toggleCart()); // Comment out để tránh lỗi
    
    // Thông báo thành công
    dispatch(success({ 
      title: 'Đã chuyển đến trang mua sắm!', 
      position: 'tr', 
      autoDismiss: 2 
    }));
  };
};

// create cart id api
export const getCartId = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem(CART_ID);
      const cartItems = getState().cart.cartItems;
      const products = getCartItems(cartItems);

      // create cart id if there is no one
      if (!cartId) {
        const response = await axios.post(`${API_URL}/cart`, { products });

        dispatch(setCartId(response.data.cartId));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const setCartId = cartId => {
  return (dispatch, getState) => {
    localStorage.setItem(CART_ID, cartId);
    dispatch({
      type: SET_CART_ID,
      payload: cartId
    });
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    localStorage.removeItem(CART_ITEMS);
    localStorage.removeItem(CART_TOTAL);
    localStorage.removeItem(CART_ID);

    dispatch({
      type: CLEAR_CART
    });
  };
};

const getCartItems = cartItems => {
  const newCartItems = [];
  cartItems.map(item => {
    const newItem = {};
    newItem.quantity = item.quantity;
    newItem.price = item.price;
    newItem.taxable = item.taxable;
    newItem.product = item.id;
    newCartItems.push(newItem);
  });

  return newCartItems;
};

const calculatePurchaseQuantity = inventory => {
  if (inventory <= 25) {
    return 1;
  } else if (inventory > 25 && inventory <= 100) {
    return 5;
  } else if (inventory > 100 && inventory < 500) {
    return 25;
  } else {
    return 50;
  }
};

export const fetchCartFromServer = () => {
  return async (dispatch, getState) => {
    try {
      console.log('Fetching cart from server...');
      const response = await axios.get(`${API_URL}/cart`);
      console.log('Cart API response:', response.data);
      const cartItems = response.data.cart || [];
      
      // Format cart items để phù hợp với Redux state
      const formattedCartItems = cartItems.map(item => ({
        id: item.product.id,
        _id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        image_url: item.product.image_url,
        price: parseFloat(item.price),
        quantity: item.quantity,
        totalPrice: parseFloat(item.price) * item.quantity,
        weight: item.product.weight,
        origin: item.product.origin,
        ripeness: item.product.ripeness,
        sku: item.product.sku,
        description: item.product.description
      }));

      console.log('Formatted cart items:', formattedCartItems);
      const cartTotal = formattedCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      
      dispatch({
        type: HANDLE_CART,
        payload: {
          cartItems: formattedCartItems,
          cartTotal: cartTotal,
          cartId: null
        }
      });
      console.log('Cart state updated successfully');
    } catch (error) {
      console.error('Error fetching cart:', error);
      handleError(error, dispatch);
    }
  };
};

export const addToCartServer = (product, quantity = 1) => {
  return async (dispatch, getState) => {
    try {
      console.log('Adding product to cart server:', product, quantity);
      const response = await axios.post(`${API_URL}/cart`, {
        product_id: product.id,
        quantity
      });
      console.log('Add to cart API response:', response.data);
      dispatch(fetchCartFromServer());
      
      // Thông báo thành công
      dispatch(success({ 
        title: `Đã thêm ${product.name} vào giỏ hàng!`, 
        position: 'tr', 
        autoDismiss: 2 
      }));
    } catch (error) {
      console.error('Error adding to cart:', error);
      handleError(error, dispatch);
    }
  };
};

// Đồng bộ cart localStorage lên server khi user đăng nhập
export const syncLocalCartToServer = () => {
  return async (dispatch, getState) => {
    const localCart = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];
    if (localCart.length === 0) return;
    try {
      for (const item of localCart) {
        await dispatch(addToCartServer(item, item.quantity || 1));
      }
      // Sau khi merge, xóa localStorage cart
      localStorage.removeItem(CART_ITEMS);
      localStorage.removeItem(CART_TOTAL);
      localStorage.removeItem(CART_ID);
      // Fetch lại cart từ server để đồng bộ UI
      await dispatch(fetchCartFromServer());
    } catch (error) {
      // Có thể log lỗi nếu cần
    }
  };
};
