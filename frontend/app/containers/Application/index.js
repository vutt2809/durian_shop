/**
 *
 * Application
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import actions from '../../actions';

import NavigationBar from '../../components/Common/NavigationBar';
import Footer from '../../components/Common/Footer';
import Notification from '../Notification';
import NotFound from '../../components/Common/NotFound';
import Login from '../Login';
import Signup from '../Signup';
import Homepage from '../Homepage';
import Dashboard from '../Dashboard';
import Product from '../Product';
import Cart from '../Cart';
import CheckoutContainer from '../Checkout';
import OrderSuccess from '../OrderSuccess';
import AuthSuccess from '../AuthSuccess';
import Account from '../Account';
import ProductPage from '../ProductPage';
import Contact from '../Contact';
import ResetPassword from '../ResetPassword';
import ForgotPassword from '../ForgotPassword';
import OrderDetail from '../Order';

const Application = (props) => {
  const {
    history,
    location,
    cartItems,
    authenticated,
    products,
    fetchProducts,
    fetchStoreCategories,
    fetchCartFromServer
  } = props;

  useEffect(() => {
    fetchProducts();
    fetchStoreCategories();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchCartFromServer();
    }
  }, [authenticated]);

  return (
    <div className='application'>
      <Notification />
      {!location.pathname.startsWith('/dashboard') && <NavigationBar history={history} authenticated={authenticated} cartItems={cartItems} />}
      <main className='main'>
        <Container>
          <div className='wrapper'>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route path='/cart' component={Cart} />
              <Route path='/checkout' component={CheckoutContainer} />
              <Route path='/order/success/:id' component={OrderSuccess} />
              <Route path='/product/:slug' component={ProductPage} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route path='/dashboard/orders' component={Dashboard} />
              <Route path='/dashboard/users' component={Dashboard} />
              <Route path='/dashboard/products' component={Dashboard} />
              <Route path='/dashboard/categories' component={Dashboard} />
              <Route path='/dashboard/sellers' component={Dashboard} />
              <Route path='/dashboard/support' component={Dashboard} />
              <Route path='/auth/success' component={AuthSuccess} />
              <Route path='/account' component={Account} />
              <Route path='/product-page' component={ProductPage} />
              <Route path='/contact' component={Contact} />
              <Route path='/reset-password/:token' component={ResetPassword} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <Route path='/order/:id' component={OrderDetail} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Container>
      </main>
      {!location.pathname.startsWith('/dashboard') && <Footer />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
    cartItems: state.cart.cartItems,
    products: state.product.products,
  };
};

export default withRouter(connect(mapStateToProps, actions)(Application));
