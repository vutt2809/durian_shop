/**
 *
 * Order
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'reactstrap';
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaUser, FaCalendar, FaBox } from 'react-icons/fa';
import { fetchOrderById } from './actions';

const OrderDetail = ({ match, history, order, isLoading, fetchOrderById }) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const orderId = match.params.id;
    console.log('OrderDetail mounted with orderId:', orderId);
    console.log('Current order state:', order);
    console.log('Current orderData state:', orderData);
    
    if (orderId) {
      fetchOrderById(orderId);
    }
  }, [match.params.id]);

  useEffect(() => {
    console.log('Order prop changed:', order);
    if (order) {
      setOrderData(order);
    }
  }, [order]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return { bg: '#FEF3C7', color: '#92400E', text: 'Chờ xử lý' };
      case 'processing': return { bg: '#DBEAFE', color: '#1E40AF', text: 'Đang xử lý' };
      case 'shipped': return { bg: '#FEF3C7', color: '#92400E', text: 'Đã gửi hàng' };
      case 'delivered': return { bg: '#D1FAE5', color: '#065F46', text: 'Đã giao hàng' };
      case 'cancelled': return { bg: '#FEE2E2', color: '#991B1B', text: 'Đã hủy' };
      default: return { bg: '#F3F4F6', color: '#374151', text: status };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Container style={{ padding: '40px 0' }}>
        <div style={{ textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>⏳</div>
          Đang tải thông tin đơn hàng...
        </div>
      </Container>
    );
  }

  if (!orderData) {
    return (
      <Container style={{ padding: '40px 0' }}>
        <div style={{ textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Không tìm thấy đơn hàng
          </div>
          <div style={{ fontSize: 14 }}>
            Đơn hàng này có thể không tồn tại hoặc bạn không có quyền xem
          </div>
        </div>
      </Container>
    );
  }

  const statusInfo = getStatusColor(orderData.status);

  return (
    <Container style={{ padding: '40px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <button
          onClick={() => history.goBack()}
          style={{
            background: 'none',
            border: 'none',
            color: '#6B7280',
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16
          }}
        >
          <FaArrowLeft />
          Quay lại
        </button>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: 0 }}>
            Đơn hàng #{orderData.order_number || orderData.id}
          </h1>
          <Badge style={{
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 600,
            background: statusInfo.bg,
            color: statusInfo.color,
            border: 'none'
          }}>
            {statusInfo.text}
          </Badge>
        </div>
        
        <p style={{ color: '#6B7280', fontSize: 16, margin: 0 }}>
          Đặt hàng lúc {formatDate(orderData.created_at)}
        </p>
      </div>

      <Row>
        {/* Order Details */}
        <Col lg="8">
          <Card style={{ padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#111827' }}>
              <FaBox style={{ marginRight: 8, color: '#F59E0B' }} />
              Chi tiết sản phẩm
            </h3>
            
            {orderData.orderDetails && orderData.orderDetails.length > 0 ? (
              <div>
                {orderData.orderDetails.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: index < orderData.orderDetails.length - 1 ? '1px solid #F3F4F6' : 'none'
                  }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      background: '#F9FAFB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16,
                      border: '1px solid #E5E7EB'
                    }}>
                      {item.product?.image_url ? (
                        <img
                          src={`http://localhost:3000${item.product.image_url}`}
                          alt={item.product?.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 8
                          }}
                        />
                      ) : (
                        <span style={{ color: '#9CA3AF', fontSize: 12 }}>No Image</span>
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#111827' }}>
                        {item.product?.name || 'Sản phẩm không xác định'}
                      </h4>
                      <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 4px 0' }}>
                        SKU: {item.product?.sku || 'N/A'}
                      </p>
                      <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>
                        Số lượng: {item.quantity} x {formatCurrency(item.price || 0)}
                      </p>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                        {formatCurrency((item.price || 0) * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
                <div style={{ fontSize: 16, marginBottom: 8 }}>
                  Không có sản phẩm nào trong đơn hàng
                </div>
              </div>
            )}
          </Card>
        </Col>

        {/* Order Summary */}
        <Col lg="4">
          <Card style={{ padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#111827' }}>
              Thông tin đơn hàng
            </h3>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#6B7280' }}>Tổng tiền hàng:</span>
                <span style={{ fontWeight: 600 }}>{formatCurrency(orderData.subtotal || 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#6B7280' }}>Phí vận chuyển:</span>
                <span style={{ fontWeight: 600 }}>Miễn phí</span>
              </div>
              <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700 }}>
                <span>Tổng cộng:</span>
                <span style={{ color: '#F59E0B' }}>{formatCurrency(orderData.total || 0)}</span>
              </div>
            </div>
          </Card>

          {/* Shipping Information */}
          {orderData.shippingAddress && (
            <Card style={{ padding: 24, border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#111827' }}>
                <FaMapMarkerAlt style={{ marginRight: 8, color: '#EF4444' }} />
                Thông tin giao hàng
              </h3>
              
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <FaUser style={{ marginRight: 8, color: '#6B7280' }} />
                  <span style={{ fontWeight: 600 }}>{orderData.shippingAddress.full_name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <FaPhone style={{ marginRight: 8, color: '#6B7280' }} />
                  <span>{orderData.shippingAddress.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <FaMapMarkerAlt style={{ marginRight: 8, color: '#6B7280', marginTop: 2 }} />
                  <span>{orderData.shippingAddress.address}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Order Notes */}
          {orderData.notes && (
            <Card style={{ padding: 24, marginTop: 24, border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#111827' }}>
                Ghi chú
              </h3>
              <p style={{ color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
                {orderData.notes}
              </p>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  order: state.order.order, // Sử dụng order thay vì selectedOrder
  isLoading: state.order.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrderById: (orderId) => dispatch(fetchOrderById(orderId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetail));
