/**
 *
 * Order
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'reactstrap';

import { fetchOrderById, updateOrderStatusByAdmin } from './actions';

const OrderDetail = ({ match, history, order, isLoading, fetchOrderById, updateOrderStatusByAdmin, user }) => {
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

  const getAvailableStatuses = (currentStatus) => {
    const statusTransitions = {
      'pending': ['processing', 'cancelled'],
      'processing': ['shipped', 'cancelled'],
      'shipped': ['delivered', 'cancelled'],
      'delivered': [],
      'cancelled': []
    };
    return statusTransitions[currentStatus] || [];
  };

  const handleStatusUpdate = (newStatus) => {
    console.log('🎯 OrderDetail handleStatusUpdate called:', { newStatus, orderDataId: orderData?.id, userRole: user?.role });
    if (orderData && user?.role === 'admin') {
      console.log('👑 Admin detected in OrderDetail, calling updateOrderStatusByAdmin');
      updateOrderStatusByAdmin(orderData.id, newStatus);
    } else {
      console.log('❌ Not admin or no orderData in OrderDetail');
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
            
            {/* Admin Status Update */}
            {(() => {
              const isAdmin = user?.role === 'admin';
              console.log('🔍 OrderDetail admin check:', { isAdmin, userRole: user?.role });
              return isAdmin;
            })() && (
              <div style={{ position: 'relative' }}>
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleStatusUpdate(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: 6,
                    fontSize: 14,
                    background: '#fff',
                    cursor: 'pointer',
                    minWidth: 140
                  }}
                >
                  <option value="">Cập nhật trạng thái</option>
                  {getAvailableStatuses(orderData.status).map(status => {
                    const statusInfo = getStatusColor(status);
                    return (
                      <option key={status} value={status}>
                        {statusInfo.text}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
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
              Chi tiết sản phẩm
            </h3>
            
            {orderData.order_details && orderData.order_details.length > 0 ? (
              <div>
                {orderData.order_details.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: index < orderData.order_details.length - 1 ? '1px solid #F3F4F6' : 'none'
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
          <Card style={{ padding: 24, border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#111827' }}>
              Thông tin giao hàng
            </h3>
            
            <div style={{ marginBottom: 12 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 600 }}>{orderData.full_name}</span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <span>{orderData.phone}</span>
              </div>
              <div>
                <span>{orderData.address}</span>
              </div>
            </div>
          </Card>

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
  isLoading: state.order.isLoading,
  user: state.account.user
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrderById: (orderId) => dispatch(fetchOrderById(orderId)),
  updateOrderStatusByAdmin: (orderId, status) => dispatch(updateOrderStatusByAdmin(orderId, status))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetail));
