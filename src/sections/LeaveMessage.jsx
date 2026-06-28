import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const LeaveMessage = () => {
  const messageUrl = '/api/messages'
  const [wishData, setWishData] = useState([]);
  const [form, setForm] = useState({ name: '', wishes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const getWish = async () => {
      try {
        const res = await axios.get(messageUrl);
        setWishData(res.data);
      } catch (error) {
        console.error('讀取留言失敗', error)
      }
    }
    getWish();
  }, [])

  // 當 wishData 改變時，動態計算滾動時間
  useEffect(() => {
    if (trackRef.current && wishData.length > 0) {
      const speed = 30; // 的定速：每秒跑 50px
      const totalHeight = trackRef.current.scrollHeight; // 整條軌道的總像素高度
      const scrollDistance = totalHeight / 2; // 動畫跑 -50%，實際距離是總高的一半
      const duration = scrollDistance / speed; // 時間 = 距離 / 速度

      // 動態把秒數寫入 CSS 變數中
      trackRef.current.style.setProperty('--scroll-duration', `${duration}s`);
    }
  }, [wishData]); // 當 wishData 變動時（剛載入完、或新增留言），就會重新計算

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.wishes.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post(messageUrl, form)
      setWishData(prev => [...prev, [form.name, form.wishes]]);
      setForm({ name: '', wishes: '' })
      console.log('成功', res.data);
    } catch (error) {
      console.error('送出失敗', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const doubled = [...wishData, ...wishData];

  return (<>
    <div className="leaveMessage-custom">
      <div className="section-title">Leave a Message</div>
      <h3 className="section-header">自由留言板</h3>
      <div className="section-heading__divider"></div>
      <div className="wish-container">
        <div>
          <h5>{wishData.length}則留言</h5>
        </div>
        <div className="wish-input-group">
          <input type="text"
            name=""
            value={form.name}
            className="name"
            placeholder="名字 Name"
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
          />
          <textarea type="text"
            name=""
            value={form.wishes}
            className="wishes"
            placeholder="留下您想說的話 Leave your message..."
            onChange={e => setForm(prev => ({ ...prev, wishes: e.target.value }))}
          />
        </div>
        <button type="submit"
          className="wish-btn"
          onClick={handleSubmit}
          disabled={isSubmitting || !form.name.trim() || !form.wishes.trim()}>
          {isSubmitting ? '送出中 Sending...' : '送出 Send'}
        </button>
      </div>
      <div>
        <div className="message-board-wrapper">
          <div className="message-board-track" ref={trackRef}>
            {doubled.map((item, i) => (
              <div key={i} className="message-board">
                <p className="title">{item[0]}</p>
                <p>{item[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default LeaveMessage