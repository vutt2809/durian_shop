/**
 *
 * NavigationBar
 *
 */

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';

const NavigationBar = ({ history, authenticated, cartItems = [] }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Thay vì chuyển sang trang shop, sẽ search trên trang chủ
      // Có thể thêm state để lưu search query và filter sản phẩm
      history.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div style={{
      background: '#fff',
      borderBottom: '1px solid #e9ecef',
      padding: '8px 0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
    }}>
      <Container>
        <Row className='align-items-center'>
          {/* Logo */}
          <Col xs='12' sm='3' md='3' lg='3'>
            <div 
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#eab308',
                cursor: 'pointer',
                textAlign: 'left'
              }}
              onClick={() => history.push('/')}
            >
              🍈 Sầu Riêng 5 Tốt
            </div>
          </Col>
          
          {/* Search Bar */}
          <Col xs='12' sm='6' md='6' lg='6'>
            <form onSubmit={handleSearch} style={{ display: 'flex', maxWidth: 400, margin: '0 auto' }}>
              <div style={{
                position: 'relative',
                flex: 1,
                display: 'flex',
                alignItems: 'center'
              }}>
                <input
                  type='text'
                  placeholder='Tìm kiếm sản phẩm...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 35px',
                    border: '1px solid #e9ecef',
                    borderRadius: 20,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#eab308'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                <FaSearch 
                  style={{
                    position: 'absolute',
                    left: 12,
                    color: '#6c757d',
                    fontSize: 14
                  }}
                />
              </div>
              <button
                type='submit'
                style={{
                  marginLeft: 6,
                  padding: '8px 16px',
                  background: '#eab308',
                  color: '#222',
                  border: 'none',
                  borderRadius: 20,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  fontSize: 14
                }}
                onMouseEnter={(e) => e.target.style.background = '#f59e0b'}
                onMouseLeave={(e) => e.target.style.background = '#eab308'}
              >
                Tìm
              </button>
            </form>
          </Col>
          
          {/* Account Icon */}
          <Col xs='12' sm='3' md='3' lg='3'>
            <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                onClick={() => history.push('/cart')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 16,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#eab308',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  fontSize: 13,
                  position: 'relative'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.background = 'none'}
              >
                <FaShoppingCart size={16} />
                <span>Giỏ hàng</span>
                {cartItems && cartItems.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'red',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    fontSize: 11,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600
                  }}>
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => history.push(authenticated ? '/dashboard' : '/login')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 16,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: authenticated ? '#28a745' : '#6c757d',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  fontSize: 13
                }}
                onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.background = 'none'}
              >
                <FaUser size={16} />
                <span>
                  {authenticated ? 'Tài khoản' : 'Đăng nhập'}
                </span>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavigationBar; 