/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import ProductList from '../../components/Manager/ProductList';
import SubPage from '../../components/Manager/SubPage';

import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { history, products, isLoading } = this.props;

    return (
      <>
        <SubPage
          title='Sản phẩm sầu riêng'
          actionTitle='Thêm sản phẩm'
          handleAction={() => history.push('/dashboard/product/add')}
        >
          {isLoading ? (
            <div className='d-flex justify-content-center'>
              <div className='spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          ) : products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <NotFound message='Không tìm thấy sản phẩm sầu riêng nào.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    isLoading: state.product.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
