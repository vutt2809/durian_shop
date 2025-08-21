/*
 *
 * Signup
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import Checkbox from '../../components/Common/Checkbox';


class Signup extends React.PureComponent {
  render() {
    const {
      authenticated,
      signupFormData,
      formErrors,
      isLoading,
      isSubmitting,
      isSubscribed,
      signupChange,
      signUp,
      subscribeChange
    } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    const handleSubmit = event => {
      event.preventDefault();
      signUp();
    };

    return (
      <div className='signup-form'>

        <h2>Đăng ký</h2>
        <hr />
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col xs='12' md='6' className='mx-auto'>
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={formErrors['email']}
                  label={'Địa chỉ email'}
                  name={'email'}
                  placeholder={'Vui lòng nhập email của bạn'}
                  value={signupFormData.email}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={formErrors['first_name']}
                  label={'Tên'}
                  name={'first_name'}
                  placeholder={'Vui lòng nhập tên của bạn'}
                  value={signupFormData.first_name}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={formErrors['last_name']}
                  label={'Họ'}
                  name={'last_name'}
                  placeholder={'Vui lòng nhập họ của bạn'}
                  value={signupFormData.last_name}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type={'password'}
                  label={'Mật khẩu'}
                  error={formErrors['password']}
                  name={'password'}
                  placeholder={'Vui lòng nhập mật khẩu của bạn'}
                  value={signupFormData.password}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
            </Col>
          </Row>
          <hr />
          <Checkbox
            id={'subscribe'}
            label={'Đăng ký nhận bản tin'}
            checked={isSubscribed}
            onChange={subscribeChange}
          />
          <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between'>
            <Button
              type='submit'
              variant='primary'
              text={'Đăng ký'}
              disabled={isSubmitting}
            />
            <Link className='mt-3 mt-md-0 redirect-link' to={'/login'}>
              Quay lại trang đăng nhập
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    signupFormData: state.signup.signupFormData,
    formErrors: state.signup.formErrors,
    isLoading: state.signup.isLoading,
    isSubmitting: state.signup.isSubmitting,
    isSubscribed: state.signup.isSubscribed
  };
};

export default connect(mapStateToProps, actions)(Signup);
