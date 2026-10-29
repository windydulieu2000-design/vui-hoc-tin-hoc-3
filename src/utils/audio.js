// Hệ thống âm thanh được tinh chỉnh: Loại bỏ toàn bộ giọng đọc Web Speech API và âm thanh giao diện
// Giữ nguyên biểu cảm robot, hiệu ứng hình ảnh và âm thanh gốc của các video AI

class SilentSoundController {
  constructor() {
    this.isMuted = true;
  }
  init() {}
  playTone() {}
  playCorrect() {}
  playWrong() {}
  playStar() {}
  playClick() {}
  playStep() {}
}

export const sounds = new SilentSoundController();

// Đã loại bỏ Web Speech API theo yêu cầu
export const speakVietnamese = (text, onEnd) => {
  if (onEnd && typeof onEnd === 'function') {
    onEnd();
  }
};

export const stopSpeaking = () => {};
