import flowers07 from "../assets/flowers07.webp"
import { Accordion } from 'react-bootstrap';
const WeddingInfo = () => {
  const weddingInfoData = [
    {
      icon: <i className="bi bi-calendar-week i-dark gold-text"></i>,
      title: '日期 Date',
      value: '2027.01.24',
      description: ' (日) Sunday',
    },
    {
      icon: <i className="bi bi-clock i-dark gold-text"></i>,
      title: '時間 Time (待定中 TBD)',
      value: '16:30 結婚典禮 Ceremony',
      description: '18:30 喜宴時間 Reception',
    },
    {
      icon: <i className="bi bi-geo-alt i-dark gold-text"></i>,
      title: '地點 Venue',
      value: 'HOMM Saranam Baturiti 度假村',
      description: '',
      mapUrl: 'https://maps.app.goo.gl/N4PrS8erK5nMvFSQ7',
    },
  ]

  return (<>
    <div className="weddingInfo-custom dark-section dark-bg-wrapper">
      <div className="section-title-dark gold-text">WEDDING INFORMATION</div>
      <h3 className="section-header-dark">婚禮資訊</h3>
      <div className="section-content">
        <img src={flowers07} className="flower-edge flower-center " alt="花卉分隔線" />
        {weddingInfoData.map((item, index) => {
          return (<div className="infoCard" key={index}>
            <div className="card-icon">
              <div className="icon-circle">
                {item.icon}
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-primary gold-text">{item.value}</p>
              <p>{item.description}</p>
              {item.mapUrl && <a href={item.mapUrl} target="_blank" rel="noreferrer" className="map-link">
                查看地圖 <i className="bi bi-chevron-right"></i>
              </a>}
            </div>
            {item.illustration && (<div className="card-illustration">
              <img src={item.illustration} alt={item.title} />
            </div>)}
          </div>)
        })}
        <div className="introduce-container">
          <Accordion defaultActiveKey="">
            <Accordion.Item eventKey="0">
              <Accordion.Header>度假村介紹  About the Venue
              </Accordion.Header>
              <Accordion.Body>
                <div>不同於人們對峇里島熱帶海灘的印象，貝都古(Bedugul)是一座以涼爽氣候、蓊鬱森林與寧靜氛圍聞名的高山地區。坐落於雲霧繚繞的山谷之中，環抱著壯麗的山景與自然風光，度假村為賓客提供一處遠離喧囂、沉浸於大自然的靜謐天地。我們選擇在這個特別的地方舉辦婚禮，期盼能與摯愛的家人與朋友，共同度過一個難忘而美好的週末，在峇里島高地的自然美景中分享喜悅與祝福。</div>
                <div className="en">Unlike the tropical beaches commonly associated with Bali, Bedugul is a charming mountain region known for its cool weather, lush forests, and peaceful atmosphere.<br />
                  Nestled among misty valleys and scenic mountain views, HOMM Saranam Baturiti offers a tranquil escape where nature and serenity come together. We chose this special place to celebrate our wedding, hoping to share a memorable weekend with our family and friends surrounded by the beauty of Bali's highlands.
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  </>)
}

export default WeddingInfo