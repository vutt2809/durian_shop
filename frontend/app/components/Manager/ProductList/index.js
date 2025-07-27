/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const ProductList = props => {
  const { products } = props;

  const getRipenessText = (ripeness) => {
    return ripeness === 'ripe' ? 'Chín' : 'Chưa chín';
  };

  const getOriginText = (origin) => {
    const origins = {
      'vietnam': 'Việt Nam',
      'thailand': 'Thái Lan',
      'malaysia': 'Malaysia',
      'indonesia': 'Indonesia'
    };
    return origins[origin] || origin;
  };

  return (
    <div className='p-list'>
      {products.map((product, index) => (
        <Link
          to={`/dashboard/product/edit/${product.id}`}
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 product-box'
        >
          <img
            className='item-image'
            src={`${
              product && product.image_url
                ? `http://localhost:3000${product.image_url}`
                : '/images/placeholder-image.png'
            }`}
            alt={product.name}
            onError={(e) => {
              e.target.src = '/images/placeholder-image.png';
            }}
          />
          <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
            <h4 className='text-truncate'>{product.name}</h4>
            <p className='mb-2 text-truncate'>{product.description}</p>
            <div className='product-details'>
              <span className='text-success font-weight-bold'>{product.price} VNĐ</span>
              <span className='text-muted ml-2'>• {product.weight} kg</span>
              <span className='text-muted ml-2'>• {getRipenessText(product.ripeness)}</span>
              <span className='text-muted ml-2'>• {getOriginText(product.origin)}</span>
              <span className='text-muted ml-2'>• SL: {product.quantity}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
