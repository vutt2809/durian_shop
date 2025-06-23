export const fetchStoreCategories = () => async (dispatch) => {
  dispatch({ type: 'FETCH_STORE_CATEGORIES', payload: [] });
};

export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PROFILE', payload: {} });
};

export const onSuggestionsFetchRequested = () => async (dispatch) => {};
export const onSuggestionsClearRequested = () => async (dispatch) => {};
export const handleCart = () => async (dispatch) => {};

export default {
  fetchStoreCategories,
  fetchProfile,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  handleCart,
}; 