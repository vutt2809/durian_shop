import React from 'react';
import { Container } from 'reactstrap';
import './Header.scss';

const Header = () => (
  <div className="header-durian">
    <Container>
      <div className="header-durian-inner" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div className="logo">
          Sầu riêng 5 Tốt
        </div>
        <div className="slogan">
          Sầu riêng tươi - Giao tận nhà, giá tận vườn!
        </div>
        <div className="hotline">
          <i className="fa fa-phone" style={{marginRight:6}}></i> 0123 456 789
        </div>
      </div>
    </Container>
  </div>
);

export default Header; 