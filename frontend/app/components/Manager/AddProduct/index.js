/**
 *
 * AddProduct
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import { ROLES } from '../../../constants';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const ripenessSelect = [
  { value: 'ripe', label: 'Chín' },
  { value: 'unripe', label: 'Chưa chín' }
];

const originSelect = [
  { value: 'vietnam', label: 'Việt Nam' },
  { value: 'thailand', label: 'Thái Lan' },
  { value: 'malaysia', label: 'Malaysia' },
  { value: 'indonesia', label: 'Indonesia' }
];

const AddProduct = props => {
  const {
    user,
    productFormData,
    formErrors,
    productChange,
    addProduct,
    categories,
    image
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addProduct();
  };

  return (
    <div className='add-product'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Tên sản phẩm'}
              name={'name'}
              placeholder={'Nhập tên sản phẩm sầu riêng'}
              value={productFormData.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <SelectOption
              error={formErrors['category_id']}
              name={'category_id'}
              label={'Danh mục'}
              value={productFormData.category_id}
              options={categories}
              handleSelectChange={value => {
                productChange('category_id', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Mô tả'}
              name={'description'}
              placeholder={'Mô tả chi tiết về sản phẩm sầu riêng'}
              value={productFormData.description}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['quantity']}
              label={'Số lượng'}
              name={'quantity'}
              decimals={false}
              placeholder={'Nhập số lượng'}
              value={productFormData.quantity}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Giá (VNĐ)'}
              name={'price'}
              min={1}
              placeholder={'Nhập giá sản phẩm'}
              value={productFormData.price}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['weight']}
              label={'Trọng lượng (kg)'}
              name={'weight'}
              min={0.1}
              step={0.1}
              placeholder={'Nhập trọng lượng'}
              value={productFormData.weight}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <SelectOption
              error={formErrors['ripeness']}
              name={'ripeness'}
              label={'Độ chín'}
              value={productFormData.ripeness}
              options={ripenessSelect}
              handleSelectChange={value => {
                productChange('ripeness', value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <SelectOption
              error={formErrors['origin']}
              name={'origin'}
              label={'Xuất xứ'}
              value={productFormData.origin}
              options={originSelect}
              handleSelectChange={value => {
                productChange('origin', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'file'}
              error={formErrors['file']}
              name={'image'}
              label={'Hình ảnh'}
              placeholder={'Tải lên hình ảnh sản phẩm'}
              value={image}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-product'}
              name={'isActive'}
              label={'Hoạt động?'}
              checked={productFormData.isActive}
              toggleCheckboxChange={value => productChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-product-actions'>
          <Button type='submit' text={'Thêm sản phẩm'} />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
