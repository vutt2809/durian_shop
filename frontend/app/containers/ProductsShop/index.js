import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterProducts } from '../Product/actions';

const ProductsShop = ({ filterProducts, products, loading }) => {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      filterProducts('category', category);
    } else {
      filterProducts(); // hoặc fetch all
    }
  }, [location.search]);

  return (
    <div className='products-shop'>
      {loading && <div>Đang tải sản phẩm...</div>}
      {!loading && products && products.length === 0 && <div>Không có sản phẩm nào.</div>}
      <div className='row'>
        {products && products.map(product => (
          <div className='col-md-4 mb-4' key={product._id}>
            <div className='product-card'>
              <img src={product.imageUrl || '/images/placeholder-product.jpg'} alt={product.name} className='img-fluid mb-2' />
              <div className='product-name'>{product.name}</div>
              <div className='product-price text-success'>{product.price?.toLocaleString()}₫</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.product.storeProducts,
  loading: state.product.loading
});

export default connect(mapStateToProps, { filterProducts })(ProductsShop); 