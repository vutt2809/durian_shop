/*
 *
 * OrderSuccess
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';

import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class OrderSuccess extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchOrder(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id;
      this.props.fetchOrder(id);
    }
  }

  render() {
    const { order, isLoading } = this.props;
    const orderNumber = order?.order_number || order?.id || this.props.match.params.id;

    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #f5f5fa 60%, #fffbe7 100%)' }}>
        {isLoading ? (
          <LoadingIndicator />
        ) : order ? (
          <div style={{ maxWidth: 520, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(234,179,8,0.10)', padding: '44px 32px', margin: '40px 0', textAlign: 'center' }}>
            <h2 style={{ fontWeight: 800, fontSize: 28, color: '#388e3c', margin: '0 0 16px 0', letterSpacing: 1 }}>Đặt hàng thành công!</h2>
            <p style={{ fontSize: 18, color: '#666', marginBottom: 8 }}>
              Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là:
            </p>
            <div style={{ background: '#f8f9fa', padding: '12px 20px', borderRadius: 12, margin: '16px 0', display: 'inline-block' }}>
              <span style={{ fontWeight: 700, fontSize: 20, color: '#eab308' }}>#{orderNumber}</span>
            </div>
            <p style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
              Chúng tôi sẽ gửi email xác nhận đến bạn trong thời gian sớm nhất.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                to='/dashboard/orders' 
                style={{ padding: '12px 24px', textDecoration: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16 }}
              >
                Xem đơn hàng
              </Link>
              <Link 
                to='/shop' 
                style={{ padding: '12px 24px', textDecoration: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16 }}
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        ) : (
          <NotFound message='Không tìm thấy đơn hàng.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.order,
    isLoading: state.order.isLoading
  };
};

export default connect(mapStateToProps, actions)(OrderSuccess);
