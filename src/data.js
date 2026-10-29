// Dữ liệu 16 bài học, 6 vùng đất chủ đề và 48 câu hỏi Tin học 3 - Kết nối tri thức với cuộc sống
// Bám sát mục tiêu cần đạt của Chương trình GDPT 2018 và SGK Kết nối tri thức

export const LANDS = [
  {
    id: 1,
    name: "Thành phố Máy tính",
    themeName: "Chủ đề 1: Máy tính và em",
    description: "Khám phá các người bạn máy tính, thông tin, bàn phím và chuột",
    color: "#8b5cf6", // Lavender / Tím
    bgColor: "#ede9fe",
    accentColor: "#a78bfa",
    icon: "🖥️",
    landscape: "Những tòa tháp vi mạch pastel, màn hình lung linh và các chú robot vui vẻ",
    lessonIds: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    name: "Khu vườn Thông tin",
    themeName: "Chủ đề 2: Mạng máy tính và Internet",
    description: "Khám phá mạng toàn cầu Internet và những điều kỳ diệu quanh ta",
    color: "#06b6d4", // Cyan
    bgColor: "#e0f2fe",
    accentColor: "#93c5fd",
    icon: "🌐",
    landscape: "Cây thông tin nở hoa tri thức, dòng suối dữ liệu kết nối khắp năm châu",
    lessonIds: [6, 7],
  },
  {
    id: 3,
    name: "Hành tinh Tổ chức Dữ liệu",
    themeName: "Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    description: "Học cách sắp xếp ngăn nắp, sơ đồ hình cây, quản lý tệp và thư mục",
    color: "#3b82f6", // Blue
    bgColor: "#dbeafe",
    accentColor: "#60a5fa",
    icon: "📁",
    landscape: "Hành tinh với những ngăn kéo thư mục thông minh, trật tự và khoa học",
    lessonIds: [8, 9, 10],
  },
  {
    id: 4,
    name: "Thành phố An toàn Số",
    themeName: "Chủ đề 4: Đạo đức, pháp luật và văn hóa trong môi trường số",
    description: "Bảo vệ thông tin cá nhân, cư xử văn minh và an toàn trên Internet",
    color: "#ec4899", // Pink
    bgColor: "#fce7f3",
    accentColor: "#f9a8d4",
    icon: "🛡️",
    landscape: "Tường thành kiên cố bảo vệ dữ liệu với những chiếc khiên phát sáng rực rỡ",
    lessonIds: [11],
  },
  {
    id: 5,
    name: "Xưởng Sáng tạo",
    themeName: "Chủ đề 5: Ứng dụng tin học",
    description: "Thỏa sức vẽ tranh đồ họa màu sắc và tập soạn thảo văn bản tiếng Việt",
    color: "#10b981", // Mint / Emerald
    bgColor: "#d1fae5",
    accentColor: "#86efac",
    icon: "🎨",
    landscape: "Xưởng vẽ lung linh sắc màu pastel cùng những trang văn bản ngập tràn niềm vui",
    lessonIds: [12, 13, 14, 15],
  },
  {
    id: 6,
    name: "Vương quốc Giải quyết Vấn đề",
    themeName: "Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính",
    description: "Chia nhỏ nhiệm vụ thành các bước thuật toán và lập trình robot",
    color: "#f59e0b", // Amber / Vàng kem
    bgColor: "#fef3c7",
    accentColor: "#fde68a",
    icon: "🧩",
    landscape: "Lâu đài khối hộp logic nơi các chú robot chuyển động theo từng bước lệnh thông minh",
    lessonIds: [16],
  },
];

export const THEMES = LANDS;

