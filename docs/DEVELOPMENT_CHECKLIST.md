# CHECKLIST CHI TIẾT THEO TRÌNH TỰ PHÁT TRIỂN - BABYBLOOM JOURNEY

Tài liệu này đóng vai trò là Lộ trình (Roadmap) và Danh mục kiểm tra (Checklist) cho quá trình phát triển hệ thống BabyBloom Journey.

---

## GIAI ĐOẠN 1: PHÂN TÍCH & THIẾT KẾ (BẮT BUỘC)

### 1.1. Phân tích nghiệp vụ
- [ ] **Xác định nhóm người dùng:**
    - `Guest`: Khách vãng lai, xem thông tin công khai.
    - `Parent` (Phụ huynh): Nhóm người dùng chính, quản lý hồ sơ bé và học tập.
    - `Expert` (Chuyên gia): Người tạo nội dung hoặc tư vấn.
    - `Admin`: Quản trị viên hệ thống.
- [ ] **Xác định phạm vi MVP:**
    - **WEB:** Landing page + Học thử + Tin tức/Blog.
    - **APP:** Onboarding + Bài học cá nhân hóa + Quản lý tiến trình.
- [ ] **Xác định dữ liệu cốt lõi:**
    - `User`: Thông tin tài khoản, phân quyền.
    - `Baby Profile`: Thông tin bé (ngày sinh, mục tiêu phát triển).
    - `Course/Lesson`: Cấu trúc nội dung học tập.
    - `Video/Asset`: Tài nguyên đa phương tiện.
    - `Progress`: Theo dõi việc hoàn thành bài học.
    - `Affiliate`: Sản phẩm gợi ý kèm link tiếp thị liên kết.

### 1.2. Thiết kế hệ thống
- [ ] Thiết kế kiến trúc tổng thể (Web – App – API – DB).
- [ ] Thiết kế Database (ERD).
- [ ] Thiết kế luồng người dùng (User Flow Diagram).
- [ ] Thiết kế phân quyền (Role-based access control - RBAC).

> **📌 Output:** Sơ đồ kiến trúc, ERD, User Flow Diagram.

---

## GIAI ĐOẠN 2: NỀN TẢNG KỸ THUẬT (CORE TECH)

