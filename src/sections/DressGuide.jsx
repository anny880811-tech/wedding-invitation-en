const DressGuide = () => {
  const colorData = [
    {
      color: '象牙白',
      colorChart: 'color-ivory',
    },
    {
      color: '灰綠色',
      colorChart: 'color-sage',
    },
    {
      color: '勃根地紅',
      colorChart: 'color-burgundy',
    },
    {
      color: '霧藍色',
      colorChart: 'color-mist-blue',
    },
    {
      color: '深藍色',
      colorChart: 'color-blue',
    },
  ]

  return (<>
    <div className="dressGuide-custom">
      <div className="section-title">DRESS GUIDE</div>
      <h3 className="section-header">穿搭建議</h3>
      <div className="section-heading__divider"></div>
      <div className="section-content">
        <p>我們推薦以下色系，因為它們與婚禮場地的自然景觀及整體佈置相得益彰，能夠共同營造溫暖且和諧的氛圍</p>
        <p className="en">We recommend the following color palette, as it works harmoniously with the wedding venue’s natural surroundings and overall décor to create a warm and inviting atmosphere.</p>
 
      </div>
      <div className="color-container">
        {colorData.map((item, index) => {
          return (<div key={index}>
            <div className={`colorChart ${item.colorChart}`}></div>
            <div className="title">{item.color}</div>
          </div>)
        })}
      </div>
    </div >
    <div className="note-custom">
      <div className="section-title">FROM OUR HEARTS</div>
      <h3 className="section-header">我們的心意</h3>
      <div className="section-heading__divider"></div>
      <div className="section-content">
        <p>我們負擔婚禮3天2夜的住宿、部分餐食與機場接送</p>
        <p className="en">As part of our wedding celebration, we will be delighted to cover your 3-day, 2-night accommodation, selected meals, and airport transfers.</p>
      </div>
    </div>
  </>)
}

export default DressGuide