/**
 *
 * Dashboard
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaBox, FaBell, FaUser, FaUsers, FaBoxes, FaTags, FaHeadset, FaSignOutAlt } from 'react-icons/fa';

import actions from '../../actions';
import { fetchProfile } from '../Account/actions';
import { fetchAccountOrders } from '../Order/actions';

// Dashboard Sidebar Component
const DashboardSidebar = ({ activeTab, onTabChange, user }) => {
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    { id: 'overview', label: 'Tổng quan', path: '/dashboard', icon: FaShoppingBag },
    { id: 'account', label: 'Tài khoản', path: '/dashboard', icon: FaUser },
    { id: 'orders', label: isAdmin ? 'Tất cả đơn hàng' : 'Đơn hàng của tôi', path: '/dashboard/orders', icon: FaBox },
    ...(isAdmin ? [
      { id: 'products', label: 'Quản lý Sản phẩm', path: '/dashboard/products', icon: FaBoxes },
      { id: 'categories', label: 'Quản lý Danh mục', path: '/dashboard/categories', icon: FaTags },
      { id: 'users', label: 'Quản lý Người dùng', path: '/dashboard/users', icon: FaUsers },
    ] : []),
    { id: 'support', label: 'Hỗ trợ', path: '/dashboard/support', icon: FaHeadset },
  ];

  return (
    <div style={{
      width: 280,
      background: '#f8f9fa',
      minHeight: '100vh',
      padding: '24px 0',
      borderRight: '1px solid #e9ecef',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo */}
      <div style={{ padding: '0 24px 32px 24px', borderBottom: '1px solid #374151' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: '#333',
          fontSize: 20,
          fontWeight: 700
        }}>
          <span>Sầu Riêng 5 Tốt</span>
        </div>
        <div style={{ color: '#6c757d', fontSize: 14, marginTop: 4 }}>
          Dashboard
        </div>
      </div>

      {/* User Info */}
      <div style={{ padding: '24px', borderBottom: '1px solid #374151' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 8
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#6c757d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 18,
            fontWeight: 600
          }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{ color: '#333', fontSize: 16, fontWeight: 600 }}>
              {user?.name || 'Người dùng'}
            </div>
            <div style={{ color: '#6c757d', fontSize: 14 }}>
              {user?.email || 'user@example.com'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={{ padding: '24px 0', maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => onTabChange(item.id)}
              style={{
                padding: '12px 24px',
                margin: '4px 0',
                cursor: 'pointer',
                background: isActive ? '#e9ecef' : 'transparent',
                borderLeft: isActive ? '4px solid #6c757d' : '4px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                textDecoration: 'none'
              }}
            >
              <span style={{
                color: isActive ? '#333' : '#6c757d',
                fontSize: 16,
                fontWeight: isActive ? 600 : 400
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ 
        position: 'absolute', 
        bottom: 24, 
        left: 24, 
        right: 24 
      }}>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#f8f9fa',
            border: '1px solid #dc3545',
            borderRadius: 4,
            color: '#dc3545',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <FaSignOutAlt size={16} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

// Dashboard Header Component
const DashboardHeader = ({ title, subtitle, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

    return (
    <div style={{
      background: '#fff',
      padding: '24px 32px',
      borderBottom: '1px solid #e9ecef',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        <h1 style={{
          fontSize: 28,
          fontWeight: 700,
          color: '#111827',
          margin: 0,
          marginBottom: 4
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontSize: 16,
            color: '#6B7280',
            margin: 0
          }}>
            {subtitle}
          </p>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <FaSearch 
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
              fontSize: 16
            }}
          />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '10px 12px 10px 40px',
              border: '1px solid #D1D5DB',
              borderRadius: 8,
              fontSize: 14,
              width: 240,
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
          />
        </div>

        {/* Notifications */}
        <button style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #E5E7EB',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = '#F9FAFB'}
        onMouseLeave={(e) => e.target.style.background = '#fff'}
        >
          <FaBell size={18} color="#6B7280" />
          <span style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#EF4444'
          }}></span>
        </button>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ user, orders, onTabChange }) => {
  const stats = [
    {
      title: 'Tổng đơn hàng',
      value: orders?.length || 0,
      icon: FaShoppingBag,
      color: '#3B82F6',
      bgColor: '#EBF8FF'
    },
    {
      title: 'Đơn hàng chờ xử lý',
      value: orders?.filter(o => o.status === 'pending')?.length || 0,
      icon: FaBox,
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    },

  ];

  return (
    <div style={{ padding: '32px' }}>
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 24,
        marginBottom: 32
      }}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} style={{
              background: '#fff',
              borderRadius: 12,
              padding: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
                    {stat.title}
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#111827' }}>
                    {stat.value}
                  </div>
                </div>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: stat.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={24} color={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #E5E7EB',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: '#111827' }}>
            Đơn hàng gần đây
          </h3>
          <button 
            onClick={() => onTabChange && onTabChange('orders')}
            style={{
              padding: '8px 16px',
              background: '#3B82F6',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Xem tất cả
          </button>
        </div>
        
        {orders && orders.length > 0 ? (
          <div>
            {orders.slice(0, 5).map((order, index) => (
              <div key={order.id || index} style={{
                padding: '16px 24px',
                borderBottom: index < orders.slice(0, 5).length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 500, color: '#111827' }}>
                    #{order.order_number || order.id}
                  </div>
                  <div style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
                    {new Date(order.created_at).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <div style={{
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  background: order.status === 'pending' ? '#FEF3C7' : '#D1FAE5',
                  color: order.status === 'pending' ? '#92400E' : '#065F46'
                }}>
                  {order.status === 'pending' ? 'Chờ xử lý' : 'Đã hoàn thành'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', color: '#6B7280' }}>
            Chưa có đơn hàng nào
          </div>
        )}
      </div>
    </div>
  );
};

// Orders Tab Component
const OrdersTab = ({ orders, isLoading, fetchAccountOrders, user, history }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Gọi API với tham số isAdmin dựa trên role của user
    const isAdmin = user?.role === 'admin';

    fetchAccountOrders(isAdmin);
  }, [user]);

  // Filter orders based on search
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id?.toString().includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return { bg: '#FEF3C7', color: '#92400E', text: 'Chờ xử lý' };
      case 'processing': return { bg: '#DBEAFE', color: '#1E40AF', text: 'Đang chuẩn bị' };
      case 'waiting_carrier': return { bg: '#FFE4E6', color: '#9F1239', text: 'Chờ đơn vị vận chuyển' };
      case 'shipped': return { bg: '#FEF3C7', color: '#92400E', text: 'Đang giao hàng' };
      case 'delivered': return { bg: '#D1FAE5', color: '#065F46', text: 'Đã giao hàng' };
      case 'cancelled': return { bg: '#FEE2E2', color: '#991B1B', text: 'Đã hủy' };
      default: return { bg: '#F3F4F6', color: '#374151', text: status };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleViewOrderDetails = (order) => {
    // Chuyển đến trang chi tiết đơn hàng
    history.push(`/order/${order.id}`);
  };



  const getProductCount = (order) => {
    // Kiểm tra nhiều cách để lấy số lượng sản phẩm
    if (order.orderDetails && Array.isArray(order.orderDetails)) {
      return order.orderDetails.length;
    }
    if (order.order_details && Array.isArray(order.order_details)) {
      return order.order_details.length;
    }
    if (order.products && Array.isArray(order.products)) {
      return order.products.length;
    }
    // Nếu không có dữ liệu chi tiết, trả về 0
    return 0;
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Filters and Search */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '24px',
        border: '1px solid #E5E7EB',
        marginBottom: 24,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: 250 }}>
          <FaSearch 
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
              fontSize: 16
            }}
          />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn hàng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              border: '1px solid #D1D5DB',
              borderRadius: 8,
              fontSize: 14,
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
          />
        </div>

        {/* Status filter */}
        <div style={{ minWidth: 220 }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #D1D5DB',
              borderRadius: 8,
              fontSize: 14,
              outline: 'none',
              background: '#fff'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang chuẩn bị</option>
            <option value="waiting_carrier">Chờ đơn vị vận chuyển</option>
            <option value="shipped">Đang giao hàng</option>
            <option value="delivered">Đã giao hàng</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>


      </div>

      {/* Orders Table */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        {/* Table Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E5E7EB',
          background: '#F9FAFB'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
            gap: 16,
            fontSize: 14,
            fontWeight: 600,
            color: '#374151'
          }}>
            <div>Mã đơn hàng</div>
            <div>Ngày đặt</div>
            <div>Tổng tiền</div>
            <div>Trạng thái</div>
            <div>Thao tác</div>
          </div>
        </div>

        {/* Table Body */}
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>⏳</div>
            Đang tải dữ liệu...
          </div>
        ) : paginatedOrders.length > 0 ? (
          <div>
            {paginatedOrders.map((order, index) => {
              const statusInfo = getStatusColor(order.status);
              const productCount = getProductCount(order);
              return (
                <div key={order.id || index} style={{
                  padding: '20px 24px',
                  borderBottom: index < paginatedOrders.length - 1 ? '1px solid #F3F4F6' : 'none',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                  gap: 16,
                  alignItems: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#F9FAFB'}
                onMouseLeave={(e) => e.target.style.background = '#fff'}
                >
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                      #{order.order_number || order.id}
                    </div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                      {productCount} sản phẩm
                    </div>
                  </div>
                  
                  <div style={{ fontSize: 14, color: '#374151' }}>
                    {new Date(order.created_at).toLocaleDateString('vi-VN')}
                  </div>
                  
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                    {formatCurrency(order.total || order.subtotal || 0)}
                  </div>
                  
                  <div>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 500,
                      background: statusInfo.bg,
                      color: statusInfo.color
                    }}>
                      {statusInfo.text}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button 
                      onClick={() => handleViewOrderDetails(order)}
                      style={{
                        padding: '8px 16px',
                        background: '#3B82F6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#2563EB'}
                      onMouseLeave={(e) => e.target.style.background = '#3B82F6'}
                    >
                      Xem chi tiết
                    </button>
                    

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
              Chưa có đơn hàng nào
            </div>
            <div style={{ fontSize: 14 }}>
              {searchQuery || statusFilter !== 'all' 
                ? 'Không tìm thấy đơn hàng phù hợp với bộ lọc'
                : 'Bắt đầu mua sắm để có đơn hàng đầu tiên!'
              }
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          marginTop: 24
        }}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              border: '1px solid #E5E7EB',
              background: currentPage === 1 ? '#F9FAFB' : '#fff',
              color: currentPage === 1 ? '#9CA3AF' : '#374151',
              borderRadius: 6,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: 14
            }}
          >
            ← Trước
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '8px 12px',
                border: '1px solid #E5E7EB',
                background: page === currentPage ? '#F59E0B' : '#fff',
                color: page === currentPage ? '#fff' : '#374151',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: page === currentPage ? 600 : 400
              }}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              border: '1px solid #E5E7EB',
              background: currentPage === totalPages ? '#F9FAFB' : '#fff',
              color: currentPage === totalPages ? '#9CA3AF' : '#374151',
              borderRadius: 6,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: 14
            }}
          >
            Sau →
          </button>
        </div>
      )}

      {/* Summary */}
      <div style={{
        marginTop: 24,
        padding: '16px 24px',
        background: '#F9FAFB',
        borderRadius: 8,
        border: '1px solid #E5E7EB',
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center'
      }}>
        Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} của {filteredOrders.length} đơn hàng
      </div>
    </div>
  );
};

