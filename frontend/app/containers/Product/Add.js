/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddProduct from '../../components/Manager/AddProduct';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const {
      history,
      user,
      productFormData,
      formErrors,
      categories,
      productChange,
      addProduct
    } = this.props;

    return (
      <SubPage
        title='Thêm sản phẩm sầu riêng'
        actionTitle='Hủy'
        handleAction={history.goBack}
      >
        <AddProduct
          user={user}
          productFormData={productFormData}
          formErrors={formErrors}
          categories={categories}
          productChange={productChange}
          addProduct={addProduct}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    productFormData: state.product.productFormData,
    formErrors: state.product.formErrors,
    categories: state.category.categories
  };
};

export default connect(mapStateToProps, actions)(Add);
