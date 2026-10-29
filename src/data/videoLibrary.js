// Thư viện 23 Video AI Tin học 3 - Kết nối tri thức với cuộc sống
// Tự động phân tích, trích xuất Google Drive File ID và cấu trúc nhúng 16:9

/**
 * Trích xuất Google Drive File ID từ nhiều định dạng URL khác nhau:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/preview
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - FILE_ID trực tiếp
 */
export function extractDriveFileId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return '';
  const trimmed = urlOrId.trim();

  // Kiểm tra pattern /file/d/FILE_ID
  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    return matchFileD[1];
  }

  // Kiểm tra pattern id=FILE_ID
  const matchIdParam = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) {
    return matchIdParam[1];
  }

  // Nếu chuỗi là ID thuần túy (không chứa ký tự http hay /)
  if (!trimmed.includes('/') && !trimmed.includes('?') && trimmed.length >= 15) {
    return trimmed;
  }

  return trimmed;
}

export function getDriveEmbedUrl(fileId) {
  const id = extractDriveFileId(fileId);
  if (!id) return '';
  return `https://drive.google.com/file/d/${id}/preview`;
}

export function getDriveViewUrl(fileId) {
  const id = extractDriveFileId(fileId);
  if (!id) return '';
  return `https://drive.google.com/file/d/${id}/view`;
}

