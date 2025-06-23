/**
 *
 * Navigation - Modern Design
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink as ActiveLink, withRouter, useHistory } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Badge
} from 'reactstrap';
import { 
  FaSearch, 
  FaUser, 
  FaHeart, 
  FaShoppingCart, 
  FaBars, 
  FaPhone, 
  FaTruck, 
  FaLeaf,
  FaTimes
} from 'react-icons/fa';
import './Navigation.scss';

import actions from '../../actions';
import { VI } from '../../constants/vi';

import CartIcon from '../../components/Common/CartIcon';
import { BarsIcon } from '../../components/Common/Icon';
import MiniBrand from '../../components/Store//MiniBrand';
import Menu from './NavigationMenu';
import Cart from './Cart';

class Navigation extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoreCategories();
  }

  toggleBrand() {
    this.props.toggleBrand();
  }

  toggleMenu() {
    this.props.fetchStoreCategories();
    this.props.toggleMenu();
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const BoldName = (suggestion, query) => {
      const matches = AutosuggestHighlightMatch(suggestion.name, query);
      const parts = AutosuggestHighlightParse(suggestion.name, matches);

      return (
        <div>
          {parts.map((part, index) => {
            const className = part.highlight
              ? 'react-autosuggest__suggestion-match'
              : null;
            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </div>
      );
    };

    return (
      <Link to={`/product/${suggestion.slug}`}>
        <div className='d-flex align-items-center p-2'>
          <img
            className='item-image mr-3'
            src={`${
              suggestion.imageUrl
                ? suggestion.imageUrl
                : '/images/placeholder-image.png'
            }`}
            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <div className='flex-grow-1'>
            <div className='name'>{BoldName(suggestion, query)}</div>
            <div className='price text-success font-weight-bold'>${suggestion.price}</div>
          </div>
        </div>
      </Link>
    );
  }

  handleCartClick = () => {
    this.props.history.push('/cart');
  };

  render() {
    const {
      history,
      authenticated,
      user,
      cartItems,
      brands,
      categories,
      signOut,
      isMenuOpen,
      isCartOpen,
      isBrandOpen,
      toggleCart,
      toggleMenu,
      searchValue,
      suggestions,
      onSearch,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested
    } = this.props;

    const inputProps = {
      placeholder: 'Tìm kiếm sầu riêng...',
      value: searchValue,
      onChange: (_, { newValue }) => {
        onSearch(newValue);
      }
    };

    return (
      <header className='header tiki-header'>
        <div className='header-main'>
          <Container fluid>
            <Row className='align-items-center'>
              {/* Logo */}
              <Col xs='12' md='2' className='d-flex align-items-center'>
                <Link to='/' className='tiki-logo'>
                  <span className='logo-text'>Sầu Riêng Việt</span>
                </Link>
            </Col>
              {/* Search */}
              <Col xs='12' md='7' className='my-2 my-md-0'>
                <div className='tiki-searchbar'>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(_, item) => {
                      history.push(`/product/${item.slug}`);
                    }}
                    theme={{
                      container: 'search-container',
                      input: 'form-control search-input',
                      suggestionsContainer: 'suggestions-container',
                      suggestionsList: 'suggestions-list',
                      suggestion: 'suggestion-item'
                    }}
                  />
                  <FaSearch className='search-icon' />
              </div>
            </Col>
              {/* Account & Cart */}
              <Col xs='12' md='3' className='d-flex justify-content-end align-items-center tiki-header-actions'>
                <Link to='/account' className='tiki-header-action'>
                  <FaUser size={22} />
                  <span className='d-none d-md-inline ml-2'>Tài khoản</span>
                </Link>
                <div className='tiki-header-action tiki-cart' onClick={this.handleCartClick} style={{cursor:'pointer'}}>
                  <FaShoppingCart size={22} />
                  {cartItems && cartItems.length > 0 && (
                    <span className='cart-badge'>{cartItems.length}</span>
                  )}
                </div>
            </Col>
          </Row>
        </Container>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    user: state.account.user,
    cartItems: state.cart.cartItems,
    brands: state.brand.storeBrands,
    categories: state.category.storeCategories,
    isMenuOpen: state.navigation.isMenuOpen,
    isCartOpen: state.navigation.isCartOpen,
    isBrandOpen: state.navigation.isBrandOpen,
    searchValue: state.navigation.searchValue,
    suggestions: state.navigation.searchSuggestions || []
  };
};

export default connect(mapStateToProps, actions)(withRouter(Navigation));
