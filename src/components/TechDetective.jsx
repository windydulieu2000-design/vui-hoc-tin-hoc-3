import React, { useState } from 'react';
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  FileQuestion,
  ShieldAlert,
  FolderOpen,
  KeyRound,
  Bot,
  Zap,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function TechDetective({ progress, onUpdateProgress }) {
  const [activeCaseId, setActiveCaseId] = useState(1);
  const [investigationStep, setInvestigationStep] = useState(1); // 1: Manh mối, 2: Phân tích, 3: Phán quyết
  const [selectedClues, setSelectedClues] = useState([]);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [caseSolved, setCaseSolved] = useState(() => progress.solvedCases || {});

  const cases = [
    {
      id: 1,
      title: 'Vụ án 1: Chiếc Tệp Bị Thất Lạc',
      subtitle: 'Tìm tệp bài vẽ tranh bị lưu nhầm chỗ',
      difficulty: 'Dễ',
      badge: 'Thám tử Tệp Tin',
      color: '#8b5cf6',
      icon: <FolderOpen size={24} color="#8b5cf6" />,
      scenario:
        'Bạn Nam vừa hoàn thành bức tranh "Ngoi_Nha_Cua_Em.png" rất đẹp trong giờ Tin học. Khi cô giáo bảo mở ra nộp bài, Nam tìm mãi trong thư mục "Tranh_Ve" mà không thấy đâu cả! Nam rất hoang mang tưởng tệp đã biến mất.',
      clues: [
        { id: 'c1', text: 'Tên tệp là "Ngoi_Nha_Cua_Em.png", có đuôi định dạng ảnh là .png' },
        { id: 'c2', text: 'Trước khi lưu, Nam vừa mở thư mục "Nhac_Thieu_Nhi" để nghe nhạc' },
        { id: 'c3', text: 'Thanh đường dẫn khi nhấn Save As lúc đó hiển thị D:\\Am_Nhac\\' },
      ],
      question: 'Dựa vào các manh mối thu thập được, tệp bài vẽ của bạn Nam hiện đang nằm ở đâu?',
      options: [
        { id: 'A', text: 'Tệp đã bị xóa vĩnh viễn khỏi máy tính', isCorrect: false, explain: 'Máy tính không tự ý xóa tệp vừa lưu xong.' },
        { id: 'B', text: 'Tệp đang nằm nhầm trong thư mục "Nhac_Thieu_Nhi"', isCorrect: true, explain: 'Chính xác! Do thanh Save As đang mở ở thư mục Âm nhạc nên tệp tranh vẽ đã được lưu nhầm vào đó.' },
        { id: 'C', text: 'Tệp biến thành vi-rút máy tính', isCorrect: false, explain: 'Không đúng, lưu tệp không làm phát sinh vi-rút.' },
      ],
      verdictAdvice:
        'Lời khuyên của Bé Bít: Khi lưu bài, em luôn quan sát kỹ tên thư mục ở thanh địa chỉ xem đúng nơi cần lưu chưa. Nếu bị thất lạc, hãy dùng ô Tìm kiếm (Search) trong File Explorer gõ tên tệp hoặc tìm đuôi .png!',
    },
    {
      id: 2,
      title: 'Vụ án 2: Ai Sử Dụng Máy Tính Sai Cách?',
      subtitle: 'Điều tra an toàn trong phòng máy',
      difficulty: 'Trung bình',
      badge: 'Thanh tra Phòng Máy',
      color: '#ec4899',
      icon: <AlertTriangle size={24} color="#ec4899" />,
      scenario:
        'Trong giờ thực hành, bạn Minh ngồi học rất gần màn hình (chỉ cách 15cm), một tay cầm hộp sữa tươi uống vừa gõ bàn phím, và khi hết giờ thì vội vàng rút phích cắm điện để ra chơi.',
      clues: [
        { id: 'c1', text: 'Khoảng cách từ mắt đến màn hình chuẩn là 50cm - 80cm, mắt ngang tầm đỉnh màn hình' },
        { id: 'c2', text: 'Nước hoặc đồ ăn rơi vào bàn phím sẽ gây chập cháy hỏng thiết bị điện tử' },
        { id: 'c3', text: 'Tắt máy tính đột ngột bằng cách rút điện làm hỏng ổ cứng và mất dữ liệu hệ điều hành' },
      ],
      question: 'Bạn Minh đã mắc phải bao nhiêu lỗi sử dụng máy tính không an toàn?',
      options: [
        { id: 'A', text: 'Chỉ mắc 1 lỗi là uống sữa khi ngồi máy', isCorrect: false, explain: 'Minh còn mắc thêm lỗi tư thế ngồi và cách tắt máy.' },
        { id: 'B', text: 'Không mắc lỗi nào vì máy vẫn hoạt động', isCorrect: false, explain: 'Các hành vi trên cực kỳ nguy hiểm cho cả người và thiết bị!' },
        { id: 'C', text: 'Mắc cả 3 lỗi: Ngồi quá gần, mang đồ uống vào phòng máy và rút nguồn đột ngột', isCorrect: true, explain: 'Rất chính xác! Cả 3 hành vi này đều vi phạm quy tắc an toàn phòng tin học lớp 3.' },
      ],
      verdictAdvice:
        'Lời khuyên của Bé Bít: Tuyệt đối không mang đồ ăn thức uống vào phòng máy. Ngồi thẳng lưng, giữ khoảng cách mắt từ 50-80cm. Khi tắt máy, phải bấm nút Start -> Power -> Shut down theo đúng quy trình!',
    },
    {
      id: 3,
      title: 'Vụ án 3: Bí Mật Chiếc Mật Khẩu',
      subtitle: 'Vạch trần hành vi rò rỉ thông tin cá nhân',
      difficulty: 'Trung bình',
      badge: 'Vệ sĩ Mật Khẩu',
      color: '#06b6d4',
      icon: <KeyRound size={24} color="#06b6d4" />,
      scenario:
        'Bạn Hoa tạo tài khoản học tập và đặt mật khẩu là "123456". Hôm sau, một người lạ nhắn tin trong trò chơi khen Hoa giỏi và bảo: "Cho anh mật khẩu để anh tặng cho 1000 viên kim cương miễn phí nhé!".',
      clues: [
        { id: 'c1', text: 'Mật khẩu "123456" là mật khẩu siêu yếu, ai cũng có thể đoán ra trong 1 giây' },
        { id: 'c2', text: 'Mật khẩu mạnh cần dài từ 8 ký tự, kết hợp chữ hoa, chữ thường, chữ số và ký tự đặc biệt' },
        { id: 'c3', text: 'Kẻ xấu thường hứa tặng quà ảo, kim cương để dụ dỗ học sinh cung cấp tài khoản' },
      ],
      question: 'Hoa cần xử lý tình huống này như thế nào là thông minh nhất?',
      options: [
        { id: 'A', text: 'Gửi ngay mật khẩu cho người đó để nhận kim cương', isCorrect: false, explain: 'Đây là cái bẫy lừa đảo để chiếm đoạt tài khoản!' },
        { id: 'B', text: 'Tuyệt đối không gửi mật khẩu, đổi lại mật khẩu mạnh hơn và báo ngay cho bố mẹ hoặc thầy cô', isCorrect: true, explain: 'Chính xác! Mật khẩu là bí mật riêng tư, không bao giờ được chia sẻ cho người khác, nhất là người lạ trên mạng.' },
        { id: 'C', text: 'Cho bạn cùng bàn biết mật khẩu nhờ giữ hộ', isCorrect: false, explain: 'Mật khẩu chỉ bố mẹ hoặc thầy cô được phép biết để hỗ trợ em.' },
      ],
      verdictAdvice:
        'Lời khuyên của Bé Bít: Mật khẩu cá nhân như chiếc chìa khóa nhà em vậy! Không chia sẻ cho bất kỳ ai trên Internet và đừng tin vào những lời dụ dỗ "tặng kim cương, tiền thưởng" miễn phí!',
    },
    {
      id: 4,
      title: 'Vụ án 4: Căn Bệnh "Thư Mục Ký Tự Cấm"',
      subtitle: 'Vì sao máy tính từ chối tạo thư mục?',
      difficulty: 'Dễ',
      badge: 'Bác sĩ Thư Mục',
      color: '#10b981',
      icon: <FileQuestion size={24} color="#10b981" />,
      scenario:
        'Bạn Long muốn tạo một thư mục để lưu bài tập ngày 20/11 nên đã gõ tên là: "Bai_Tap_Ngay_20/11/2026?". Thế nhưng máy tính liên tục phát tiếng "tinh tinh" và hiện hộp thoại cảnh báo từ chối tạo thư mục.',
      clues: [
        { id: 'c1', text: 'Tên thư mục của Long chứa hai dấu gạch chéo "/" và dấu hỏi chấm "?"' },
        { id: 'c2', text: 'Hệ điều hành Windows quy định tên tệp và thư mục không được chứa 9 ký tự cấm: \\ / : * ? " < > |' },
        { id: 'c3', text: 'Dấu "/" được dùng làm ký hiệu đường dẫn hệ thống nên không được đặt trong tên' },
      ],
      question: 'Nguyên nhân máy tính từ chối tạo thư mục của Long là gì?',
      options: [
        { id: 'A', text: 'Do máy tính bị hết pin', isCorrect: false, explain: 'Hết pin sẽ tắt máy, không hiển thị hộp thoại báo lỗi tên tệp.' },
        { id: 'B', text: 'Do tên thư mục chứa các ký tự cấm "/" và "?"', isCorrect: true, explain: 'Xuất sắc! Các ký tự / và ? là ký tự cấm đặc biệt trong hệ thống Windows.' },
        { id: 'C', text: 'Do ngày 20/11 là ngày lễ nên không được đặt tên', isCorrect: false, explain: 'Hệ điều hành không phân biệt ngày lễ hay ngày thường.' },
      ],
      verdictAdvice:
        'Lời khuyên của Bé Bít: Khi đặt tên có ngày tháng, em hãy thay dấu gạch chéo bằng dấu gạch ngang hoặc gạch dưới, ví dụ: "Bai_Tap_20-11-2026" nhé!',
    },
    {
      id: 5,
      title: 'Vụ án 5: Robot Bé Bít Đi Lạc Đường',
      subtitle: 'Tìm ra câu lệnh sai trong chương trình',
      difficulty: 'Nâng cao',
      badge: 'Kỹ sư Gỡ Lỗi (Debug)',
      color: '#f59e0b',
      icon: <Bot size={24} color="#f59e0b" />,
      scenario:
        'Bé Bít muốn đi đến Trạm Nạp Năng Lượng ở phía trước bên tay PHẢI. Bạn lập trình viên nhí đã gõ chuỗi lệnh: [1. TIẾN 2 BƯỚC] -> [2. RẼ TRÁI 90 ĐỘ] -> [3. TIẾN 1 BƯỚC]. Kết quả là Bé Bít đã đâm thẳng vào hồ nước!',
      clues: [
        { id: 'c1', text: 'Mục tiêu của Bé Bít là đi về phía bên PHẢI' },
        { id: 'c2', text: 'Trong đoạn mã, lệnh số 2 lại là RẼ TRÁI 90 ĐỘ' },
        { id: 'c3', text: 'Bên Trái và Bên Phải là hai hướng ngược nhau' },
      ],
      question: 'Câu lệnh nào trong đoạn mã đã khiến Bé Bít đi chệch hướng và cách sửa ra sao?',
      options: [
        { id: 'A', text: 'Lệnh số 1 sai, phải là LÙI 2 BƯỚC', isCorrect: false, explain: 'Lùi lại sẽ đi xa khỏi trạm sạc.' },
        { id: 'B', text: 'Lệnh số 2 sai, cần sửa "RẼ TRÁI 90 ĐỘ" thành "RẼ PHẢI 90 ĐỘ"', isCorrect: true, explain: 'Tuyệt vời! Vì trạm ở bên phải nên phải rẽ phải thay vì rẽ trái.' },
        { id: 'C', text: 'Cả 3 lệnh đều đúng, lỗi do robot bị hỏng bánh xe', isCorrect: false, explain: 'Robot thực thi hoàn toàn theo mã lệnh ta nạp vào.' },
      ],
      verdictAdvice:
        'Lời khuyên của Bé Bít: Robot chỉ làm chính xác những gì em lập trình. Khi robot đi sai, em hãy kiên nhẫn kiểm tra từng câu lệnh một, quá trình này trong công nghệ gọi là "Debug" (Gỡ lỗi)!',
    },
    {
      id: 6,
      title: 'Vụ án 6: Bức Tranh Chưa Kịp Lưu',
      subtitle: 'Bi kịch mất điện đột ngột và bài học Ctrl+S',
      difficulty: 'Dễ',
      badge: 'Thám tử Phục Hồi',
      color: '#6366f1',
      icon: <Zap size={24} color="#6366f1" />,
      scenario:
        'Bạn An hì hục vẽ một bức tranh suốt 45 phút rất công phu. Đột nhiên cả trường bị mất điện trong 3 giây. Khi điện có lại và bật máy lên, bức tranh đã biến mất và chỉ còn lại trang trắng tinh!',
      clues: [
        { id: 'c1', text: 'Bộ nhớ tạm RAM chỉ lưu dữ liệu khi máy tính đang có điện' },
        { id: 'c2', text: 'Khi chưa nhấn Lưu (Save), dữ liệu chưa được ghi vĩnh viễn vào Ổ cứng' },
        { id: 'c3', text: 'Phím tắt Ctrl + S giúp lưu nhanh bài làm trong 1 giây mà không gián đoạn thao tác' },
      ],
      question: 'Làm thế nào để tránh việc mất sạch bài làm khi máy tính bị mất điện hoặc tắt đột ngột?',
      options: [
        { id: 'A', text: 'Vẽ thật nhanh trong 2 phút để không bị mất điện', isCorrect: false, explain: 'Vẽ vội vàng tranh sẽ không đẹp và mất điện có thể xảy ra bất cứ lúc nào.' },
        { id: 'B', text: 'Tập thói quen nhấn Ctrl + S định kỳ vài phút một lần để lưu bài vào ổ cứng', isCorrect: true, explain: 'Chính xác 100%! Thói quen bấm Ctrl + S sau mỗi đoạn vẽ hoặc viết bài sẽ bảo vệ thành quả của em vĩnh viễn.' },
        { id: 'C', text: 'Không dùng máy tính nữa, chỉ vẽ trên giấy', isCorrect: false, explain: 'Máy tính là công cụ tuyệt vời nếu ta biết sử dụng đúng cách.' },
      ],
      verdictAdvice:
        'Lời khuyên của Bé Bít: Hãy ghi nhớ tổ hợp phím thần thánh [Ctrl + S]! Cứ mỗi khi vẽ xong một chi tiết đẹp hoặc gõ xong một đoạn văn, hãy bấm nhẹ Ctrl + S ngay nhé!',
    },
  ];

  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const isSolved = !!caseSolved[currentCase.id];

  const toggleClue = (cid) => {
    if (selectedClues.includes(cid)) {
      setSelectedClues(selectedClues.filter((id) => id !== cid));
    } else {
      setSelectedClues([...selectedClues, cid]);
    }
  };

  const handleSelectAnswer = (opt) => {
    setChosenAnswer(opt);
    if (opt.isCorrect) {
      const updated = { ...caseSolved, [currentCase.id]: true };
      setCaseSolved(updated);
      onUpdateProgress({
        ...progress,
        solvedCases: updated,
        xp: (progress.xp || 0) + 60,
        totalStars: (progress.totalStars || 0) + 2,
      });
    }
  };

  const resetCase = () => {
    setInvestigationStep(1);
    setSelectedClues([]);
    setChosenAnswer(null);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div
        className="card-glass"
        style={{
          padding: '24px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ede9fe 0%, #fae8ff 50%, #e0f2fe 100%)',
          borderRadius: '24px',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: '#8b5cf6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 16px rgba(139, 92, 246, 0.25)',
            }}
          >
            <Search size={30} />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '4px' }}>
              <Sparkles size={14} />
              <span>Học tập qua tình huống & Điều tra lỗi máy tính</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#4c1d95', margin: 0 }}>
              Bé Bít – Thám Tử Công Nghệ 🕵️
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>
              Cùng Bé Bít phá 6 vụ án công nghệ ly kỳ, rèn luyện tư duy logic và kỹ năng tin học thực tế!
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#ffffff', padding: '10px 18px', borderRadius: '16px', border: '2px solid #ddd6fe', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 'bold' }}>VỤ ÁN ĐÃ PHÁ</div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#4c1d95' }}>
              {Object.keys(caseSolved).length} / 6 Vụ
            </div>
          </div>
        </div>
      </div>

      {/* Case Selector Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {cases.map((c) => {
          const isSelected = c.id === activeCaseId;
          const isDone = !!caseSolved[c.id];
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseId(c.id);
                resetCase();
              }}
              style={{
                background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                border: isSelected ? `2px solid ${c.color}` : '2px solid #e2e8f0',
                borderRadius: '16px',
                padding: '12px',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: isSelected ? `0 6px 16px ${c.color}25` : 'none',
                position: 'relative',
                transition: 'all 0.2s',
              }}
            >
              {isDone && (
                <span style={{ position: 'absolute', top: '8px', right: '8px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                {c.icon}
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: c.color }}>{c.badge}</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#1e293b', lineHeight: '1.3' }}>
                {c.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Case Details Card */}
      <div
        className="card-glass"
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '28px',
          border: '2px solid #f1f5f9',
          boxShadow: '0 12px 32px rgba(139, 92, 246, 0.08)',
        }}
      >
        {/* Case Banner */}
        <div style={{ borderBottom: '2px dashed #f1f5f9', paddingBottom: '18px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'inline-block', background: currentCase.color + '15', color: currentCase.color, padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
              Hồ sơ vụ án #{currentCase.id} • {currentCase.subtitle}
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
              {currentCase.title}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={resetCase}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '8px 14px', fontSize: '12px', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }}
            >
              <RotateCcw size={14} /> Khởi động lại vụ án
            </button>
          </div>
        </div>

        {/* 3 Step Investigation Process */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[
            { step: 1, label: 'Bước 1: Thu thập manh mối' },
            { step: 2, label: 'Bước 2: Phân tích & Trả lời' },
            { step: 3, label: 'Bước 3: Phán quyết & Lời khuyên' },
          ].map((s) => (
            <div
              key={s.step}
              onClick={() => {
                if (s.step === 2 && selectedClues.length === 0) return;
                if (s.step === 3 && !chosenAnswer) return;
                setInvestigationStep(s.step);
              }}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '12px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                background: investigationStep === s.step ? '#8b5cf6' : investigationStep > s.step ? '#dcfce7' : '#f1f5f9',
                color: investigationStep === s.step ? '#ffffff' : investigationStep > s.step ? '#166534' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {s.label} {investigationStep > s.step && '✓'}
            </div>
          ))}
        </div>

        {/* STEP 1: Manh mối */}
        {investigationStep === 1 && (
          <div>
            {/* Scenario box */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)',
                border: '2px solid #ddd6fe',
                borderRadius: '18px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#5b21b6', fontWeight: '800', fontSize: '15px' }}>
                <Search size={20} /> Tình huống hiện trường vụ án:
              </div>
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.7', margin: 0 }}>
                {currentCase.scenario}
              </p>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', marginBottom: '12px' }}>
              🔍 Em hãy đánh dấu tích vào các manh mối quan trọng:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {currentCase.clues.map((clue) => {
                const isChecked = selectedClues.includes(clue.id);
                return (
                  <div
                    key={clue.id}
                    onClick={() => toggleClue(clue.id)}
                    style={{
                      background: isChecked ? '#f5f3ff' : '#ffffff',
                      border: isChecked ? '2px solid #8b5cf6' : '1px solid #cbd5e1',
                      borderRadius: '14px',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: isChecked ? '2px solid #8b5cf6' : '2px solid #94a3b8',
                        background: isChecked ? '#8b5cf6' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                      }}
                    >
                      {isChecked && <CheckCircle2 size={16} />}
                    </div>
                    <span style={{ fontSize: '14px', color: '#334155', fontWeight: isChecked ? '700' : '500' }}>
                      {clue.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                disabled={selectedClues.length === 0}
                onClick={() => setInvestigationStep(2)}
                className="btn-bouncy"
                style={{
                  background: selectedClues.length > 0 ? '#8b5cf6' : '#cbd5e1',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: selectedClues.length > 0 ? 'pointer' : 'not-allowed',
                }}
              >
                Tiếp tục: Phân tích vụ án <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Phân tích & Trả lời câu hỏi */}
        {investigationStep === 2 && (
          <div>
            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', marginBottom: '20px', borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6', textTransform: 'uppercase' }}>
                Câu hỏi phán xét của Thám tử:
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#1e293b', margin: '6px 0 0 0' }}>
                {currentCase.question}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {currentCase.options.map((opt) => {
                const isSelected = chosenAnswer?.id === opt.id;
                let bg = '#ffffff';
                let border = '2px solid #e2e8f0';

                if (isSelected) {
                  if (opt.isCorrect) {
                    bg = '#dcfce7';
                    border = '2px solid #10b981';
                  } else {
                    bg = '#fee2e2';
                    border = '2px solid #ef4444';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectAnswer(opt)}
                    style={{
                      background: bg,
                      border: border,
                      borderRadius: '14px',
                      padding: '16px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: isSelected ? (opt.isCorrect ? '#10b981' : '#ef4444') : '#ede9fe',
                          color: isSelected ? '#ffffff' : '#6d28d9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '900',
                          fontSize: '14px',
                        }}
                      >
                        {opt.id}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', flex: 1 }}>
                        {opt.text}
                      </span>
                    </div>

                    {isSelected && (
                      <div style={{ marginTop: '10px', fontSize: '13px', color: opt.isCorrect ? '#15803d' : '#b91c1c', fontWeight: '600', paddingLeft: '44px' }}>
                        {opt.explain}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => setInvestigationStep(1)}
                style={{ background: '#f1f5f9', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', color: '#64748b', cursor: 'pointer' }}
              >
                ← Xem lại manh mối
              </button>

              {chosenAnswer && chosenAnswer.isCorrect && (
                <button
                  onClick={() => setInvestigationStep(3)}
                  className="btn-bouncy"
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Xem Phán Quyết Của Bé Bít <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Phán quyết & Lời khuyên */}
        {investigationStep === 3 && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ marginBottom: '16px' }}>
              <BeBitRobot mood="proud" size={110} speech="Phá án thành công! Bạn thực sự là một Thám tử Công nghệ tài ba!" />
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, #dcfce7 0%, #e0f2fe 100%)',
                border: '2px solid #86efac',
                borderRadius: '20px',
                padding: '24px',
                maxWidth: '680px',
                margin: '0 auto 24px auto',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: '900', fontSize: '16px', marginBottom: '8px' }}>
                <Lightbulb size={22} color="#15803d" />
                <span>BÀI HỌC CÔNG NGHỆ BỎ TÚI:</span>
              </div>
              <p style={{ margin: 0, fontSize: '15px', color: '#14532d', lineHeight: '1.7', fontWeight: '600' }}>
                {currentCase.verdictAdvice}
              </p>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fef3c7', padding: '8px 20px', borderRadius: '999px', color: '#b45309', fontWeight: '800', fontSize: '14px', marginBottom: '24px' }}>
              <Award size={18} /> Nhận Huy hiệu "{currentCase.badge}" & +60 XP
            </div>

            <div>
              {activeCaseId < 6 ? (
                <button
                  onClick={() => {
                    setActiveCaseId(activeCaseId + 1);
                    resetCase();
                  }}
                  className="btn-bouncy"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: '16px',
                    fontWeight: '900',
                    fontSize: '15px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)',
                  }}
                >
                  Điều tra vụ án tiếp theo ({activeCaseId + 1}/6) →
                </button>
              ) : (
                <div style={{ color: '#15803d', fontWeight: '900', fontSize: '18px' }}>
                  🏆 Chúc mừng bạn đã hoàn thành trọn vẹn tất cả 6 Vụ án Công nghệ!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
