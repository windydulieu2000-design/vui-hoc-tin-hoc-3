# Vui học Tin học 3 – Thế giới Robot Pastel

Ứng dụng React + Vite phục vụ học sinh lớp 3, nội dung theo cấu trúc 16 bài, 6 chủ đề của **Tin học 3 – Kết nối tri thức với cuộc sống**. Kiến thức và câu hỏi là nội dung biên soạn mới, cần giáo viên rà soát với SGK đang sử dụng trước khi đưa vào kiểm tra đánh giá chính thức.

## Cách chạy
- Cài Node.js 20+.
- Trong thư mục dự án chạy `npm install`, tiếp đến `npm run dev`.
- Đóng gói triển khai: `npm run build`; thư mục `dist/` có thể đưa lên hosting tĩnh.

## Google AI Studio
- Trong Build chọn tạo web app, cung cấp mã nguồn từ các tệp `src/main.jsx`, `src/data.js`, `src/style.css`, `package.json` hoặc đưa dự án lên GitHub rồi sử dụng **Import from GitHub**.
- Dán nội dung `PROMPT_GOOGLE_AI_STUDIO.txt` vào AI Studio để AI hiểu các ràng buộc và duy trì mã nguồn hiện tại.

## Đã triển khai
- Màn hình robot pastel responsive với robot CSS động/biểu cảm.
- 16 bài / 6 chủ đề, bài giảng tóm tắt và **48 câu hỏi giải thích đáp án**.
- Mở khóa tuyến tính theo bài, thưởng sao, hồ sơ học sinh; lưu localStorage.
- 6 trò chơi thao tác thật: nhấp mục tiêu, gõ chữ, kéo thả/phân loại, mô phỏng robot lệnh hướng, vẽ canvas và lưu PNG, tình huống an toàn.
- Đọc câu hỏi bằng Web Speech API (`speechSynthesis`, hỗ trợ phụ thuộc trình duyệt và giọng đọc hệ điều hành).
- Thi đấu nhóm tại lớp với cộng trừ điểm; góc giáo viên với báo cáo cá nhân, xuất/nhập JSON, in.

## Giới hạn cần hiểu rõ
- Không có đăng nhập hay cơ sở dữ liệu đám mây. Người dùng thay trình duyệt/xóa dữ liệu sẽ mất tiến độ nếu chưa xuất JSON.
- Góc giáo viên là **báo cáo của một hồ sơ đang mở**, không tổng hợp trực tuyến dữ liệu từ các học sinh khác.
- Thi đấu nhóm vận hành **trên một máy giáo viên**, không phải multiplayer online.
- Các trò chơi rèn thao tác liên quan kiến thức; không phải bản thay thế hoàn toàn phần mềm hệ điều hành, tệp thực hoặc trình chiếu ngoài đời.
- Không có backend, API key hay truyền dữ liệu cá nhân đi nơi khác.

## Dữ liệu
`src/data.js`: Tên 16 bài, nhóm chủ đề, kiến thức, ví dụ và 48 câu hỏi. Sửa tại đây nếu giáo viên cần thay nội dung.
