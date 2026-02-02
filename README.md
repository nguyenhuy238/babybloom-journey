# BabyBloom Journey - Full Onboarding Guide 🚀

Dự án **BabyBloom Journey** sử dụng kiến trúc **Clean Architecture** (.NET 9) kết hợp với **React (Vite)**. Hướng dẫn này được thiết kế để một thành viên mới có thể tự cài đặt và bắt đầu phát triển trong vòng 30 phút.

---

## 📋 Giai đoạn 1: Chuẩn bị Môi trường (Prerequisites)

Bạn **PHẢI** cài đặt các công cụ sau trước khi làm bất cứ điều gì khác.

### 1. Danh sách phần mềm:
| Công cụ | Phiên bản | Link tải | Lệnh kiểm tra |
| :--- | :--- | :--- | :--- |
| **.NET SDK** | 9.0.x | [Download](https://dotnet.microsoft.com/download/dotnet/9.0) | `dotnet --version` |
| **Node.js** | 18.x hoặc 20.x | [Download](https://nodejs.org/) | `node -v` |
| **Docker Desktop** | Mới nhất | [Download](https://www.docker.com/products/docker-desktop/) | `docker --version` |
| **Git** | Mới nhất | [Download](https://git-scm.com/) | `git --version` |

### 2. Cài đặt Entity Framework CLI:
Mở Terminal (PowerShell hoặc CMD) và chạy:
```sh
dotnet tool install --global dotnet-ef
```
*Kiểm tra:* Chạy `dotnet ef`. Nếu thấy hình con cá voi bằng chữ là thành công.

---

## 📂 Giai đoạn 2: Thiết lập Project

### Bước 1: Clone Source Code
```sh
git clone [URL_CỦA_REPO]
cd babybloom-journey
```

### Bước 2: Cấu hình Biến môi trường (.env)
Đây là bước quan trọng nhất. Nếu sai, Database sẽ không kết nối được.
1. Tại thư mục gốc, copy file mẫu:
   ```sh
   cp .env.example .env
   ```
2. Mở file `.env` bằng VS Code và chỉnh sửa:
   - `POSTGRES_PASSWORD`: Đặt một mật khẩu dễ nhớ (VD: `Admin123`).
   - `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`: Lấy từ Lead team.
   - `DatabaseProvider`: Phải để là `"Postgres"`.
   - `ConnectionStrings__PostgresConnection`: Đảm bảo mật khẩu ở đây khớp với `POSTGRES_PASSWORD` bên dưới.

---

## ⚡ Giai đoạn 3: Khởi động (Lựa chọn 1 trong 2)

### Cách 1: Sử dụng Docker (Khuyên dùng cho lần đầu)
Cách này sẽ tự động cài Database và chạy toàn bộ App mà không cần config nhiều.
1. Mở Docker Desktop.
2. Tại thư mục gốc chạy:
   ```sh
   docker-compose up -d --build
   ```
3. **Kiểm tra kết quả:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend Swagger: [http://localhost:5000/swagger](http://localhost:5000/swagger)

---

### Cách 2: Chạy Local (Cho việc phát triển/Debug hàng ngày)
Cách này giúp bạn code và thấy thay đổi ngay lập tức (Hot Reload).

#### Phân đoạn A: Chạy Database (Postgres)
Nếu bạn không cài Postgres vào máy, hãy dùng Docker để chạy một database "ảo":
```sh
docker run --name babyfirst-db -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres
```

#### Phân đoạn B: Chạy Backend
1. Di chuyển vào thư mục backend: `cd backend`
2. Restore thư viện: `dotnet restore`
3. Cập nhật Database (Tạo bảng):
   ```sh
   dotnet ef database update --project src/BabyFirst.Infrastructure --startup-project src/BabyFirst.Api
   ```
4. Chạy API:
   ```sh
   dotnet run --project src/BabyFirst.Api
   ```
   *Lưu ý:* API sẽ chạy tại [http://localhost:5000](http://localhost:5000).

#### Phân đoạn C: Chạy Frontend
1. Mở một Terminal mới (tại thư mục gốc dự án).
2. Cài đặt thư viện: `npm install`
3. Chạy App: `npm run dev`
   *Lưu ý:* Web sẽ chạy tại [http://localhost:3000](http://localhost:3000).

---

## � Quy trình Phát triển chuẩn cho Team

### 1. Luồng làm việc với Git:
- **KHÔNG** push trực tiếp lên `main`.
- Luôn tạo branch mới: `git checkout -b feat/ten-chuc-nang`.
- Sau khi xong, hãy `git push origin feat/ten-chuc-nang` và tạo Pull Request trên GitHub.

### 2. Khi bạn thay đổi Database (Tạo thêm bảng/cột):
1. Chỉnh sửa file trong `src/BabyFirst.Domain`.
2. Mở Terminal tại `/backend`.
3. Tạo file Migration:
   ```sh
   dotnet ef migrations add [Ten_Migration] --project src/BabyFirst.Infrastructure --startup-project src/BabyFirst.Api
   ```
4. Cập nhật database: `dotnet ef database update ...` (như bước trên).

### 3. Khi Pull code mới có Migration:
Nếu bạn pull code từ team member khác và thấy có migration mới trong `backend/src/BabyFirst.Infrastructure/Migrations/`, bạn **PHẢI** cập nhật database:

#### 🐳 Nếu đang dùng Docker:
```sh
docker-compose down
docker-compose up -d --build
```
Migrations sẽ tự động apply khi container khởi động.

#### 💻 Nếu đang chạy Local:
```sh
cd backend
dotnet ef database update --project src/BabyFirst.Infrastructure --startup-project src/BabyFirst.Api
```

#### 🔍 Kiểm tra migrations đã apply:
```sh
dotnet ef migrations list --project src/BabyFirst.Infrastructure --startup-project src/BabyFirst.Api
```

**Lưu ý:** Nếu gặp lỗi migration conflict, **KHÔNG** tự ý xóa database. Hãy liên hệ Lead team!

---

## ❓ Xử lý lỗi thường gặp (Troubleshooting)

- **Lỗi kết nối Postgres:** Kiểm tra xem Docker đã bật chưa, hoặc port `5432` có bị ứng dụng khác chiếm dụng không.
- **Lỗi `dotnet ef` không nhận lệnh:** Đảm bảo bạn đã chạy lệnh cài đặt global ở Giai đoạn 1 và đã khởi động lại Terminal.
- **Lỗi trắng trang Frontend:** Kiểm tra file `.env` xem đã điền đủ các key của Supabase chưa.
- **Lỗi `Permission Denied` (Mac/Linux):** Thêm `sudo` trước các lệnh cài đặt.

---
**Cần hỗ trợ gấp?** Nhắn tin trực tiếp lên nhóm chat của team để được Lead hỗ trợ! 🚀

