import { useState, useEffect } from 'react';
import img11 from '../assets/11.webp'
const Footer = () => {
  // 1. 設定目標婚禮日期
  const TARGET_DATE = "2027-01-24T00:00:00";

  // 2. 建立計算剩餘時間的函式
  const calculateTimeLeft = () => {
    const difference = +new Date(TARGET_DATE) - +new Date();
    let timeLeft = { days: "00", hours: "00", minutes: "00" };

    if (difference > 0) {
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);

      // 使用 padStart(2, '0') 確保始終保持兩位數（例如 05 天、09 分）
      timeLeft = {
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0')
      };
    }

    return timeLeft;
  };

  // 3. 初始化 state，直接呼叫計算函式避免畫面閃爍預設值
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // 4. 設定計時器每秒更新一次
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // 清除計時器，避免記憶體洩漏 (Memory Leak)
    return () => clearInterval(timer);
  }, []);
  return (<>
    <div className="footer-container">
      <div className="footer-text-section">
        <h4>韋昊良 ＆ 呂易庭</h4>
        <h4 >Beni & Yiting</h4>
        <p>2027.01.24</p>
        {/* 倒數計時方塊區 */}
        <div className="footer-countdown">
          <div className="time-item">
            <span className='gold-text'>{timeLeft.days}</span>
            <label className='gold-text'>Days</label>
          </div>
          <div className="time-item">
            <span className='gold-text'>{timeLeft.hours}</span>
            <label className='gold-text'>Hours</label>
          </div>
          <div className="time-item">
            <span className='gold-text'>{timeLeft.minutes}</span>
            <label className='gold-text'>Minutes</label>
          </div>
        </div>
      </div>
      <div className="footer-content">With love and gratitude,
        Beni & Yiting</div>
      <div className="footer-photo-wrapper">
        <img src={img11} alt="頁尾婚紗照" />
      </div>
    </div>
    <footer className="wedding-footer-bar">
      <div className="footer-email">Designed & Developed</div>
      <div className="footer-email">by 楊蕙安 (huian.y.yy@gmail.com)</div>
    </footer>
  </>)
}

export default Footer