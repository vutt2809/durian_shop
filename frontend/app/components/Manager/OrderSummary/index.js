/**
 *
 * OrderSummary
 *
 */

import React from 'react';

import { Col } from 'reactstrap';

const OrderSummary = props => {
  const { order } = props;

  return (
    <Col className='order-summary pt-3'>
      <h2>Thông tin đơn hàng</h2>
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Tổng tiền hàng</p>
        <p className='summary-value ml-auto'>{new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(order.subtotal)}</p>
      </div>
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Phí vận chuyển</p>
        <p className='summary-value ml-auto'>Miễn phí</p>
      </div>

      <hr />
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Tổng cộng</p>
        <p className='summary-value ml-auto'>{new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(order.total)}</p>
      </div>
    </Col>
  );
};

export default OrderSummary;