### 2.1. Backend (API) - .NET Clean Architecture
*Tham khảo kiến trúc mẫu:* [Jason Taylor's Clean Architecture](https://github.com/jasontaylordev/CleanArchitecture.git)

- [ ] **Xây dựng API Gateway / Base Project Structure:**
    - `Domain`: Entities, Exceptions, Value Objects.
    - `Application`: Interfaces, Models, Logic, Validators, CQRS (MediatR).
    - `Infrastructure`: Data Access (EF Core), File Storage, Email Service.
    - `WebAPI`: Controllers, Middlewares, Open API (Swagger).
- [ ] **Xác thực người dùng (Auth):**
    - [ ] Hỗ trợ Đăng ký / Đăng nhập.
    - [ ] Cơ chế Identity: JWT, Refresh Token.
- [ ] **Quản lý người dùng:** CRUD, Vô hiệu hoá tài khoản.
- [ ] **Quản lý hồ sơ bé:**
    - Nhập liệu: Ngày sinh, Tháng tuổi (tự động tính).
    - Thiết lập mục tiêu phát triển định kỳ.

### 2.2. Database (SQL Server)
- [ ] `Users`: Lưu thông tin tài khoản, mật khẩu băm.
- [ ] `Babies`: Thông tin chi tiết về từng bé liên kết với User.
- [ ] `Courses` & `Lessons`: Danh sách sản phẩm giáo dục và nội dung cụ thể.
- [ ] `Videos`: Metadata của video bài giảng.
- [ ] `Progress`: Ghi nhận tiến trình học (LessonId, BabyId, Status).
- [ ] `AffiliateProducts`: Sản phẩm thương mại liên kết.
- [ ] `Logs`: Nhật ký hệ thống và audit trail.

### 2.3. Frontend Nền tảng
- [ ] Khởi tạo project Web (Vite/React).
- [ ] Khởi tạo project App (React Native/Expo hoặc Flutter).
- [ ] Thiết lập Routing / State Management (Zustand/Redux).
- [ ] Cấu hình Axios/Fetch kết nối API.

---

## GIAI ĐOẠN 3: CHỨC NĂNG WEB (PUBLIC + CHUYỂN ĐỔI)

### 3.1. Trang Chủ (Landing Page)
- [ ] Hero section chuyên nghiệp.
- [ ] CTA (Call to Action) dẫn dắt học thử.
- [ ] Các section giới thiệu giá trị cốt lõi (01–05).
- [ ] Responsive tối ưu cho Mobile.

### 3.2. Giới thiệu (About Us)
- [ ] Nội dung giới thiệu đội ngũ.
- [ ] Tầm nhìn – Sứ mệnh.

### 3.3. Khoá học thử miễn phí
- [ ] Hiển thị danh sách bài học giới hạn.
- [ ] Lead Magnet: Form đăng ký để xem tiếp nội dung.

### 3.4. Hệ thống Tin tức & Affiliate
- [ ] Tin tức: Phân loại, tìm kiếm, lọc bài viết.
- [ ] Affiliate: Gợi ý sản phẩm thông minh theo độ tuổi của bé.

---

## GIAI ĐOẠN 4: CHỨC NĂNG APP (CORE VALUE)

### 4.1. Onboarding & Dashboard
- [ ] Luồng nhập thông tin ban đầu cho bé.
- [ ] Dashboard: Hiển thị "Bài học hôm nay" dựa trên tuổi bé.

### 4.2. Bài học (Lesson Content)
- [ ] Trình phát Video bài học.
- [ ] Hướng dẫn hoạt động thực tế (chơi cùng bé).
- [ ] Gợi ý đồ chơi/dụng cụ cần thiết.

### 4.3. Cá nhân hóa & Theo dõi
- [ ] Thuật toán lọc nội dung theo mục tiêu & độ tuổi.
- [ ] Checklist kỹ năng bé đạt được sau mỗi bài học.

---

## GIAI ĐOẠN 5: BẢO MẬT – AN TOÀN DỮ LIỆU

### 5.1. Bảo mật hệ thống
- [ ] HTTPS toàn hệ thống.
- [ ] Token-based security (JWT + Refresh).
- [ ] Hash mật khẩu bằng thuật toán mạnh (BCrypt/Argon2).

### 5.2. Bảo vệ dữ liệu trẻ em (CRITICAL)
- [ ] Mã hóa thông tin nhạy cảm.
- [ ] Chính sách "Right to be Forgotten" (Xóa dữ liệu theo yêu cầu).
- [ ] Không leak dữ liệu bé ra các API công khai.

---

## GIAI ĐOẠN 6: LOGGING – MONITORING – AUDIT
- [ ] **Logging:** Sử dụng Serilog/ELK Stack để log lỗi và hành vi.
- [ ] **Monitoring:** Theo dõi Performance và Uptime của API.
- [ ] **Audit Trail:** Lưu vết thay đổi dữ liệu (Ai sửa? Sửa lúc nào? Giá trị cũ/mới).

---

## GIAI ĐOẠN 7: MỞ RỘNG (AI & AFFILIATE)
- [ ] AI Content: Gợi ý kịch bản, hoạt động dựa trên dữ liệu hành vi.
- [ ] Advanced Affiliate: Tracking click-through rate (CTR) và chuyển đổi.

---

## GIAI ĐOẠN 8: KIỂM THỬ – TRIỂN KHAI
- [ ] Unit Test & Integration Test (Backend).
- [ ] User Acceptance Test (UAT) với nhóm phụ huynh mục tiêu.
- [ ] CI/CD Pipeline để deploy tự động lên Web/App Store.

---

## ✅ CHECKLIST TÓM TẮT CHO TEAM
- [ ] Có phân quyền (RBAC).
- [ ] Bảo mật dữ liệu trẻ em đạt chuẩn.
- [ ] Cá nhân hóa nội dung theo tuổi bé.
- [ ] Hệ thống log và bắt lỗi đầy đủ.
- [ ] CTA chuyển đổi rõ ràng trên Web.
- [ ] Kế hoạch mở rộng AI & Affiliate sẵn sàng.