export const INITIAL_VIDEOS = [
  {
    id: 1,
    title: "Video AI 01: Thông tin và Quyết định quanh em",
    lessonId: 1,
    themeId: 1,
    driveUrl: "",
    driveId: "",
    duration: "3:30",
    badge: "Bài 1",
    objectives: "Nhận biết thế nào là thông tin qua 5 giác quan và cách bộ não đưa ra quyết định hành động trong đời sống.",
    keyTakeaways: [
      "Mắt nhìn hình ảnh, tai nghe âm thanh là đang tiếp nhận thông tin.",
      "Bộ não suy nghĩ thông tin để đưa ra quyết định phù hợp.",
      "Thông tin đúng giúp chúng ta đưa ra quyết định chính xác và an toàn.",
    ],
    quizQuestions: [
      {
        question: "Khi nghe tiếng chuông báo thức reo, em quyết định thức dậy. Đâu là thông tin?",
        options: ["A. Tiếng chuông reo", "B. Hành động thức dậy", "C. Chiếc chăn ấm", "D. Giấc mơ"],
        correctIndex: 0,
        explanation: "Tiếng chuông reo là thông tin dạng âm thanh truyền vào tai em."
      },
      {
        question: "Nhìn thấy biển báo 'Đường trơn trượt', em đi chậm lại. Đâu là quyết định?",
        options: ["A. Biển báo màu vàng", "B. Đi chậm lại", "C. Cơn mưa rào", "D. Đôi giày"],
        correctIndex: 1,
        explanation: "Hành động đi chậm lại chính là quyết định sau khi đọc thông tin biển báo."
      },
      {
        question: "Giác quan nào giúp em nhận biết màu sắc tuyệt đẹp của màn hình máy tính?",
        options: ["A. Thị giác (mắt)", "B. Thính giác (tai)", "C. Khứu giác (mũi)", "D. Vị giác (lưỡi)"],
        correctIndex: 0,
        explanation: "Đôi mắt giúp chúng ta nhìn thấy hình ảnh, chữ viết và màu sắc trên máy tính."
      }
    ],
    practiceTarget: "sorter",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Video AI 02: Bộ não máy tính xử lý thông tin như thế nào?",
    lessonId: 2,
    themeId: 1,
    driveUrl: "",
    driveId: "",
    duration: "4:15",
    badge: "Bài 2",
    objectives: "Hiểu quy trình 3 bước xử lý thông tin: Thu nhận -> Xử lý -> Xuất kết quả ở con người và máy tính.",
    keyTakeaways: [
      "Bộ não con người xử lý thông tin từ các giác quan.",
      "Thân máy tính (CPU) là bộ não xử lý mọi thông tin trong máy tính.",
      "Bàn phím, chuột nhập thông tin vào; màn hình, loa xuất thông tin ra.",
    ],
    quizQuestions: [
      {
        question: "Trong máy tính để bàn, bộ phận nào đóng vai trò là 'bộ não' xử lý thông tin?",
        options: ["A. Màn hình", "B. Thân máy tính (CPU)", "C. Bàn phím", "D. Con chuột"],
        correctIndex: 1,
        explanation: "Thân máy tính chứa bộ xử lý CPU, điều khiển và xử lý mọi dữ liệu."
      },
      {
        question: "Quy trình xử lý thông tin gồm mấy bước chính?",
        options: ["A. 2 bước", "B. 3 bước (Thu nhận -> Xử lý -> Xuất kết quả)", "C. 5 bước", "D. 10 bước"],
        correctIndex: 1,
        explanation: "Quy trình chuẩn gồm 3 bước: Tiếp nhận, Xử lý và Xuất kết quả."
      },
      {
        question: "Thiết bị nào sau đây dùng để xuất thông tin dạng âm thanh ra cho em nghe?",
        options: ["A. Loa máy tính", "B. Bàn phím", "C. Chuột", "D. Máy quét"],
        correctIndex: 0,
        explanation: "Loa và tai nghe là thiết bị xuất âm thanh từ máy tính."
      }
    ],
    practiceTarget: "sequence",
  },
  {
    id: 3,
    title: "Video AI 03: Khám phá các bộ phận của máy tính",
    lessonId: 3,
    themeId: 1,
    driveUrl: "",
    driveId: "",
    duration: "4:00",
    badge: "Bài 3",
    objectives: "Nhận biết 4 bộ phận cơ bản của máy tính để bàn và sự tiện lợi của máy tính xách tay (Laptop), máy tính bảng.",
    keyTakeaways: [
      "4 bộ phận chính: Màn hình, Thân máy, Bàn phím, Chuột.",
      "Máy tính xách tay tích hợp gọn gàng 4 bộ phận trong một thân máy nhỏ nhẹ.",
      "Máy tính bảng có màn hình cảm ứng, chạm ngón tay để điều khiển.",
    ],
    quizQuestions: [
      {
        question: "Máy tính để bàn gồm mấy bộ phận cơ bản?",
        options: ["A. 2 bộ phận", "B. 3 bộ phận", "C. 4 bộ phận", "D. 8 bộ phận"],
        correctIndex: 2,
        explanation: "Máy tính để bàn gồm 4 bộ phận: Màn hình, Thân máy, Bàn phím và Chuột."
      },
      {
        question: "Bộ phận nào giúp em nhìn thấy bài học và tranh vẽ?",
        options: ["A. Màn hình", "B. Bàn phím", "C. Chuột", "D. Dây điện"],
        correctIndex: 0,
        explanation: "Màn hình hiển thị hình ảnh và chữ viết cho chúng ta quan sát."
      },
      {
        question: "Điểm tiện lợi nhất của máy tính xách tay (Laptop) là gì?",
        options: ["A. Rất nặng", "B. Gọn nhẹ, có pin sạc, dễ mang theo học tập", "C. Không có màn hình", "D. Chỉ chơi được game"],
        correctIndex: 1,
        explanation: "Laptop nhỏ gọn, tích hợp pin sạc và các bộ phận nên rất tiện di chuyển."
      }
    ],
    practiceTarget: "assembly",
  },
  {
    id: 4,
    title: "Video AI 04: Tư thế ngồi học chuẩn và Quy trình bật tắt máy",
    lessonId: 4,
    themeId: 1,
    driveUrl: "",
    driveId: "",
    duration: "3:40",
    badge: "Bài 4",
    objectives: "Thực hành tư thế ngồi đúng, khoảng cách mắt 50-80cm, bật tắt máy tính đúng quy trình kỹ thuật.",
    keyTakeaways: [
      "Ngồi thẳng lưng, mắt cách màn hình 50-80cm (khoảng một sải tay).",
      "Nghỉ mắt sau mỗi 30-45 phút học tập.",
      "Tắt máy an toàn: Start -> Power -> Shut down (không rút phích cắm đột ngột).",
    ],
    quizQuestions: [
      {
        question: "Khoảng cách an toàn từ mắt đến màn hình máy tính là bao nhiêu?",
        options: ["A. 10 - 20 cm", "B. 50 - 80 cm", "C. Trên 2 mét", "D. Dán mắt sát vào màn hình"],
        correctIndex: 1,
        explanation: "Khoảng cách 50-80 cm giúp bảo vệ thị lực và tránh mỏi mắt."
      },
      {
        question: "Quy trình tắt máy tính đúng và an toàn là gì?",
        options: ["A. Rút phích cắm điện ngay", "B. Start -> Power -> Shut down", "C. Tắt công tắc phòng", "D. Đập vào màn hình"],
        correctIndex: 1,
        explanation: "Vào Start -> Power -> Shut down giúp hệ điều hành lưu dữ liệu an toàn trước khi ngắt nguồn."
      },
      {
        question: "Sau bao lâu ngồi học máy tính thì em nên đứng dậy vận động thư giãn mắt?",
        options: ["A. 30 đến 45 phút", "B. 5 tiếng liên tục", "C. Cả ngày", "D. Không cần nghỉ"],
        correctIndex: 0,
        explanation: "Nghỉ ngơi sau 30-45 phút giúp mắt và cột sống luôn khỏe mạnh."
      }
    ],
    practiceTarget: "sequence",
  },
  {
    id: 5,
    title: "Video AI 05: Hàng phím cơ sở và Bí mật hai phím F, J",
    lessonId: 5,
    themeId: 1,
    driveUrl: "",
    driveId: "",
    duration: "4:30",
    badge: "Bài 5",
    objectives: "Xác định hàng phím cơ sở và đặt đúng 2 ngón tay trỏ lên phím mốc F và J có gờ nổi.",
    keyTakeaways: [
      "Hàng phím cơ sở gồm: A, S, D, F, G, H, J, K, L, ;",
      "Phím F và phím J có gờ nổi đặc biệt để làm mốc đặt 2 ngón trỏ.",
      "Phím Space dài nhất do 2 ngón tay cái đảm nhiệm.",
    ],
    quizQuestions: [
      {
        question: "Hai phím nào trên hàng phím cơ sở có gờ nổi đặc biệt?",
        options: ["A. Phím A và L", "B. Phím F và J", "C. Phím G và H", "D. Phím C và M"],
        correctIndex: 1,
        explanation: "Phím F và J có gờ nổi giúp em định vị bàn tay mà không cần cúi nhìn bàn phím."
      },
      {
        question: "Hai ngón tay cái được đặt lên phím nào?",
        options: ["A. Phím Enter", "B. Phím cách (Space)", "C. Phím Shift", "D. Phím Esc"],
        correctIndex: 1,
        explanation: "Hai ngón tay cái luôn đặt hờ trên phím cách (Space)."
      },
      {
        question: "Hàng phím cơ sở nằm ở vị trí nào trên bàn phím?",
        options: ["A. Hàng phím số trên cùng", "B. Hàng phím ở giữa bàn phím", "C. Hàng phím dưới cùng", "D. Bên ngoài bàn phím"],
        correctIndex: 1,
        explanation: "Hàng phím cơ sở nằm ở vị trí trung tâm bàn phím chữ."
      }
    ],
    practiceTarget: "keyboard",
  },
  {
    id: 6,
    title: "Video AI 06: Bậc thầy thao tác Chuột máy tính",
    lessonId: 5,
    themeId: 1,
    driveUrl: "",
    driveId: "",
    duration: "3:50",
    badge: "Bài 5",
    objectives: "Luyện 4 thao tác chuột: nhấp chuột trái, nhấp đúp, nhấp chuột phải và rê kéo thả linh hoạt.",
    keyTakeaways: [
      "Cầm chuột bằng tay phải: ngón trỏ nút trái, ngón giữa nút phải.",
      "Nhấp đúp chuột: nhấn nút trái 2 lần nhanh liên tiếp.",
      "Kéo thả chuột: nhấn giữ nút trái, di chuyển đến vị trí mới rồi thả ra.",
    ],
    quizQuestions: [
      {
        question: "Khi cầm chuột bằng tay phải, ngón trỏ đặt lên nút nào?",
        options: ["A. Nút chuột trái", "B. Nút chuột phải", "C. Bánh lăn", "D. Đáy chuột"],
        correctIndex: 0,
        explanation: "Ngón trỏ đặt nút trái, ngón giữa đặt nút phải của chuột."
      },
      {
        question: "Thao tác mở nhanh một phần mềm trên màn hình nền là gì?",
        options: ["A. Nhấp đúp chuột trái vào biểu tượng", "B. Nhấc chuột lên trời", "C. Rút dây chuột", "D. Cuộn bánh lăn thật nhanh"],
        correctIndex: 0,
        explanation: "Nhấp đúp chuột trái (double click) thường dùng để khởi chạy phần mềm."
      },
      {
        question: "Thao tác nhấn giữ nút chuột trái, di chuyển đối tượng đến chỗ mới rồi buông tay gọi là gì?",
        options: ["A. Kéo thả chuột", "B. Nhấp chuột phải", "C. Tắt máy", "D. Cuộn trang"],
        correctIndex: 0,
        explanation: "Đó chính là thao tác kéo thả chuột (Drag and Drop)."
      }
    ],
    practiceTarget: "mouse",
  },
  {
    id: 7,
    title: "Video AI 07: Khám phá thế giới Internet diệu kỳ",
    lessonId: 6,
    themeId: 2,
    driveUrl: "",
    driveId: "",
    duration: "4:10",
    badge: "Bài 6",
    objectives: "Hiểu Internet là mạng máy tính toàn cầu kết nối tri thức và nhận biết các trình duyệt web quen thuộc.",
    keyTakeaways: [
      "Internet kết nối hàng triệu máy tính khắp năm châu.",
      "Giúp tra cứu bài học, xem phim hoạt hình khoa học, nghe nhạc.",
      "Trình duyệt web phổ biến: Google Chrome, Cốc Cốc, Microsoft Edge.",
    ],
    quizQuestions: [
      {
        question: "Internet là gì?",
        options: ["A. Mạng máy tính toàn cầu", "B. Một chiếc tivi", "C. Trò chơi điện tử", "D. Một cuốn truyện"],
        correctIndex: 0,
        explanation: "Internet là mạng kết nối máy tính toàn cầu, chia sẻ kho dữ liệu khổng lồ."
      },
      {
        question: "Phần mềm nào sau đây là trình duyệt web giúp em xem trang web?",
        options: ["A. Google Chrome, Cốc Cốc", "B. Phần mềm Paint", "C. Bàn phím ảo", "D. Đồng hồ"],
        correctIndex: 0,
        explanation: "Google Chrome, Cốc Cốc, Edge, Safari là các trình duyệt web phổ biến."
      },
      {
        question: "Học sinh lớp 3 vào Internet nên có sự đồng hành của ai?",
        options: ["A. Người lạ trên mạng", "B. Thầy cô giáo hoặc bố mẹ", "C. Đi một mình ban đêm", "D. Không cần ai"],
        correctIndex: 1,
        explanation: "Luôn có sự hướng dẫn của bố mẹ hoặc thầy cô để an toàn và bổ ích."
      }
    ],
    practiceTarget: "shield",
  },
  {
    id: 8,
    title: "Video AI 08: Phân biệt các dạng thông tin trên Internet",
    lessonId: 7,
    themeId: 2,
    driveUrl: "",
    driveId: "",
    duration: "3:45",
    badge: "Bài 7",
    objectives: "Nhận biết 4 dạng thông tin: văn bản, hình ảnh, âm thanh, video và biết cách chọn lọc nguồn tin tin cậy.",
    keyTakeaways: [
      "4 dạng thông tin: chữ viết, hình ảnh, âm thanh, video.",
      "Thông tin trên mạng có thông tin tốt và thông tin sai lệch.",
      "Chỉ tin tưởng các trang web giáo dục chính thống, được bố mẹ thầy cô duyệt.",
    ],
    quizQuestions: [
      {
        question: "Thông tin trên Internet có những dạng nào?",
        options: ["A. Chỉ có chữ viết", "B. Văn bản, hình ảnh, âm thanh và video", "C. Chỉ có giọng nói", "D. Không có dạng nào"],
        correctIndex: 1,
        explanation: "Internet chứa cả 4 dạng thông tin đa phương tiện phong phú."
      },
      {
        question: "Khi gặp thông tin lạ, giật gân hoặc đáng sợ trên mạng, em nên làm gì?",
        options: ["A. Chia sẻ ngay cho cả lớp", "B. Đóng lại và hỏi ý kiến bố mẹ hoặc thầy cô", "C. Bấm vào mọi liên kết lạ", "D. Nộp tiền"],
        correctIndex: 1,
        explanation: "Luôn hỏi người lớn để xác minh thông tin trước khi tin tưởng."
      },
      {
        question: "Đâu là nguồn tin đáng tin cậy cho học sinh?",
        options: ["A. Cổng thông tin Bộ Giáo dục & Đào tạo, trang web nhà trường", "B. Trang web cờ bạc lạ", "C. Tin nhắn của người lạ", "D. Quảng cáo nặc danh"],
        correctIndex: 0,
        explanation: "Các website chính thống của nhà trường và ngành giáo dục là nguồn tin chuẩn xác."
      }
    ],
    practiceTarget: "safety",
  },
  {
    id: 9,
    title: "Video AI 09: Sắp xếp đồ vật và dữ liệu để dễ tìm",
    lessonId: 8,
    themeId: 3,
    driveUrl: "",
    driveId: "",
    duration: "3:35",
    badge: "Bài 8",
    objectives: "Hiểu lợi ích của việc sắp xếp đồ vật và dữ liệu có quy tắc: nhanh chóng, tiện lợi, không mất thời gian tìm kiếm.",
    keyTakeaways: [
      "Sắp xếp có quy tắc giúp tìm kiếm đồ vật và tệp tin trong vài giây.",
      "Có thể sắp xếp theo: môn học, loại tệp, ngày tháng hoặc bảng chữ cái A-B-C.",
      "Giữ gìn góc học tập và ổ đĩa máy tính luôn ngăn nắp.",
    ],
    quizQuestions: [
      {
        question: "Lợi ích lớn nhất của việc sắp xếp sách vở ngăn nắp theo môn học là gì?",
        options: ["A. Tìm kiếm nhanh chóng khi cần", "B. Để giá sách nặng hơn", "C. Để không phải học bài", "D. Để khoe bạn bè"],
        correctIndex: 0,
        explanation: "Sắp xếp ngăn nắp giúp em lấy sách vở nhanh chóng mà không mất công bới tìm."
      },
      {
        question: "Trên máy tính, danh sách tên học sinh nên sắp xếp theo thứ tự nào để dễ tìm nhất?",
        options: ["A. Lộn xộn không quy tắc", "B. Bảng chữ cái tiếng Việt (A, B, C...)", "C. Bạn nào cao đứng trước", "D. Bạn nào chạy nhanh đứng trước"],
        correctIndex: 1,
        explanation: "Thứ tự bảng chữ cái A-B-C là chuẩn mực sắp xếp tra cứu tối ưu."
      },
      {
        question: "Nếu vứt tất cả bài vẽ, bài hát, bài văn vào một chỗ lộn xộn thì điều gì xảy ra?",
        options: ["A. Rất dễ tìm", "B. Rất mất thời gian và khó tìm bài", "C. Máy tính chạy nhanh hơn", "D. Không có ảnh hưởng gì"],
        correctIndex: 1,
        explanation: "Lộn xộn sẽ khiến em mất nhiều thời gian tìm kiếm tệp tin."
      }
    ],
    practiceTarget: "sorter",
  },
  {
    id: 10,
    title: "Video AI 10: Sơ đồ hình cây – Tệp và Thư mục",
    lessonId: 9,
    themeId: 3,
    driveUrl: "",
    driveId: "",
    duration: "4:20",
    badge: "Bài 9",
    objectives: "Hiểu sơ đồ cây phân cấp: Thư mục mẹ chứa thư mục con và tệp tin; phân biệt biểu tượng thư mục (vàng) và tệp tin.",
    keyTakeaways: [
      "Thư mục (Folder) có biểu tượng kẹp hồ sơ màu vàng cam.",
      "Tệp (File) chứa nội dung cụ thể: bài hát, văn bản, tranh vẽ.",
      "Thư mục giống như chiếc cặp sách, tệp giống như từng quyển vở bên trong.",
    ],
    quizQuestions: [
      {
        question: "Biểu tượng của Thư mục (Folder) trong máy tính thường có hình và màu gì?",
        options: ["A. Kẹp hồ sơ màu vàng cam", "B. Nốt nhạc màu đỏ", "C. Ngôi sao xanh", "D. Chiếc kéo"],
        correctIndex: 0,
        explanation: "Thư mục có biểu tượng chiếc kẹp hồ sơ màu vàng cam."
      },
      {
        question: "Thư mục dùng để chứa những gì?",
        options: ["A. Chứa các tệp tin và các thư mục con", "B. Chứa nước uống", "C. Chứa bàn phím", "D. Chứa bụi bẩn"],
        correctIndex: 0,
        explanation: "Thư mục dùng để gom nhóm các tệp và thư mục con một cách khoa học."
      },
      {
        question: "Một bức tranh vẽ chú robot lưu trên máy tính gọi là gì?",
        options: ["A. Là một tệp hình ảnh (File)", "B. Là chiếc màn hình", "C. Là con chuột", "D. Là ổ cắm điện"],
        correctIndex: 0,
        explanation: "Bức tranh được lưu dưới dạng một tệp hình ảnh."
      }
    ],
    practiceTarget: "folderRescue",
  },
  {
    id: 11,
    title: "Video AI 11: Thực hành Quản lý Tệp và Thư mục",
    lessonId: 10,
    themeId: 3,
    driveUrl: "",
    driveId: "",
    duration: "4:05",
    badge: "Bài 10",
    objectives: "Thực hành thao tác tạo thư mục mới (New Folder), đặt tên rõ ràng, đổi tên (Rename) và xóa thư mục (Delete).",
    keyTakeaways: [
      "Tạo thư mục mới: Nhấp chuột phải -> New -> Folder.",
      "Đặt tên thư mục ngắn gọn, rõ nghĩa (ví dụ: 'Bai_tap_Lop_3').",
      "Xóa thư mục không dùng: Nhấp chuột phải -> Delete.",
    ],
    quizQuestions: [
      {
        question: "Để tạo một thư mục mới, em thực hiện thao tác nào?",
        options: ["A. Chuột phải -> New -> Folder", "B. Nhấn phím cách 5 lần", "C. Tắt màn hình", "D. Rút chuột ra"],
        correctIndex: 0,
        explanation: "Nhấp chuột phải vào chỗ trống -> chọn New -> Folder là thao tác chuẩn tạo thư mục mới."
      },
      {
        question: "Tên thư mục nào sau đây được đặt khoa học và dễ nhớ nhất?",
        options: ["A. asdsad123", "B. Bài tập Tin học của Lan", "C. ???***", "D. x"],
        correctIndex: 1,
        explanation: "Tên 'Bài tập Tin học của Lan' rõ ràng, dễ phân biệt nội dung bên trong."
      },
      {
        question: "Lệnh nào giúp em xóa một thư mục rác không dùng nữa?",
        options: ["A. Open", "B. Copy", "C. Delete", "D. Rename"],
        correctIndex: 2,
        explanation: "Lệnh Delete (hoặc phím Delete trên bàn phím) sẽ xóa thư mục được chọn."
      }
    ],
    practiceTarget: "folderRescue",
  },
  {
    id: 12,
    title: "Video AI 12: Chiếc khiên bảo vệ thông tin cá nhân",
    lessonId: 11,
    themeId: 4,
    driveUrl: "",
    driveId: "",
    duration: "4:40",
    badge: "Bài 11",
    objectives: "Nhận diện thông tin cá nhân (họ tên, địa chỉ, số điện thoại, mật khẩu) và nguyên tắc tuyệt đối không chia sẻ cho người lạ.",
    keyTakeaways: [
      "Thông tin cá nhân là bí mật riêng tư cần được bảo vệ.",
      "Không bao giờ gửi địa chỉ nhà, số điện thoại hay mật khẩu cho người quen qua mạng.",
      "Mật khẩu tài khoản chỉ chia sẻ với bố mẹ.",
    ],
    quizQuestions: [
      {
        question: "Thông tin nào sau đây cần giữ bí mật, không chia sẻ cho người lạ trên mạng?",
        options: ["A. Tên một bài hát thiếu nhi", "B. Họ tên đầy đủ, địa chỉ nhà, số điện thoại và mật khẩu", "C. Tên nhân vật hoạt hình", "D. Màu sắc em yêu thích"],
        correctIndex: 1,
        explanation: "Họ tên, địa chỉ, số điện thoại và mật khẩu là thông tin cá nhân quan trọng cần bảo mật."
      },
      {
        question: "Có người lạ trên mạng hứa tặng nick game miễn phí nếu em gửi mật khẩu, em sẽ làm gì?",
        options: ["A. Gửi ngay", "B. Tuyệt đối không gửi, chặn người đó và báo ngay cho bố mẹ", "C. Gửi thêm số điện thoại của mẹ", "D. Rủ bạn cùng gửi"],
        correctIndex: 1,
        explanation: "Đây là bẫy lừa đảo. Em không gửi gì cả và phải báo người lớn ngay."
      },
      {
        question: "Mật khẩu an toàn nên có đặc điểm gì?",
        options: ["A. Dễ đoán như 123456", "B. Có cả chữ cái, chữ số và giữ bí mật", "C. Nói cho cả lớp biết", "D. Viết lên bàn học"],
        correctIndex: 1,
        explanation: "Mật khẩu mạnh kết hợp chữ cái và chữ số, không chia sẻ cho người khác."
      }
    ],
    practiceTarget: "shield",
  },
  {
    id: 13,
    title: "Video AI 13: Văn hóa số và Cư xử văn minh trên mạng",
    lessonId: 11,
    themeId: 4,
    driveUrl: "",
    driveId: "",
    duration: "3:30",
    badge: "Bài 11",
    objectives: "Biết cách giao tiếp lịch sự, tôn trọng bạn bè trên Internet, không bắt nạt hay lan truyền thông tin sai lệch.",
    keyTakeaways: [
      "Nói lời lịch sự, hòa nhã khi nhắn tin hoặc bình luận.",
      "Không trêu chọc, nói xấu hay đăng ảnh bêu xấu người khác.",
      "Khi bị bắt nạt trên mạng, hãy lưu bằng chứng và báo thầy cô, bố mẹ.",
    ],
    quizQuestions: [
      {
        question: "Hành động nào thể hiện em là học sinh văn minh khi sử dụng mạng xã hội?",
        options: ["A. Dùng lời lẽ thô tục chê bai bạn bè", "B. Nói lời lịch sự, chào hỏi hòa nhã và chia sẻ điều bổ ích", "C. Đăng ảnh trêu chọc bạn bè", "D. Lan truyền tin đồn"],
        correctIndex: 1,
        explanation: "Luôn nói lời lịch sự và tôn trọng mọi người trên không gian mạng."
      },
      {
        question: "Nếu thấy một bạn trong lớp bị người khác nói xấu trong nhóm mạng, em nên làm gì?",
        options: ["A. Hùa theo nói xấu cùng", "B. Không hùa theo, động viên bạn và báo cho cô giáo chủ nhiệm", "C. Thả tim tán thành", "D. Chụp ảnh gửi đi khắp nơi"],
        correctIndex: 1,
        explanation: "Không hùa theo bắt nạt và hãy báo người lớn giúp đỡ bạn."
      },
      {
        question: "Người lạ hẹn gặp mặt em ngoài đời thực sau khi quen qua mạng, em phải làm gì?",
        options: ["A. Trốn bố mẹ đi gặp ngay", "B. Tuyệt đối từ chối và kể ngay cho bố mẹ biết", "C. Rủ bạn đi cùng", "D. Cho người đó địa chỉ nhà"],
        correctIndex: 1,
        explanation: "Rất nguy hiểm! Tuyệt đối không bao giờ gặp mặt người lạ quen qua mạng."
      }
    ],
    practiceTarget: "safety",
  },
  {
    id: 14,
    title: "Video AI 14: Làm quen với phần mềm đồ họa Paint",
    lessonId: 12,
    themeId: 5,
    driveUrl: "",
    driveId: "",
    duration: "4:00",
    badge: "Bài 12",
    objectives: "Khám phá giao diện Paint, thanh công cụ, bút vẽ (Pencil), tẩy (Eraser), nhóm hình mẫu (Shapes) và bảng màu.",
    keyTakeaways: [
      "Phần mềm đồ họa Paint giúp vẽ tranh và tô màu trên máy tính.",
      "Bút vẽ (Pencil/Brush) để vẽ nét tự do.",
      "Hộp hình mẫu (Shapes) có hình chữ nhật, hình tròn, ngôi sao.",
      "Bảng màu (Colors) để chọn màu nét vẽ và màu tô.",
    ],
    quizQuestions: [
      {
        question: "Phần mềm nào sau đây giúp em vẽ tranh tô màu trên máy tính?",
        options: ["A. Paint", "B. Máy tính Calculator", "C. Bàn phím ảo", "D. Trình duyệt web"],
        correctIndex: 0,
        explanation: "MS Paint là phần mềm đồ họa quen thuộc để học sinh tập vẽ tranh."
      },
      {
        question: "Công cụ Tẩy (Eraser) có tác dụng gì?",
        options: ["A. Vẽ hình vuông", "B. Xóa chi tiết vẽ sai", "C. Đổi màu màn hình", "D. Tắt máy"],
        correctIndex: 1,
        explanation: "Tẩy giúp xóa đi những nét vẽ bị thừa hoặc bị nhầm."
      },
      {
        question: "Để chọn màu sắc yêu thích cho nét vẽ, em nhấp chuột vào khu vực nào?",
        options: ["A. Hộp bảng màu (Colors)", "B. Nút nguồn máy", "C. Dây cáp mạng", "D. Bàn phím"],
        correctIndex: 0,
        explanation: "Bảng màu chứa các ô màu sắc rực rỡ để em chọn lựa."
      }
    ],
    practiceTarget: "paint",
  },
  {
    id: 15,
    title: "Video AI 15: Kỹ thuật Vẽ hình khối và Tô màu khép kín",
    lessonId: 13,
    themeId: 5,
    driveUrl: "",
    driveId: "",
    duration: "4:15",
    badge: "Bài 13",
    objectives: "Thực hành vẽ hình vuông, hình tròn hoàn hảo (nhấn giữ Shift) và kỹ thuật tô màu Thùng sơn không bị tràn màu.",
    keyTakeaways: [
      "Nhấn giữ phím Shift khi kéo chuột để vẽ hình vuông hoặc hình tròn hoàn hảo.",
      "Đường viền phải khép kín thì khi đổ màu mới không bị tràn ra ngoài.",
      "Lưu bài vẽ: File -> Save (Ctrl + S) để lưu lại tác phẩm của em.",
    ],
    quizQuestions: [
      {
        question: "Để vẽ một hình tròn hoàn hảo bằng công cụ Oval, em nhấn giữ phím nào trên bàn phím?",
        options: ["A. Phím Shift", "B. Phím Caps Lock", "C. Phím Space", "D. Phím Esc"],
        correctIndex: 0,
        explanation: "Nhấn giữ Shift khi kéo chuột sẽ tạo thành hình vuông hoặc hình tròn đều đẹp."
      },
      {
        question: "Vì sao khi đổ màu bằng Thùng sơn, màu lại bị tràn ra khắp trang vẽ?",
        options: ["A. Vì đường viền hình vẽ bị hở (chưa khép kín)", "B. Vì máy tính bị đơ", "C. Vì chọn màu quá đậm", "D. Vì chuột bị hỏng"],
        correctIndex: 0,
        explanation: "Khi đường bao quanh có khe hở, màu sơn sẽ bị tràn ra ngoài."
      },
      {
        question: "Thao tác phím tắt nào giúp lưu nhanh bức tranh em vừa vẽ?",
        options: ["A. Ctrl + S", "B. Ctrl + C", "C. Ctrl + V", "D. Ctrl + Z"],
        correctIndex: 0,
        explanation: "Tổ hợp phím Ctrl + S dùng để lưu tệp nhanh chóng."
      }
    ],
    practiceTarget: "paint",
  },
  {
    id: 16,
    title: "Video AI 16: Soạn thảo văn bản – Phím Enter, Space và Chữ hoa",
    lessonId: 14,
    themeId: 5,
    driveUrl: "",
    driveId: "",
    duration: "4:10",
    badge: "Bài 14",
    objectives: "Làm quen với con trỏ soạn thảo nhấp nháy, phím Enter xuống dòng, phím Space cách từ và phím Shift/Caps Lock gõ chữ hoa.",
    keyTakeaways: [
      "Con trỏ soạn thảo là vạch đứng nhấp nháy chỉ vị trí chữ mới xuất hiện.",
      "Phím Enter: xuống dòng mới.",
      "Giữa hai từ liền nhau chỉ gõ đúng 1 dấu cách (Space).",
      "Giữ phím Shift hoặc bật Caps Lock để gõ chữ in hoa.",
    ],
    quizQuestions: [
      {
        question: "Vạch thẳng đứng nhấp nháy liên tục trên trang soạn thảo gọi là gì?",
        options: ["A. Con trỏ soạn thảo", "B. Con chuột", "C. Thước kẻ", "D. Vết mực"],
        correctIndex: 0,
        explanation: "Con trỏ soạn thảo nhấp nháy cho biết vị trí ký tự tiếp theo sẽ xuất hiện."
      },
      {
        question: "Để xuống một dòng mới khi đang viết văn, em nhấn phím nào?",
        options: ["A. Phím Enter", "B. Phím Shift", "C. Phím Alt", "D. Phím Ctrl"],
        correctIndex: 0,
        explanation: "Phím Enter dùng để kết thúc đoạn và xuống dòng mới."
      },
      {
        question: "Quy tắc gõ chuẩn giữa hai từ liền nhau là gì?",
        options: ["A. Chỉ nhấn phím Space 1 lần duy nhất", "B. Nhấn Space thật nhiều lần", "C. Viết dính liền không cách", "D. Nhấn Enter"],
        correctIndex: 0,
        explanation: "Giữa hai từ chỉ cần đúng một dấu cách duy nhất."
      }
    ],
    practiceTarget: "keyboard",
  },
  {
    id: 17,
    title: "Video AI 17: Bí kíp gõ tiếng Việt kiểu Telex và Sửa lỗi",
    lessonId: 15,
    themeId: 5,
    driveUrl: "",
    driveId: "",
    duration: "4:30",
    badge: "Bài 15",
    objectives: "Gõ thành thạo dấu thanh tiếng Việt kiểu Telex (s, f, r, x, j) và sửa lỗi bằng phím Backspace, Delete.",
    keyTakeaways: [
      "Quy tắc dấu Telex: s (sắc), f (huyền), r (hỏi), x (ngã), j (nặng).",
      "Chữ kép: aa = â, oo = ô, ee = ê, dd = đ, aw = ă, ow = ơ, uw = ư.",
      "Phím Backspace (<-): xóa ký tự bên trái con trỏ.",
      "Phím Delete: xóa ký tự bên phải con trỏ.",
    ],
    quizQuestions: [
      {
        question: "Trong kiểu gõ Telex, phím nào dùng để gõ dấu HUYỀN?",
        options: ["A. Phím f", "B. Phím s", "C. Phím r", "D. Phím j"],
        correctIndex: 0,
        explanation: "Quy tắc Telex: s = sắc, f = huyền, r = hỏi, x = ngã, j = nặng."
      },
      {
        question: "Để gõ được chữ 'Đ' trong kiểu gõ Telex, em gõ hai phím nào?",
        options: ["A. dd", "B. da", "C. dw", "D. do"],
        correctIndex: 0,
        explanation: "Gõ 'dd' sẽ tạo thành chữ 'đ'."
      },
      {
        question: "Phím Backspace (mũi tên quay trái) có chức năng gì?",
        options: ["A. Xóa ký tự đứng TRƯỚC con trỏ", "B. Xóa ký tự đứng SAU con trỏ", "C. Lưu bài", "D. In ra giấy"],
        correctIndex: 0,
        explanation: "Phím Backspace xóa lùi về bên trái, tức ký tự đứng trước con trỏ."
      }
    ],
    practiceTarget: "keyboard",
  },
  {
    id: 18,
    title: "Video AI 18: Các bước thực hiện một công việc (Thuật toán)",
    lessonId: 16,
    themeId: 6,
    driveUrl: "",
    driveId: "",
    duration: "4:00",
    badge: "Bài 16",
    objectives: "Hiểu một công việc có thể chia thành các bước nhỏ theo thứ tự hợp lý và robot làm việc theo các bước lệnh đó.",
    keyTakeaways: [
      "Mọi công việc đều có thể chia thành các bước nhỏ hơn.",
      "Thứ tự các bước quyết định sự thành công của công việc.",
      "Robot chỉ thực hiện đúng các bước lệnh mà con người lập trình.",
    ],
    quizQuestions: [
      {
        question: "Khi hướng dẫn bạn pha một cốc sữa nóng, thứ tự nào đúng nhất?",
        options: ["A. Cho sữa bột vào cốc -> Rót nước ấm -> Khuấy đều", "B. Uống sữa -> Đổ nước sôi -> Cho sữa bột", "C. Khuấy cốc không -> Uống ngay", "D. Đổ hết ra ngoài"],
        correctIndex: 0,
        explanation: "Phải cho sữa vào trước, rót nước ấm rồi khuấy tan đều."
      },
      {
        question: "Vì sao máy tính và robot cần con người lập trình các bước rõ ràng?",
        options: ["A. Vì robot chỉ làm theo đúng từng lệnh con người chỉ dẫn", "B. Vì robot lười biếng", "C. Vì robot không có pin", "D. Vì máy tính không thích làm"],
        correctIndex: 0,
        explanation: "Robot không tự suy nghĩ như người mà tuân thủ nghiêm ngặt chuỗi lệnh lập trình."
      },
      {
        question: "Để robot đi 2 bước về phía trước rồi quay phải, thứ tự lệnh là gì?",
        options: ["A. Tiến 1 bước -> Tiến 1 bước -> Quay phải", "B. Quay phải -> Lùi 2 bước", "C. Đứng yên -> Nhảy", "D. Quay trái"],
        correctIndex: 0,
        explanation: "Thứ tự lệnh chính xác là Tiến 1 bước -> Tiến 1 bước -> Quay phải."
      }
    ],
    practiceTarget: "pathfinder",
  },
  {
    id: 19,
    title: "Video AI 19: Lập trình Robot Bé Bít vượt mê cung",
    lessonId: 16,
    themeId: 6,
    driveUrl: "",
    driveId: "",
    duration: "4:45",
    badge: "Bài 16",
    objectives: "Ứng dụng các lệnh điều khiển robot trực quan: Tiến, Rẽ trái, Rẽ phải, Lặp lại để giải quyết bài toán mê cung.",
    keyTakeaways: [
      "Quan sát mục tiêu và chướng ngại vật trước khi viết lệnh.",
      "Ghép nối các thẻ lệnh theo trình tự từ trên xuống dưới.",
      "Kiểm tra và sửa lỗi (Debug) nếu robot đi nhầm đường.",
    ],
    quizQuestions: [
      {
        question: "Nếu robot gặp tảng đá chắn đường phía trước, em cần làm gì?",
        options: ["A. Quay trái hoặc quay phải để đi đường vòng", "B. Cứ đâm thẳng vào đá", "C. Tắt nguồn robot", "D. Khóc nhè"],
        correctIndex: 0,
        explanation: "Rẽ hướng khác để tìm đường vòng tránh chướng ngại vật."
      },
      {
        question: "Trong lập trình, việc tìm và sửa lại câu lệnh bị sai gọi là gì?",
        options: ["A. Tìm và sửa lỗi (Debug)", "B. Xóa máy tính", "C. Làm hỏng phần mềm", "D. Nghỉ chơi"],
        correctIndex: 0,
        explanation: "Tìm và sửa lỗi là kỹ năng quan trọng của một lập trình viên nhí."
      },
      {
        question: "Để robot nhặt pin năng lượng ở đích, robot cần đi đến ô nào?",
        options: ["A. Ô có biểu tượng pin năng lượng", "B. Mép ngoài bản đồ", "C. Ô có vật cản", "D. Đứng yên ở điểm xuất phát"],
        correctIndex: 0,
        explanation: "Đưa robot đến chính xác ô đích chứa pin năng lượng."
      }
    ],
    practiceTarget: "maze",
  },
  {
    id: 20,
    title: "Video AI 20: Ôn tập Tổng hợp Chủ đề 1 & 2 – Máy tính và Internet",
    lessonId: 6,
    themeId: 2,
    driveUrl: "",
    driveId: "",
    duration: "5:00",
    badge: "Tổng hợp",
    objectives: "Hệ thống hóa kiến thức về 4 bộ phận máy tính, thao tác chuột, bàn phím và thế giới mạng Internet an toàn.",
    keyTakeaways: [
      "Máy tính là người bạn hỗ trợ đắc lực trong học tập và giải trí.",
      "Thao tác chuột và bàn phím thành thạo giúp học tốt môn Tin học.",
      "Sử dụng Internet an toàn, văn minh và luôn có sự giám sát của gia đình.",
    ],
    quizQuestions: [
      {
        question: "Máy tính để bàn gồm 4 bộ phận nào?",
        options: ["A. Màn hình, Thân máy, Bàn phím, Chuột", "B. Máy in, Loa, Webcam, Dây cắm", "C. Màn hình, Tivi, Bàn ghế, Bút", "D. Chuột, Bàn chải, Giấy, Vở"],
        correctIndex: 0,
        explanation: "4 bộ phận cơ bản: Màn hình, Thân máy, Bàn phím, Chuột."
      },
      {
        question: "Internet đem lại lợi ích gì cho học sinh lớp 3?",
        options: ["A. Tra cứu tranh ảnh khoa học, học bài học mới", "B. Chơi game thâu đêm", "C. Nói chuyện với người xấu", "D. Không đi học nữa"],
        correctIndex: 0,
        explanation: "Internet là kho tàng tri thức khổng lồ phục vụ học tập."
      },
      {
        question: "Khi mỏi mắt sau 35 phút dùng máy tính, em nên làm gì?",
        options: ["A. Đứng dậy, nhìn ra cây xanh và tập thể dục nhẹ", "B. Nhìn sát mắt hơn", "C. Chơi tiếp 3 tiếng", "D. Bật đèn thật tối"],
        correctIndex: 0,
        explanation: "Thư giãn mắt để bảo vệ thị lực."
      }
    ],
    practiceTarget: "quizMaster",
  },
  {
    id: 21,
    title: "Video AI 21: Ôn tập Tổng hợp Chủ đề 3 & 4 – Tổ chức dữ liệu & An toàn số",
    lessonId: 10,
    themeId: 3,
    driveUrl: "",
    driveId: "",
    duration: "4:50",
    badge: "Tổng hợp",
    objectives: "Hệ thống hóa kỹ năng quản lý tệp, cây thư mục và 4 tấm khiên bảo vệ thông tin cá nhân trên mạng.",
    keyTakeaways: [
      "Sắp xếp thư mục theo cây phân cấp giúp tìm kiếm cực nhanh.",
      "Không bao giờ chia sẻ mật khẩu, họ tên, địa chỉ nhà cho người lạ trên mạng.",
      "Cư xử văn minh, lịch sự trên môi trường số.",
    ],
    quizQuestions: [
      {
        question: "Thư mục mẹ chứa được những gì?",
        options: ["A. Các thư mục con và các tệp tin", "B. Bàn phím máy tính", "C. Cây xanh thật", "D. Dây điện"],
        correctIndex: 0,
        explanation: "Thư mục mẹ chứa các nhánh thư mục con và các tệp dữ liệu."
      },
      {
        question: "Mật khẩu tài khoản học tập chỉ nên chia sẻ với ai?",
        options: ["A. Bố mẹ em", "B. Người lạ quen trên mạng", "C. Người gửi thư nặc danh", "D. Đăng lên mạng cho mọi người"],
        correctIndex: 0,
        explanation: "Mật khẩu chỉ chia sẻ với bố mẹ để quản lý tài khoản an toàn."
      },
      {
        question: "Để xóa một thư mục không dùng, em chọn lệnh nào?",
        options: ["A. Delete", "B. Open", "C. Copy", "D. Print"],
        correctIndex: 0,
        explanation: "Lệnh Delete giúp xóa thư mục rác."
      }
    ],
    practiceTarget: "folderRescue",
  },
  {
    id: 22,
    title: "Video AI 22: Ôn tập Tổng hợp Chủ đề 5 – Xưởng Sáng tạo Đồ họa & Soạn thảo",
    lessonId: 15,
    themeId: 5,
    driveUrl: "",
    driveId: "",
    duration: "5:10",
    badge: "Tổng hợp",
    objectives: "Củng cố kỹ năng vẽ hình trong Paint, gõ tiếng Việt kiểu Telex chuẩn xác và lưu giữ sản phẩm sáng tạo.",
    keyTakeaways: [
      "Vẽ tranh kết hợp các hình khối cơ bản và phối màu pastel tươi sáng.",
      "Gõ tiếng Việt Telex: s (sắc), f (huyền), r (hỏi), x (ngã), j (nặng).",
      "Lưu tác phẩm bằng tổ hợp phím Ctrl + S hoặc nút Save hình đĩa mềm.",
    ],
    quizQuestions: [
      {
        question: "Trong kiểu gõ Telex, hai phím 'ee' tạo thành chữ gì?",
        options: ["A. Chữ ê", "B. Chữ ô", "C. Chữ đ", "D. Chữ ă"],
        correctIndex: 0,
        explanation: "Gõ 'ee' sẽ tạo thành chữ 'ê'."
      },
      {
        question: "Để lưu bức tranh vừa vẽ xong thành tệp ảnh, em dùng nút nào?",
        options: ["A. Nút Save (hình đĩa mềm) hoặc Ctrl + S", "B. Nút dấu nhân đỏ để tắt luôn", "C. Nút Delete", "D. Rút phích cắm"],
        correctIndex: 0,
        explanation: "Nút Save giúp lưu giữ tác phẩm của em an toàn trên máy tính."
      },
      {
        question: "Khi muốn xóa một chữ cái đứng ngay TRƯỚC con trỏ, em nhấn phím nào?",
        options: ["A. Phím Backspace", "B. Phím Enter", "C. Phím Space", "D. Phím Shift"],
        correctIndex: 0,
        explanation: "Phím Backspace xóa lùi về bên trái trước con trỏ."
      }
    ],
    practiceTarget: "paint",
  },
  {
    id: 23,
    title: "Video AI 23: Vinh danh Nhà Vô Địch Tin Học 3 Cùng Bé Bít",
    lessonId: 16,
    themeId: 6,
    driveUrl: "",
    driveId: "",
    duration: "4:15",
    badge: "Vinh danh",
    objectives: "Tổng kết hành trình 16 bài học, rèn luyện tư duy thuật toán và trao huy hiệu Nhà Vô Địch Tin Học 3.",
    keyTakeaways: [
      "Em đã chinh phục trọn vẹn 16 bài học Tin học 3 Kết nối tri thức.",
      "Tự tin sử dụng máy tính, khám phá Internet an toàn và lập trình sáng tạo.",
      "Tiếp tục niềm đam mê công nghệ cùng bạn Robot Bé Bít!",
    ],
    quizQuestions: [
      {
        question: "Một công việc phức tạp nên được thực hiện như thế nào?",
        options: ["A. Chia thành các bước nhỏ hợp lý theo thứ tự", "B. Làm bừa không theo thứ tự", "C. Bỏ cuộc không làm", "D. Nhờ người khác làm hết"],
        correctIndex: 0,
        explanation: "Chia nhỏ nhiệm vụ thành từng bước logic giúp giải quyết công việc dễ dàng."
      },
      {
        question: "Bé Bít là nhân vật đồng hành của em trong môn học nào?",
        options: ["A. Tin học 3", "B. Thể dục", "C. Mỹ thuật", "D. Âm nhạc"],
        correctIndex: 0,
        explanation: "Bé Bít là người bạn robot pastel đồng hành môn Tin học 3 Kết nối tri thức."
      },
      {
        question: "Điều quan trọng nhất khi sử dụng máy tính và Internet là gì?",
        options: ["A. Giữ an toàn thông tin cá nhân và học tập kiến thức bổ ích", "B. Chơi game thâu đêm", "C. Bấm vào mọi link lạ", "D. Nói xấu bạn bè"],
        correctIndex: 0,
        explanation: "Sử dụng an toàn, lành mạnh và hữu ích cho tương lai của em."
      }
    ],
    practiceTarget: "quizMaster",
    isFeatured: true,
  },
];
