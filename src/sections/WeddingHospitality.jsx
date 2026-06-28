import { BedDouble} from "lucide-react"
import flowers07 from "../assets/flowers07.webp"
const WeddingHospitality = () => {
  const hospitalityData = [
    {
      icon: <BedDouble size={28} />,
      title: '住宿安排 Accommodation',
      details: [
        '三天兩夜住宿',
        '1/23(六) - 1/25(一)',
      ],
    },
    {
      icon: <i className="bi bi-fork-knife"></i>,
      title: '餐食安排 Meals',
      details: [
        '1/23 晚餐',
        '1/24 早餐&晚餐',
        '1/25 早餐',
      ],
    },
    {
      icon: <i className="bi bi-car-front"></i>,
      title: '機場-度假村接送 Airport Transfers',
      details: [
        '接機 1/23(六)',
        'Arrival transfer 1/23',
        '送機 1/25(一)',
        'Departure transfer  1/25',
        '',
        '若於其他日期抵達/離開峇里島，請自行安排交通',
        'If you arrive in or depart from Bali on other dates, please arrange your own transportation.',
      ],
    },
  ]
  return (<>
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8922a" />
          <stop offset="25%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#b8891a" />
          <stop offset="75%" stopColor="#ffe9a3" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
    </svg>
    <div className="hospitality-custom dark-section dark-bg-wrapper">
      <div className="section-title-dark gold-text">WHAT WE PROVIDE</div>
      <h3 className="section-header-dark">我們為您準備了</h3>
      <div className="section-content">
        <img src={flowers07} className="flower-edge flower-center " alt="花卉分隔線" />
        {hospitalityData.map((item, index) => {
          return (<div className="infoCard" key={index}>
            <div className="card-icon gold-text">
              <div className="icon-circle">
                {item.icon}
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">{item.title}</h3>
              {item.details.map((detail, i) => (
                detail === ''
                  ? <div key={i} className="card-spacer" />
                  : <div key={i}>
                    <p className="card-primary gold-text">{detail}</p>
                  </div>
              ))}
            </div>
          </div>)
        })}
      </div>

    </div>
    <div className="anti-line-tape"></div>
  </>)
}

export default WeddingHospitality
