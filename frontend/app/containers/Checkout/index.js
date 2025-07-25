/**
 *
 * Checkout
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';

import actions from '../../actions';
import { fetchCartFromServer } from '../Cart/actions';

import CheckoutForm from '../../components/Store/CheckoutForm';
import CheckoutSummary from '../../components/Store/CheckoutSummary';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Checkout extends React.PureComponent {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.fetchCartFromServer();
    }
  }

  render() {
    const {
      cartItems,
      cartTotal,
      isLoading,
      authenticated
    } = this.props;

    if (!authenticated) {
      return (
        <div className="checkout-page">
          <Container>
            <div className="text-center py-5">
              <h2>Vui lòng đăng nhập để tiếp tục</h2>
              <p>Bạn cần đăng nhập để hoàn tất đơn hàng</p>
            </div>
          </Container>
        </div>
      );
    }

    if (cartItems.length === 0) {
      return (
        <div className="checkout-page">
          <Container>
            <div className="text-center py-5">
              <h2>Giỏ hàng trống</h2>
              <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
            </div>
          </Container>
        </div>
      );
    }

    return (
      <div className="checkout-page">
        <Container>
          <h1 className="checkout-title mb-4">Thông tin thanh toán</h1>
          
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <Row>
              <Col xs="12" lg="8">
                <CheckoutForm 
                  cartItems={cartItems}
                  cartTotal={cartTotal}
                />
              </Col>
              <Col xs="12" lg="4">
                <CheckoutSummary 
                  cartItems={cartItems}
                  cartTotal={cartTotal}
                />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal,
    isLoading: state.cart.isLoading,
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, { fetchCartFromServer })(Checkout); 