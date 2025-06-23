/**
 *
 * Footer - Modern Design
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter,
  FaLeaf,
  FaTruck,
  FaShieldAlt,
  FaHeart
} from 'react-icons/fa';

import Newsletter from '../../../containers/Newsletter';

const Footer = () => {
  const customerServiceLinks = [
    { id: 0, name: 'Chính sách đổi trả', to: '/return-policy' },
    { id: 1, name: 'Chính sách bảo mật', to: '/privacy-policy' },
    { id: 2, name: 'Điều khoản dịch vụ', to: '/terms-of-service' },
    { id: 3, name: 'Hướng dẫn mua hàng', to: '/shopping-guide' }
  ];

  const quickLinks = [
    { id: 0, name: 'Trang chủ', to: '/' },
    { id: 1, name: 'Sản phẩm', to: '/shop' },
    { id: 2, name: 'Về chúng tôi', to: '/about' },
    { id: 3, name: 'Liên hệ', to: '/contact' }
  ];

  const socialLinks = [
    { id: 0, name: 'Facebook', icon: <FaFacebook />, url: '#' },
    { id: 1, name: 'Instagram', icon: <FaInstagram />, url: '#' },
    { id: 2, name: 'YouTube', icon: <FaYoutube />, url: '#' },
    { id: 3, name: 'Twitter', icon: <FaTwitter />, url: '#' }
  ];

  return (
    <footer className='footer-modern'>
      {/* Features Section */}
      <section className='footer-features py-5 bg-light'>
        <Container>
          <Row>
            <Col lg='3' md='6' className='mb-4'>
              <div className='feature-item text-center'>
                <div className='feature-icon mb-3'>
                  <FaLeaf size={40} className='text-success' />
                </div>
                <h5>Chất Lượng VietGAP</h5>
                <p className='text-muted mb-0'>Sầu riêng được trồng theo tiêu chuẩn VietGAP</p>
              </div>
            </Col>
            <Col lg='3' md='6' className='mb-4'>
              <div className='feature-item text-center'>
                <div className='feature-icon mb-3'>
                  <FaTruck size={40} className='text-primary' />
                </div>
                <h5>Giao Hàng 2H</h5>
                <p className='text-muted mb-0'>Giao hàng siêu tốc trong vòng 2 giờ</p>
              </div>
            </Col>
            <Col lg='3' md='6' className='mb-4'>
              <div className='feature-item text-center'>
                <div className='feature-icon mb-3'>
                  <FaShieldAlt size={40} className='text-warning' />
                </div>
                <h5>Bảo Hành 100%</h5>
                <p className='text-muted mb-0'>Đảm bảo chất lượng sản phẩm</p>
              </div>
            </Col>
            <Col lg='3' md='6' className='mb-4'>
              <div className='feature-item text-center'>
                <div className='feature-icon mb-3'>
                  <FaHeart size={40} className='text-danger' />
                </div>
                <h5>Hỗ Trợ 24/7</h5>
                <p className='text-muted mb-0'>Tư vấn và hỗ trợ khách hàng</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Footer */}
      <section className='footer-main py-5 bg-dark text-white'>
        <Container>
          <Row>
            <Col lg='4' md='6' xs='12' className='mb-4 mb-lg-0'>
              <div className='footer-brand mb-4'>
                <h3 className='text-success mb-2'>Sầu Riêng Việt</h3>
                <p className='text-light'>
                  Tự hào là nhà cung cấp sầu riêng sạch, chất lượng cao từ các nhà vườn uy tín. 
                  Chúng tôi cam kết mang đến những trái sầu riêng thơm ngon, an toàn và chuẩn VietGAP 
                  đến tận tay khách hàng.
                </p>
              </div>
              <div className='footer-contact'>
                <div className='contact-item d-flex align-items-center mb-2'>
                  <FaMapMarkerAlt className='text-success mr-3' />
                  <span>123 Đường Sầu Riêng, Cần Thơ</span>
                </div>
                <div className='contact-item d-flex align-items-center mb-2'>
                  <FaPhone className='text-success mr-3' />
                  <span>Hotline: 0123.456.789</span>
                </div>
                <div className='contact-item d-flex align-items-center'>
                  <FaEnvelope className='text-success mr-3' />
                  <span>info@saurieng.online</span>
                </div>
              </div>
            </Col>
            
            <Col lg='2' md='6' xs='12' className='mb-4 mb-lg-0'>
              <h5 className='footer-title mb-3'>Liên Kết Nhanh</h5>
              <ul className='footer-list'>
                {quickLinks.map(item => (
                  <li key={item.id} className='mb-2'>
                    <Link to={item.to} className='footer-link'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            
            <Col lg='2' md='6' xs='12' className='mb-4 mb-lg-0'>
              <h5 className='footer-title mb-3'>Hỗ Trợ</h5>
              <ul className='footer-list'>
                {customerServiceLinks.map(item => (
                  <li key={item.id} className='mb-2'>
                    <Link to={item.to} className='footer-link'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            
            <Col lg='4' md='6' xs='12' className='mb-4 mb-lg-0'>
              <h5 className='footer-title mb-3'>Bản Tin</h5>
              <p className='text-light mb-3'>
                Đăng ký để nhận thông tin về sản phẩm mới và các chương trình khuyến mãi.
              </p>
              <Newsletter />
              
              <div className='social-links mt-4'>
                <h6 className='mb-3'>Theo Dõi Chúng Tôi</h6>
                <div className='social-icons'>
                  {socialLinks.map(item => (
                    <a 
                      key={item.id} 
                      href={item.url} 
                      className='social-icon'
                      title={item.name}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Copyright */}
      <section className='footer-copyright py-3 bg-darker'>
        <Container>
          <Row className='align-items-center'>
            <Col md='6' className='text-center text-md-left'>
              <p className='mb-0 text-light'>
                © {new Date().getFullYear()} Sầu Riêng Việt. All Rights Reserved.
              </p>
            </Col>
            <Col md='6' className='text-center text-md-right'>
              <p className='mb-0 text-light'>
                Made with <FaHeart className='text-danger' /> in Vietnam
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
};

export default Footer;
