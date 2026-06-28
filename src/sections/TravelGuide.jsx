import { FileText, Wallet, Plane } from "lucide-react"
const TravelGuide = () => {
  const travelGuideData = [
    {
      bgColor: 'cardA',
      icons: <FileText size={30} />,
      title: '簽證申辦',
      enTitle: 'Visa Application',
      content: [`於抵達峇里島前2天申請，需上傳護照及大頭照，護照有效期限至少大於6個月，需有回程機票與飯店資訊，每個團體可由一位代表填寫所有人的資訊，簽證費用為IDR 500,000`, `最後會收到EVOA電子檔，記得把檔案存起來`,
        'Apply within 2 days before arrival in Bali. You will need to upload your passport and a passport photo. Your passport must be valid for at least 6 months, and you must have a return flight ticket and hotel information. One representative per group may complete the application for all travelers. The visa fee is IDR 500,000.',
        'You will receive an EVOA electronic document upon approval. Please remember to save it.'
      ],
      warning: '[此為唯一官方網站，網路上有很多假網站詐騙，請務必小心! This is the only official website. Please be cautious of fraudulent websites online.]',
      btn: [
        {
          text: '落地簽證申辦教學',
          enText: 'Visa Application Tutorial',
          url: 'https://tw.trip.com/guide/info/%E5%B3%87%E9%87%8C%E5%B3%B6%E7%B0%BD%E8%AD%89.html'
        },
        {
          text: '落地簽證申辦官方網站',
          enText: 'Official Visa Website',
          url: 'https://evisa.imigrasi.go.id/'
        },
      ],
    },
    {
      bgColor: 'cardB',
      icons: <Plane size={30} />,
      title: '入境資訊',
      enTitle: 'Entry Information',
      content: ['入境前三天申請，每個團體可由一位代表填寫所有人的資訊，申請完會有QR code，記得用手機截圖或列印出來',
        'Please complete the entry declaration within 3 days prior to arrival. One representative per group may submit the information for all travelers. After submission, a QR code will be generated. Please save it as a screenshot or print it out.'
      ],
      btn: [
        {
          text: '海關申報網站',
          enText: 'Customs Declaration',
          url: 'https://allindonesia.imigrasi.go.id/'
        },
      ],
    },
    {
      bgColor: 'cardC',
      icons: <Wallet size={30} />,
      title: '旅遊觀光稅',
      enTitle: 'Tourism Levy',
      content: ['每個團體可由一位代表填寫所有人的資訊，費用為IDR 150,000', 'One representative per group may complete the application for all travelers. The fee is IDR 150,000.'],
      btn: [
        {
          text: '旅遊觀光稅網站',
          enText: 'Tourism Levy',
          url: 'https://lovebali.baliprov.go.id/home?spm=BlogArticle.InArticleHyperlinkWord&clickId=73e8f00242'
        },
      ],
    },
  ]
  return (<>
    <div className="travelGuide-custom">
      <div className="section-title">TRAVEL GUIDE</div>
      <h3 className="section-header">行前準備</h3>
      <div className="section-heading__divider"></div>
      <div className="card-container">
        {travelGuideData.map((item, index) => {
          return (<div className={`card-header ${item.bgColor}`} key={index}>
            <div className="card-group">
              <div className="header-group">
                {item.icons}
                <h2>{item.title} <br />{item.enTitle}</h2>
              </div>
              {item.btn.map((url, i) => {
                return (
                  <div key={i}>
                    <a href={url.url} target="_blank" rel="noreferrer" className="travel-link">
                      <span className="travel-link__zh">{url.text}</span>
                      <br /><span className="travel-link__en">{url.enText}</span><i className="bi bi-chevron-right"></i>
                    </a>
                  </div>
                )
              })}
              <div className="notice">注意事項 Notes</div>
              {item.content.map((notice, i) => {
                return (
                  <p key={i} className="en">{notice}</p>
                )
              })}
              {item.warning && <div><span className="warn">{item.warning}</span></div>}
            </div>
          </div>)
        })}
      </div>

    </div>
  </>)
}

export default TravelGuide