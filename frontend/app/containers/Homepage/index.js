/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';
import * as product from '../../containers/Product/actions';

class Homepage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchStoreCategories();
  }

  render() {
    const { products, categories } = this.props;

    return (
      <div className='homepage'>
        {/* Hero Section */}
        <Row className='flex-row'>
          <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/banners/banner-2.jpg' className='mb-3' />
              <img src='/images/banners/banner-5.jpg' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/banners/banner-2.jpg' className='mb-3' />
              <img src='/images/banners/banner-6.jpg' />
            </div>
          </Col>
        </Row>

        {/* Welcome Section */}
        <Container className='my-5'>
          <Row>
            <Col xs='12' className='text-center'>
              <h2 className='mb-4'>Chào mừng đến với Durian Shop</h2>
              <p className='lead mb-4'>
                Chuyên cung cấp các loại sầu riêng tươi ngon, chất lượng cao từ các vùng trồng nổi tiếng Việt Nam và các nước Đông Nam Á.
              </p>
            </Col>
          </Row>
        </Container>

        {/* Categories Section */}
        {categories && categories.length > 0 && (
          <Container className='my-5'>
            <Row>
              <Col xs='12' className='text-center mb-4'>
                <h3>Danh mục sản phẩm</h3>
              </Col>
            </Row>
            <Row>
              {categories.slice(0, 6).map((category, index) => (
                <Col xs='12' sm='6' md='4' key={index} className='mb-3'>
                  <div className='category-card text-center p-3 border rounded'>
                    <h5>{category.name}</h5>
                    <p className='text-muted'>{category.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        )}

        {/* Featured Products Section */}
        {products && products.length > 0 && (
          <Container className='my-5'>
            <Row>
              <Col xs='12' className='text-center mb-4'>
                <h3>Sản phẩm nổi bật</h3>
              </Col>
            </Row>
            <Row>
              {products.slice(0, 8).map((product, index) => (
                <Col xs='12' sm='6' md='3' key={index} className='mb-3'>
                  <div className='product-card border rounded p-3'>
                    <img 
                      src={product.imageUrl || '/images/placeholder-image.png'} 
                      alt={product.name}
                      className='img-fluid mb-2'
                      style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                    />
                    <h6>{product.name}</h6>
                    <p className='text-success font-weight-bold'>{product.price} VNĐ</p>
                    <p className='text-muted small'>
                      {product.weight} kg | {product.origin} | {product.ripeness === 'ripe' ? 'Chín' : 'Chưa chín'}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        )}

        {/* Features Section */}
        <Container className='my-5'>
          <Row>
            <Col xs='12' className='text-center mb-4'>
              <h3>Tại sao chọn chúng tôi?</h3>
            </Col>
          </Row>
          <Row>
            <Col xs='12' md='4' className='text-center mb-3'>
              <i className='fa fa-leaf fa-3x text-success mb-3'></i>
              <h5>Sầu riêng tươi ngon</h5>
              <p>Chúng tôi cam kết cung cấp sầu riêng tươi ngon, được thu hoạch đúng độ chín.</p>
            </Col>
            <Col xs='12' md='4' className='text-center mb-3'>
              <i className='fa fa-truck fa-3x text-primary mb-3'></i>
              <h5>Giao hàng nhanh chóng</h5>
              <p>Giao hàng trong ngày tại TP.HCM và các tỉnh lân cận với dịch vụ đóng gói cẩn thận.</p>
            </Col>
            <Col xs='12' md='4' className='text-center mb-3'>
              <i className='fa fa-shield fa-3x text-warning mb-3'></i>
              <h5>Đảm bảo chất lượng</h5>
              <p>100% hoàn tiền nếu sản phẩm không đạt chất lượng như cam kết.</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.storeProducts,
    categories: state.category.storeCategories
  };
};

export default connect(mapStateToProps, actions)(Homepage);
