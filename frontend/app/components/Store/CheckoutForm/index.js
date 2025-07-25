/**
 *
 * CheckoutForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

import { API_URL } from '../../../constants';
import { clearCart } from '../../../containers/Cart/actions';
import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import handleError from '../../../utils/error';

class CheckoutForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        fullName: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        notes: '',
        paymentMethod: 'cod'
      },
      isSubmitting: false
    };
  }

  handleInputChange = (name, value) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    this.setState({ isSubmitting: true });
    
    try {
      const response = await axios.post(`${API_URL}/order`, {
        notes: this.state.formData.notes,
        shipping_address: {
          full_name: this.state.formData.fullName,
          phone: this.state.formData.phone,
          address1: this.state.formData.address,
          city: this.state.formData.city,
          district: this.state.formData.district
        },
        payment_method: this.state.formData.paymentMethod
      });

      const successfulOptions = {
        title: 'Đặt hàng thành công!',
        position: 'tr',
        autoDismiss: 1
      };

      this.props.dispatch(success(successfulOptions));
      this.props.dispatch(clearCart());
      this.props.dispatch(push(`/order/success/${response.data.order.id}`));
      
    } catch (error) {
      handleError(error, this.props.dispatch);
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { formData, isSubmitting } = this.state;

    return (
      <div className="checkout-form">
        <Form onSubmit={this.handleSubmit}>
          <div className="shipping-info mb-4">
            <h3>Thông tin giao hàng</h3>
            
            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="fullName">Họ và tên *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => this.handleInputChange('fullName', e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => this.handleInputChange('phone', e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="address">Địa chỉ *</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={(e) => this.handleInputChange('address', e.target.value)}
                required
              />
            </FormGroup>

            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="district">Quận/Huyện *</Label>
                  <Input
                    id="district"
                    name="district"
                    type="text"
                    value={formData.district}
                    onChange={(e) => this.handleInputChange('district', e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="city">Tỉnh/Thành phố *</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => this.handleInputChange('city', e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="notes">Ghi chú</Label>
              <Input
                id="notes"
                name="notes"
                type="textarea"
                value={formData.notes}
                onChange={(e) => this.handleInputChange('notes', e.target.value)}
                rows="3"
              />
            </FormGroup>
          </div>

          <div className="payment-method mb-4">
            <h3>Phương thức thanh toán</h3>
            
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={(e) => this.handleInputChange('paymentMethod', e.target.value)}
                />
                Thanh toán khi nhận hàng (COD)
              </Label>
            </FormGroup>
            
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={formData.paymentMethod === 'bank_transfer'}
                  onChange={(e) => this.handleInputChange('paymentMethod', e.target.value)}
                />
                Chuyển khoản ngân hàng
              </Label>
            </FormGroup>
          </div>

          <Button
            type="submit"
            color="primary"
            size="lg"
            block
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect()(CheckoutForm); 