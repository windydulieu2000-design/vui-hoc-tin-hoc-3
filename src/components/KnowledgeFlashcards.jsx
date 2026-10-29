import React, { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Bookmark,
  Layers,
  Filter,
  Eye,
  Bot,
  Brain,
  Search,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function KnowledgeFlashcards() {
  const [activeTheme, setActiveTheme] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});
  const [masteredCards, setMasteredCards] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const flashcards = [
    {
      id: 1,
      themeId: 1,
      themeName: 'Chủ đề 1: Máy tính',
      term: 'Thân máy (CPU)',
      icon: '🧠',
      frontHint: 'Bộ não của máy tính làm gì nhỉ?',
      definition: 'Thân máy chứa bộ vi xử lý và bộ nhớ. Đây là "bộ não" tiếp nhận, xử lý thông tin và điều khiển mọi hoạt động của máy tính.',
      example: 'Khi em gõ phím, thân máy sẽ nhận tín hiệu và hiển thị chữ cái lên màn hình.',
      color: '#8b5cf6',
    },
    {
      id: 2,
      themeId: 1,
      themeName: 'Chủ đề 1: Máy tính',
      term: 'Thiết bị vào & Thiết bị ra',
      icon: '🔄',
      frontHint: 'Đưa thông tin vào hay xuất ra?',
      definition: '• Thiết bị vào (Nhập): Bàn phím, chuột, webcam, micro.\n• Thiết bị ra (Xuất): Màn hình, loa, tai nghe, máy in.',
      example: 'Em nói qua micro (vào) và nghe bạn bè trả lời qua loa (ra).',
      color: '#8b5cf6',
    },
    {
      id: 3,
      themeId: 1,
      themeName: 'Chủ đề 1: Máy tính',
      term: '4 Thao tác Chuột',
      icon: '🖱️',
      frontHint: 'Có những thao tác cơ bản nào với chuột?',
      definition: '1. Nhấp đơn: Bấm chuột trái 1 lần.\n2. Nhấp đúp: Bấm chuột trái nhanh 2 lần liên tiếp.\n3. Chuột phải: Bấm chuột phải mở thực đơn.\n4. Kéo thả: Nhấn giữ chuột trái và rê di chuyển.',
      example: 'Nhấp đúp vào biểu tượng để mở phần mềm học tập.',
      color: '#8b5cf6',
    },
    {
      id: 4,
      themeId: 1,
      themeName: 'Chủ đề 1: Máy tính',
      term: 'Hàng phím cơ sở & Phím F, J',
      icon: '⌨️',
      frontHint: 'Vị trí đặt tay xuất phát ở đâu?',
      definition: 'Hàng cơ sở là hàng phím chứa các phím A, S, D, F, G, H, J, K, L. Hai phím F và J có gờ nổi để hai ngón trỏ đặt vào định vị mà không cần nhìn.',
      example: 'Ngón trỏ trái đặt phím F, ngón trỏ phải đặt phím J.',
      color: '#8b5cf6',
    },
    {
      id: 5,
      themeId: 2,
      themeName: 'Chủ đề 2: Thông tin',
      term: 'Thông tin & Dữ liệu',
      icon: '📡',
      frontHint: 'Mối quan hệ giữa dữ liệu và thông tin?',
      definition: '• Dữ liệu: Là các con số, hình ảnh, văn bản, âm thanh được thu thập.\n• Thông tin: Là những hiểu biết có ý nghĩa mà con người rút ra được từ dữ liệu.',
      example: 'Dữ liệu: Nhiệt độ 38°C -> Thông tin: Hôm nay trời rất nóng, cần uống nhiều nước.',
      color: '#ec4899',
    },
    {
      id: 6,
      themeId: 2,
      themeName: 'Chủ đề 2: Thông tin',
      term: '4 Dạng Thông Tin Cơ Bản',
      icon: '📚',
      frontHint: 'Em thường tiếp nhận thông tin qua các dạng nào?',
      definition: '1. Dạng văn bản (Chữ viết, con số).\n2. Dạng hình ảnh (Bức tranh, ảnh chụp).\n3. Dạng âm thanh (Tiếng chim hót, bài hát).\n4. Dạng video (Hình ảnh chuyển động kèm tiếng).',
      example: 'Xem video Bé Bít dạy học là kết hợp cả hình ảnh và âm thanh.',
      color: '#ec4899',
    },
    {
      id: 7,
      themeId: 3,
      themeName: 'Chủ đề 3: Tổ chức lưu trữ',
      term: 'Tệp (File)',
      icon: '📄',
      frontHint: 'Đơn vị lưu trữ nội dung trong máy tính là gì?',
      definition: 'Tệp là tập hợp các thông tin do người dùng tạo ra và lưu trong máy tính, có Tên tệp và Đuôi mở rộng (.docx, .png, .mp3, .pptx).',
      example: 'Tệp "Bai_Tap_Toan.docx" là một văn bản bài tập.',
      color: '#06b6d4',
    },
    {
      id: 8,
      themeId: 3,
      themeName: 'Chủ đề 3: Tổ chức lưu trữ',
      term: 'Thư mục (Folder) & Sơ đồ cây',
      icon: '📁',
      frontHint: 'Làm sao để xếp gọn hàng trăm tệp bài làm?',
      definition: 'Thư mục như chiếc cặp sách hoặc ngăn kéo, dùng để chứa các tệp hoặc thư mục con khác nhằm sắp xếp tài liệu gọn gàng, khoa học.',
      example: 'Trong thư mục "Hoc_Tap" có các thư mục con: "Toan", "Tieng_Viet", "Tin_Hoc".',
      color: '#06b6d4',
    },
    {
      id: 9,
      themeId: 3,
      themeName: 'Chủ đề 3: Tổ chức lưu trữ',
      term: 'Ký tự cấm khi đặt tên',
      icon: '🚫',
      frontHint: 'Những ký hiệu nào bị cấm trong tên tệp?',
      definition: 'Hệ điều hành cấm 9 ký tự sau trong tên tệp và thư mục: \\ / : * ? " < > | vì chúng được dùng cho các lệnh của hệ thống.',
      example: 'Không đặt tên "20/11/2026", hãy đổi thành "20-11-2026".',
      color: '#06b6d4',
    },
    {
      id: 10,
      themeId: 4,
      themeName: 'Chủ đề 4: An toàn số',
      term: 'Thông tin cá nhân',
      icon: '🔒',
      frontHint: 'Những thông tin nào cần bảo mật tuyệt đối?',
      definition: 'Thông tin cá nhân gồm: Họ tên thật, ngày sinh, địa chỉ nhà, số điện thoại, mật khẩu tài khoản và tên trường lớp đang theo học.',
      example: 'Không bao giờ công khai số điện thoại của bố mẹ lên mạng xã hội.',
      color: '#10b981',
    },
    {
      id: 11,
      themeId: 4,
      themeName: 'Chủ đề 4: An toàn số',
      term: 'Mật khẩu mạnh (Strong Password)',
      icon: '🛡️',
      frontHint: 'Thế nào là một chiếc khóa tài khoản an toàn?',
      definition: 'Mật khẩu mạnh dài ít nhất 8 ký tự, kết hợp cả chữ hoa, chữ thường, chữ số và ký tự đặc biệt (ví dụ: BéBit#2026). Tránh đặt 123456 hay ngày sinh.',
      example: 'Mật khẩu là bí mật riêng tư, không chia sẻ cho bạn bè cùng lớp.',
      color: '#10b981',
    },
    {
      id: 12,
      themeId: 4,
      themeName: 'Chủ đề 4: An toàn số',
      term: 'Tư thế ngồi máy tính chuẩn',
      icon: '🪑',
      frontHint: 'Ngồi thế nào để bảo vệ mắt và cột sống?',
      definition: '• Lưng thẳng, tựa vào lưng ghế.\n• Mắt cách màn hình từ 50cm đến 80cm.\n• Bàn chân đặt bằng phẳng trên sàn.\n• Cứ sau 30 phút, nghỉ ngơi nhìn xa 2-3 phút.',
      example: 'Không cúi sát mặt vào màn hình để tránh cận thị.',
      color: '#10b981',
    },
    {
      id: 13,
      themeId: 5,
      themeName: 'Chủ đề 5: Ứng dụng sáng tạo',
      term: 'Bản quyền & Tôn trọng tác giả',
      icon: '⚖️',
      frontHint: 'Sử dụng bài viết hay tranh vẽ của người khác?',
      definition: 'Mỗi bức tranh, bài thơ, bản nhạc đều thuộc quyền tác giả của người tạo ra. Khi sử dụng bài của người khác, em cần xin phép hoặc ghi rõ nguồn trích dẫn.',
      example: 'Khi dùng ảnh trên mạng làm slide, hãy ghi chú tên tác giả của ảnh.',
      color: '#f59e0b',
    },
    {
      id: 14,
      themeId: 5,
      themeName: 'Chủ đề 5: Ứng dụng sáng tạo',
      term: 'Trang chiếu (Slide)',
      icon: '📊',
      frontHint: 'Phần mềm trình chiếu có ưu điểm gì?',
      definition: 'Trang chiếu giúp em trình bày bài nói trước lớp thật sinh động với hình ảnh to rõ, chữ viết ngắn gọn, súc tích và màu sắc hấp dẫn.',
      example: 'Dùng PowerPoint hoặc Google Slides để làm bài giới thiệu sách.',
      color: '#f59e0b',
    },
    {
      id: 15,
      themeId: 6,
      themeName: 'Chủ đề 6: Thuật toán',
      term: 'Thuật toán là gì?',
      icon: '🧩',
      frontHint: 'Các bước tuần tự giải quyết công việc?',
      definition: 'Thuật toán là một dãy các chỉ dẫn từng bước rõ ràng, được thực hiện theo một thứ tự nhất định để hoàn thành một công việc hoặc giải quyết một bài toán.',
      example: 'Quy trình rửa tay 6 bước của Bộ Y tế chính là một thuật toán!',
      color: '#6366f1',
    },
    {
      id: 16,
      themeId: 6,
      themeName: 'Chủ đề 6: Thuật toán',
      term: 'Debug (Gỡ lỗi phần mềm)',
      icon: '🐞',
      frontHint: 'Khi robot chạy sai thì làm gì?',
      definition: 'Gỡ lỗi (Debug) là quá trình tìm kiếm và sửa chữa những câu lệnh sai trong chương trình để máy tính hoặc robot hoạt động đúng theo ý muốn của ta.',
      example: 'Kiểm tra xem robot bị nhầm lệnh rẽ trái hay rẽ phải để đổi lại.',
      color: '#6366f1',
    },
  ];

  const filteredCards = flashcards.filter((card) => {
    const matchTheme = activeTheme === 'all' || card.themeId === Number(activeTheme);
    const matchSearch =
      card.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTheme && matchSearch;
  });

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id, e) => {
    e.stopPropagation();
    setMasteredCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const masteredCount = Object.values(masteredCards).filter(Boolean).length;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div
        className="card-glass"
        style={{
          padding: '24px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ede9fe 0%, #e0f2fe 50%, #fce7f3 100%)',
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
              background: '#06b6d4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 16px rgba(6, 182, 212, 0.25)',
            }}
          >
            <Brain size={30} />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', color: '#0891b2', marginBottom: '4px' }}>
              <Sparkles size={14} />
              <span>Phương Pháp Ôn Tập 3D Flashcard</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#155e75', margin: 0 }}>
              Thư Viện Thẻ Kiến Thức Bỏ Túi 🃏
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>
              16 Thẻ khái niệm trọng tâm bám sát SGK Tin học 3. Nhấp vào thẻ để lật mặt sau xem giải nghĩa!
            </p>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '10px 18px', borderRadius: '16px', border: '2px solid #bae6fd', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 'bold' }}>ĐÃ THUỘC LÒNG</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#0369a1' }}>
            {masteredCount} / 16 Khái niệm
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Tìm kiếm khái niệm (VD: CPU, tệp tin, thuật toán)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '13px' }}
          />
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
        </div>

        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'all', label: 'Tất cả (16)' },
            { id: '1', label: 'CĐ 1: Máy tính' },
            { id: '2', label: 'CĐ 2: Thông tin' },
            { id: '3', label: 'CĐ 3: Lưu trữ' },
            { id: '4', label: 'CĐ 4: An toàn số' },
            { id: '5', label: 'CĐ 5: Sáng tạo' },
            { id: '6', label: 'CĐ 6: Thuật toán' },
          ].map((th) => (
            <button
              key={th.id}
              onClick={() => setActiveTheme(th.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: activeTheme === th.id ? '2px solid #06b6d4' : '1px solid #cbd5e1',
                background: activeTheme === th.id ? '#ecfeff' : '#ffffff',
                color: activeTheme === th.id ? '#0891b2' : '#475569',
                fontWeight: activeTheme === th.id ? '800' : '600',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {th.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredCards.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          const isMastered = !!masteredCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              style={{
                minHeight: '260px',
                perspective: '1000px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  position: 'relative',
                  transition: 'transform 0.4s ease',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                }}
              >
                {/* FRONT SIDE */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    background: '#ffffff',
                    border: isMastered ? '2px solid #86efac' : `2px solid ${card.color}40`,
                    borderRadius: '20px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: card.color, background: card.color + '15', padding: '4px 10px', borderRadius: '8px' }}>
                      {card.themeName}
                    </span>
                    <button
                      onClick={(e) => toggleMastered(card.id, e)}
                      title={isMastered ? 'Bỏ đánh dấu' : 'Đánh dấu đã thuộc'}
                      style={{
                        background: isMastered ? '#dcfce7' : '#f1f5f9',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: isMastered ? '#15803d' : '#64748b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <CheckCircle2 size={14} color={isMastered ? '#15803d' : '#94a3b8'} />
                      {isMastered ? 'Đã nhớ' : 'Chưa nhớ'}
                    </button>
                  </div>

                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <div style={{ fontSize: '44px', marginBottom: '8px' }}>{card.icon}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1e293b', margin: '0 0 6px 0' }}>
                      {card.term}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontStyle: 'italic' }}>
                      "{card.frontHint}"
                    </p>
                  </div>

                  <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', borderTop: '1px dashed #f1f5f9', paddingTop: '10px' }}>
                    👆 Nhấp vào thẻ để xem định nghĩa mặt sau
                  </div>
                </div>

                {/* BACK SIDE */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)',
                    border: `2px solid ${card.color}`,
                    borderRadius: '20px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '900', color: card.color, marginBottom: '8px' }}>
                      {card.icon} {card.term}
                    </div>
                    <p style={{ fontSize: '13px', color: '#1e293b', lineHeight: '1.6', margin: '0 0 10px 0', whiteSpace: 'pre-line', fontWeight: '600' }}>
                      {card.definition}
                    </p>
                    <div style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', color: '#475569', borderLeft: `3px solid ${card.color}` }}>
                      <strong>Ví dụ:</strong> {card.example}
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', borderTop: '1px dashed #cbd5e1', paddingTop: '10px' }}>
                    🔄 Nhấp lại để quay về mặt trước
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
