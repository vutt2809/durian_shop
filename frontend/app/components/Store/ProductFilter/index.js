/**
 *
 * ProductFilter
 *
 */

import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import RangeSlider from '../../Common/RangeSlider';

const priceMarks = {
  1: { label: <p className='fw-normal text-black'>1₫</p> },
  5000: { label: <p className='fw-normal text-black'>5000₫</p> }
};





const ProductFilter = props => {
  const { filterProducts } = props;

  return (
    <div className='product-filter'>
      <Card className='mb-4'>
        <CardHeader tag='h3'>Giá</CardHeader>
        <CardBody>
          <div className='mx-2 mb-3'>
            <RangeSlider
              marks={priceMarks}
              defaultValue={[1, 2500]}
              max={5000}
              onChange={v => {
                filterProducts('price', v);
              }}
            />
          </div>
        </CardBody>
      </Card>

    </div>
  );
};

export default ProductFilter;
