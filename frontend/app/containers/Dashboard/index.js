/**
 *
 * Dashboard
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
  FaUser, 
  FaShoppingBag, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaCog, 
  FaSignOutAlt,
  FaHome,
  FaBox,
  FaStar,
  FaHeadset,
  FaBell,
  FaSearch
} from 'react-icons/fa';
import actions from '../../actions';
import { fetchProfile } from '../Account/actions';
import { fetchAccountOrders } from '../Order/actions';

// Dashboard Sidebar Component
const DashboardSidebar = ({ activeTab, onTabChange, user }) => {
  const menuItems = [
    { id: 'overview', label: 'Tổng quan', icon: FaHome, color: '#3B82F6' },
    { id: 'account', label: 'Tài khoản', icon: FaUser, color: '#10B981' },
    { id: 'orders', label: 'Đơn hàng', icon: FaShoppingBag, color: '#F59E0B' },
    { id: 'address', label: 'Địa chỉ', icon: FaMapMarkerAlt, color: '#EF4444' },
    { id: 'products', label: 'Sản phẩm', icon: FaBox, color: '#8B5CF6' },
    { id: 'categories', label: 'Danh mục', icon: FaCog, color: '#06B6D4' },
    { id: 'users', label: 'Người dùng', icon: FaUser, color: '#84CC16' },
    { id: 'reviews', label: 'Đánh giá', icon: FaStar, color: '#F59E0B' },
    { id: 'wishlist', label: 'Yêu thích', icon: FaHeart, color: '#EC4899' },
    { id: 'support', label: 'Hỗ trợ', icon: FaHeadset, color: '#8B5CF6' },
  ];

  return (
    <div style={{
      width: 280,
      background: 'linear-gradient(180deg, #1F2937 0%, #111827 100%)',
      minHeight: '100vh',
      padding: '24px 0',
      boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
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
          color: '#F9FAFB',
          fontSize: 20,
          fontWeight: 700
        }}>
          <span style={{ fontSize: 24 }}>🍈</span>
          <span>Sầu Riêng 5 Tốt</span>
        </div>
        <div style={{ color: '#9CA3AF', fontSize: 14, marginTop: 4 }}>
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
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
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
            <div style={{ color: '#F9FAFB', fontSize: 16, fontWeight: 600 }}>
              {user?.name || 'Người dùng'}
            </div>
            <div style={{ color: '#9CA3AF', fontSize: 14 }}>
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
            <div
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                padding: '12px 24px',
                margin: '4px 0',
                cursor: 'pointer',
                background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderLeft: isActive ? '4px solid #3B82F6' : '4px solid transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = 'rgba(156, 163, 175, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <IconComponent 
                size={20} 
                color={isActive ? '#3B82F6' : '#9CA3AF'} 
              />
              <span style={{
                color: isActive ? '#F9FAFB' : '#9CA3AF',
                fontSize: 16,
                fontWeight: isActive ? 600 : 400
              }}>
                {item.label}
              </span>
            </div>
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
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 8,
            color: '#EF4444',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.1)';
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
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
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
const OverviewTab = ({ user, orders, wishlist }) => {
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
    {
      title: 'Sản phẩm yêu thích',
      value: wishlist?.length || 0,
      icon: FaHeart,
      color: '#EC4899',
      bgColor: '#FDF2F8'
    },
    {
      title: 'Đánh giá đã viết',
      value: 0,
      icon: FaStar,
      color: '#10B981',
      bgColor: '#ECFDF5'
    }
  ];

  return (
    <div style={{ padding: '32px' }}>
      {/* Welcome Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        borderRadius: 16,
        padding: '32px',
        color: '#fff',
        marginBottom: 32
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0' }}>
          Chào mừng trở lại, {user?.name || 'Người dùng'}! 👋
        </h2>
        <p style={{ fontSize: 16, margin: 0, opacity: 0.9 }}>
          Đây là tổng quan về tài khoản của bạn
        </p>
      </div>

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
          <button style={{
            padding: '8px 16px',
            background: '#3B82F6',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer'
          }}>
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
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Gọi API với tham số isAdmin dựa trên role của user
    const isAdmin = user?.role === 'admin';
    fetchAccountOrders(isAdmin);
  }, [user]);

  // Filter orders based on status and search
  const filteredOrders = orders?.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id?.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return { bg: '#FEF3C7', color: '#92400E', text: 'Chờ xử lý' };
      case 'processing': return { bg: '#DBEAFE', color: '#1E40AF', text: 'Đang xử lý' };
      case 'shipped': return { bg: '#FEF3C7', color: '#92400E', text: 'Đã gửi hàng' };
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
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        borderRadius: 16,
        padding: '32px',
        color: '#fff',
        marginBottom: 32
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0' }}>
          Quản lý đơn hàng 📦
        </h2>
        <p style={{ fontSize: 16, margin: 0, opacity: 0.9 }}>
          Theo dõi và quản lý tất cả đơn hàng của bạn
        </p>
      </div>

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

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '10px 16px',
            border: '1px solid #D1D5DB',
            borderRadius: 8,
            fontSize: 14,
            background: '#fff',
            cursor: 'pointer',
            outline: 'none',
            minWidth: 150
          }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="processing">Đang xử lý</option>
          <option value="shipped">Đã gửi hàng</option>
          <option value="delivered">Đã giao hàng</option>
          <option value="cancelled">Đã hủy</option>
        </select>

        {/* Refresh Button */}
        <button
          onClick={() => fetchAccountOrders(user?.role === 'admin')}
          style={{
            padding: '10px 16px',
            background: '#F59E0B',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#D97706'}
          onMouseLeave={(e) => e.target.style.background = '#F59E0B'}
        >
          <span>🔄</span>
          Làm mới
        </button>
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
                  
                  <div>
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
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        borderRadius: 16,
        padding: '32px',
        color: '#fff',
        marginBottom: 32
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0' }}>
          Thông tin tài khoản 👤
        </h2>
        <p style={{ fontSize: 16, margin: 0, opacity: 0.9 }}>
          Quản lý thông tin cá nhân và cài đặt tài khoản
        </p>
      </div>

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

// Address Tab Component
const AddressTab = ({ user }) => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/address', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
        borderRadius: 16,
        padding: '32px',
        color: '#fff',
        marginBottom: 32
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0' }}>
          Quản lý địa chỉ 📍
        </h2>
        <p style={{ fontSize: 16, margin: 0, opacity: 0.9 }}>
          Thêm và quản lý địa chỉ giao hàng của bạn
        </p>
      </div>

      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>⏳</div>
          Đang tải dữ liệu...
        </div>
      ) : addresses.length > 0 ? (
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
              <div>Địa chỉ</div>
              <div>Mặc định</div>
              <div>Thao tác</div>
            </div>
          </div>
          
          <div>
            {addresses.map((address, index) => (
              <div key={address.id} style={{
                padding: '20px 24px',
                borderBottom: index < addresses.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
                gap: 16,
                alignItems: 'center'
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>
                  #{address.id}
                </div>
                
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                    {address.full_name}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                    {address.phone}
                  </div>
                </div>
                
                <div style={{ fontSize: 14, color: '#374151' }}>
                  <div>{address.address1}</div>
                  {address.address2 && (
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                      {address.address2}
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                    {address.ward}, {address.district}, {address.city}
                  </div>
                </div>
                
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 500,
                    background: address.is_default ? '#D1FAE5' : '#F3F4F6',
                    color: address.is_default ? '#065F46' : '#6B7280'
                  }}>
                    {address.is_default ? 'Mặc định' : 'Không'}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{
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
                  <button style={{
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
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📍</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Chưa có địa chỉ nào
          </div>
          <div style={{ fontSize: 14 }}>
            Thêm địa chỉ đầu tiên để thuận tiện cho việc giao hàng
          </div>
        </div>
      )}
    </div>
  );
};

// Wishlist Tab Component
const WishlistTab = ({ wishlist }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setWishlistItems(data.wishlist || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
        borderRadius: 16,
        padding: '32px',
        color: '#fff',
        marginBottom: 32
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0' }}>
          Danh sách yêu thích ❤️
        </h2>
        <p style={{ fontSize: 16, margin: 0, opacity: 0.9 }}>
          Quản lý các sản phẩm bạn đã yêu thích
        </p>
      </div>

      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>⏳</div>
          Đang tải dữ liệu...
        </div>
      ) : wishlistItems.length > 0 ? (
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
              <div>Sản phẩm</div>
              <div>Giá</div>
              <div>Ngày thêm</div>
              <div>Thao tác</div>
            </div>
          </div>
          
          <div>
            {wishlistItems.map((item, index) => (
              <div key={item.id} style={{
                padding: '20px 24px',
                borderBottom: index < wishlistItems.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
                gap: 16,
                alignItems: 'center'
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>
                  #{item.id}
                </div>
                
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                    {item.product?.name || 'Sản phẩm không tồn tại'}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                    {item.product?.category?.name || 'Chưa phân loại'}
                  </div>
                </div>
                
                <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                  {formatCurrency(item.product?.price || 0)}
                </div>
                
                <div style={{ fontSize: 14, color: '#374151' }}>
                  {new Date(item.created_at).toLocaleDateString('vi-VN')}
                </div>
                
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{
                    padding: '6px 12px',
                    background: '#10B981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#059669'}
                  onMouseLeave={(e) => e.target.style.background = '#10B981'}
                  >
                    Thêm vào giỏ
                  </button>
                  <button style={{
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
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Chưa có sản phẩm yêu thích
          </div>
          <div style={{ fontSize: 14 }}>
            Khám phá sản phẩm và thêm vào danh sách yêu thích!
          </div>
        </div>
      )}
    </div>
  );
};

// Support Tab Component
const SupportTab = () => {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        borderRadius: 16,
        padding: '32px',
        color: '#fff',
        marginBottom: 32
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0' }}>
          Hỗ trợ khách hàng 🎧
        </h2>
        <p style={{ fontSize: 16, margin: 0, opacity: 0.9 }}>
          Liên hệ với chúng tôi để được hỗ trợ nhanh chóng
        </p>
      </div>

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
    // Lấy user từ Redux store thay vì localStorage
    console.log('User from Redux:', user);
    console.log('User role:', user?.role);
    setIsAdmin(user?.role === 'admin');
    console.log('Is admin:', user?.role === 'admin');
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
      <div style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        borderRadius: 16,
        padding: '32px',
        color: '#fff',
        marginBottom: 32
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0' }}>
          Quản lý sản phẩm 📦
        </h2>
        <p style={{ fontSize: 16, margin: 0, opacity: 0.9 }}>
          Thêm, chỉnh sửa và quản lý tất cả sản phẩm
        </p>
      </div>

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

// Reviews Tab Component
const ReviewsTab = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/reviews', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews?.data || data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        borderRadius: 16,
        padding: '32px',
        color: '#fff',
        marginBottom: 32
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0' }}>
          Quản lý đánh giá ⭐
        </h2>
        <p style={{ fontSize: 16, margin: 0, opacity: 0.9 }}>
          Xem và quản lý tất cả đánh giá của khách hàng
        </p>
      </div>

      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>⏳</div>
          Đang tải dữ liệu...
        </div>
      ) : reviews.length > 0 ? (
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
              <div>Sản phẩm</div>
              <div>Đánh giá</div>
              <div>Trạng thái</div>
            </div>
          </div>
          
          <div>
            {reviews.map((review, index) => (
              <div key={review.id} style={{
                padding: '20px 24px',
                borderBottom: index < reviews.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
                gap: 16,
                alignItems: 'center'
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>
                  #{review.id}
                </div>
                
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
                    {review.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                    {review.user?.name || 'Khách hàng'}
                  </div>
                </div>
                
                <div style={{ fontSize: 14, color: '#374151' }}>
                  {review.product?.name || 'Sản phẩm không tồn tại'}
                </div>
                
                <div>
                  <div style={{ fontSize: 14, color: '#374151', marginBottom: 4 }}>
                    {renderStars(review.rating)}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>
                    {review.rating}/5
                  </div>
                </div>
                
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 500,
                    background: review.is_active ? '#D1FAE5' : '#FEE2E2',
                    color: review.is_active ? '#065F46' : '#991B1B'
                  }}>
                    {review.is_active ? 'Hiển thị' : 'Ẩn'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Chưa có đánh giá nào
          </div>
          <div style={{ fontSize: 14 }}>
            Chưa có đánh giá nào trong hệ thống
          </div>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = (props) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userLoaded, setUserLoaded] = useState(false);
  const { user, orders, wishlist, fetchAccountOrders } = props;

  useEffect(() => {
    // Gọi API khi component mount
    fetchAccountOrders();
    
    // Fetch user profile nếu có token (để đảm bảo user data được load sau reload)
    if (localStorage.getItem('token')) {
      fetchUserProfile();
    }
  }, []); // Bỏ user khỏi dependency để tránh infinite loop

  // Thêm useEffect để log user data khi thay đổi
  useEffect(() => {
    if (user) {
      console.log('User data loaded:', user);
      console.log('User role:', user.role);
      console.log('Is admin:', user.role === 'admin');
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
      case 'address':
        // Gọi API để lấy danh sách địa chỉ
        fetch('http://localhost:3000/api/address', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).catch(error => console.error('Error fetching addresses:', error));
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
      case 'reviews':
        // Gọi API để lấy danh sách đánh giá
        fetch('http://localhost:3000/api/reviews', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).catch(error => console.error('Error fetching reviews:', error));
        break;
      case 'wishlist':
        // Gọi API để lấy danh sách yêu thích
        fetch('http://localhost:3000/api/wishlist', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).catch(error => console.error('Error fetching wishlist:', error));
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
    
    switch (activeTab) {
      case 'overview':
        return <OverviewTab key="overview" user={user} orders={orders} wishlist={wishlist} />;
      case 'account':
        return <AccountTab key="account" user={user} />;
      case 'orders':
        return <OrdersTab key="orders" orders={orders} isLoading={false} fetchAccountOrders={fetchAccountOrders} user={user} history={props.history} />;
      case 'address':
        return <AddressTab key="address" user={user} />;
      case 'products':
        return <ProductsTab key={`products-${userKey}`} user={user} />;
      case 'categories':
        return <CategoriesTab key={`categories-${userKey}`} user={user} />;
      case 'users':
        return <UsersTab key={`users-${userKey}`} user={user} />;
      case 'sellers':
        return <SellersTab key="sellers" />;
      case 'reviews':
        return <ReviewsTab key="reviews" />;
      case 'wishlist':
        return <WishlistTab key="wishlist" wishlist={wishlist} />;
      case 'support':
        return <SupportTab key="support" />;
      default:
        return <OverviewTab key="overview-default" user={user} orders={orders} wishlist={wishlist} />;
    }
  };

  const getTabTitle = () => {
    const titles = {
      overview: 'Tổng quan',
      account: 'Tài khoản',
      orders: 'Đơn hàng',
      address: 'Địa chỉ',
      products: 'Sản phẩm',
      categories: 'Danh mục',
      users: 'Người dùng',
      reviews: 'Đánh giá',
      wishlist: 'Yêu thích',
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
    wishlist: state.wishlist.wishlist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    fetchAccountOrders: (isAdmin = false) => dispatch(fetchAccountOrders(isAdmin)),
    fetchProfile: () => dispatch(fetchProfile())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));