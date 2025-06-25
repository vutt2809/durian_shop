/**
 *
 * Homepage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import actions from '../../actions';

// Sidebar component
const Sidebar = ({ categories }) => (
  <aside className='sidebar-tiki p-3 bg-white rounded shadow-sm h-100'>
    <h5 className='mb-3 text-success font-weight-bold'>Danh mục</h5>
    <ul className='list-unstyled mb-0'>
      {categories && categories.map((cat, idx) => (
        <li key={cat.id || idx} className='mb-2 d-flex align-items-center'>
          <span className='sidebar-icon mr-2'>🍈</span>
          <span>{cat.name}</span>
        </li>
      ))}
    </ul>
  </aside>
);

// Banner component
const Banner = () => (
  <div className='banner-tiki mb-4 rounded shadow-sm overflow-hidden'>
    <img src='/images/banners/banner-2.jpg' alt='Durian Banner' style={{width:'100%',height:'220px',objectFit:'cover'}} />
  </div>
);

// Product grid
const ProductGrid = ({ products }) => (
  <div className='product-grid-tiki row'>
    {products && products.slice(0, 12).map((product, idx) => (
      <div className='col-6 col-md-4 col-lg-3 mb-4' key={product.id || idx}>
        <div className='product-card-tiki p-2 bg-white rounded shadow-sm h-100 d-flex flex-column'>
          <img src={product.imageUrl || '/images/placeholder-image.png'} alt={product.name} className='mb-2 rounded' style={{height:'120px',objectFit:'cover'}} />
          <div className='flex-grow-1'>
            <h6 className='mb-1 text-truncate'>{product.name}</h6>
            <div className='text-warning font-weight-bold mb-1'>{product.price} VNĐ</div>
            <div className='small text-muted'>{product.weight} kg | {product.origin} | {product.ripeness === 'ripe' ? 'Chín' : 'Chưa chín'}</div>
          </div>
          <button className='btn btn-success btn-block mt-2'>Mua ngay</button>
        </div>
      </div>
    ))}
  </div>
);

class Homepage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchStoreCategories();
  }

  render() {
    const { products, categories } = this.props;
    return (
      <div className='homepage-tiki bg-light' style={{minHeight:'100vh'}}>
        {/* Header */}
        <header className='header-tiki d-flex align-items-center justify-content-between px-4 py-2 bg-white shadow-sm mb-3'>
          <div className='d-flex align-items-center'>
            <img src='/images/placeholder-image.png' alt='Durian Shop' style={{height:40,marginRight:10}} />
            <span className='h4 mb-0 text-success font-weight-bold'>Durian Shop</span>
          </div>
          <div className='flex-grow-1 mx-4'>
            <input className='form-control rounded-pill px-4' placeholder='Tìm kiếm sầu riêng, sản phẩm...' />
          </div>
          <div className='d-flex align-items-center'>
            <button
              className='btn btn-link text-success mr-3'
              onClick={() => {
                if (this.props.authenticated) this.props.history.push('/dashboard');
                else this.props.history.push('/login');
              }}
            >
              <i className='fa fa-user fa-lg'></i>
            </button>
            <button
              className='btn btn-link text-success'
              onClick={() => this.props.history.push('/cart')}
            >
              <i className='fa fa-shopping-cart fa-lg'></i>
            </button>
          </div>
        </header>
        {/* Main layout */}
        <Container fluid>
          <Row>
            <Col xs='12' md='3' lg='2' className='mb-3'>
              <Sidebar categories={categories} />
            </Col>
            <Col xs='12' md='9' lg='10'>
              <Banner />
              <div className='mb-4'>
                <h5 className='font-weight-bold text-success mb-3'>Sản phẩm nổi bật</h5>
                <ProductGrid products={Array.isArray(products) ? products : []} />
              </div>
            </Col>
          </Row>
        </Container>
        {/* Footer */}
        <footer className='footer-tiki bg-white text-center py-3 mt-4 shadow-sm'>
          <span className='text-muted'>© {new Date().getFullYear()} Durian Shop - Sầu riêng tươi ngon, giao nhanh tận nơi!</span>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products,
  categories: state.category.storeCategories
});

export default connect(mapStateToProps, actions)(Homepage);
