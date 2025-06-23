/**
 *
 * Homepage - New Modern Design
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { FaLeaf, FaTruck, FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';

import actions from '../../actions';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';

class Homepage extends React.PureComponent {
  componentDidMount() {
    // Xóa hoặc comment nếu không có action này
    // this.props.fetchStoreProducts();
    this.props.fetchStoreCategories && this.props.fetchStoreCategories();
  }

  render() {
    const { products, categories } = this.props;

    const heroBanners = [
      {
        id: 1,
        imageUrl: '/images/banners/banner-1.jpg',
        title: 'Sầu Riêng Sạch VietGAP',
        subtitle: 'Chất lượng cao, giá cả hợp lý'
      },
      {
        id: 2,
        imageUrl: '/images/banners/banner-2.jpg',
        title: 'Giao Hàng Siêu Tốc 2H',
        subtitle: 'Tươi ngon đến tận nhà'
      }
    ];

    const features = [
      {
        icon: <FaLeaf className="text-success" size={40} />,
        title: 'Sạch VietGAP',
        description: 'Sầu riêng được trồng theo tiêu chuẩn VietGAP, đảm bảo an toàn thực phẩm'
      },
      {
        icon: <FaTruck className="text-primary" size={40} />,
        title: 'Giao Hàng 2H',
        description: 'Giao hàng siêu tốc trong vòng 2 giờ, tươi ngon đến tận nhà'
      },
      {
        icon: <FaStar className="text-warning" size={40} />,
        title: 'Chất Lượng Cao',
        description: 'Sầu riêng được chọn lọc kỹ càng, đảm bảo chất lượng tốt nhất'
      }
    ];

    return (
      <div className='homepage-modern'>
        {/* Hero Section */}
        <section className="hero-section">
          <Container fluid className="px-0">
            <Row className="no-gutters">
              <Col lg="8" className="hero-main">
                <CarouselSlider
                  swipeable={true}
                  showDots={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={5000}
                  slides={heroBanners}
                  responsive={responsiveOneItemCarousel}
                >
                  {heroBanners.map((banner, index) => (
                    <div key={index} className="hero-slide">
                      <img src={banner.imageUrl} alt={banner.title} />
                      <div className="hero-content">
                        <h1>{banner.title}</h1>
                        <p>{banner.subtitle}</p>
                        <Button color="success" size="lg" className="mt-3">
                          Mua Ngay
                        </Button>
                      </div>
                    </div>
                  ))}
                </CarouselSlider>
              </Col>
              <Col lg="4" className="hero-sidebar">
                <div className="hero-sidebar-content">
                  <div className="feature-card mb-3">
                    <img src="/images/banners/banner-3.jpg" alt="Sầu riêng tươi" />
                    <div className="feature-overlay">
                      <h4>Sầu Riêng Tươi</h4>
                      <p>100% tự nhiên</p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <img src="/images/banners/banner-4.jpg" alt="Giao hàng nhanh" />
                    <div className="feature-overlay">
                      <h4>Giao Hàng Nhanh</h4>
                      <p>Trong 2 giờ</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section className="features-section py-5">
          <Container>
            <Row>
              <Col xs="12" className="text-center mb-5">
                <h2 className="section-title">Tại Sao Chọn Chúng Tôi?</h2>
                <p className="section-subtitle">Cam kết mang đến những sản phẩm chất lượng nhất</p>
              </Col>
            </Row>
            <Row>
              {features.map((feature, index) => (
                <Col lg="4" md="6" key={index} className="mb-4">
                  <Card className="feature-card h-100 border-0 shadow-sm">
                    <CardBody className="text-center p-4">
                      <div className="feature-icon mb-3">
                        {feature.icon}
                      </div>
                      <CardTitle tag="h5" className="mb-3">{feature.title}</CardTitle>
                      <CardText className="text-muted">{feature.description}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Categories Section */}
        <section className="categories-section py-5 bg-light">
          <Container>
            <Row>
              <Col xs="12" className="text-center mb-5">
                <h2 className="section-title">Danh Mục Sản Phẩm</h2>
                <p className="section-subtitle">Khám phá các loại sầu riêng đa dạng</p>
              </Col>
            </Row>
            <Row>
              {categories && categories.slice(0, 6).map((category, index) => (
                <Col lg="4" md="6" key={index} className="mb-4">
                  <Card className="category-card h-100 border-0 shadow-sm">
                    <div className="category-image">
                      <img 
                        src={category.imageUrl || '/images/placeholder-category.jpg'} 
                        alt={category.name}
                        className="img-fluid"
                      />
                    </div>
                    <CardBody className="text-center">
                      <CardTitle tag="h5">{category.name}</CardTitle>
                      <Button color="outline-success" size="sm">
                        Xem Sản Phẩm
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Featured Products Section */}
        <section className="products-section py-5">
          <Container>
            <Row>
              <Col xs="12" className="text-center mb-5">
                <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
                <p className="section-subtitle">Những sản phẩm được yêu thích nhất</p>
              </Col>
            </Row>
            <Row>
              {products && products.slice(0, 8).map((product, index) => (
                <Col lg="3" md="6" key={index} className="mb-4">
                  <Card className="product-card h-100 border-0 shadow-sm">
                    <div className="product-image">
                      <img 
                        src={product.imageUrl || '/images/placeholder-product.jpg'} 
                        alt={product.name}
                        className="img-fluid"
                      />
                      <div className="product-overlay">
                        <Button color="success" size="sm" className="mr-2">
                          <FaShoppingCart /> Mua
                        </Button>
                        <Button color="outline-light" size="sm">
                          <FaHeart />
                        </Button>
                      </div>
                    </div>
                    <CardBody className="p-3">
                      <CardTitle tag="h6" className="mb-2">{product.name}</CardTitle>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="price">${product.price}</span>
                        <div className="rating">
                          <FaStar className="text-warning" />
                          <span className="ml-1">4.5</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row>
              <Col xs="12" className="text-center mt-4">
                <Button color="success" size="lg">
                  Xem Tất Cả Sản Phẩm
                </Button>
              </Col>
            </Row>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="cta-section py-5 bg-success text-white">
          <Container>
            <Row className="align-items-center">
              <Col lg="8" className="text-center text-lg-left">
                <h2>Đặt Hàng Ngay Hôm Nay!</h2>
                <p className="mb-0">Nhận ưu đãi đặc biệt cho khách hàng mới</p>
              </Col>
              <Col lg="4" className="text-center text-lg-right mt-3 mt-lg-0">
                <Button color="light" size="lg">
                  Đặt Hàng Ngay
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
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