// Account Tab Component
const AccountTab = ({ user }) => {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '24px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 20px 0', color: '#111827' }}>
          Thông tin cá nhân
        </h3>
        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
              Họ và tên
            </label>
            <input
              type="text"
              value={user?.name || ''}
              disabled
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: 8,
                fontSize: 16,
                background: '#F9FAFB',
                color: '#6B7280',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: 8,
                fontSize: 16,
                background: '#F9FAFB',
                color: '#6B7280',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};





// Support Tab Component
const SupportTab = () => {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '24px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 20px 0', color: '#111827' }}>
          Thông tin liên hệ
        </h3>
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>📞</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>Hotline</div>
              <div style={{ fontSize: 16, color: '#6B7280' }}>1900 1234</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>��</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>Email</div>
              <div style={{ fontSize: 16, color: '#6B7280' }}>support@saurieng5tot.com</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>🕒</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>Giờ làm việc</div>
              <div style={{ fontSize: 16, color: '#6B7280' }}>8:00 - 22:00 (Thứ 2 - Chủ nhật)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Products Tab Component
const ProductsTab = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    weight: '',
    ripeness: 'ripe',
    origin: 'vietnam',
    category_id: '',
    is_active: true,
    image: null,
    image_url: null
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    checkUserRole();
  }, [currentPage, user]);

  // Thêm useEffect riêng để re-check user role khi user thay đổi
  useEffect(() => {
    checkUserRole();
  }, [user]);

  const checkUserRole = () => {
    setIsAdmin(user?.role === 'admin');
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/product?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products?.data || []);
        setTotalPages(data.products?.last_page || 1);
        setTotalItems(data.products?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/category', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories?.data || data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddProduct = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      quantity: '',
      weight: '',
      ripeness: 'ripe',
      origin: 'vietnam',
      category_id: '',
      is_active: true,
      image: null,
      image_url: null
    });
    setShowAddModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      weight: product.weight,
      ripeness: product.ripeness,
      origin: product.origin,
      category_id: product.category_id,
      is_active: product.is_active,
      image: null,
      image_url: product.image_url // Thêm để hiển thị hình ảnh hiện tại
    });
    setShowEditModal(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Thêm các field text
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('price', formData.price);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('weight', formData.weight || '');
      formDataToSend.append('ripeness', formData.ripeness || 'ripe');
      formDataToSend.append('origin', formData.origin || 'vietnam');
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('is_active', formData.is_active ? '1' : '0');
      
      // Thêm file hình ảnh nếu có
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });
      const data = await response.json();
      if (data.success) {
        setShowAddModal(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          quantity: '',
          weight: '',
          ripeness: 'ripe',
          origin: 'vietnam',
          category_id: '',
          is_active: true,
          image: null,
          image_url: null
        });
        fetchProducts();
        alert('Thêm sản phẩm thành công!');
      } else {
        alert('Lỗi: ' + (data.message || 'Không thể thêm sản phẩm'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Lỗi khi thêm sản phẩm');
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Thêm _method=PUT để Laravel hiểu đây là PUT request
      formDataToSend.append('_method', 'PUT');
      
      // Thêm các field text
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('price', formData.price);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('weight', formData.weight || '');
      formDataToSend.append('ripeness', formData.ripeness || 'ripe');
      formDataToSend.append('origin', formData.origin || 'vietnam');
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('is_active', formData.is_active ? '1' : '0');
      
      // Thêm file hình ảnh nếu có
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch(`http://localhost:3000/api/product/${selectedProduct.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });
      const data = await response.json();
      if (data.success) {
        setShowEditModal(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          quantity: '',
          weight: '',
          ripeness: 'ripe',
          origin: 'vietnam',
          category_id: '',
          is_active: true,
          image: null,
          image_url: null
        });
        fetchProducts();
        alert('Cập nhật sản phẩm thành công!');
      } else {
        alert('Lỗi: ' + (data.message || 'Không thể cập nhật sản phẩm'));
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Lỗi khi cập nhật sản phẩm');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/product/${selectedProduct.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setShowDeleteModal(false);
        fetchProducts();
        alert('Xóa sản phẩm thành công!');
      } else {
        alert('Lỗi: ' + (data.message || 'Không thể xóa sản phẩm'));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Lỗi khi xóa sản phẩm');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          style={{
            padding: '8px 12px',
            border: '1px solid #D1D5DB',
            background: '#fff',
            color: '#374151',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500
          }}
        >
          ←
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            padding: '8px 12px',
            border: '1px solid #D1D5DB',
            background: i === currentPage ? '#8B5CF6' : '#fff',
            color: i === currentPage ? '#fff' : '#374151',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            marginLeft: 4
          }}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          style={{
            padding: '8px 12px',
            border: '1px solid #D1D5DB',
            background: '#fff',
            color: '#374151',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            marginLeft: 4
          }}
        >
          →
        </button>
      );
    }

    return pages;
  };

  const renderModal = (type) => {
    const isAdd = type === 'add';
    const isEdit = type === 'edit';
    const isDelete = type === 'delete';

    if (isDelete) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '32px',
            maxWidth: 400,
            width: '90%'
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 16px 0', color: '#111827' }}>
              Xác nhận xóa sản phẩm
            </h3>
            <p style={{ fontSize: 16, color: '#6B7280', marginBottom: 24 }}>
              Bạn có chắc chắn muốn xóa sản phẩm "{selectedProduct?.name}"? Hành động này không thể hoàn tác.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #D1D5DB',
                  background: '#fff',
                  color: '#374151',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                style={{
                  padding: '10px 20px',
                  background: '#EF4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: '32px',
          maxWidth: 600,
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 24px 0', color: '#111827' }}>
            {isAdd ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
          </h3>
          
          <form onSubmit={isAdd ? handleSubmitAdd : handleSubmitEdit}>
            <div style={{ display: 'grid', gap: 20 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: 8,
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                    Giá (VNĐ) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    min="0"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                    Số lượng *
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    required
                    min="0"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                    Cân nặng (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    min="0"
                    step="0.1"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      fontSize: 16,
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                    Danh mục *
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      fontSize: 16,
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                    Độ chín
                  </label>
                  <select
                    value={formData.ripeness}
                    onChange={(e) => setFormData({...formData, ripeness: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      fontSize: 16,
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    <option value="ripe">Chín</option>
                    <option value="unripe">Chưa chín</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                    Xuất xứ
                  </label>
                  <select
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      fontSize: 16,
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    <option value="vietnam">Việt Nam</option>
                    <option value="thailand">Thái Lan</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="indonesia">Indonesia</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                  Trạng thái
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    style={{ width: 18, height: 18 }}
                  />
                  <label htmlFor="is_active" style={{ fontSize: 14, color: '#374151' }}>
                    Hoạt động
                  </label>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, display: 'block' }}>
                  Hình ảnh sản phẩm
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Hiển thị hình ảnh hiện tại nếu có */}
                  {(formData.image_url || (selectedProduct && selectedProduct.image_url)) && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img 
                        src={`http://localhost:3000${formData.image_url || selectedProduct.image_url}`}
                        alt="Product"
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 8,
                          border: '1px solid #D1D5DB'
                        }}
                      />
                      <span style={{ fontSize: 14, color: '#6B7280' }}>
                        Hình ảnh hiện tại
                      </span>
                    </div>
                  )}
                  
                  {/* Input file */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData({...formData, image: file});
                      }
                    }}
                    style={{
                      padding: '8px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 8,
                      fontSize: 14,
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontSize: 12, color: '#6B7280' }}>
                    Chấp nhận: JPG, PNG, GIF (tối đa 2MB)
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 32 }}>
              <button
                type="button"
                onClick={() => isAdd ? setShowAddModal(false) : setShowEditModal(false)}
                style={{
                  padding: '12px 24px',
                  border: '1px solid #D1D5DB',
                  background: '#fff',
                  color: '#374151',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                Hủy
              </button>
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  background: '#8B5CF6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                {isAdd ? 'Thêm sản phẩm' : 'Cập nhật'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Add Product Button for Admin */}
      {isAdmin && (
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={handleAddProduct}
            style={{
              padding: '12px 24px',
              background: '#10B981',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span>➕</span>
            Thêm sản phẩm mới
          </button>
        </div>
      )}

      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>⏳</div>
          Đang tải dữ liệu...
        </div>
      ) : products.length > 0 ? (
        <>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: 24
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #E5E7EB',
              background: '#F9FAFB'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isAdmin ? '80px 1fr 2fr 1fr 1fr 1fr 1fr' : '80px 1fr 2fr 1fr 1fr 1fr',
                gap: 16,
                fontSize: 14,
                fontWeight: 600,
                color: '#374151'
              }}>
                <div>Hình ảnh</div>
                <div>SKU</div>
                <div>Tên sản phẩm</div>
                <div>Giá</div>
                <div>Số lượng</div>
                <div>Trạng thái</div>
                {isAdmin && <div>Thao tác</div>}
              </div>
            </div>
            
            <div>
              {products.map((product, index) => (
                <div key={product.id} style={{
                  padding: '20px 24px',
                  borderBottom: index < products.length - 1 ? '1px solid #F3F4F6' : 'none',
                  display: 'grid',
                  gridTemplateColumns: isAdmin ? '80px 1fr 2fr 1fr 1fr 1fr 1fr' : '80px 1fr 2fr 1fr 1fr 1fr',
                  gap: 16,
                  alignItems: 'center'
                }}>
                  {/* Hình ảnh */}
                  <div>
                    {product.image_url ? (
                      <img 
                        src={`http://localhost:3000${product.image_url}`}
                        alt={product.name}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: 'cover',
                          borderRadius: 8,
                          border: '1px solid #D1D5DB'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: 60,
                        height: 60,
                        background: '#F3F4F6',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9CA3AF',
                        fontSize: 12
                      }}>
                        No Image
                      </div>
                    )}
                  </div>
                  
                  {/* SKU */}
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>
                    {product.sku}
                  </div>
                  
                  {/* Tên sản phẩm */}
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                      {product.category?.name || 'Chưa phân loại'}
                    </div>
                  </div>
                  
                  {/* Giá */}
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                    {formatCurrency(product.price)}
                  </div>
                  
                  {/* Số lượng */}
                  <div style={{ fontSize: 14, color: '#374151' }}>
                    {product.quantity}
                  </div>
                  
                  {/* Trạng thái */}
                  <div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 500,
                      background: product.is_active ? '#D1FAE5' : '#FEE2E2',
                      color: product.is_active ? '#065F46' : '#991B1B'
                    }}>
                      {product.is_active ? 'Hoạt động' : 'Tạm ngưng'}
                    </span>
                  </div>

                  {/* Thao tác (chỉ admin) */}
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => handleEditProduct(product)}
                        style={{
                          padding: '6px 12px',
                          background: '#3B82F6',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#2563EB'}
                        onMouseLeave={(e) => e.target.style.background = '#3B82F6'}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        style={{
                          padding: '6px 12px',
                          background: '#EF4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#DC2626'}
                        onMouseLeave={(e) => e.target.style.background = '#EF4444'}
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #E5E7EB',
            padding: '20px 24px'
          }}>
            <div style={{ fontSize: 14, color: '#6B7280' }}>
              Hiển thị {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} trong tổng số {totalItems} sản phẩm
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {renderPagination()}
            </div>
          </div>
        </>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Chưa có sản phẩm nào
          </div>
          <div style={{ fontSize: 14 }}>
            {isAdmin ? 'Bắt đầu thêm sản phẩm đầu tiên!' : 'Chưa có sản phẩm nào trong hệ thống'}
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddModal && renderModal('add')}
      {showEditModal && renderModal('edit')}
      {showDeleteModal && renderModal('delete')}
    </div>
  );
};

