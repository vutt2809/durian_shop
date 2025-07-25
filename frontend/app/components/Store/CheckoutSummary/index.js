/**
 *
 * CheckoutSummary
 *
 */

import React from 'react';
import { Row, Col } from 'reactstrap';

const CheckoutSummary = props => {
  const { cartItems, cartTotal } = props;

  return (
    <div className="checkout-summary">
      <div className="summary-card">
        <h3 className="summary-title">Tổng quan đơn hàng</h3>
        
        <div className="order-items">
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-info">
                <div className="item-image">
                  <img
                    src={item.imageUrl || item.image_url || '/images/placeholder-image.png'}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = '/images/placeholder-image.png';
                    }}
                  />
                </div>
                <div className="item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-price">{item.price}₫ x {item.quantity}</p>
                </div>
              </div>
              <div className="item-total">
                {(item.price * item.quantity).toLocaleString()}₫
              </div>
            </div>
          ))}
        </div>

        <hr />

        <div className="summary-totals">
          <Row className="summary-row">
            <Col xs="8">
              <span className="summary-label">Tạm tính:</span>
            </Col>
            <Col xs="4" className="text-right">
              <span className="summary-value">{cartTotal.toLocaleString()}₫</span>
            </Col>
          </Row>
          
          <Row className="summary-row">
            <Col xs="8">
              <span className="summary-label">Phí vận chuyển:</span>
            </Col>
            <Col xs="4" className="text-right">
              <span className="summary-value">Miễn phí</span>
            </Col>
          </Row>
          
          <Row className="summary-row total-row">
            <Col xs="8">
              <span className="summary-label">Tổng cộng:</span>
            </Col>
            <Col xs="4" className="text-right">
              <span className="summary-value total-value">{cartTotal.toLocaleString()}₫</span>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary; 