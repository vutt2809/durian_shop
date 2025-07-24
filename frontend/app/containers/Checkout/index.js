import React from 'react';
import { connect } from 'react-redux';
import { addOrder } from '../Order/actions';
import { withRouter } from 'react-router-dom';

class Checkout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      phone: '',
      address: '',
      errors: {},
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    const errors = {};
    if (!this.state.full_name.trim()) errors.full_name = 'Vui lòng nhập họ tên';
    if (!this.state.phone.trim()) errors.phone = 'Vui lòng nhập số điện thoại';
    if (!this.state.address.trim()) errors.address = 'Vui lòng nhập địa chỉ';
    return errors;
  };

  handlePlaceOrder = async () => {
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    await this.props.addOrder({
      full_name: this.state.full_name,
      phone: this.state.phone,
      address: this.state.address,
    });
  };

  render() {
    const { cartItems, cartTotal } = this.props;
    const { full_name, phone, address, errors } = this.state;
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #f5f5fa 60%, #fffbe7 100%)' }}>
        <div style={{ maxWidth: 520, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(234,179,8,0.10)', padding: '44px 32px', margin: '40px 0', border: '1.5px solid #ffe259' }}>
          <div style={{textAlign:'center', marginBottom: 24}}>
            <span style={{fontSize: 38, color: '#eab308', marginBottom: 8, display: 'inline-block'}}>🛒</span>
            <h2 style={{ fontWeight: 800, fontSize: 28, color: '#eab308', margin: 0, letterSpacing: 1 }}>Xác nhận đơn hàng</h2>
            <div style={{ color: '#388e3c', fontSize: 16, marginTop: 4 }}>Vui lòng kiểm tra lại thông tin trước khi đặt hàng</div>
          </div>
          <div style={{ borderBottom: '1.5px solid #ffe259', marginBottom: 22 }}></div>
          <form onSubmit={e => { e.preventDefault(); this.handlePlaceOrder(); }}>
            <div style={{ marginBottom: 18 }}>
              <input
                type="text"
                name="full_name"
                value={full_name}
                onChange={this.handleChange}
                placeholder="Họ và tên người nhận"
                style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1.5px solid #eee', fontSize: 16, marginBottom: 4 }}
              />
              {errors.full_name && <div style={{ color: 'red', fontSize: 13 }}>{errors.full_name}</div>}
            </div>
            <div style={{ marginBottom: 18 }}>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={this.handleChange}
                placeholder="Số điện thoại"
                style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1.5px solid #eee', fontSize: 16, marginBottom: 4 }}
              />
              {errors.phone && <div style={{ color: 'red', fontSize: 13 }}>{errors.phone}</div>}
            </div>
            <div style={{ marginBottom: 24 }}>
              <textarea
                name="address"
                value={address}
                onChange={this.handleChange}
                placeholder="Địa chỉ nhận hàng"
                rows={2}
                style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1.5px solid #eee', fontSize: 16, resize: 'vertical', marginBottom: 4 }}
              />
              {errors.address && <div style={{ color: 'red', fontSize: 13 }}>{errors.address}</div>}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {cartItems.map((item, idx) => (
                <li key={idx} style={{marginBottom: 18, fontSize: 18, color: '#222', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontWeight: 500}}>{item.name} <span style={{color:'#888', fontSize:15}}>x {item.quantity}</span></span>
                  <span style={{fontWeight: 700, color:'#eab308'}}>{item.price.toLocaleString()} VNĐ</span>
                </li>
              ))}
            </ul>
            <div style={{ borderTop: '1.5px solid #ffe259', margin: '24px 0 14px 0' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, fontWeight: 900, color: '#388e3c', marginBottom: 24, letterSpacing: 0.5 }}>
              <span>Tổng cộng:</span>
              <span>{cartTotal.toLocaleString()} VNĐ</span>
            </div>
            <button type="submit" style={{width:'100%', marginTop:8, padding:'16px 0', background:'linear-gradient(90deg,#ffe259 0%,#ffa751 100%)', color:'#222', border:'none', borderRadius:12, fontWeight:'bold', fontSize:22, cursor:'pointer', boxShadow:'0 4px 16px rgba(234,179,8,0.10)', transition:'0.2s', letterSpacing:1}}>Đặt Hàng</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  cartTotal: state.cart.cartTotal
});

export default withRouter(connect(mapStateToProps, { addOrder })(Checkout)); 