export const LESSONS = [
  // CHỦ ĐỀ 1: MÁY TÍNH VÀ EM
  {
    id: 1,
    themeId: 1,
    title: "Bài 1: Thông tin và quyết định",
    landName: "Thành phố Máy tính",
    objectives: "Nhận biết được thông tin thu nhận được qua các giác quan và cách con người sử dụng thông tin để đưa ra quyết định hành động hợp lý.",
    summary: "Hằng ngày, chúng ta tiếp nhận rất nhiều thông tin qua các giác quan (mắt thấy, tai nghe, mũi ngửi, tay chạm...). Dựa vào thông tin thu nhận được, bộ não sẽ suy nghĩ và đưa ra các quyết định hành động tương ứng.",
    keyPoints: [
      "Thông tin là những hiểu biết ta thu nhận được từ thế giới xung quanh.",
      "Giác quan (mắt, tai, mũi, lưỡi, da) giúp con người thu nhận thông tin.",
      "Từ thông tin nhận được, bộ não suy nghĩ và đưa ra quyết định hành động đúng đắn.",
    ],
    examples: [
      "Ví dụ 1: Tiếng còi xe ô tô bíp bíp (Thông tin) -> Em bước gọn vào lề đường (Quyết định).",
      "Ví dụ 2: Nhìn đồng hồ chỉ 6 giờ 30 phút sáng (Thông tin) -> Em chuẩn bị cặp sách đến trường (Quyết định).",
    ],
    interactiveActivity: {
      type: "match",
      title: "Hoạt động: Đâu là Thông tin, đâu là Quyết định?",
      description: "Hãy quan sát: 'Trời đổ mưa rào' là Thông tin. 'Mặc áo mưa hoặc che ô' là Quyết định!",
    },
    gameLink: "sorter",
    gameNote: "Trò chơi: Phân loại Thông minh",
    questions: [
      {
        id: 1,
        question: "Em nghe thấy tiếng chuông báo thức reo vào buổi sáng và quyết định thức dậy để đi học. Tiếng chuông reo ở đây đóng vai trò là gì?",
        options: [
          "A. Là quyết định của em",
          "B. Là thông tin em thu nhận được qua tai",
          "C. Là một chiếc đồng hồ điện tử",
          "D. Là bài tập về nhà"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Tiếng chuông reo là thông tin dạng âm thanh truyền vào tai em. Từ thông tin đó, bộ não đưa ra quyết định thức dậy."
      },
      {
        id: 2,
        question: "Khi đi bộ qua đường, nhìn thấy đèn tín hiệu chuyển sang màu đỏ, em dừng lại. Đâu là QUYẾT ĐỊNH trong tình huống này?",
        options: [
          "A. Cột đèn giao thông đứng ở ngã tư",
          "B. Đèn giao thông chuyển màu đỏ",
          "C. Hành động dừng xe lại",
          "D. Con đường đông đúc"
        ],
        correctIndex: 2,
        explanation: "Đúng rồi! 'Dừng lại' chính là quyết định hành động của em sau khi mắt thu nhận thông tin đèn đỏ."
      },
      {
        id: 3,
        question: "Giác quan nào giúp em nhận biết được bức tranh vẽ một chú Robot Bé Bít màu tím rất đáng yêu?",
        options: [
          "A. Thị giác (mắt nhìn)",
          "B. Thính giác (tai nghe)",
          "C. Khứu giác (mũi ngửi)",
          "D. Vị giác (lưỡi nếm)"
        ],
        correctIndex: 0,
        explanation: "Rất chuẩn! Đôi mắt (thị giác) giúp chúng ta thu nhận thông tin dạng hình ảnh, đường nét và màu sắc."
      }
    ]
  },
  {
    id: 2,
    themeId: 1,
    title: "Bài 2: Xử lý thông tin",
    landName: "Thành phố Máy tính",
    objectives: "Nêu được các bước trong quy trình xử lý thông tin: tiếp nhận, xử lý và xuất kết quả. Nhận biết bộ não con người và thân máy tính (CPU) là nơi xử lý thông tin.",
    summary: "Con người tiếp nhận thông tin từ bên ngoài, bộ não xử lý thông tin đó và đưa ra hành động. Máy tính cũng hoạt động tương tự: có thiết bị thu nhận thông tin vào, bộ xử lý (CPU trong thân máy) và thiết bị xuất thông tin ra màn hình, loa.",
    keyPoints: [
      "Quy trình xử lý thông tin gồm 3 bước: Tiếp nhận -> Xử lý -> Xuất kết quả.",
      "Ở người: Giác quan tiếp nhận, bộ não xử lý, tay chân/lời nói xuất kết quả.",
      "Ở máy tính: Bàn phím/chuột nhập thông tin, thân máy (CPU) xử lý, màn hình/loa xuất thông tin.",
    ],
    examples: [
      "Ví dụ: Cô giáo hỏi '3 nhân 4 bằng mấy?' (Tiếp nhận) -> Em suy nghĩ tính toán (Xử lý) -> Em trả lời 'Dạ thưa cô bằng 12' (Xuất kết quả).",
    ],
    interactiveActivity: {
      type: "steps",
      title: "Hoạt động: Quy trình 3 bước",
      description: "Bấm bàn phím '2 + 5' (Vào) -> Thân máy tính tính toán (Xử lý) -> Màn hình hiện '7' (Ra).",
    },
    gameLink: "sequence",
    gameNote: "Trò chơi: Đội trưởng Trình tự",
    questions: [
      {
        id: 4,
        question: "Bộ phận nào trong cơ thể con người thực hiện việc xử lý thông tin và đưa ra quyết định?",
        options: [
          "A. Đôi bàn tay",
          "B. Bộ não",
          "C. Đôi mắt",
          "D. Trái tim"
        ],
        correctIndex: 1,
        explanation: "Hoan hô em! Bộ não chính là trung tâm điều khiển, tiếp nhận và suy nghĩ xử lý mọi thông tin của con người."
      },
      {
        id: 5,
        question: "Cô giáo đọc phép tính '3 + 5 = ?', em nhẩm trong đầu và nói 'bằng 8'. Việc em nhẩm trong đầu gọi là bước gì?",
        options: [
          "A. Tiếp nhận thông tin",
          "B. Xử lý thông tin",
          "C. Xuất thông tin ra",
          "D. Quên thông tin"
        ],
        correctIndex: 1,
        explanation: "Đúng rồi! Khi não bộ suy nghĩ, tính toán thì đó chính là quá trình xử lý thông tin."
      },
      {
        id: 6,
        question: "Trong bộ máy tính để bàn, bộ phận nào đóng vai trò như 'bộ não' xử lý mọi dữ liệu và câu lệnh?",
        options: [
          "A. Màn hình máy tính",
          "B. Bàn phím",
          "C. Thân máy tính (chứa bộ xử lý CPU)",
          "D. Con chuột máy tính"
        ],
        correctIndex: 2,
        explanation: "Chính xác! Thân máy tính chứa bộ xử lý (CPU), chính là bộ não kỳ diệu xử lý dữ liệu của máy tính."
      }
    ]
  },
  {
    id: 3,
    themeId: 1,
    title: "Bài 3: Máy tính – người bạn mới",
    landName: "Thành phố Máy tính",
    objectives: "Kể tên và nêu được chức năng 4 bộ phận cơ bản của máy tính để bàn; nhận biết máy tính xách tay và máy tính bảng.",
    summary: "Máy tính để bàn gồm 4 bộ phận cơ bản: Thân máy (xử lý), Màn hình (hiển thị hình ảnh/chữ viết), Bàn phím (nhập chữ và ký hiệu), và Chuột (điều khiển con trỏ). Ngoài ra còn có máy tính xách tay (Laptop) và máy tính bảng tiện lợi.",
    keyPoints: [
      "Màn hình: hiển thị kết quả làm việc của máy tính cho mắt em nhìn thấy.",
      "Thân máy: chứa bộ xử lý CPU, điều khiển mọi hoạt động của máy tính.",
      "Bàn phím: giúp em gõ chữ cái, chữ số và gửi các lệnh vào máy tính.",
      "Chuột: giúp em chỉ trỏ, chọn và mở các chương trình một cách dễ dàng.",
    ],
    examples: [
      "Máy tính xách tay tích hợp cả màn hình, bàn phím và vùng cảm ứng chuột trên cùng một khối nhỏ gọn.",
    ],
    interactiveActivity: {
      type: "assembly",
      title: "Hoạt động: Lắp ráp 4 bộ phận",
      description: "Thân máy + Màn hình + Bàn phím + Chuột = Bộ máy tính để bàn hoàn chỉnh!",
    },
    gameLink: "assembly",
    gameNote: "Trò chơi: Lắp ráp máy tính",
    questions: [
      {
        id: 7,
        question: "Một bộ máy tính để bàn thông thường gồm có bao nhiêu bộ phận cơ bản?",
        options: [
          "A. 2 bộ phận",
          "B. 3 bộ phận",
          "C. 4 bộ phận (Màn hình, Thân máy, Bàn phím, Chuột)",
          "D. 6 bộ phận"
        ],
        correctIndex: 2,
        explanation: "Xuất sắc! Máy tính để bàn gồm 4 bộ phận quen thuộc: Màn hình, Thân máy, Bàn phím và Chuột."
      },
      {
        id: 8,
        question: "Bộ phận nào của máy tính giúp em nhìn thấy chữ viết, hình vẽ và xem video hoạt hình?",
        options: [
          "A. Bàn phím",
          "B. Chuột",
          "C. Thân máy",
          "D. Màn hình"
        ],
        correctIndex: 3,
        explanation: "Chính xác! Màn hình máy tính là thiết bị hiển thị hình ảnh, chữ viết cho chúng ta quan sát."
      },
      {
        id: 9,
        question: "Máy tính xách tay (Laptop) khác máy tính để bàn ở điểm nổi bật nào?",
        options: [
          "A. Không có màn hình",
          "B. Các bộ phận được tích hợp gọn gàng trong một khối, có pin sạc dễ mang theo",
          "C. Không cần dùng điện",
          "D. Chỉ dành cho người lớn"
        ],
        correctIndex: 1,
        explanation: "Đúng rồi! Laptop tích hợp màn hình, bàn phím và vùng chuột cảm ứng rất tiện mang theo học tập."
      }
    ]
  },
  {
    id: 4,
    themeId: 1,
    title: "Bài 4: Làm việc với máy tính",
    landName: "Thành phố Máy tính",
    objectives: "Thực hiện đúng tư thế ngồi học máy tính, quy trình bật và tắt máy tính an toàn, bảo vệ mắt và sức khỏe.",
    summary: "Khi ngồi học máy tính, em cần ngồi thẳng lưng, mắt cách màn hình từ 50cm đến 80cm, phòng học đủ ánh sáng. Bật máy bằng nút nguồn trên thân máy và màn hình. Khi nghỉ học, tắt máy đúng quy trình: Start -> Power -> Shut down.",
    keyPoints: [
      "Tư thế ngồi chuẩn: lưng thẳng, hai chân đặt thoải mái trên sàn, mắt nhìn ngang tầm màn hình.",
      "Khoảng cách từ mắt đến màn hình từ 50cm đến 80cm (khoảng một sải tay trẻ em).",
      "Nghỉ ngơi mắt và vận động nhẹ sau mỗi 30 - 45 phút học tập.",
      "Tắt máy đúng cách bằng nút Start -> Power -> Shut down, không tự ý rút phích cắm điện đột ngột.",
    ],
    examples: [
      "Ngồi sai tư thế (gù lưng, cúi sát mắt) sẽ dẫn đến cận thị và cong vẹo cột sống.",
    ],
    interactiveActivity: {
      type: "checklist",
      title: "Hoạt động: Kiểm tra tư thế an toàn",
      description: "Lưng thẳng ✓ - Mắt cách 60cm ✓ - Phòng sáng ✓ - Chân chạm đất ✓.",
    },
    gameLink: "safety",
    gameNote: "Trò chơi: Thám tử An toàn số",
    questions: [
      {
        id: 10,
        question: "Khoảng cách an toàn và chuẩn nhất từ mắt đến màn hình máy tính là bao nhiêu?",
        options: [
          "A. Khoảng 10cm đến 20cm (cúi sát mắt)",
          "B. Khoảng 50cm đến 80cm (khoảng một sải tay)",
          "C. Càng xa càng tốt trên 3 mét",
          "D. Nằm ngửa để máy tính sát mặt"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Khoảng cách 50cm - 80cm giúp mắt không bị mỏi và bảo vệ thị lực tốt nhất."
      },
      {
        id: 11,
        question: "Cách nào sau đây là tắt máy tính an toàn và đúng quy trình nhất?",
        options: [
          "A. Rút ngay phích cắm điện ra khỏi ổ cắm",
          "B. Nhấn giữ nút nguồn thật lâu hoặc ngắt cầu dao",
          "C. Dùng chuột nhấp vào nút Start -> chọn Power -> chọn Shut down",
          "D. Đóng màn hình rồi bỏ đi chơi"
        ],
        correctIndex: 2,
        explanation: "Rất giỏi! Luôn chọn nút Start -> Power -> Shut down để hệ điều hành lưu lại dữ liệu an toàn trước khi tắt máy."
      },
      {
        id: 12,
        question: "Sau khoảng bao lâu ngồi trước màn hình máy tính, em nên nghỉ ngơi và tập thể dục cho mắt?",
        options: [
          "A. Cứ ngồi liên tục 5 tiếng",
          "B. Sau khoảng 30 đến 45 phút học tập",
          "C. Đến khi nào mắt đau nhức mới nghỉ",
          "D. Không bao giờ cần nghỉ"
        ],
        correctIndex: 1,
        explanation: "Đúng rồi! Cứ sau 30-45 phút, em nên đứng dậy vận động nhẹ và nhìn ra xa để mắt được thư giãn."
      }
    ]
  },
  {
    id: 5,
    themeId: 1,
    title: "Bài 5: Sử dụng bàn phím và chuột máy tính",
    landName: "Thành phố Máy tính",
    objectives: "Nêu được các thao tác cơ bản với chuột; xác định được hàng phím cơ sở và hai phím mốc F, J có gờ nổi.",
    summary: "Chuột có nút trái, nút phải và bánh lăn. Bốn thao tác chuột: nhấp chuột, nhấp đúp, nhấp chuột phải và kéo thả. Bàn phím có khu vực hàng phím cơ sở với hai phím F và J có gờ nổi làm mốc đặt hai ngón tay trỏ.",
    keyPoints: [
      "Cầm chuột bằng tay phải: ngón trỏ đặt nút trái, ngón giữa đặt nút phải.",
      "Hàng phím cơ sở gồm: A, S, D, F, G, H, J, K, L, ;",
      "Hai phím F và J có gờ nổi đặc biệt để đặt 2 ngón tay trỏ làm mốc chuẩn.",
      "Phím cách (Space) dài nhất ở dưới cùng do hai ngón tay cái đảm nhiệm.",
    ],
    examples: [
      "Nhấp đúp chuột trái vào biểu tượng một trò chơi để khởi động trò chơi đó.",
    ],
    interactiveActivity: {
      type: "hand_position",
      title: "Hoạt động: Đặt ngón tay lên bàn phím",
      description: "Tay trái: A (út), S (áp út), D (giữa), F (trỏ). Tay phải: J (trỏ), K (giữa), L (áp út), ; (út).",
    },
    gameLink: "keyboard",
    gameNote: "Trò chơi: Giải cứu Bàn phím",
    questions: [
      {
        id: 13,
        question: "Trên hàng phím cơ sở của bàn phím, hai phím nào có GỜ NỔI để đặt hai ngón tay trỏ?",
        options: [
          "A. Phím A và phím L",
          "B. Phím F và phím J",
          "C. Phím G và phím H",
          "D. Phím Enter và Space"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Phím F và phím J có dấu gờ nổi đặc biệt giúp em đặt đúng ngón trỏ mà không cần nhìn bàn phím."
      },
      {
        id: 14,
        question: "Khi cầm chuột bằng tay phải, ngón tay trỏ của em sẽ đặt lên nút nào của chuột?",
        options: [
          "A. Nút chuột trái",
          "B. Nút chuột phải",
          "C. Bánh lăn ở giữa",
          "D. Đặt dưới đáy con chuột"
        ],
        correctIndex: 0,
        explanation: "Rất chuẩn! Ngón trỏ đặt lên nút chuột trái, ngón giữa đặt lên nút chuột phải để thao tác thuận tiện."
      },
      {
        id: 15,
        question: "Thao tác nhấn nhanh nút chuột trái HAI LẦN LIÊN TIẾP rồi thả ra được gọi là gì?",
        options: [
          "A. Kéo thả chuột",
          "B. Nhấp chuột (Click)",
          "C. Nhấp đúp chuột (Double click)",
          "D. Cuộn chuột"
        ],
        correctIndex: 2,
        explanation: "Hoàn hảo! Nhấp nút trái hai lần nhanh liên tiếp gọi là nhấp đúp chuột (double click), thường dùng để mở phần mềm."
      }
    ]
  },

  // CHỦ ĐỀ 2: MẠNG MÁY TÍNH VÀ INTERNET
  {
    id: 6,
    themeId: 2,
    title: "Bài 6: Khám phá Internet",
    landName: "Khu vườn Thông tin",
    objectives: "Nêu được khái niệm đơn giản về Internet; kể tên một số lợi ích và trình duyệt web quen thuộc.",
    summary: "Internet là mạng máy tính toàn cầu kết nối hàng triệu thiết bị trên khắp thế giới. Internet giống như một kho báu tri thức khổng lồ giúp em tìm tài liệu học tập, xem bài giảng khoa học, nghe nhạc và liên lạc với người thân.",
    keyPoints: [
      "Internet kết nối các máy tính trên khắp thế giới lại với nhau.",
      "Giúp tìm kiếm thông tin, xem tranh ảnh khoa học, học ngoại ngữ.",
      "Trình duyệt web (Google Chrome, Cốc Cốc, Edge) là phần mềm giúp em vào xem các trang web.",
      "Cần có sự hướng dẫn và đồng hành của người lớn khi học sinh lớp 3 sử dụng Internet.",
    ],
    examples: [
      "Gõ vào ô tìm kiếm: 'Hình ảnh chú chim cánh cụt ở Nam Cực' trên Google để khám phá thế giới tự nhiên.",
    ],
    interactiveActivity: {
      type: "browser",
      title: "Hoạt động: Nhận diện biểu tượng trình duyệt web",
      description: "Google Chrome hình vòng tròn 3 màu; Cốc Cốc hình chữ c màu xanh lá; Edge hình lốc xoáy biển xanh.",
    },
    gameLink: "shield",
    gameNote: "Trò chơi: Chiếc khiên Internet",
    questions: [
      {
        id: 16,
        question: "Internet là gì?",
        options: [
          "A. Là một trò chơi điện tử trên điện thoại",
          "B. Là mạng máy tính toàn cầu kết nối hàng triệu máy tính với nhau",
          "C. Là một chiếc màn hình tivi lớn",
          "D. Là phần mềm vẽ tranh"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Internet là mạng kết nối toàn cầu, giúp trao đổi và chia sẻ thông tin khắp năm châu."
      },
      {
        id: 17,
        question: "Lợi ích tuyệt vời của Internet đối với học sinh lớp 3 là gì?",
        options: [
          "A. Tìm kiếm tranh ảnh khoa học, học tiếng Anh và mở rộng tri thức",
          "B. Thức thâu đêm để chơi game bạo lực",
          "C. Bấm vào mọi đường link lạ trên mạng",
          "D. Không cần đi học ở trường nữa"
        ],
        correctIndex: 0,
        explanation: "Đúng rồi! Internet là thư viện khổng lồ giúp em tra cứu kiến thức học tập và khám phá thế giới bổ ích."
      },
      {
        id: 18,
        question: "Phần mềm nào sau đây giúp em truy cập và xem các trang web trên Internet (trình duyệt web)?",
        options: [
          "A. Google Chrome, Cốc Cốc, Microsoft Edge",
          "B. Phần mềm Paint",
          "C. Máy tính bỏ túi Calculator",
          "D. Bộ gõ Unikey"
        ],
        correctIndex: 0,
        explanation: "Rất chuẩn! Google Chrome, Cốc Cốc, Edge hay Safari là các trình duyệt web phổ biến hiện nay."
      }
    ]
  },
  {
    id: 7,
    themeId: 2,
    title: "Bài 7: Thông tin trên Internet",
    landName: "Khu vườn Thông tin",
    objectives: "Nhận biết được thông tin trên Internet có nhiều dạng (văn bản, hình ảnh, âm thanh, video) và biết chọn lọc thông tin đáng tin cậy.",
    summary: "Thông tin trên Internet rất phong phú và đa dạng. Tuy nhiên, không phải thông tin nào trên mạng cũng đúng sự thật. Em cần biết chọn lọc nguồn thông tin chính thống từ nhà trường, thầy cô, bố mẹ và tránh xa các nội dung xấu độc.",
    keyPoints: [
      "Thông tin trên Internet có 4 dạng chính: chữ viết (văn bản), hình ảnh, âm thanh, video.",
      "Có nhiều thông tin bổ ích nhưng cũng có thông tin sai lệch, lừa đảo.",
      "Khi gặp nội dung lạ, đáng sợ hoặc quảng cáo rủ nộp tiền, hãy đóng lại và báo ngay cho bố mẹ.",
    ],
    examples: [
      "Bài giảng điện tử của cô giáo trên website trường học là nguồn thông tin tin cậy, chính xác.",
    ],
    interactiveActivity: {
      type: "filter",
      title: "Hoạt động: Đèn xanh thông tin đúng - Đèn đỏ thông tin xấu",
      description: "Trang web học tập Bộ GD&ĐT: Đèn xanh ✓. Link lạ trúng thưởng nộp tiền: Đèn đỏ ❌.",
    },
    gameLink: "safety",
    gameNote: "Trò chơi: Thám tử An toàn số",
    questions: [
      {
        id: 19,
        question: "Thông tin trên mạng Internet được thể hiện dưới những dạng nào?",
        options: [
          "A. Chỉ có chữ viết đơn thuần",
          "B. Văn bản (chữ), hình ảnh, âm thanh và video sống động",
          "C. Chỉ có giọng nói ghi âm",
          "D. Không có dạng nào cả"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Internet có đầy đủ văn bản, hình ảnh, âm thanh và những đoạn video clip phong phú."
      },
      {
        id: 20,
        question: "Khi lướt web, bất ngờ xuất hiện quảng cáo lạ có hình ảnh kinh dị hoặc rủ rê nộp tiền, em nên làm gì?",
        options: [
          "A. Nhấp vào xem ngay vì tò mò",
          "B. Tải về máy và gửi cho các bạn cùng lớp",
          "C. Đóng trang web đó lại và báo ngay cho người lớn (bố mẹ, thầy cô)",
          "D. Lấy tiền mừng tuổi để nộp vào"
        ],
        correctIndex: 2,
        explanation: "Rất thông minh! Luôn đóng nội dung xấu lại và thông báo với người lớn để bảo vệ an toàn cho em."
      },
      {
        id: 21,
        question: "Trang web nào sau đây là nguồn thông tin an toàn, đáng tin cậy cho học sinh?",
        options: [
          "A. Các trang web giáo dục của nhà trường, Bộ Giáo dục, hoặc sách báo thiếu nhi uy tín",
          "B. Các trang web cá độ, cờ bạc không rõ nguồn gốc",
          "C. Các trang web yêu cầu nhập mật khẩu ngân hàng của bố mẹ",
          "D. Các đường link lạ được người lạ gửi trong hòm thư"
        ],
        correctIndex: 0,
        explanation: "Đúng rồi! Chỉ nên xem thông tin từ các trang web giáo dục uy tín và được thầy cô, bố mẹ hướng dẫn."
      }
    ]
  },

  // CHỦ ĐỀ 3: TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN
  {
    id: 8,
    themeId: 3,
    title: "Bài 8: Sắp xếp để dễ tìm",
    landName: "Hành tinh Tổ chức Dữ liệu",
    objectives: "Hiểu được lợi ích của việc sắp xếp đồ vật và dữ liệu có quy tắc, ngăn nắp để tìm kiếm nhanh chóng và thuận tiện.",
    summary: "Trong cuộc sống và trên máy tính, khi đồ vật hay dữ liệu được sắp xếp ngăn nắp, phân chia theo từng nhóm công dụng hoặc theo bảng chữ cái thì việc tìm kiếm sẽ vô cùng nhanh chóng, dễ dàng và tiết kiệm thời gian.",
    keyPoints: [
      "Sắp xếp có quy tắc giúp tiết kiệm thời gian và công sức khi tìm kiếm.",
      "Có thể sắp xếp theo: loại đồ dùng, màu sắc, kích thước, hoặc thứ tự chữ cái A-B-C.",
      "Giữ gìn góc học tập và dữ liệu máy tính luôn gọn gàng.",
    ],
    examples: [
      "Tủ thuốc gia đình: thuốc đau bụng một ngăn, bông băng gạc một ngăn -> khi cần là lấy được ngay.",
    ],
    interactiveActivity: {
      type: "organize",
      title: "Hoạt động: Xếp giá sách lớp 3",
      description: "Ngăn 1: Sách giáo khoa; Ngăn 2: Vở bài tập; Ngăn 3: Hộp bút màu.",
    },
    gameLink: "sorter",
    gameNote: "Trò chơi: Phân loại Thông minh",
    questions: [
      {
        id: 22,
        question: "Vì sao chúng ta nên sắp xếp sách vở trên giá sách gọn gàng theo từng môn học?",
        options: [
          "A. Để khi cần tìm quyển sách môn đó sẽ nhanh chóng và không mất thời gian tìm kiếm",
          "B. Để cho giá sách trông nặng nề hơn",
          "C. Để không ai lấy được sách",
          "D. Để không phải học bài nữa"
        ],
        correctIndex: 0,
        explanation: "Chính xác! Sắp xếp ngăn nắp, có trật tự giúp chúng ta tìm kiếm đồ vật cực kỳ dễ dàng."
      },
      {
        id: 23,
        question: "Trong tủ đồ dùng học tập, cách sắp xếp nào sau đây là hợp lý và khoa học nhất?",
        options: [
          "A. Vứt chung tất cả bút, tẩy, kéo, sách vào một đống lộn xộn",
          "B. Phân loại: hộp bút riêng, sách giáo khoa riêng, vở bài tập riêng theo từng ngăn",
          "C. Bỏ sách vở dưới gầm giường",
          "D. Xé nhỏ giấy ra để dễ tìm"
        ],
        correctIndex: 1,
        explanation: "Rất chuẩn! Phân loại theo từng nhóm công dụng giúp bảo quản đồ dùng bền đẹp và dễ tìm."
      },
      {
        id: 24,
        question: "Khi sắp xếp danh sách tên các bạn trong lớp theo thứ tự nào thì cô giáo sẽ dễ tìm nhất?",
        options: [
          "A. Xếp lung tung không theo quy luật",
          "B. Thứ tự bảng chữ cái Tiếng Việt (A, B, C...)",
          "C. Bạn nào cao đứng trước",
          "D. Bạn nào ăn nhanh đứng trước"
        ],
        correctIndex: 1,
        explanation: "Đúng rồi! Danh sách sắp xếp theo bảng chữ cái A-B-C là cách sắp xếp mẫu mực giúp tra cứu tên rất nhanh."
      }
    ]
  },
  {
    id: 9,
    themeId: 3,
    title: "Bài 9: Sơ đồ hình cây. Tệp và thư mục",
    landName: "Hành tinh Tổ chức Dữ liệu",
    objectives: "Hiểu được cách tổ chức thông tin theo sơ đồ hình cây; phân biệt được Tệp (File) và Thư mục (Folder) trong máy tính.",
    summary: "Để sắp xếp thông tin trong máy tính, người ta dùng Sơ đồ hình cây. Thư mục mẹ chứa các thư mục con, trong thư mục chứa các tệp. Thư mục giống như chiếc cặp sách hoặc ngăn tủ, còn tệp giống như từng quyển vở hay bức tranh cụ thể.",
    keyPoints: [
      "Sơ đồ hình cây gồm gốc (thư mục mẹ) tỏa ra các cành nhánh (thư mục con và tệp).",
      "Thư mục (Folder) có biểu tượng kẹp hồ sơ màu vàng cam, dùng để chứa tệp và thư mục khác.",
      "Tệp (File) là đơn vị lưu trữ nội dung cụ thể: bài hát (.mp3), bài văn (.docx), tranh vẽ (.png).",
    ],
    examples: [
      "Thư mục [HỌC TẬP] chứa 2 thư mục con: [Toán] và [Tiếng Việt]. Trong [Toán] có tệp 'Baitap.docx'.",
    ],
    interactiveActivity: {
      type: "tree_view",
      title: "Hoạt động: Quan sát cây thư mục",
      description: "Gốc: Ổ đĩa D -> Thư mục mẹ [Lớp 3] -> Thư mục con [Tập vẽ] -> Tệp 'Ngoinha.png'.",
    },
    gameLink: "folderRescue",
    gameNote: "Trò chơi: Giải cứu Tệp và Thư mục",
    questions: [
      {
        id: 25,
        question: "Biểu tượng của Thư mục (Folder) trong hệ điều hành Windows thường có hình gì và màu gì?",
        options: [
          "A. Hình kẹp giấy màu vàng cam",
          "B. Hình nốt nhạc màu đỏ",
          "C. Hình chiếc bút chì màu đen",
          "D. Hình ngôi sao màu trắng"
        ],
        correctIndex: 0,
        explanation: "Chính xác! Thư mục thường có biểu tượng chiếc kẹp hồ sơ màu vàng cam đặc trưng."
      },
      {
        id: 26,
        question: "Nếu ví 'Cặp sách' là một Thư mục lớn, thì các cuốn sách 'Toán 3', 'Tiếng Việt 3' bên trong tương ứng là gì?",
        options: [
          "A. Là các màn hình máy tính",
          "B. Là các tệp (file) hoặc thư mục con chứa kiến thức",
          "C. Là con chuột máy tính",
          "D. Là dây cắm điện"
        ],
        correctIndex: 1,
        explanation: "Đúng rồi! Thư mục dùng để chứa các tệp và các thư mục nhỏ hơn, y hệt như chiếc cặp sách của em."
      },
      {
        id: 27,
        question: "Sơ đồ hình cây có đặc điểm phân cấp như thế nào?",
        options: [
          "A. Chỉ có một đường thẳng tắp",
          "B. Có gốc/mục chính, từ đó rẽ ra các nhánh/thư mục con, và tiếp tục phân nhánh",
          "C. Là một vòng tròn kín không có lối ra",
          "D. Chỉ vẽ hình bông hoa"
        ],
        correctIndex: 1,
        explanation: "Rất chuẩn! Sơ đồ hình cây phát triển từ gốc rễ tỏa ra các cành nhánh, giúp quản lý dữ liệu cực kỳ mạch lạc."
      }
    ]
  },
  {
    id: 10,
    themeId: 3,
    title: "Bài 10: Thực hành với tệp và thư mục",
    landName: "Hành tinh Tổ chức Dữ liệu",
    objectives: "Biết cách tạo thư mục mới, mở thư mục, đặt tên và đổi tên thư mục khoa học, xóa thư mục khi không dùng.",
    summary: "Thực hành thao tác tạo thư mục mới (New Folder) bằng cách nhấp chuột phải vào chỗ trống -> New -> Folder. Đặt tên thư mục ngắn gọn, rõ nghĩa không chứa ký tự đặc biệt. Biết đổi tên (Rename) và xóa bỏ (Delete) thư mục rác.",
    keyPoints: [
      "Tạo thư mục: Nhấp chuột phải -> chọn New -> chọn Folder.",
      "Tên thư mục nên viết tiếng Việt không dấu hoặc có dấu rõ ràng (ví dụ: 'Tap_ve', 'Bai_hoc_lop_3').",
      "Đổi tên thư mục: Nhấp chuột phải vào thư mục -> chọn Rename.",
      "Xóa thư mục: Nhấp chuột phải -> chọn Delete (hoặc nhấn phím Delete trên bàn phím).",
    ],
    examples: [
      "Tạo thư mục mang tên mình 'Nguyen_Van_An_Lop_3A' để lưu trữ các bài thực hành trên lớp.",
    ],
    interactiveActivity: {
      type: "folder_actions",
      title: "Hoạt động: Thử tài phím tắt",
      description: "Nhấp đúp chuột trái = Mở thư mục. Phím F2 = Đổi tên thư mục. Phím Delete = Xóa.",
    },
    gameLink: "folderRescue",
    gameNote: "Trò chơi: Giải cứu Tệp và Thư mục",
    questions: [
      {
        id: 28,
        question: "Để tạo một Thư mục mới trên màn hình nền máy tính, em thực hiện thao tác nào?",
        options: [
          "A. Nhấp chuột phải vào chỗ trống -> chọn New -> chọn Folder",
          "B. Nhấn phím cách Space 10 lần",
          "C. Tắt màn hình máy tính rồi bật lại",
          "D. Rút chuột máy tính ra cắm lại"
        ],
        correctIndex: 0,
        explanation: "Chính xác! Nhấp chuột phải vào khoảng trống -> New -> Folder là thao tác chuẩn để tạo thư mục mới."
      },
      {
        id: 29,
        question: "Tên thư mục nào sau đây được đặt một cách khoa học, rõ ràng và dễ nhớ?",
        options: [
          "A. asdasd12345",
          "B. Bài vẽ lớp 3 của Lan",
          "C. ???***///",
          "D. a"
        ],
        correctIndex: 1,
        explanation: "Rất tốt! Tên thư mục rõ ràng như 'Bài vẽ lớp 3 của Lan' giúp em nhận biết ngay nội dung chứa bên trong."
      },
      {
        id: 30,
        question: "Khi không còn sử dụng một thư mục rác nữa, lệnh nào giúp em xóa thư mục đó đi?",
        options: [
          "A. Open (Mở)",
          "B. Copy (Sao chép)",
          "C. Delete (Xóa)",
          "D. Rename (Đổi tên)"
        ],
        correctIndex: 2,
        explanation: "Đúng rồi! Lệnh Delete (hoặc nhấn phím Delete trên bàn phím) sẽ giúp xóa bỏ thư mục không cần thiết."
      }
    ]
  },

  // CHỦ ĐỀ 4: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HÓA TRONG MÔI TRƯỜNG SỐ
  {
    id: 11,
    themeId: 4,
    title: "Bài 11: Bảo vệ thông tin cá nhân và an toàn trên mạng",
    landName: "Thành phố An toàn Số",
    objectives: "Nêu được ví dụ về thông tin cá nhân cần bảo mật; nhận biết các nguy cơ khi chia sẻ thông tin cho người lạ; có hành vi văn hóa trên mạng.",
    summary: "Thông tin cá nhân gồm: Họ tên đầy đủ, ngày sinh, địa chỉ nhà, số điện thoại, trường lớp, mật khẩu và ảnh riêng tư. Em TUYỆT ĐỐI không chia sẻ các thông tin này cho người lạ trên mạng. Luôn nói lời lịch sự, không bắt nạt hay nói xấu bạn bè.",
    keyPoints: [
      "Thông tin cá nhân là bí mật riêng tư cần được bảo vệ cẩn thận.",
      "Mật khẩu tài khoản chỉ chia sẻ với bố mẹ, không cho bạn bè hay người lạ biết.",
      "Không bao giờ đồng ý gặp mặt riêng người quen qua mạng.",
      "Giao tiếp lịch sự, văn minh, tôn trọng người khác trong môi trường số.",
    ],
    examples: [
      "Có người lạ nhắn tin hứa tặng kim cương trong game nếu gửi mật khẩu -> Em từ chối ngay và báo bố mẹ.",
    ],
    interactiveActivity: {
      type: "shield_quiz",
      title: "Hoạt động: Dựng khiên bảo vệ",
      description: "Mật khẩu mạnh: Chứa cả chữ cái, chữ số và không dễ đoán như '123456'.",
    },
    gameLink: "shield",
    gameNote: "Trò chơi: Chiếc khiên Internet",
    questions: [
      {
        id: 31,
        question: "Điều nào sau đây thuộc về THÔNG TIN CÁ NHÂN cần được giữ bí mật?",
        options: [
          "A. Họ tên đầy đủ, địa chỉ nhà, số điện thoại và mật khẩu tài khoản",
          "B. Tên một bài hát thiếu nhi vui nhộn",
          "C. Tên nhân vật hoạt hình Doraemon",
          "D. Bảng cửu chương nhân 5"
        ],
        correctIndex: 0,
        explanation: "Chính xác! Họ tên, địa chỉ nhà, số điện thoại và mật khẩu là dữ liệu cá nhân quan trọng cần bảo mật."
      },
      {
        id: 32,
        question: "Một người lạ trên mạng nhắn tin: 'Cho bạn nick game miễn phí, hãy gửi mật khẩu và địa chỉ nhà cho mình nhé!'. Em sẽ làm gì?",
        options: [
          "A. Gửi ngay lập tức vì ham quà",
          "B. Không gửi bất cứ thông tin nào, chặn người đó và báo ngay cho bố mẹ",
          "C. Gửi thêm số điện thoại của bố mẹ",
          "D. Rủ các bạn khác gửi theo"
        ],
        correctIndex: 1,
        explanation: "Rất thông minh! Đây là cạm bẫy của kẻ xấu. Tuyệt đối không cung cấp thông tin và phải báo người lớn ngay."
      },
      {
        id: 33,
        question: "Hành vi nào sau đây thể hiện là một học sinh văn minh, lịch sự khi sử dụng Internet?",
        options: [
          "A. Dùng lời lẽ thô tục để trêu chọc bạn bè",
          "B. Lấy trộm ảnh của người khác đăng lên mạng bêu xấu",
          "C. Chào hỏi lễ phép, tôn trọng mọi người và chỉ chia sẻ những điều tốt đẹp",
          "D. Đăng tin đồn sai sự thật"
        ],
        correctIndex: 2,
        explanation: "Hoan hô em! Luôn giữ thái độ tôn trọng, lịch sự và tử tế khi giao tiếp trên môi trường mạng."
      }
    ]
  },

  // CHỦ ĐỀ 5: ỨNG DỤNG TIN HỌC
  {
    id: 12,
    themeId: 5,
    title: "Bài 12: Làm quen với phần mềm đồ họa",
    landName: "Xưởng Sáng tạo",
    objectives: "Nhận biết biểu tượng phần mềm đồ họa (Paint); làm quen với giao diện, thanh công cụ, hộp hình mẫu và bảng màu.",
    summary: "Phần mềm đồ họa (như MS Paint) giúp em vẽ tranh đầy màu sắc trên máy tính. Em sẽ làm quen với thanh công cụ: bút vẽ (Pencil), tẩy (Eraser), nhóm hình mẫu có sẵn (Shapes) như hình tròn, chữ nhật, đường thẳng và bảng màu (Color palette).",
    keyPoints: [
      "Phần mềm đồ họa giúp học sinh vẽ hình, tô màu sáng tạo trên máy tính.",
      "Công cụ Bút vẽ (Pencil/Brush): vẽ nét tự do bằng cách kéo giữ chuột.",
      "Công cụ Tẩy (Eraser): xóa những nét vẽ bị nhầm.",
      "Bảng màu (Colors): nhấp chuột trái để chọn màu vẽ nét.",
    ],
    examples: [
      "Chọn công cụ Hình chữ nhật và màu xanh pastel để vẽ thân chú robot Bé Bít.",
    ],
    interactiveActivity: {
      type: "tool_pick",
      title: "Hoạt động: Chọn đúng công cụ",
      description: "Cần vẽ mặt trời tròn xoe? -> Chọn công cụ Hình tròn (Oval/Circle) trong nhóm Shapes!",
    },
    gameLink: "paint",
    gameNote: "Trò chơi: Họa sĩ nhí",
    questions: [
      {
        id: 34,
        question: "Công cụ Tẩy (Eraser) trong phần mềm đồ họa có công dụng gì?",
        options: [
          "A. Vẽ hình ngôi sao",
          "B. Tô màu cho toàn bộ trang vẽ",
          "C. Xóa đi các chi tiết vẽ sai hoặc không cần thiết",
          "D. Phóng to hình ảnh"
        ],
        correctIndex: 2,
        explanation: "Chính xác! Tẩy (Eraser) giúp xóa nét vẽ thừa hoặc chi tiết vẽ nhầm một cách nhanh chóng."
      },
      {
        id: 35,
        question: "Để chọn màu sắc tô cho nét vẽ của chú robot, em nhấp chuột vào khu vực nào?",
        options: [
          "A. Bảng màu (Colors palette)",
          "B. Nút nguồn máy tính",
          "C. Thanh cuộn trang giấy",
          "D. Nút đóng cửa sổ phần mềm"
        ],
        correctIndex: 0,
        explanation: "Rất chuẩn! Bảng màu chứa rất nhiều ô màu sắc rực rỡ để em tùy ý lựa chọn cho tác phẩm."
      },
      {
        id: 36,
        question: "Trong phần mềm đồ họa, để vẽ được một hình chữ nhật hay hình tròn đều đẹp, em sử dụng nhóm công cụ nào?",
        options: [
          "A. Nhóm công cụ Hình mẫu có sẵn (Shapes)",
          "B. Công cụ gõ chữ Text",
          "C. Công cụ Tẩy nét vẽ",
          "D. Kính lúp phóng to"
        ],
        correctIndex: 0,
        explanation: "Đúng rồi! Nhóm Shapes cung cấp các hình học mẫu như hình tròn, chữ nhật, tam giác, ngôi sao..."
      }
    ]
  },
  {
    id: 13,
    themeId: 5,
    title: "Bài 13: Thực hành vẽ hình và tô màu",
    landName: "Xưởng Sáng tạo",
    objectives: "Kết hợp các hình mẫu và công cụ tô màu để vẽ bức tranh hoàn chỉnh; biết lưu bức tranh vào máy tính.",
    summary: "Em sẽ áp dụng các công cụ hình khối và tô màu để vẽ ngôi nhà mơ ước, lá cờ tổ quốc hay chú robot Bé Bít. Lưu ý quan trọng: các nét vẽ bao quanh phải thật KHÉP KÍN thì khi đổ màu sơn mới không bị tràn ra khắp màn hình.",
    keyPoints: [
      "Công cụ Thùng sơn (Fill with color) giúp đổ màu nhanh vào vùng kín.",
      "Đường viền phải khép kín, nếu có khe hở thì màu sẽ tràn ra ngoài.",
      "Nhấn giữ phím Shift khi vẽ hình chữ nhật hoặc hình elip sẽ tạo thành hình vuông hoặc hình tròn hoàn hảo.",
      "Lưu bài vẽ: chọn File -> Save (hoặc nhấn Ctrl + S) để lưu thành tệp ảnh.",
    ],
    examples: [
      "Vẽ ngôi nhà: Hình tam giác làm mái nhà + Hình chữ nhật làm thân nhà + Hình vuông nhỏ làm cửa sổ.",
    ],
    interactiveActivity: {
      type: "color_flood",
      title: "Hoạt động: Nối kín nét trước khi tô",
      description: "Nếu thấy màu tràn ra ngoài -> Bấm Ctrl + Z để quay lại, dùng bút nối kín khe hở rồi đổ màu lại!",
    },
    gameLink: "paint",
    gameNote: "Trò chơi: Họa sĩ nhí",
    questions: [
      {
        id: 37,
        question: "Khi em đổ màu vào một hình tròn nhưng màu lại bị tràn ra khắp màn hình trang vẽ, nguyên nhân vì sao?",
        options: [
          "A. Vì máy tính bị hết pin",
          "B. Vì đường viền của hình tròn chưa khép kín (có khe hở nét vẽ)",
          "C. Vì chọn màu đỏ quá đậm",
          "D. Vì con chuột bị hỏng"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Khi đường viền có khe hở, màu vẽ sẽ bị tràn ra ngoài. Em chỉ cần dùng bút nối kín lại là được!"
      },
      {
        id: 38,
        question: "Để lưu lại bức tranh vừa vẽ xong vào máy tính, em nhấp vào biểu tượng nào?",
        options: [
          "A. Biểu tượng đĩa mềm (Save) hoặc vào File -> Save",
          "B. Biểu tượng dấu nhân đỏ (Close) để tắt luôn",
          "C. Biểu tượng thùng rác",
          "D. Biểu tượng chiếc kéo Cut"
        ],
        correctIndex: 0,
        explanation: "Rất chuẩn! Nút Save (hình đĩa mềm) giúp lưu giữ bức tranh của em lại trên máy tính an toàn."
      },
      {
        id: 39,
        question: "Để vẽ một hình vuông hoàn hảo khi dùng công cụ vẽ hình chữ nhật, em nhấn giữ phím nào trên bàn phím?",
        options: [
          "A. Phím Shift",
          "B. Phím Caps Lock",
          "C. Phím Space (phím cách)",
          "D. Phím Esc"
        ],
        correctIndex: 0,
        explanation: "Tuyệt vời! Nhấn giữ phím Shift khi kéo chuột sẽ giúp em vẽ được hình vuông hoặc hình tròn cực kỳ chuẩn xác."
      }
    ]
  },
  {
    id: 14,
    themeId: 5,
    title: "Bài 14: Soạn thảo văn bản tiếng Việt đơn giản",
    landName: "Xưởng Sáng tạo",
    objectives: "Nhận biết con trỏ soạn thảo; sử dụng các phím chữ, phím số, phím Enter xuống dòng, phím Space cách từ và phím Shift gõ chữ hoa.",
    summary: "Phần mềm soạn thảo văn bản (Word, WordPad) giúp em viết bài thơ, lời chúc sinh nhật. Con trỏ soạn thảo là vạch đứng nhấp nháy cho biết chữ mới sẽ xuất hiện ở đâu. Phím Enter để xuống dòng mới, phím Space để cách giữa các từ.",
    keyPoints: [
      "Con trỏ soạn thảo: vạch thẳng đứng | nhấp nháy trên vùng soạn thảo.",
      "Phím Enter: kết thúc một đoạn văn và đưa con trỏ xuống đầu dòng mới.",
      "Phím Space (phím cách dài nhất): tạo đúng 1 khoảng cách giữa hai từ liền nhau.",
      "Phím Shift hoặc Caps Lock: dùng để gõ chữ in hoa hoặc ký hiệu phía trên.",
    ],
    examples: [
      "Gõ câu: 'Em yêu trường em' -> Giữa mỗi chữ chỉ nhấn phím Space đúng 1 lần.",
    ],
    interactiveActivity: {
      type: "typing_rule",
      title: "Hoạt động: Quy tắc gõ dấu câu chuẩn",
      description: "Dấu chấm, dấu phẩy gõ dính liền chữ đằng trước, sau đó mới gõ 1 dấu cách Space!",
    },
    gameLink: "keyboard",
    gameNote: "Trò chơi: Giải cứu Bàn phím",
    questions: [
      {
        id: 40,
        question: "Trong phần mềm soạn thảo, vạch thẳng đứng nhỏ nhấp nháy liên tục trên trang giấy trắng gọi là gì?",
        options: [
          "A. Con trỏ soạn thảo (cho biết vị trí xuất hiện chữ tiếp theo)",
          "B. Con chuột máy tính",
          "C. Cây thước kẻ",
          "D. Vết mực dính trên màn hình"
        ],
        correctIndex: 0,
        explanation: "Chính xác! Con trỏ soạn thảo nhấp nháy chỉ vị trí ký tự mới sẽ xuất hiện khi em bấm phím."
      },
      {
        id: 41,
        question: "Khi đang gõ một câu văn, để kết thúc đoạn và xuống dòng mới, em nhấn phím nào?",
        options: [
          "A. Phím Enter",
          "B. Phím Shift",
          "C. Phím Ctrl",
          "D. Phím Alt"
        ],
        correctIndex: 0,
        explanation: "Rất giỏi! Phím Enter trên bàn phím có chức năng xuống một dòng mới khi soạn thảo văn bản."
      },
      {
        id: 42,
        question: "Quy tắc gõ từ ngữ đúng chuẩn chính tả trong tin học là gì?",
        options: [
          "A. Giữa hai từ liền nhau chỉ gõ ĐÚNG MỘT dấu cách (phím Space)",
          "B. Bấm thật nhiều dấu cách giữa các từ",
          "C. Không cần dấu cách, viết dính liền các từ lại",
          "D. Gõ dấu cách trước các dấu chấm, phẩy"
        ],
        correctIndex: 0,
        explanation: "Chính xác! Quy tắc chuẩn là giữa hai từ chỉ dùng một khoảng cách duy nhất (1 lần nhấn Space)."
      }
    ]
  },
  {
    id: 15,
    themeId: 5,
    title: "Bài 15: Chỉnh sửa văn bản và gõ dấu tiếng Việt",
    landName: "Xưởng Sáng tạo",
    objectives: "Gõ được dấu thanh tiếng Việt theo kiểu Telex; biết sử dụng phím Backspace và phím Delete để sửa lỗi gõ sai.",
    summary: "Để gõ tiếng Việt, em cần bật chương trình gõ (như UniKey) chọn kiểu gõ Telex. Trong kiểu Telex: s (sắc), f (huyền), r (hỏi), x (ngã), j (nặng). Chữ đặc biệt: aa = â, oo = ô, ee = ê, dd = đ, aw = ă, ow = ơ, uw = ư. Phím Backspace xóa ký tự bên trái, Delete xóa ký tự bên phải.",
    keyPoints: [
      "Quy tắc dấu Telex: s (sắc), f (huyền), r (hỏi), x (ngã), j (nặng).",
      "Các chữ kép: aa -> â, oo -> ô, ee -> ê, dd -> đ, aw -> ă, ow -> ơ, uw -> ư.",
      "Phím Backspace (<-): xóa ký tự đứng ngay TRƯỚC con trỏ soạn thảo.",
      "Phím Delete: xóa ký tự đứng ngay SAU con trỏ soạn thảo.",
    ],
    examples: [
      "Muốn gõ chữ 'Việt Nam' theo kiểu Telex: 'V-i-e-e-t-j' -> Việt; 'N-a-m' -> Nam.",
    ],
    interactiveActivity: {
      type: "telex_table",
      title: "Hoạt động: Bảng thần chú Telex",
      description: "s = sắc | f = huyền | r = hỏi | x = ngã | j = nặng | dd = đ.",
    },
    gameLink: "keyboard",
    gameNote: "Trò chơi: Giải cứu Bàn phím",
    questions: [
      {
        id: 43,
        question: "Trong kiểu gõ Telex, phím nào sau đây dùng để gõ DẤU HUYỀN?",
        options: [
          "A. Phím s",
          "B. Phím f",
          "C. Phím r",
          "D. Phím j"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Trong kiểu gõ Telex: s = sắc, f = huyền, r = hỏi, x = ngã, j = nặng."
      },
      {
        id: 44,
        question: "Để gõ được chữ 'Đ' theo kiểu Telex, em gõ hai phím nào liên tiếp?",
        options: [
          "A. da",
          "B. dd",
          "C. dw",
          "D. do"
        ],
        correctIndex: 1,
        explanation: "Rất chuẩn! Gõ 'dd' sẽ tạo thành chữ 'đ' vô cùng dễ nhớ!"
      },
      {
        id: 45,
        question: "Phím Backspace (phím mũi tên quay sang trái <- trên hàng phím số) có tác dụng gì?",
        options: [
          "A. Xóa ký tự đứng ngay TRƯỚC con trỏ soạn thảo",
          "B. Xóa ký tự đứng ngay SAU con trỏ soạn thảo",
          "C. Lưu tệp văn bản",
          "D. Bật quạt làm mát"
        ],
        correctIndex: 0,
        explanation: "Chính xác! Phím Backspace xóa lùi về bên trái (xóa ký tự đứng trước con trỏ)."
      }
    ]
  },

  // CHỦ ĐỀ 6: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
  {
    id: 16,
    themeId: 6,
    title: "Bài 16: Các bước thực hiện một công việc",
    landName: "Vương quốc Giải quyết Vấn đề",
    objectives: "Nêu được một công việc có thể chia thành các bước nhỏ thực hiện theo thứ tự; biết mô tả chuỗi lệnh đơn giản để điều khiển robot.",
    summary: "Mọi công việc trong cuộc sống đều có thể chia nhỏ thành các bước rõ ràng và sắp xếp theo một thứ tự xác định để hoàn thành mục tiêu. Robot và máy tính cũng làm việc chính xác theo từng bước lệnh mà con người lập trình.",
    keyPoints: [
      "Một công việc lớn có thể chia thành chuỗi các bước nhỏ đơn giản hơn.",
      "Thứ tự các bước rất quan trọng: thay đổi thứ tự có thể dẫn đến kết quả sai.",
      "Lập trình robot: sử dụng các lệnh rõ ràng (Tiến 1 bước, Quay trái, Quay phải, Lặp lại) để hoàn thành nhiệm vụ.",
    ],
    examples: [
      "Quy trình đánh răng: Lấy kem vào bàn chải -> Chải đều các mặt răng -> Súc miệng sạch bằng nước.",
    ],
    interactiveActivity: {
      type: "algorithm_blocks",
      title: "Hoạt động: Lập trình viên nhí",
      description: "Để Bé Bít đi nhặt pin: [Tiến 2 bước] -> [Quay phải] -> [Tiến 1 bước] -> [Nhặt pin]!",
    },
    gameLink: "pathfinder",
    gameNote: "Trò chơi: Dẫn đường cho Robot",
    questions: [
      {
        id: 46,
        question: "Khi hướng dẫn một người bạn pha một cốc sữa nóng, việc sắp xếp các bước nào sau đây là ĐÚNG THỨ TỰ nhất?",
        options: [
          "A. Uống sữa -> Đổ nước sôi -> Cho sữa bột vào cốc",
          "B. Cho sữa bột vào cốc -> Rót nước ấm vào -> Dùng thìa khuấy đều",
          "C. Dùng thìa khuấy cốc không -> Uống ngay -> Rót nước",
          "D. Rót nước sôi -> Đổ hết ra ngoài -> Cho sữa bột"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Phải cho sữa vào cốc trước, rồi rót nước ấm, sau đó khuấy tan đều mới có ly sữa thơm ngon."
      },
      {
        id: 47,
        question: "Để điều khiển chú Robot Bé Bít đi thẳng 2 bước rồi rẽ phải, thứ tự các câu lệnh cần đưa ra là gì?",
        options: [
          "A. Rẽ trái -> Đi lùi -> Đứng yên",
          "B. Đi thẳng 1 bước -> Đi thẳng 1 bước -> Quay phải",
          "C. Quay phải -> Đi lùi 2 bước",
          "D. Nhảy lên -> Ngủ"
        ],
        correctIndex: 1,
        explanation: "Rất chuẩn! Thứ tự lệnh chính xác là: Đi thẳng bước 1 -> Đi thẳng bước 2 -> Quay phải."
      },
      {
        id: 48,
        question: "Vì sao Robot và máy tính cần con người lập trình các bước thực hiện rõ ràng, chính xác?",
        options: [
          "A. Vì Robot không tự suy nghĩ được như người, nó chỉ làm theo đúng từng bước lệnh con người chỉ dẫn",
          "B. Vì Robot lười biếng không chịu làm việc",
          "C. Vì Robot chỉ thích nghe nhạc",
          "D. Vì máy tính không có dây điện"
        ],
        correctIndex: 0,
        explanation: "Xuất sắc! Máy tính và Robot hoạt động vô cùng tuân thủ theo chuỗi các bước lệnh logic mà con người đã tạo ra."
      }
    ]
  }
];

export const BADGES = [
  {
    id: "explorer",
    name: "Nhà Thám Hiểm Nhí",
    icon: "🌟",
    color: "#8b5cf6",
    desc: "Hoàn thành 3 bài học đầu tiên trên bản đồ phiêu lưu",
    requirement: (progress) => {
      const completed = Object.values(progress.lessons || {}).filter(l => l.completed).length;
      return completed >= 3;
    },
    xp: 150,
  },
  {
    id: "mouse_master",
    name: "Bậc Thầy Chuột Máy Tính",
    icon: "🖱️",
    color: "#3b82f6",
    desc: "Đạt thành tích xuất sắc trong trò chơi Thao tác chuột",
    requirement: (progress) => (progress.gameScores?.mouse || 0) >= 60,
    xp: 200,
  },
  {
    id: "keyboard_hero",
    name: "Siêu Sao Bàn Phím",
    icon: "⌨️",
    color: "#ec4899",
    desc: "Gõ thành thạo hàng phím cơ sở và các từ vựng tin học",
    requirement: (progress) => (progress.gameScores?.keyboard || 0) >= 60,
    xp: 200,
  },
  {
    id: "file_manager",
    name: "Siêu Thủ Kho Dữ Liệu",
    icon: "📁",
    color: "#06b6d4",
    desc: "Phân loại ngăn nắp các tệp tin và thư mục",
    requirement: (progress) => (progress.gameScores?.sorter || 0) >= 60 || (progress.gameScores?.folderRescue || 0) >= 60,
    xp: 200,
  },
  {
    id: "coder",
    name: "Kỹ Sư Thuật Toán Nhí",
    icon: "🤖",
    color: "#f59e0b",
    desc: "Lập trình đường đi chuẩn xác đưa Bé Bít về đích",
    requirement: (progress) => (progress.gameScores?.pathfinder || 0) >= 60 || (progress.gameScores?.maze || 0) >= 60,
    xp: 250,
  },
  {
    id: "artist",
    name: "Họa Sĩ Công Nghệ",
    icon: "🎨",
    color: "#10b981",
    desc: "Sáng tạo tác phẩm tranh vẽ trên canvas và lưu về máy",
    requirement: (progress) => (progress.gameScores?.paint || 0) >= 50,
    xp: 200,
  },
  {
    id: "cyber_shield",
    name: "Hiệp Sĩ An Toàn Số",
    icon: "🛡️",
    color: "#f43f5e",
    desc: "Bảo vệ bí mật thông tin cá nhân và xử lý nguy cơ mạng",
    requirement: (progress) => (progress.gameScores?.safety || 0) >= 60 || (progress.gameScores?.shield || 0) >= 60,
    xp: 250,
  },
  {
    id: "champion",
    name: "Nhà Vô Địch Tin Học 3",
    icon: "🏆",
    color: "#eab308",
    desc: "Chinh phục toàn bộ 16 bài học và đạt trên 40 ngôi sao vàng",
    requirement: (progress) => (progress.totalStars || 0) >= 40,
    xp: 500,
  },
];

export const INITIAL_TEAMS = [
  { id: "purple", name: "Đội Robot Tím", score: 0, color: "#8b5cf6", avatar: "🤖", motto: "Nhanh nhẹn & Thông minh" },
  { id: "pink", name: "Đội Robot Hồng", score: 0, color: "#ec4899", avatar: "🌸", motto: "Chăm chỉ & Sáng tạo" },
  { id: "blue", name: "Đội Robot Xanh", score: 0, color: "#06b6d4", avatar: "⚡", motto: "Đoàn kết & Tự tin" },
  { id: "amber", name: "Đội Robot Vàng", score: 0, color: "#f59e0b", avatar: "⭐", motto: "Bứt phá & Chiến thắng" },
];
