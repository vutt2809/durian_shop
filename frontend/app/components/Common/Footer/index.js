/**
 *
 * Footer
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Newsletter from '../../../containers/Newsletter';

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <div className='footer-content'>
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Hỗ trợ khách hàng</h3>
            </div>
            <div className='block-content'>
              <ul>
                <li className='footer-link'><Link to='/contact'>Liên hệ</Link></li>
                <li className='footer-link'><Link to='/shipping'>Vận chuyển hỏa tốc</Link></li>
                <li className='footer-link'><Link to='/return-policy'>Chính sách đổi trả</Link></li>
              </ul>
            </div>
          </div>
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Về Durian Shop</h3>
            </div>
            <div className='block-content'>
              <ul>
                <li className='footer-link'><Link to='/about'>Giới thiệu</Link></li>
                <li className='footer-link'><Link to='/careers'>Tuyển dụng</Link></li>
                <li className='footer-link'><Link to='/blog'>Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Kết nối với chúng tôi</h3>
            </div>
            <div className='block-content'>
              <ul className='footer-social-item'>
                <li>
                  <a href='https://facebook.com' rel='noreferrer noopener' target='_blank'>
                    <span className='facebook-icon' />
                  </a>
                </li>
                <li>
                  <a href='https://instagram.com' rel='noreferrer noopener' target='_blank'>
                    <span className='instagram-icon' />
                  </a>
                </li>
                <li>
                  <a href='https://pinterest.com' rel='noreferrer noopener' target='_blank'>
                    <span className='pinterest-icon' />
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com' rel='noreferrer noopener' target='_blank'>
                    <span className='twitter-icon' />
                  </a>
                </li>
              </ul>
              <Newsletter placeholder='Nhập email để nhận ưu đãi và tin tức mới nhất...' />
            </div>
          </div>
        </div>
        <div className='footer-copyright'>
          <span>© {new Date().getFullYear()} Durian Shop - Chuyên cung cấp sầu riêng tươi ngon</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
