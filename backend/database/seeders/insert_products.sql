-- Insert 10 sản phẩm sầu riêng mới chia đều cho 6 danh mục
-- Đảm bảo các danh mục đã tồn tại trước khi chạy script này

INSERT INTO products (sku, name, slug, image_url, image_key, description, quantity, price, weight, ripeness, origin, is_active, category_id, created_at, updated_at) VALUES
-- 1. Sầu Riêng Tươi (Category ID: 1)
('DRFRESH001', 'Sầu Riêng Ri 6 Tươi Chọn Lọc', 'sau-rieng-ri-6-tuoi-chon-loc', NULL, NULL, 'Sầu riêng Ri 6 tươi được chọn lọc kỹ lưỡng từ những quả đẹp nhất, thịt vàng đậm, hạt lép, vị ngọt đậm đà. Được thu hoạch trực tiếp từ vườn tại Đồng Nai, đảm bảo độ tươi ngon và chất lượng cao nhất.', 120, 95000.00, 2.80, 'ripe', 'vietnam', 1, 1, NOW(), NOW()),

-- 2. Sầu Riêng Đông Lạnh (Category ID: 2)
('DRFROZEN001', 'Sầu Riêng Ri 6 Đông Lạnh Cao Cấp', 'sau-rieng-ri-6-dong-lanh-cao-cap', NULL, NULL, 'Sầu riêng Ri 6 được bảo quản đông lạnh theo công nghệ hiện đại, giữ nguyên hương vị và độ ngọt tự nhiên. Thích hợp cho việc chế biến và bảo quản lâu dài.', 90, 110000.00, 2.20, 'ripe', 'vietnam', 1, 2, NOW(), NOW()),

-- 3. Sầu Riêng Chế Biến (Category ID: 3)
('DRPROCESS001', 'Kem Sầu Riêng Ri 6 Đặc Biệt', 'kem-sau-rieng-ri-6-dac-biet', NULL, NULL, 'Kem sầu riêng đặc biệt được làm từ sầu riêng Ri 6 tươi, kết hợp với sữa tươi và đường cát trắng. Hương vị đậm đà, mịn màng, thích hợp cho mọi lứa tuổi.', 180, 55000.00, 0.60, 'ripe', 'vietnam', 1, 3, NOW(), NOW()),

-- 4. Sầu Riêng Ri 6 (Category ID: 4)
('DRRI6001', 'Sầu Riêng Ri 6 Siêu Cao Cấp', 'sau-rieng-ri-6-sieu-cao-cap', NULL, NULL, 'Sầu riêng Ri 6 siêu cao cấp được tuyển chọn kỹ lưỡng từ những quả đẹp nhất, thịt vàng đậm, hạt lép, vị ngọt đậm đà. Đặc biệt thích hợp cho những dịp quan trọng.', 40, 150000.00, 3.50, 'ripe', 'vietnam', 1, 4, NOW(), NOW()),

-- 5. Sầu Riêng Monthong (Category ID: 5)
('DRMONTHONG001', 'Sầu Riêng Monthong Thái Lan Cao Cấp', 'sau-rieng-monthong-thai-lan-cao-cap', NULL, NULL, 'Sầu riêng Monthong cao cấp nhập khẩu trực tiếp từ Thái Lan, thịt vàng nhạt, hạt lép, vị ngọt thanh, ít mùi hăng. Được ưa chuộng bởi những người mới ăn sầu riêng.', 70, 180000.00, 3.20, 'ripe', 'thailand', 1, 5, NOW(), NOW()),

-- 6. Sầu Riêng Musang King (Category ID: 6)
('DRMUSANG001', 'Sầu Riêng Musang King Malaysia Đặc Biệt', 'sau-rieng-musang-king-malaysia-dac-biet', NULL, NULL, 'Sầu riêng Musang King đặc biệt - vua của các loại sầu riêng, nhập khẩu từ Malaysia. Thịt vàng đậm, béo ngậy, hương vị đặc trưng không thể nhầm lẫn. Sản phẩm cao cấp nhất.', 25, 280000.00, 2.50, 'ripe', 'malaysia', 1, 6, NOW(), NOW()),

-- 7. Sầu Riêng Tươi (Category ID: 1) - Thêm sản phẩm thứ 2
('DRFRESH002', 'Sầu Riêng Ri 6 Tươi Hữu Cơ', 'sau-rieng-ri-6-tuoi-huu-co', NULL, NULL, 'Sầu riêng Ri 6 tươi hữu cơ được trồng theo phương pháp tự nhiên, không sử dụng thuốc bảo vệ thực vật. Thịt vàng đậm, mềm mịn, hạt lép, vị ngọt đậm đà.', 85, 120000.00, 2.60, 'ripe', 'vietnam', 1, 1, NOW(), NOW()),

-- 8. Sầu Riêng Chế Biến (Category ID: 3) - Thêm sản phẩm thứ 2
('DRPROCESS002', 'Bánh Sầu Riêng Ri 6 Đặc Biệt', 'banh-sau-rieng-ri-6-dac-biet', NULL, NULL, 'Bánh sầu riêng đặc biệt được làm từ sầu riêng Ri 6 tươi, bột mì cao cấp và trứng gà ta. Bánh mềm xốp, hương vị đậm đà, thích hợp cho bữa sáng hoặc tráng miệng.', 250, 45000.00, 0.40, 'ripe', 'vietnam', 1, 3, NOW(), NOW()),

-- 9. Sầu Riêng Monthong (Category ID: 5) - Thêm sản phẩm thứ 2
('DRMONTHONG002', 'Sầu Riêng Monthong Thái Lan Đông Lạnh', 'sau-rieng-monthong-thai-lan-dong-lanh', NULL, NULL, 'Sầu riêng Monthong được bảo quản đông lạnh theo công nghệ Thái Lan, giữ nguyên hương vị và độ ngọt. Thích hợp cho việc chế biến và bảo quản.', 55, 160000.00, 2.80, 'ripe', 'thailand', 1, 5, NOW(), NOW()),

-- 10. Sầu Riêng Musang King (Category ID: 6) - Thêm sản phẩm thứ 2
('DRMUSANG002', 'Sầu Riêng Musang King Malaysia Siêu Cao Cấp', 'sau-rieng-musang-king-malaysia-sieu-cao-cap', NULL, NULL, 'Sầu riêng Musang King siêu cao cấp được tuyển chọn từ những quả đẹp nhất, thịt vàng đậm, béo ngậy, hương vị đặc trưng. Sản phẩm dành cho những người sành ăn.', 15, 350000.00, 2.30, 'ripe', 'malaysia', 1, 6, NOW(), NOW()); 