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

import { handleAddToCart } from '../Cart/actions';
import { fetchProducts, filterProducts, resetAdvancedFilters } from '../Product/actions';
import { fetchStoreCategories } from '../Category/actions';

import { addToCartServer } from '../Cart/actions';



// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 32 }}>
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 12px',
          border: '1px solid #e9ecef',
          background: currentPage === 1 ? '#f8f9fa' : '#fff',
          color: currentPage === 1 ? '#6c757d' : '#333',
          borderRadius: 6,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontSize: 14
        }}
      >
        ← Trước
      </button>
      
      {/* Page numbers */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: '8px 12px',
            border: '1px solid #e9ecef',
            background: page === currentPage ? '#eab308' : '#fff',
            color: page === currentPage ? '#222' : '#333',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: page === currentPage ? 600 : 400
          }}
        >
          {page}
        </button>
      ))}
      
      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 12px',
          border: '1px solid #e9ecef',
          background: currentPage === totalPages ? '#f8f9fa' : '#fff',
          color: currentPage === totalPages ? '#6c757d' : '#333',
          borderRadius: 6,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontSize: 14
        }}
      >
        Sau →
      </button>
    </div>
  );
};

// Sidebar component
const Sidebar = ({ categories, selectedCategory, onCategoryFilter, onClearFilter }) => (
  <aside className='sidebar-tiki p-3 bg-white rounded shadow-sm h-100'>
    <div className='d-flex justify-content-between align-items-center mb-3'>
      <h5 className='text-success font-weight-bold mb-0'>Danh mục</h5>
      {selectedCategory && (
        <button
          onClick={onClearFilter}
          style={{
            background: 'none',
            border: 'none',
            color: '#dc3545',
            fontSize: 12,
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Xóa lọc
        </button>
      )}
    </div>
    <ul className='list-unstyled mb-0'>
      {categories && categories.map((cat, idx) => (
        <li
          key={cat.id || idx}
          className='mb-2 d-flex align-items-center sidebar-category-item'
          style={{ 
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: 4,
            background: selectedCategory && selectedCategory.id === cat.id ? '#e8f5e8' : 'transparent',
            border: selectedCategory && selectedCategory.id === cat.id ? '1px solid #28a745' : '1px solid transparent'
          }}
          onClick={() => onCategoryFilter(cat)}
        >
          <span className='sidebar-icon mr-2'>🍈</span>
          <span style={{ 
            color: selectedCategory && selectedCategory.id === cat.id ? '#28a745' : '#333',
            fontWeight: selectedCategory && selectedCategory.id === cat.id ? 600 : 400
          }}>
            {cat.name}
          </span>
          {selectedCategory && selectedCategory.id === cat.id && (
            <span style={{ marginLeft: 'auto', color: '#28a745', fontSize: 12 }}>✓</span>
          )}
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
const ProductGrid = ({ products, onAddToCart }) => (
  <div className='product-grid-tiki row'>
    {products && products.map((product, idx) => (
      <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center' key={product.id || idx}>
        <div className='product-card-tiki p-3 bg-white rounded shadow-sm h-100 d-flex flex-column align-items-center' style={{minHeight: 340, maxWidth: 270, width: '100%', position: 'relative'}}>

          <Link to={`/product/${product.slug || product.id}`} style={{textDecoration: 'none', color: 'inherit', width: '100%'}} className='d-flex flex-column align-items-center'>
            <div style={{width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, background: '#f8f9fa', borderRadius: 8, position: 'relative'}}>
              {product.image_url ? (
                <img 
                  src={product.image_url.startsWith('http') ? product.image_url : `http://localhost:3000${product.image_url.startsWith('/') ? '' : '/'}${product.image_url}`} 
                  alt={product.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder-image.png';
                  }}
                  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: 8}} 
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f8f9fa',
                  borderRadius: 8,
                  color: '#6c757d',
                  fontSize: 12,
                  textAlign: 'center'
                }}>
                  Placeholder Image
                </div>
              )}
            </div>
            <h6 className='mb-1 text-truncate text-center w-100'>{product.name}</h6>
            <div className='text-warning font-weight-bold mb-1 text-center w-100'>{product.price} VNĐ</div>
            <div className='small text-muted text-center w-100'>{product.weight} kg | {product.origin} | {product.ripeness === 'ripe' ? 'Chín' : 'Chưa chín'}</div>
          </Link>
          <div className='d-flex align-items-center justify-content-center mt-auto w-100'>
            <button className='btn btn-warning font-weight-bold flex-grow-1 d-flex align-items-center justify-content-center mt-3' style={{borderRadius: 4, minHeight: 44, minWidth: 0, fontSize: 16}} onClick={() => onAddToCart(product)}>
              Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

class Homepage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 12,
      selectedCategory: null,
      searchQuery: ''
    };
  }

  componentDidMount() {
    this.props.fetchStoreCategories();
    
    // Reset advanced filters khi component mount
    this.props.resetAdvancedFilters();
    
    // Kiểm tra URL params để lấy search query
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery && searchQuery.trim()) {
      this.setState({ searchQuery: searchQuery.trim() }, () => {
        this.loadProducts();
      });
    } else {
      this.loadProducts();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Đồng bộ currentPage và itemsPerPage từ advancedFilters
    if (this.props.advancedFilters.currentPage !== this.state.currentPage) {
      this.setState({ currentPage: this.props.advancedFilters.currentPage });
    }
    if (this.props.advancedFilters.limit !== this.state.itemsPerPage) {
      this.setState({ itemsPerPage: this.props.advancedFilters.limit });
    }

    // Khi bấm nút "Tìm" trên header, URL sẽ đổi ?search=...
    if (this.props.location && prevProps.location && this.props.location.search !== prevProps.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const q = (urlParams.get('search') || '').trim();
      this.setState({ selectedCategory: null, searchQuery: q, currentPage: 1 }, () => {
        if (q) {
          this.props.filterProducts('name', q);
        } else {
          this.props.filterProducts('name', 'all');
        }
      });
    }
  }

  loadProducts = () => {
    const { selectedCategory, currentPage, searchQuery } = this.state;
    
    // Nếu có category được chọn, sử dụng filterProducts
    if (selectedCategory) {
      this.props.filterProducts('category', selectedCategory.id);
    } else if (searchQuery && searchQuery.trim()) {
      // Nếu có search query, sử dụng filterProducts với name
      this.props.filterProducts('name', searchQuery.trim());
    } else {
      // Nếu không có filter, load tất cả sản phẩm
      this.props.filterProducts('name', 'all');
    }
  };

  handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    console.log('User authenticated:', this.props.authenticated);
    
    if (this.props.authenticated) {
      console.log('Calling addToCartServer');
      this.props.addToCartServer(product, 1);
    } else {
      console.log('Calling handleAddToCart (local)');
      this.props.handleAddToCart({ ...product, quantity: 1 });
    }
  };



  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      // Gọi API với page mới
      this.props.filterProducts('pagination', page);
    });
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Thêm function để xử lý filter theo category
  handleCategoryFilter = (category) => {
    this.setState({ 
      selectedCategory: category,
      searchQuery: '',
      currentPage: 1 
    }, () => {
      // Gọi API với category mới
      this.props.filterProducts('category', category.id);
    });
  };

  // Thêm function để clear filter
  handleClearFilter = () => {
    this.setState({ 
      selectedCategory: null,
      searchQuery: '',
      currentPage: 1 
    }, () => {
      // Gọi API để load tất cả sản phẩm
      this.props.filterProducts('name', 'all');
    });
  };

  // Thêm function để clear tất cả bộ lọc
  handleClearAllFilters = () => {
    this.setState({ 
      selectedCategory: null,
      searchQuery: '',
      currentPage: 1 
    }, () => {
      // Gọi API để load tất cả sản phẩm
      this.props.filterProducts('name', 'all');
    });
    // Clear URL params
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  render() {
    const { products, categories, history, advancedFilters } = this.props;
    const { currentPage, itemsPerPage, selectedCategory, searchQuery } = this.state;
    
    // Sử dụng products từ Redux store (đã được filter từ API)
    const displayProducts = products || [];
    const totalProducts = advancedFilters.count || displayProducts.length;
    const currentItemsPerPage = advancedFilters.limit || itemsPerPage;
    const totalPages = advancedFilters.totalPages || Math.ceil(totalProducts / currentItemsPerPage);
    
    // Sử dụng products trực tiếp vì API đã trả về đúng page
    const paginatedProducts = displayProducts;
    
    return (
      <div className='homepage-tiki bg-light' style={{minHeight:'100vh'}}>
        {/* Main layout */}
        <Container fluid>
          <Row>
            <Col xs='12' md='3' lg='2' className='mb-3'>
              <Sidebar 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onCategoryFilter={this.handleCategoryFilter} 
                onClearFilter={this.handleClearFilter} 
              />
            </Col>
            <Col xs='12' md='9' lg='10'>
              <Banner />
              <div className='mb-4'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <h5 className='font-weight-bold text-success mb-0'>
                    {searchQuery && searchQuery.trim()
                      ? `Kết quả tìm kiếm: "${searchQuery.trim()}"`
                      : selectedCategory 
                        ? `${selectedCategory.name}` 
                        : 'Sản phẩm nổi bật'
                    }
                  </h5>
                  <div className='d-flex align-items-center gap-2' style={{ gap: 12 }}>
                    <span style={{ fontSize: 14, color: '#6c757d' }}>
                      {totalProducts} sản phẩm
                    </span>
                    {(selectedCategory || (searchQuery && searchQuery.trim())) && (
                      <button
                        onClick={this.handleClearAllFilters}
                        style={{
                          background: 'none',
                          border: '1px solid #dc3545',
                          color: '#dc3545',
                          padding: '4px 8px',
                          borderRadius: 4,
                          fontSize: 12,
                          cursor: 'pointer'
                        }}
                      >
                        Xóa bộ lọc
                      </button>
                    )}
                  </div>
                </div>
                

                  <>
                    <ProductGrid products={paginatedProducts} onAddToCart={this.handleAddToCart} />
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={advancedFilters.currentPage || currentPage}
                        totalPages={totalPages}
                        onPageChange={this.handlePageChange}
                      />
                    )}
                  </>
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
  products: state.product.storeProducts,
  categories: state.category.storeCategories,
  cartItems: state.cart.cartItems,
  authenticated: state.authentication.authenticated,
  advancedFilters: state.product.advancedFilters
});

export default connect(
  mapStateToProps,
  { handleAddToCart, fetchProducts, fetchStoreCategories, addToCartServer, filterProducts, resetAdvancedFilters }
)(withRouter(Homepage));
