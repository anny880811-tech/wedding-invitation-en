import { useState } from "react"
import coverbg from '../assets/TRE_2314.webp'

const Cover = ({ onOpen, onPlay, onReady, gusetName }) => {
  const [isLeaving, setIsLeaving] = useState(false)
  const [bgLoaded, setBgLoaded] = useState(false)
  const handleOpen = () => {
    onPlay()
    setIsLeaving(true)
    setTimeout(() => {
      onOpen()
    }, 1200) // 配合動畫時間
  }
  const handleLoad = () => {
    setBgLoaded(true)
    onReady()
  }
  return (<>
    <div className={`invitation-container${isLeaving ? ' slide-up' : ''}`}>
      <img
        className={`cover-bg${bgLoaded ? ' is-loaded' : ''}`}
        src={coverbg}
        alt="cover婚紗照"
        onLoad={handleLoad}
        onError={() => { setBgLoaded(true); onReady() }}
        fetchPriority="high" />
      {bgLoaded && (<>
        {/* 桌機版 */}
        <div className="cover-text--desktop">
          <div className="cover-text__names">
            <h5>THE WEDDING OF</h5>
            <h1 className="title">韋昊良 ＆ 呂易庭</h1>
            <h1 className="title">Beni & Yiting</h1>
            <p>2027.01.24</p>
          </div>
          <div className="cover-btn-desktop">
            <h2>{gusetName}</h2>
            <h4>You are cordially invited to attend our wedding.</h4>
            <button type="button" className="cover-btn" onClick={handleOpen}>
              Open Invitation
            </button>
          </div>
        </div>

        {/* 手機版 */}
        <div className="cover-text">

          <h5>THE WEDDING OF</h5>
          <h1 className="title">韋昊良 ＆ 呂易庭</h1>
          <h1 className="title">Beni & Yiting</h1>
          <p>2027.01.24</p>
        </div>
        <div className="cover-btn-wrapper">
          <h2>{gusetName}</h2>
          <h4>You are cordially invited</h4>
          <h5>to attend our wedding.</h5>
          <button type="button" className="cover-btn" onClick={handleOpen}>Open Invitation</button>
        </div>
      </>)}
    </div>
  </>)
}

export default Cover
