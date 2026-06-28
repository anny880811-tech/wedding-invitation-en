const DressGuide = () => {
  const colorData = [
    {
      color: 'Ivory',
      colorChart: 'color-ivory',
    },
    {
      color: 'Sage',
      colorChart: 'color-sage',
    },
    {
      color: 'Burgundy',
      colorChart: 'color-burgundy',
    },
    {
      color: 'Dusty',
      colorChart: 'color-mist-blue',
    },
    {
      color: 'Navy',
      colorChart: 'color-blue',
    },
  ]

  return (<>
    <div className="dressGuide-custom">
      {/* <div className="section-title">DRESS GUIDE</div> */}
      <h3 className="section-header">DRESS GUIDE</h3>
      {/* <h3 className="section-header">穿搭建議</h3> */}
      <div className="section-heading__divider"></div>
      <div className="section-content">
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
      {/* <div className="section-title">FROM OUR HEARTS</div> */}
      <h3 className="section-header">FROM OUR HEARTS</h3>
      {/* <h3 className="section-header">我們的心意</h3> */}
      <div className="section-heading__divider"></div>
      <div className="section-content">
        <p className="en">As part of our wedding celebration, we will be delighted to cover your 3-day, 2-night accommodation, selected meals, and airport transfers.</p>
      </div>
    </div>
  </>)
}

export default DressGuide