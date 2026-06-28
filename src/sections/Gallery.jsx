import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import TRE_2294 from '../assets/TRE_2294.webp'
import TRE_2353 from '../assets/TRE_2353.webp'
import TRE_2347 from '../assets/TRE_2347.webp'
import TRE_2335 from '../assets/TRE_2335.webp'
import TRE_2444 from '../assets/TRE_2444.webp'
import TRE_2521 from '../assets/TRE_2521.webp'

const Gallery = () => {
  const [index, setIndex] = useState(-1)
  const photos = [
    TRE_2294,
    TRE_2353,
    TRE_2347,
    TRE_2335,
    TRE_2521,
    TRE_2444,
  ]
  const slides = photos.map(src => ({ src }))
  return (<>
    <div className="gallery-custom">
      <div className="section-title">MOMENTS OF US</div>
      <h3 className="section-header">屬於我們的片刻</h3>
      <div className="section-heading__divider"></div>
      <div className="photo-group">
        <div className="photo-mixed-group">
          <div className="photo-portrait-container">
            <img src={TRE_2294} className="photo-s" alt="婚紗照" loading="eager" onClick={() => { setIndex(0) }} />
          </div>
          <div className="photo-landscape-container">
            <img src={TRE_2353} className="photo-s" alt="婚紗照" loading="eager" onClick={() => { setIndex(1) }} />
          </div>
        </div>
        <div className="photo-mixed-group">
          <div className="photo-landscape-container">
            <img src={TRE_2347} className="photo-s" alt="婚紗照" loading="eager" onClick={() => { setIndex(2) }} />
          </div>
          <div className="photo-portrait-container">
            <img src={TRE_2335} className="photo-s" alt="婚紗照" loading="eager" onClick={() => { setIndex(3) }} />
          </div>
        </div>
        <div className="photo-mixed-group">
          <div className="photo-portrait-container">
            <img src={TRE_2521} className="photo-s" alt="婚紗照" loading="eager" onClick={() => { setIndex(4) }} />
          </div>
          <div className="photo-landscape-container">
            <img src={TRE_2444} className="photo-s" alt="婚紗照" loading="eager" onClick={() => { setIndex(5) }} />
          </div>
        </div>
      </div>
    </div>
     <Lightbox
          open={index >= 0}
          index={index}
          close={() => { setIndex(-1) }}
          slides={slides}
          noScroll={{ disabled: true }}
          // 禁用套件內建的滾動條鎖定與間距補償功能
        />
  </>)
}

export default Gallery