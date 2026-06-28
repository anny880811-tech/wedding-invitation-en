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
  </>)
}

export default DressGuide