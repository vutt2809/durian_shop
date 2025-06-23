/**
 *
 * Footer
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Newsletter from '../../../containers/Newsletter';
import { VI } from '../../../constants/vi';

const Footer = () => {
  const customerServiceLinks = [
    { id: 0, name: 'Chính sách đổi trả', to: '/return-policy' },
    { id: 1, name: 'Chính sách bảo mật', to: '/privacy-policy' },
    { id: 2, name: 'Điều khoản dịch vụ', to: '/terms-of-service' }
  ];

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='4' md='6' xs='12' className='mb-4 mb-lg-0'>
            <h4 className='footer-title'>Về Sầu Riêng Online</h4>
            <p className='footer-text'>
              Sầu Riêng Online tự hào là nhà cung cấp sầu riêng sạch, chất lượng cao từ các nhà vườn uy tín. Chúng tôi cam kết mang đến những trái sầu riêng thơm ngon, an toàn và chuẩn VietGAP đến tận tay khách hàng.
            </p>
          </Col>
          <Col lg='2' md='6' xs='12' className='mb-4 mb-lg-0'>
            <h4 className='footer-title'>Hỗ trợ</h4>
            <ul className='footer-list'>
              {customerServiceLinks.map(item => (
                <li key={item.id}>
                  <Link to={item.to} className='footer-link'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col lg='3' md='6' xs='12' className='mb-4 mb-lg-0'>
            <h4 className='footer-title'>Liên hệ</h4>
            <ul className='footer-list'>
              <li>
                <i className='fa fa-map-marker' /> &nbsp; 123 Đường Sầu Riêng, Cần Thơ
              </li>
              <li>
                <i className='fa fa-phone' /> &nbsp; Hotline: 0123.456.789
              </li>
              <li>
                <i className='fa fa-envelope' /> &nbsp; info@saurieng.online
              </li>
            </ul>
          </Col>
          <Col lg='3' md='6' xs='12' className='mb-4 mb-lg-0'>
            <h4 className='footer-title'>Bản tin</h4>
            <p className='footer-text'>
              Đăng ký để nhận thông tin về sản phẩm mới và các chương trình khuyến mãi.
            </p>
            <Newsletter />
          </Col>
        </Row>
        <hr className='footer-divider' />
        <Row className='align-items-center'>
          <Col md='6'>
            <div className='footer-copyright'>
              <span>© {new Date().getFullYear()} {VI['MERN Store']}. All Rights Reserved.</span>
            </div>
          </Col>
          <Col md='6'>
            <ul className='footer-social-links'>
              <li><a href='#'><i className='fa fa-facebook'></i></a></li>
              <li><a href='#'><i className='fa fa-instagram'></i></a></li>
              <li><a href='#'><i className='fa fa-youtube-play'></i></a></li>
              <li><a href='#'><i className='fa fa-twitter'></i></a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