// Categories Tab Component
const CategoriesTab = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_active: true
  });

  useEffect(() => {
    fetchCategories();
    checkUserRole();
  }, [currentPage, user]);

  useEffect(() => {
    checkUserRole();
  }, [user]);

  const checkUserRole = () => {
    setIsAdmin(user?.role === 'admin');
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/category?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories?.data || data.categories || []);
        setTotalPages(data.categories?.last_page || 1);
        setTotalItems(data.categories?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddCategory = () => {
    setFormData({
      name: '',
      description: '',
      is_active: true
    });
    setShowAddModal(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      is_active: category.is_active
    });
    setShowEditModal(true);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (type) => {
    try {
      const url = type === 'add' 
        ? 'http://localhost:3000/api/category'
        : `http://localhost:3000/api/category/${selectedCategory.id}`;
      
      const method = type === 'add' ? 'POST' : type === 'edit' ? 'PUT' : 'DELETE';
      
      const body = type === 'delete' ? null : JSON.stringify(formData);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body
      });

      const data = await response.json();
      
      if (data.success) {
        fetchCategories();
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedCategory(null);
      } else {
        alert(data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const renderModal = (type) => {
    const isAdd = type === 'add';
    const isEdit = type === 'edit';
    const isDelete = type === 'delete';

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: '32px',
          width: '90%',
          maxWidth: 500,
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 24px 0', color: '#111827' }}>
            {isAdd ? 'Thêm danh mục mới' : isEdit ? 'Chỉnh sửa danh mục' : 'Xóa danh mục'}
          </h3>

          {!isDelete ? (
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151' }}>
                Tên danh mục *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  fontSize: 14
                }}
                placeholder="Nhập tên danh mục"
              />
            </div>
          ) : null}

          {!isDelete ? (
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151' }}>
                Mô tả
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  fontSize: 14,
                  minHeight: 80,
                  resize: 'vertical'
                }}
                placeholder="Nhập mô tả danh mục"
              />
            </div>
          ) : null}

          {!isDelete ? (
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                />
                <span style={{ fontWeight: 500, color: '#374151' }}>Kích hoạt</span>
              </label>
            </div>
          ) : null}

          {isDelete && (
            <div style={{ marginBottom: 24, padding: '16px', background: '#FEF2F2', borderRadius: 8, border: '1px solid #FECACA' }}>
              <p style={{ margin: 0, color: '#991B1B' }}>
                Bạn có chắc chắn muốn xóa danh mục "{selectedCategory?.name}"? Hành động này không thể hoàn tác.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setShowDeleteModal(false);
                setSelectedCategory(null);
              }}
              style={{
                padding: '10px 20px',
                border: '1px solid #D1D5DB',
                borderRadius: 8,
                background: '#fff',
                color: '#374151',
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              Hủy
            </button>
            <button
              onClick={() => handleSubmit(type)}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: 8,
                background: isDelete ? '#EF4444' : '#3B82F6',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500
              }}
            >
              {isAdd ? 'Thêm' : isEdit ? 'Cập nhật' : 'Xóa'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '32px' }}>
      {isAdmin && (
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={handleAddCategory}
            style={{
              padding: '12px 24px',
              background: '#3B82F6',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span>+</span>
            Thêm danh mục mới
          </button>
        </div>
      )}

      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>⏳</div>
          Đang tải dữ liệu...
        </div>
      ) : categories.length > 0 ? (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E5E7EB',
            background: '#F9FAFB'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr',
              gap: 16,
              fontSize: 14,
              fontWeight: 600,
              color: '#374151'
            }}>
              <div>ID</div>
              <div>Tên danh mục</div>
              <div>Mô tả</div>
              <div>Hành động</div>
            </div>
          </div>
          
          <div>
            {categories.map((category, index) => (
              <div key={category.id} style={{
                padding: '20px 24px',
                borderBottom: index < categories.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr',
                gap: 16,
                alignItems: 'center'
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>
                  #{category.id}
                </div>
                
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                    {category.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                    {category.is_active ? 'Đang hoạt động' : 'Đã ẩn'}
                  </div>
                </div>
                
                <div style={{ fontSize: 14, color: '#374151' }}>
                  {category.description || 'Không có mô tả'}
                </div>
                
                {isAdmin && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => handleEditCategory(category)}
                      style={{
                        padding: '6px 12px',
                        background: '#F59E0B',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 12,
                        cursor: 'pointer'
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      style={{
                        padding: '6px 12px',
                        background: '#EF4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 12,
                        cursor: 'pointer'
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Chưa có danh mục nào
          </div>
          <div style={{ fontSize: 14 }}>
            {isAdmin ? 'Bắt đầu tạo danh mục đầu tiên' : 'Chưa có danh mục nào trong hệ thống'}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 8, 
          marginTop: 32 
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: 6,
              background: currentPage === 1 ? '#F3F4F6' : '#fff',
              color: currentPage === 1 ? '#9CA3AF' : '#374151',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: 14
            }}
          >
            Trước
          </button>
          
          <span style={{ fontSize: 14, color: '#374151' }}>
            Trang {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: 6,
              background: currentPage === totalPages ? '#F3F4F6' : '#fff',
              color: currentPage === totalPages ? '#9CA3AF' : '#374151',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: 14
            }}
          >
            Sau
          </button>
        </div>
      )}

      {/* Modals */}
      {showAddModal && renderModal('add')}
      {showEditModal && renderModal('edit')}
      {showDeleteModal && renderModal('delete')}
    </div>
  );
};

// Users Tab Component
const UsersTab = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchUsers();
    checkUserRole();
  }, [currentPage, user]);

  useEffect(() => {
    checkUserRole();
  }, [user]);

  const checkUserRole = () => {
    setIsAdmin(user?.role === 'admin');
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/users?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users?.data || data.users || []);
        setTotalPages(data.users?.last_page || 1);
        setTotalItems(data.users?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: '32px' }}>
      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>⏳</div>
          Đang tải dữ liệu...
        </div>
      ) : users.length > 0 ? (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E5E7EB',
            background: '#F9FAFB'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
              gap: 16,
              fontSize: 14,
              fontWeight: 600,
              color: '#374151'
            }}>
              <div>ID</div>
              <div>Thông tin</div>
              <div>Email</div>
              <div>Vai trò</div>
              <div>Trạng thái</div>
            </div>
          </div>
          
          <div>
            {users.map((userItem, index) => (
              <div key={userItem.id} style={{
                padding: '20px 24px',
                borderBottom: index < users.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
                gap: 16,
                alignItems: 'center'
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>
                  #{userItem.id}
                </div>
                
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                    {userItem.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                    Đăng ký: {new Date(userItem.created_at).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                
                <div style={{ fontSize: 14, color: '#374151' }}>
                  {userItem.email}
                </div>
                
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 500,
                    background: userItem.role === 'admin' ? '#FEF3C7' : '#DBEAFE',
                    color: userItem.role === 'admin' ? '#92400E' : '#1E40AF'
                  }}>
                    {userItem.role === 'admin' ? 'Admin' : 'Người dùng'}
                  </span>
                </div>
                
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 500,
                    background: userItem.is_active ? '#D1FAE5' : '#FEE2E2',
                    color: userItem.is_active ? '#065F46' : '#991B1B'
                  }}>
                    {userItem.is_active ? 'Hoạt động' : 'Đã khóa'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Chưa có người dùng nào
          </div>
          <div style={{ fontSize: 14 }}>
            Chưa có người dùng nào trong hệ thống
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 8, 
          marginTop: 32 
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: 6,
              background: currentPage === 1 ? '#F3F4F6' : '#fff',
              color: currentPage === 1 ? '#9CA3AF' : '#374151',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: 14
            }}
          >
            Trước
          </button>
          
          <span style={{ fontSize: 14, color: '#374151' }}>
            Trang {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: 6,
              background: currentPage === totalPages ? '#F3F4F6' : '#fff',
              color: currentPage === totalPages ? '#9CA3AF' : '#374151',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: 14
            }}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};



