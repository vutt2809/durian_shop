import React from 'react';
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';

// Demo data, replace with real cart data from props or redux
const cartItems = [
  {
    id: 1,
    name: 'Sầu riêng Ri 6',
    image: '/images/placeholder-product.jpg',
    price: 350000,
    quantity: 2
  },
  {
    id: 2,
    name: 'Sầu riêng Musang King',
    image: '/images/placeholder-product.jpg',
    price: 650000,
    quantity: 1
  }
];

const CartPage = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className='cart-page'>
      <Container>
        <h2 className='cart-title mb-4'>Giỏ hàng của bạn</h2>
        <Row>
          <Col md='8'>
            {cartItems.length === 0 ? (
              <div className='empty-cart'>Giỏ hàng trống.</div>
            ) : (
              cartItems.map(item => (
                <Card className='cart-item mb-3' key={item.id}>
                  <CardBody className='d-flex align-items-center'>
                    <img src={item.image} alt={item.name} className='cart-item-img mr-3' />
                    <div className='flex-grow-1'>
                      <div className='cart-item-name'>{item.name}</div>
                      <div className='cart-item-price'>Giá: {item.price.toLocaleString()}₫</div>
                      <div className='cart-item-qty'>Số lượng: {item.quantity}</div>
                    </div>
                    <Button color='danger' outline className='cart-item-remove ml-3'>
                      <FaTrash />
                    </Button>
                  </CardBody>
                </Card>
              ))
            )}
          </Col>
          <Col md='4'>
            <Card className='cart-summary'>
              <CardBody>
                <h5>Tổng cộng</h5>
                <div className='cart-total mb-3'>{total.toLocaleString()}₫</div>
                <Button color='success' size='lg' block>Thanh toán</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage; 