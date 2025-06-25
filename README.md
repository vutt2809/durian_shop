# Durian Shop - Website Bán Sầu Riêng Online

Dự án website bán sầu riêng online với backend Laravel và frontend React.

## Cấu trúc dự án

```
durian_shop/
├── backend/          # Backend Laravel API
├── frontend/         # Frontend React
└── README.md
```

## Yêu cầu hệ thống

- PHP >= 8.1
- Composer
- Node.js >= 14
- MySQL/PostgreSQL
- Laravel Sail (tùy chọn)

## Cài đặt và chạy dự án

### Backend (Laravel)

1. **Cài đặt dependencies:**
```bash
cd backend
composer install
```

2. **Cấu hình môi trường:**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Cấu hình database trong file .env:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=durian_shop
DB_USERNAME=root
DB_PASSWORD=
```

4. **Chạy migrations và seeders:**
```bash
php artisan migrate
php artisan db:seed
```

5. **Tạo symbolic link cho storage:**
```bash
php artisan storage:link
```

6. **Chạy server:**
```bash
php artisan serve
```

Backend sẽ chạy tại: http://localhost:8000

### Frontend (React)

1. **Cài đặt dependencies:**
```bash
cd frontend
npm install
```

2. **Chạy development server:**
```bash
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

## Tính năng chính

### Backend (Laravel API)

- **Authentication:** Đăng ký, đăng nhập, quên mật khẩu
- **Products:** Quản lý sản phẩm sầu riêng với các thông tin:
  - Tên sản phẩm
  - Mô tả
  - Giá
  - Số lượng
  - Trọng lượng
  - Độ chín (Chín/Chưa chín)
  - Xuất xứ (Việt Nam, Thái Lan, Malaysia, Indonesia)
  - Danh mục
- **Categories:** Quản lý danh mục sản phẩm
- **Orders:** Quản lý đơn hàng
- **Cart:** Giỏ hàng
- **Wishlist:** Danh sách yêu thích
- **Reviews:** Đánh giá sản phẩm
- **User Management:** Quản lý người dùng

### Frontend (React)

- **Responsive Design:** Giao diện thân thiện với mobile
- **Product Catalog:** Hiển thị danh sách sản phẩm sầu riêng
- **Product Details:** Chi tiết sản phẩm với thông tin đầy đủ
- **Shopping Cart:** Giỏ hàng và thanh toán
- **User Dashboard:** Quản lý tài khoản, đơn hàng
- **Admin Panel:** Quản lý sản phẩm, danh mục, đơn hàng
- **Search & Filter:** Tìm kiếm và lọc sản phẩm

## Dữ liệu mẫu

Dự án đã được seed với dữ liệu mẫu bao gồm:

### Categories (Danh mục)
- Sầu Riêng Tươi
- Sầu Riêng Đông Lạnh
- Sầu Riêng Chế Biến
- Sầu Riêng Ri 6
- Sầu Riêng Monthong
- Sầu Riêng Musang King

### Products (Sản phẩm)
- Sầu Riêng Ri 6 Tươi (85,000 VNĐ/kg)
- Sầu Riêng Monthong Thái Lan (120,000 VNĐ/kg)
- Sầu Riêng Musang King Malaysia (180,000 VNĐ/kg)
- Sầu Riêng Ri 6 Đông Lạnh (95,000 VNĐ/kg)
- Kem Sầu Riêng (45,000 VNĐ/hộp)
- Bánh Sầu Riêng (35,000 VNĐ/cái)

## API Endpoints

### Public Routes
- `GET /api/category` - Lấy danh sách danh mục
- `GET /api/product` - Lấy danh sách sản phẩm
- `GET /api/product/{slug}` - Lấy chi tiết sản phẩm
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký

### Protected Routes
- `GET /api/cart` - Giỏ hàng
- `POST /api/cart` - Thêm vào giỏ hàng
- `GET /api/order` - Danh sách đơn hàng
- `POST /api/order` - Tạo đơn hàng
- `GET /api/wishlist` - Danh sách yêu thích

## Công nghệ sử dụng

### Backend
- Laravel 10
- Laravel Sanctum (Authentication)
- MySQL/PostgreSQL
- Laravel Eloquent ORM

### Frontend
- React 18
- Redux (State Management)
- React Router (Routing)
- Axios (HTTP Client)
- Bootstrap 4 (UI Framework)

## Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Dự án này được phát hành dưới MIT License.

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
