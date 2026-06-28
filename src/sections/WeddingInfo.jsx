import flowers07 from "../assets/flowers07.webp"
import { Accordion } from 'react-bootstrap';
const WeddingInfo = () => {
  const weddingInfoData = [
    {
      icon: <i className="bi bi-calendar-week i-dark gold-text"></i>,
      title: 'Date',
      value: '2027.01.24',
      description: 'Sunday',
    },
    {
      icon: <i className="bi bi-clock i-dark gold-text"></i>,
      title: 'Time (TBD)',
      value: '16:30 Ceremony',
      description: '18:30 Reception',
    },
    {
      icon: <i className="bi bi-geo-alt i-dark gold-text"></i>,
      title: 'Venue',
      value: 'HOMM Saranam Baturiti',
      description: '',
      mapUrl: 'https://maps.app.goo.gl/N4PrS8erK5nMvFSQ7',
    },
  ]

  return (<>
    <div className="weddingInfo-custom dark-section dark-bg-wrapper">
      {/* <div className="section-title-dark gold-text">WEDDING INFORMATION</div> */}
      <h3 className="section-header-dark gold-text">WEDDING INFORMATION</h3>
      {/* <h3 className="section-header-dark">婚禮資訊</h3> */}
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
                View Map <i className="bi bi-chevron-right"></i>
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
              <Accordion.Header>About the Venue
              </Accordion.Header>
              <Accordion.Body>
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