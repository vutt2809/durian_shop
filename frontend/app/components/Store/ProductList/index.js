/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';



const ProductList = props => {
  const { products, authenticated } = props;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className='product-list'>
      {products.map((product, index) => (
        <div key={index} className='mb-3 mb-md-0'>
          <div className='product-container'>
            <div className='item-box'>
              <div className='item-link'>
                <Link
                  to={`/product/${product.slug || product.id}`}
                  className='d-flex flex-column h-100'
                >
                  <div className='item-image-container'>
                    <div className='item-image-box'>
                      <img
                        className='item-image'
                        src={
                          product.image_url
                            ? (product.image_url.startsWith('http')
                                ? product.image_url
                                : `http://localhost:3000${product.image_url.startsWith('/') ? '' : '/'}${product.image_url}`)
                            : '/images/placeholder-image.png'
                        }
                        alt={product.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder-image.png';
                        }}
                      />
                    </div>
                  </div>
                  <div className='item-body'>
                    <div className='item-details p-3'>
                      <h1 className='item-name'>{product.name}</h1>
                      <p className='item-desc mb-0'>{product.description}</p>
                    </div>
                  </div>
                  <div className='d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer'>
                    <p className='price mb-0' style={{ color: '#F59E0B', fontWeight: 700 }}>
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
