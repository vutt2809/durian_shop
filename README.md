# Sầu Riêng Online - Website Bán Sầu Riêng

Website bán sầu riêng online được xây dựng với Laravel (Backend) và React (Frontend).

## Tính năng chính

### Cho khách hàng:
- Đăng ký/Đăng nhập tài khoản
- Xem danh sách sầu riêng theo danh mục
- Tìm kiếm sầu riêng
- Thêm sản phẩm vào giỏ hàng
- Quản lý địa chỉ giao hàng
- Đặt hàng và thanh toán
- Xem lịch sử đơn hàng
- Đánh giá sản phẩm
- Danh sách yêu thích

### Cho admin:
- Quản lý danh mục sầu riêng
- Quản lý sản phẩm sầu riêng
- Quản lý đơn hàng
- Quản lý người dùng
- Quản lý đánh giá

## Cấu trúc Database

### Các bảng chính:
- `users` - Người dùng (admin, customer)
- `categories` - Danh mục sầu riêng
- `products` - Sản phẩm sầu riêng
- `user_addresses` - Địa chỉ người dùng
- `shopping_carts` - Giỏ hàng
- `orders` - Đơn hàng
- `order_details` - Chi tiết đơn hàng
- `reviews` - Đánh giá sản phẩm
- `wishlists` - Danh sách yêu thích

### Các trường đặc biệt cho sầu riêng:
- `weight` - Trọng lượng (kg)
- `ripeness` - Độ chín (unripe, ripe, overripe)
- `origin` - Xuất xứ (vietnam, thailand, malaysia, indonesia)

## Cài đặt và chạy dự án

### Backend (Laravel)

1. Cài đặt dependencies:
```bash
cd backend
composer install
```

2. Cấu hình môi trường:
```bash
cp .env.example .env
# Cập nhật thông tin database trong .env
```

3. Tạo key ứng dụng:
```bash
php artisan key:generate
```

4. Chạy migration và seeder:
```bash
php artisan migrate
php artisan db:seed
```

5. Chạy server:
```bash
php artisan serve
```

### Frontend (React)

1. Cài đặt dependencies:
```bash
cd client
yarn install
```

2. Chạy development server:
```bash
yarn dev
```

3. Build production:
```bash
yarn build
```

## Dữ liệu mẫu

Dự án đã được seed với:
- 6 danh mục sầu riêng (Ri 6, Monthong, Musang King, v.v.)
- 8 sản phẩm sầu riêng mẫu
- Các trạng thái đơn hàng và thanh toán

## API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/{id}` - Lấy chi tiết sản phẩm
- `GET /api/categories` - Lấy danh mục

### Cart
- `GET /api/cart` - Lấy giỏ hàng
- `POST /api/cart` - Thêm vào giỏ hàng
- `PUT /api/cart/{id}` - Cập nhật giỏ hàng
- `DELETE /api/cart/{id}` - Xóa khỏi giỏ hàng

### Orders
- `GET /api/orders` - Lấy danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `GET /api/orders/{id}` - Lấy chi tiết đơn hàng

## Công nghệ sử dụng

### Backend:
- Laravel 10
- MySQL/PostgreSQL
- Laravel Sanctum (Authentication)
- Laravel Eloquent ORM

### Frontend:
- React 16
- Redux
- React Router
- Bootstrap 4
- Axios

## Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## License

Dự án này được phân phối dưới MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Description

An ecommerce store built with MERN stack, and utilizes third party API's. This ecommerce store enable three main different flows or implementations:

1. Buyers browse the store categories, products and brands
2. Sellers or Merchants manage their own brand component
3. Admins manage and control the entire store components 

### Features:

  * Node provides the backend environment for this application
  * Express middleware is used to handle requests, routes
  * Mongoose schemas to model the application data
  * React for displaying UI components
  * Redux to manage application's state
  * Redux Thunk middleware to handle asynchronous redux actions

## Demo

This application is deployed on Vercel Please check it out :smile: [here](https://mern-store-gold.vercel.app).

See admin dashboard [demo](https://mernstore-bucket.s3.us-east-2.amazonaws.com/admin.mp4)

## Docker Guide

To run this project locally you can use docker compose provided in the repository. Here is a guide on how to run this project locally using docker compose.

Clone the repository
```
git clone https://github.com/mohamedsamara/mern-ecommerce.git
```

Edit the dockercompose.yml file and update the the values for MONGO_URI and JWT_SECRET

Then simply start the docker compose:

```
docker-compose build
docker-compose up
```

## Database Seed

* The seed command will create an admin user in the database
* The email and password are passed with the command as arguments
* Like below command, replace brackets with email and password. 
* For more information, see code [here](server/utils/seed.js)

```
npm run seed:db [email-***@****.com] [password-******] // This is just an example.
```

## Install

`npm install` in the project root will install dependencies in both `client` and `server`. [See package.json](package.json)

Some basic Git commands are:

```
git clone https://github.com/mohamedsamara/mern-ecommerce.git
cd project
npm install
```

## ENV

Create `.env` file for both client and server. See examples:

[Frontend ENV](client/.env.example)

[Backend ENV](server/.env.example)


## Vercel Deployment

Both frontend and backend are deployed on Vercel from the same repository. When deploying on Vercel, make sure to specifiy the root directory as `client` and `server` when importing the repository. See [client vercel.json](client/vercel.json) and [server vercel.json](server/vercel.json).

## Start development

```
npm run dev
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Webpack](https://webpack.js.org/)



php artisan serve --host=0.0.0.0 --port=3000
