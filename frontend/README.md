# Sầu Riêng Việt - Frontend

Giao diện hiện đại cho website bán sầu riêng, được xây dựng bằng React và sử dụng API từ backend.

## 🚀 Tính năng

- **Giao diện hiện đại**: Thiết kế responsive với animations và hover effects
- **Navigation thông minh**: Search autocomplete, user menu, cart sidebar
- **Homepage đẹp mắt**: Hero section, features, categories, products showcase
- **Footer chuyên nghiệp**: Thông tin liên hệ, social links, newsletter
- **Tương thích mobile**: Responsive design cho mọi thiết bị

## 🛠️ Công nghệ sử dụng

- **React 16.8.6** - Frontend framework
- **Redux** - State management
- **Reactstrap** - UI components
- **React Icons** - Icon library
- **SASS** - CSS preprocessor
- **Webpack** - Module bundler
- **Yarn** - Package manager

## 📦 Cài đặt

1. **Cài đặt dependencies**:
   ```bash
   yarn install
   ```

2. **Chạy development server**:
   ```bash
   yarn dev
   ```

3. **Build cho production**:
   ```bash
   yarn build
   ```

## 🌐 Truy cập

- **Development**: http://localhost:8000
- **API Backend**: http://localhost:3000/api

## 📁 Cấu trúc thư mục

```
frontend/
├── app/
│   ├── components/          # Reusable components
│   ├── containers/          # Page components
│   ├── styles/             # SCSS styles
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── webpack/               # Webpack configuration
└── package.json           # Dependencies
```

## 🎨 Giao diện mới

### Homepage
- **Hero Section**: Carousel với banners và call-to-action
- **Features Section**: 3 điểm nổi bật với icons
- **Categories Section**: Hiển thị danh mục sản phẩm
- **Products Section**: Sản phẩm nổi bật với hover effects
- **CTA Section**: Kêu gọi đặt hàng

### Navigation
- **Header Info**: Thông tin liên hệ và dịch vụ
- **Search Bar**: Tìm kiếm với autocomplete
- **User Actions**: Wishlist, cart, user menu
- **Mobile Responsive**: Menu toggle cho mobile

### Footer
- **Features**: 4 điểm nổi bật của dịch vụ
- **Main Footer**: Thông tin công ty và links
- **Social Links**: Kết nối mạng xã hội
- **Copyright**: Thông tin bản quyền

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env` trong thư mục frontend:
```
API_URL=http://localhost:3000/api
APP_URL=http://localhost:8000
```

### API Endpoints
Frontend sử dụng các API endpoints từ backend:
- `/api/products` - Lấy danh sách sản phẩm
- `/api/categories` - Lấy danh mục
- `/api/auth` - Authentication
- `/api/cart` - Giỏ hàng
- `/api/orders` - Đơn hàng

## 🎯 Tính năng chính

1. **Responsive Design**: Hoạt động tốt trên desktop, tablet, mobile
2. **Modern UI/UX**: Animations, transitions, hover effects
3. **Search Functionality**: Autocomplete với suggestions
4. **User Authentication**: Login, register, user profile
5. **Shopping Cart**: Add/remove items, checkout
6. **Product Management**: Browse, filter, view details
7. **Order Management**: Track orders, order history

## 🚀 Deployment

### Build Production
```bash
yarn build
```

### Serve Static Files
Sử dụng nginx hoặc Apache để serve files từ thư mục `dist/`

### Docker (Optional)
```bash
docker build -t saurieng-frontend .
docker run -p 8000:80 saurieng-frontend
```

## 📝 Changelog

### Version 1.0.0
- ✅ Tạo giao diện hoàn toàn mới
- ✅ Responsive design
- ✅ Modern navigation
- ✅ Beautiful homepage
- ✅ Professional footer
- ✅ Search autocomplete
- ✅ User authentication UI
- ✅ Shopping cart interface

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

© 2024 Sầu Riêng Việt. All Rights Reserved.

---

**Made with ❤️ in Vietnam** 