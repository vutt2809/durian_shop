/**
 *
 * OrderMeta
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import { CART_ITEM_STATUS } from '../../../constants';
import { formatDate } from '../../../utils/date';
import { VI } from '../../../constants/vi';
import Button from '../../Common/Button';
import { ArrowBackIcon } from '../../Common/Icon';

const OrderMeta = props => {
  const { order, cancelOrder, onBack } = props;

  const renderMetaAction = () => {
    if (order.status === 'pending') {
      return <Button size='sm' text='Hủy đơn hàng' onClick={cancelOrder} />;
    }
  };

  return (
    <div className='order-meta'>
      <div className='d-flex align-items-center justify-content-between mb-3 title'>
        <h2 className='mb-0'>Đơn hàng #{order.order_number}</h2>
        <Button
          variant='link'
          icon={<ArrowBackIcon />}
          size='sm'
          text='Quay lại'
          onClick={onBack}
        ></Button>
      </div>

      <Row>
        <Col xs='12' md='8'>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>{VI['Order Date']}</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${formatDate(
                order.created_at
              )}`}</span>
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Trạng thái</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${order.status === 'pending' ? 'Chờ xử lý' : order.status === 'processing' ? 'Đang xử lý' : order.status === 'shipped' ? 'Đã giao hàng' : order.status === 'delivered' ? 'Đã nhận hàng' : order.status === 'cancelled' ? 'Đã hủy' : order.status}`}</span>
            </Col>
          </Row>
        </Col>
        <Col xs='12' md='4' className='text-left text-md-right'>
          {renderMetaAction()}
        </Col>
      </Row>
    </div>
  );
};

export default OrderMeta;
