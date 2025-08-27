/*
 *
 * Product actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_PRODUCTS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_STORE_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_EDIT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_FORM_EDIT_ERRORS,
  RESET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING,
  SET_ADVANCED_FILTERS,
  RESET_ADVANCED_FILTERS
} from './constants';

import { API_URL, ROLES } from '../../constants';
import handleError from '../../utils/error';
import { formatSelectOptions, unformatSelectOptions } from '../../utils/select';
import { allFieldsValidation } from '../../utils/validation';

export const productChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: PRODUCT_CHANGE,
    payload: formData
  };
};

export const productEditChange = (name, value) => {
  let formData = {};
  if (name === 'image') {
    formData[name] = value[0];
  } else {
    formData[name] = value;
  }

  return {
    type: PRODUCT_EDIT_CHANGE,
    payload: formData
  };
};

export const productShopChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_SHOP_CHANGE,
    payload: formData
  };
};

export const resetProduct = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_PRODUCT });
  };
};

export const setProductLoading = value => {
  return {
    type: SET_PRODUCTS_LOADING,
    payload: value
  };
};

export const resetAdvancedFilters = () => {
  return {
    type: RESET_ADVANCED_FILTERS
  };
};

export const filterProducts2 = (n, v) => {
  return async (dispatch, getState) => {
    const advancedFilters = getState().product.advancedFilters;
    const payload = productsFilterOrganizer(n, v, advancedFilters);

    dispatch({ type: SET_ADVANCED_FILTERS, payload });
  };
};

// fetch/filter store products api
export const filterProducts = (n, v) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProductLoading(true));
      const advancedFilters = getState().product.advancedFilters;
      const payload = productsFilterOrganizer(n, v, advancedFilters);

      dispatch({ type: SET_ADVANCED_FILTERS, payload });
      const sortOrder = getSortOrder(payload.order);
      
      // Build query parameters
      const params = { ...payload, sortOrder };
      
      // Remove undefined or null values
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
          delete params[key];
        }
      });
      
      const response = await axios.get(`${API_URL}/product`, { params });
      
      const { data, current_page, last_page, total } = response.data.products;

      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: data
      });

      const newPayload = {
        ...payload,
        totalPages: last_page,
        currentPage: current_page,
        count: total
      };
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: newPayload
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};

// fetch store product api
export const fetchStoreProduct = slug => {
  return async (dispatch, getState) => {
    dispatch(setProductLoading(true));

    try {
      const response = await axios.get(`${API_URL}/product/${slug}`);

      const inventory = response.data.product.quantity;
      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_STORE_PRODUCT,
        payload: product
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};

export const fetchProductsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/product`);

      const formattedProducts = formatSelectOptions(response.data.products);

      dispatch({
        type: FETCH_PRODUCTS_SELECT,
        payload: formattedProducts
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch products api
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProductLoading(true));

      const response = await axios.get(`${API_URL}/product`);

      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products && Array.isArray(response.data.products.data) ? response.data.products.data : []
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProductLoading(false));
    }
  };
};

// fetch product api
export const fetchProduct = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/product/${id}`);

      const inventory = response.data.product.quantity;

      const category = response.data.product.category;
      const categoryId = response.data.product.category_id;

      if (category && categoryId) {
        response.data.product.category = {
          value: categoryId,
          label: category.name
        };
      }

      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_PRODUCT,
        payload: product
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add product api
export const addProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required',
        quantity: 'required|numeric',
        price: 'required|numeric',
        weight: 'required|numeric',
        ripeness: 'required',
        origin: 'required',
        category_id: 'required'
      };

      const product = getState().product.productFormData;

      const newProduct = {
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        weight: product.weight,
        ripeness: product.ripeness,
        origin: product.origin,
        category_id: product.category_id
      };

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.name': 'Tên sản phẩm là bắt buộc.',
        'required.description': 'Mô tả là bắt buộc.',
        'required.quantity': 'Số lượng là bắt buộc.',
        'required.price': 'Giá là bắt buộc.',
        'required.weight': 'Trọng lượng là bắt buộc.',
        'required.ripeness': 'Độ chín là bắt buộc.',
        'required.origin': 'Xuất xứ là bắt buộc.',
        'required.category_id': 'Danh mục là bắt buộc.',
        'numeric.quantity': 'Số lượng phải là số.',
        'numeric.price': 'Giá phải là số.',
        'numeric.weight': 'Trọng lượng phải là số.'
      });

      if (!isValid) {
        return dispatch({ type: SET_PRODUCT_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`${API_URL}/product`, newProduct);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_PRODUCT,
          payload: response.data.product
        });
        dispatch(resetProduct());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update Product api
export const updateProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        sku: 'required|alpha_dash',
        slug: 'required|alpha_dash',
        description: 'required|max:200',
        quantity: 'required|numeric',
        price: 'required|numeric',
        taxable: 'required'
      };

      const product = getState().product.product;

      const newProduct = {
        name: product.name,
        sku: product.sku,
        slug: product.slug,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        taxable: product.taxable,
        is_active: product.is_active
      };

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.name': 'Tên sản phẩm là bắt buộc.',
        'required.sku': 'Sku là bắt buộc.',
        'alpha_dash.sku':
          'Sku có thể có các ký tự alpha-numeric, cũng như dấu gạch ngang và dấu gạch dưới.',
        'required.slug': 'Slug là bắt buộc.',
        'alpha_dash.slug':
          'Slug có thể có các ký tự alpha-numeric, cũng như dấu gạch ngang và dấu gạch dưới.',
        'required.description': 'Mô tả là bắt buộc.',
        'max.description':
          'Mô tả không được lớn hơn 200 ký tự.',
        'required.quantity': 'Số lượng là bắt buộc.',
        'required.price': 'Giá là bắt buộc.',
        'required.taxable': 'Thuế là bắt buộc.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_PRODUCT_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const formData = new FormData();
      if (product.image) {
        formData.append('image', product.image);
      }
      for (const key in newProduct) {
        if (newProduct.hasOwnProperty(key)) {
          formData.append(key, newProduct[key]);
        }
      }

      const response = await axios.put(
        `${API_URL}/product/${product.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        dispatch(fetchProduct(product.id));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// activate product api
export const activateProduct = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`${API_URL}/product/${id}/active`, {
        is_active: value
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete product api
export const deleteProduct = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`${API_URL}/product/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_PRODUCT,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

const productsFilterOrganizer = (n, v, s) => {
  switch (n) {
    case 'name':
      return {
        name: v,
        category: s.category || 'all',
        min: 0,
        max: 500000,
        order: s.order || 'created_at_desc',
        page: s.currentPage || 1,
        limit: s.limit || 12
      };
    case 'category':
      return {
        name: s.name || '',
        category: v,
        min: 0,
        max: 500000,
        order: s.order || 'created_at_desc',
        page: s.currentPage || 1,
        limit: s.limit || 12
      };
    case 'sorting':
      return {
        name: s.name || '',
        category: s.category || 'all',
        min: s.min,
        max: s.max,
        order: v,
        page: s.currentPage || 1,
        limit: s.limit || 12
      };
    case 'price':
      return {
        name: s.name || '',
        category: s.category || 'all',
        min: v[0],
        max: v[1],
        order: s.order || 'created_at_desc',
        page: s.currentPage || 1,
        limit: s.limit || 12
      };
    case 'pagination':
      return {
        name: s.name || '',
        category: s.category || 'all',
        min: s.min,
        max: s.max,
        order: s.order || 'created_at_desc',
        page: (v ?? s.currentPage) || 1,
        limit: s.limit || 12
      };
    default:
      return {
        name: s.name || '',
        category: s.category || 'all',
        min: 0,
        max: 500000,
        order: s.order || 'created_at_desc',
        page: s.currentPage || 1,
        limit: s.limit || 12
      };
  }
};

const getSortOrder = value => {
  let sortOrder = {};
  switch (value) {
    case 'price_asc':
      sortOrder.price = 1;
      break;
    case 'price_desc':
      sortOrder.price = -1;
      break;
    case 'name_asc':
      sortOrder.name = 1;
      break;
    case 'name_desc':
      sortOrder.name = -1;
      break;
    case 'created_at_desc':
    default:
      sortOrder.created_at = -1;
      break;
  }

  return sortOrder;
};
