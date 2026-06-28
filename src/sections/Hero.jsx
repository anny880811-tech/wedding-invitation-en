import TRE_2530 from '../assets/TRE_2530.webp'

const Hero = () => {
  return (<>
    <div className="hero-custom">
        <div className="img-container">
          <img src={TRE_2530} alt="婚紗照" className="main-img" loading="lazy" />
        </div>
        <h1 className="title">韋昊良 ＆ 呂易庭</h1>
        <h1 className="title-b">Beni & Yiting</h1>
        <div className="section-title">A Note From Us</div>
        <h3 className="section-header">我們想說</h3>
        <div className="section-heading__divider"></div>
        <div className="section-content">
          <p>感謝您願意與我們一起飛往峇里島</p>
          <p>見證人生中最重要的一天</p>
          <p>這不只是婚禮</p>
          <p>更是一趟屬於我們的旅行</p>
          <p className='en'>Thank you for traveling to Bali to celebrate with us and witness one of the most important days of our lives. <br />
            This is more than a wedding. <br />
            It is a journey we would love to share with you.
          </p>
        </div>
      </div>
  </>)
}

export default Hero