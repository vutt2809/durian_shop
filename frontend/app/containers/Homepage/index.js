/**
 *
 * Homepage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import actions from '../../actions';
import { withRouter, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { handleAddToCart } from '../Cart/actions';
import { fetchProducts } from '../Product/actions';
import { fetchStoreCategories } from '../Category/actions';
import { updateWishlist } from '../WishList/actions';
import { addToCartServer } from '../Cart/actions';

// Sidebar component
const Sidebar = ({ categories, history }) => (
  <aside className='sidebar-tiki p-3 bg-white rounded shadow-sm h-100'>
    <h5 className='mb-3 text-success font-weight-bold'>Danh mục</h5>
    <ul className='list-unstyled mb-0'>
      {categories && categories.map((cat, idx) => (
        <li
          key={cat.id || idx}
          className='mb-2 d-flex align-items-center sidebar-category-item'
          style={{ cursor: 'pointer' }}
          onClick={() => history.push(`/shop/category/${cat.slug || cat.id}`)}
        >
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
const ProductGrid = ({ products, onAddToCart, onToggleWishlist }) => (
  <div className='product-grid-tiki row'>
    {products && products.slice(0, 12).map((product, idx) => (
      <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center' key={product.id || idx}>
        <div className='product-card-tiki p-3 bg-white rounded shadow-sm h-100 d-flex flex-column align-items-center' style={{minHeight: 340, maxWidth: 270, width: '100%', position: 'relative'}}>
          {/* Icon trái tim ở góc phải trên ảnh */}
          <button
            className='btn p-0'
            style={{
              position: 'absolute',
              top: 12,
              right: 16,
              background: 'none',
              border: 'none',
              zIndex: 2,
              outline: 'none',
              boxShadow: 'none',
              color: product.isLiked ? 'red' : '#fff',
              fontSize: 26,
              transition: 'color 0.2s',
            }}
            onClick={() => onToggleWishlist(product)}
            aria-label='Yêu thích'
          >
            <FaHeart style={{ filter: product.isLiked ? 'none' : 'drop-shadow(0 0 2px #888)' }} />
          </button>
          <Link to={`/product/${product.slug || product.id}`} style={{textDecoration: 'none', color: 'inherit', width: '100%'}} className='d-flex flex-column align-items-center'>
            <div style={{width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, background: '#f8f9fa', borderRadius: 8, position: 'relative'}}>
              <img src={product.imageUrl || '/images/placeholder-image.png'} alt={product.name} style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: 8}} />
            </div>
            <h6 className='mb-1 text-truncate text-center w-100'>{product.name}</h6>
            <div className='text-warning font-weight-bold mb-1 text-center w-100'>{product.price} VNĐ</div>
            <div className='small text-muted text-center w-100'>{product.weight} kg | {product.origin} | {product.ripeness === 'ripe' ? 'Chín' : 'Chưa chín'}</div>
          </Link>
          <div className='d-flex align-items-center justify-content-center mt-auto w-100'>
            <button className='btn btn-warning font-weight-bold flex-grow-1 d-flex align-items-center justify-content-center mt-3' style={{borderRadius: 20, minHeight: 44, minWidth: 0, fontSize: 16}} onClick={() => onAddToCart(product)}>
              <FaShoppingCart className='mr-2' /> Thêm Vào Giỏ Hàng
            </button>
          </div>
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

  handleAddToCart = (product) => {
    if (this.props.authenticated) {
      this.props.addToCartServer(product, 1);
    } else {
      this.props.handleAddToCart({ ...product, quantity: 1 });
    }
  };

  handleToggleWishlist = (product) => {
    // Giả sử có action updateWishlist(productId, liked)
    this.props.updateWishlist(!product.isLiked, product.id);
  };

  render() {
    const { products, categories, history } = this.props;
    return (
      <div className='homepage-tiki bg-light' style={{minHeight:'100vh'}}>
        {/* Cart icon fixed ở góc phải trên */}
        <div style={{position: 'fixed', top: 24, right: 32, zIndex: 1000}}>
          <button
            className='btn btn-success rounded-circle shadow d-flex align-items-center justify-content-center position-relative'
            style={{width: 56, height: 56}}
            onClick={() => history.push('/cart')}
            aria-label='Xem giỏ hàng'
          >
            <FaShoppingCart size={28} color='#fff' />
            {this.props.cartItems && this.props.cartItems.length > 0 && (
              <span style={{position: 'absolute', top: 4, right: 4, background: 'red', color: '#fff', borderRadius: '50%', width: 20, height: 20, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600}}>{this.props.cartItems.length}</span>
            )}
          </button>
        </div>
        {/* Main layout */}
        <Container fluid>
          <Row>
            <Col xs='12' md='3' lg='2' className='mb-3'>
              <Sidebar categories={categories} history={history} />
            </Col>
            <Col xs='12' md='9' lg='10'>
              <Banner />
              <div className='mb-4'>
                <h5 className='font-weight-bold text-success mb-3'>Sản phẩm nổi bật</h5>
                <ProductGrid products={products} onAddToCart={this.handleAddToCart} onToggleWishlist={this.handleToggleWishlist} />
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
  products: state.product.products.map(product => ({
    ...product,
    isLiked: (state.wishlist.wishlist || []).some(item => item.product_id === product.id || (item.product && item.product.id === product.id)),
  })),
  categories: state.category.storeCategories,
  wishlist: state.wishlist.wishlist,
  cartItems: state.cart.cartItems,
  authenticated: state.authentication.authenticated
});

export default connect(
  mapStateToProps,
  { handleAddToCart, fetchProducts, fetchStoreCategories, updateWishlist, addToCartServer }
)(withRouter(Homepage));