// Main Dashboard Component
const Dashboard = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const { user, orders, fetchAccountOrders, history, location } = props;
  
  // Get activeTab from URL path
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'overview';
    if (path === '/dashboard/orders') return 'orders';
    if (path === '/dashboard/users') return 'users';
    if (path === '/dashboard/products') return 'products';
    if (path === '/dashboard/categories') return 'categories';
    if (path === '/dashboard/sellers') return 'sellers';
    if (path === '/dashboard/support') return 'support';
    return 'overview';
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromPath());

  useEffect(() => {
    // Gọi API khi component mount
    fetchAccountOrders();
    
    // Fetch user profile nếu có token (để đảm bảo user data được load sau reload)
    if (localStorage.getItem('token')) {
      fetchUserProfile();
    }
  }, []); // Bỏ user khỏi dependency để tránh infinite loop

  // Update activeTab when URL changes
  useEffect(() => {
    const newActiveTab = getActiveTabFromPath();
    setActiveTab(newActiveTab);
  }, [location.pathname]);

  // Thêm useEffect để log user data khi thay đổi
  useEffect(() => {
    if (user) {
      setUserLoaded(true);
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        // Sử dụng action từ Redux
        props.fetchProfile();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Update URL based on tab
    switch (tabId) {
      case 'overview':
        history.push('/dashboard');
        break;
      case 'orders':
        history.push('/dashboard/orders');
        break;
      case 'users':
        history.push('/dashboard/users');
        break;
      case 'products':
        history.push('/dashboard/products');
        break;
      case 'categories':
        history.push('/dashboard/categories');
        break;
      case 'sellers':
        history.push('/dashboard/sellers');
        break;
      case 'support':
        history.push('/dashboard/support');
        break;
      default:
        history.push('/dashboard');
    }
    
    // Gọi API tương ứng với từng tab
    switch (tabId) {
      case 'overview':
        // Không cần gọi API riêng, dùng data từ Redux
        break;
      case 'account':
        // Gọi API để lấy thông tin user chi tiết
        fetch('http://localhost:3000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).catch(error => console.error('Error fetching profile:', error));
        break;
      case 'orders':
        // Gọi API để lấy danh sách đơn hàng
        fetchAccountOrders();
        break;
      case 'products':
        // Gọi API để lấy danh sách sản phẩm (public route)
        fetch('http://localhost:3000/api/product', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).catch(error => console.error('Error fetching products:', error));
        break;
      case 'categories':
        // Gọi API để lấy danh sách danh mục (public route)
        fetch('http://localhost:3000/api/category', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).catch(error => console.error('Error fetching categories:', error));
        break;
      case 'users':
        // Gọi API để lấy danh sách người dùng
        fetch('http://localhost:3000/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).catch(error => console.error('Error fetching users:', error));
        break;
      case 'sellers':
        // Gọi API để lấy danh sách người bán
        fetch('http://localhost:3000/api/merchants', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).catch(error => console.error('Error fetching merchants:', error));
        break;
      case 'support':
        // Không cần gọi API cho support
        break;
      default:
        break;
    }
  };

  const renderTabContent = () => {
    const userKey = user?.role || 'guest';
    const isAdmin = user?.role === 'admin';

    const renderAccessDenied = (featureName) => (
      <div style={{ padding: '60px 32px', textAlign: 'center', color: '#6B7280' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <h3 style={{ fontSize: 20, fontWeight: 600, color: '#111827', marginBottom: 8 }}>
          Không có quyền truy cập
        </h3>
        <p style={{ fontSize: 14 }}>
          Trang {featureName} chỉ dành riêng cho Quản trị viên (Admin).
        </p>
      </div>
    );

    switch (activeTab) {
      case 'overview':
        return <OverviewTab key="overview" user={user} orders={orders} onTabChange={handleTabChange} />;
      case 'account':
        return <AccountTab key="account" user={user} />;
      case 'orders':
        return <OrdersTab key="orders" orders={orders} isLoading={false} fetchAccountOrders={fetchAccountOrders} user={user} history={props.history} />;
      case 'products':
        if (!isAdmin) return renderAccessDenied('Quản lý Sản phẩm');
        return <ProductsTab key={`products-${userKey}`} user={user} />;
      case 'categories':
        if (!isAdmin) return renderAccessDenied('Quản lý Danh mục');
        return <CategoriesTab key={`categories-${userKey}`} user={user} />;
      case 'users':
        if (!isAdmin) return renderAccessDenied('Quản lý Người dùng');
        return <UsersTab key={`users-${userKey}`} user={user} />;
      case 'support':
        return <SupportTab key="support" />;
      default:
        return <OverviewTab key="overview-default" user={user} orders={orders} onTabChange={handleTabChange} />;
    }
  };

  const getTabTitle = () => {
    const titles = {
      overview: 'Tổng quan',
      account: 'Tài khoản',
      orders: 'Đơn hàng',
      products: 'Sản phẩm',
      categories: 'Danh mục',
      users: 'Người dùng',
      support: 'Hỗ trợ'
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Sidebar */}
      <DashboardSidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        user={user}
      />
      
      {/* Main Content */}
      <div style={{ marginLeft: 280, flex: 1 }}>
        {/* Header */}
        <DashboardHeader 
          title={getTabTitle()}
          subtitle={activeTab === 'overview' ? 'Quản lý tài khoản và đơn hàng của bạn' : ''}
        />
        
        {/* Content */}
        <div style={{ minHeight: 'calc(100vh - 80px)' }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {

  return {
    user: state.account.user,
    orders: state.order.orders,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    fetchAccountOrders: (isAdmin = false) => dispatch(fetchAccountOrders(isAdmin)),
    fetchProfile: () => dispatch(fetchProfile()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));