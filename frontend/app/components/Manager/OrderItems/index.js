/**
 *
 * OrderItems
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col, DropdownItem } from 'reactstrap';

import { ROLES, CART_ITEM_STATUS } from '../../../constants';
import Button from '../../Common/Button';
import DropdownConfirm from '../../Common/DropdownConfirm';

const OrderItems = props => {
  const { order, user, updateOrderItemStatus } = props;

  const renderPopoverContent = item => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    return (
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {statuses.map((s, i) => (
          <DropdownItem
            key={`${s}-${i}`}
            className={s === order?.status ? 'active' : ''}
            onClick={() => updateOrderItemStatus(item.id, s)}
          >
            {s === 'pending' ? 'Chờ xử lý' : 
             s === 'processing' ? 'Đang xử lý' : 
             s === 'shipped' ? 'Đã giao hàng' : 
             s === 'delivered' ? 'Đã nhận hàng' : 
             s === 'cancelled' ? 'Đã hủy' : s}
          </DropdownItem>
        ))}
      </div>
    );
  };

  const renderItemsAction = item => {
    const isAdmin = user.role === ROLES.Admin;

    if (order.status === 'pending' && !isAdmin) {
      return (
        <DropdownConfirm label='Hủy'>
          <div className='d-flex flex-column align-items-center justify-content-center p-2'>
            <p className='text-center mb-2'>{`Bạn có chắc chắn muốn hủy sản phẩm ${item.product_name}?`}</p>
            <Button
              variant='danger'
              id='CancelOrderItemPopover'
              size='sm'
              text='Xác nhận hủy'
              role='menuitem'
              className='cancel-order-btn'
              onClick={() => updateOrderItemStatus(item.id, 'Cancelled')}
            />
          </div>
        </DropdownConfirm>
      );
    } else if (isAdmin) {
      return (
        <DropdownConfirm
          label={order.status}
          className={isAdmin ? 'admin' : ''}
        >
          {renderPopoverContent(item)}
        </DropdownConfirm>
      );
    }
  };

  console.log('Order data:', order);
  console.log('Order details:', order?.order_details);
  console.log('Order details type:', typeof order?.order_details);
  console.log('Order details is array:', Array.isArray(order?.order_details));
  
  return (
    <div className='order-items pt-3'>
      <h2>Chi tiết sản phẩm</h2>
      <Row>
        {order && order.order_details && order.order_details.length > 0 ? (
          (order.order_details || []).map((item, index) => (
          <Col xs='12' key={index} className='item'>
            <div className='order-item-box'>
              <div className='d-flex justify-content-between flex-column flex-md-row'>
                <div className='d-flex align-items-center box'>
                  <img
                    className='item-image'
                    src={`${
                      item.product && item.product.image_url
                        ? `http://localhost:3000${item.product.image_url}`
                        : '/images/placeholder-image.png'
                    }`}
                    alt={item.product_name || 'Product'}
                    onError={(e) => {
                      e.target.src = '/images/placeholder-image.png';
                    }}
                  />
                  <div className='d-md-flex flex-1 align-items-start ml-4 item-box'>
                    <div className='item-details'>
                      {item.product_name ? (
                        <>
                          <Link
                            to={`/product/${item.product?.slug || '#'}`}
                            className='item-link'
                          >
                            <h4 className='d-block item-name one-line-ellipsis'>
                              {item.product_name}
                            </h4>
                          </Link>
                          <div className='d-flex align-items-center justify-content-between'>
                            <span className='price'>
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              }).format(item.price)} × {item.quantity}
                            </span>
                          </div>
                        </>
                      ) : (
                        <h4>Not Available</h4>
                      )}
                    </div>
                    <div className='d-flex justify-content-between flex-wrap d-md-none mt-1'>

                      <p className='mb-1 mr-4'>
                        Số lượng
                        <span className='order-label'>{` ${item.quantity}`}</span>
                      </p>
                      <p>
                        Thành tiền
                        <span className='order-label'>{` ${new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(item.subtotal)}`}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className='d-none d-md-flex justify-content-between align-items-center box'>
                  <div className='text-center'>
                    <p className='order-label'>{` ${item.quantity}`}</p>
                    <p>Số lượng</p>
                  </div>

                  <div className='text-center'>
                    <p className='order-label'>{` ${new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(item.subtotal)}`}</p>

                    <p>Thành tiền</p>
                  </div>
                </div>
              </div>
              {item.product_name && (
                <div className='text-right mt-2 mt-md-0'>
                  {renderItemsAction(item)}
                </div>
              )}
            </div>
          </Col>
        ))
        ) : (
          <Col xs='12'>
            <div className='text-center py-5'>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                Không có sản phẩm nào trong đơn hàng
              </div>
              <div style={{ fontSize: 14, color: '#6B7280' }}>
                Đơn hàng này không chứa sản phẩm nào
              </div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8 }}>
                Debug: order_details = {JSON.stringify(order?.order_details)}
              </div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default OrderItems;
