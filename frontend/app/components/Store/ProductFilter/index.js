/**
 *
 * ProductFilter
 *
 */

import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import RangeSlider from '../../Common/RangeSlider';

const priceMarks = {
  10000: { label: <p className='fw-normal text-black'>10.000₫</p> },
  500000: { label: <p className='fw-normal text-black'>500.000₫</p> }
};

const ProductFilter = props => {
  const { filterProducts } = props;

  return (
    <div className='product-filter'>
      <Card className='mb-4'>
        <CardHeader tag='h3'>Khoảng giá</CardHeader>
        <CardBody>
          <div className='mx-2 mb-3'>
            <RangeSlider
              marks={priceMarks}
              defaultValue={[10000, 500000]}
              max={500000}
              min={10000}
              step={5000}
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
