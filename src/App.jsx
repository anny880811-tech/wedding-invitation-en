import { useState, useRef, useEffect } from "react";
import Cover from "./sections/Cover";
import Hero from "./sections/Hero";
import WeddingInfo from "./sections/WeddingInfo";
import Gallery from "./sections/Gallery";
import WeddingHospitality from "./sections/WeddingHospitality";
import RSVP from "./sections/RSVP";
import TravelGuide from "./sections/TravelGuide";
import DressGuide from "./sections/DressGuide";
import Footer from "./sections/Footer";
import LeaveMessage from "./sections/LeaveMessage";
import AudioPlayer from "./components/AudioPlayer";
import weddingPhoto from "./assets/TRE_2314.webp";
import { useParams } from "react-router";
import guestList from './guestList';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [coverReady, setCoverReady] = useState(false)
  const audioRef = useRef(null)
  const { guestId } = useParams()
  const guestName = guestId ? guestList[guestId] : null
  const displayName = guestName ?? 'Dear Family and Friends'
  const handleOpen = () => {
    setIsOpen(true)
    setPlaying(true)
    if (audioRef.current) {
      audioRef.current.play().catch(() => { })
    }
  }
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => { })
    }
    setPlaying(true)
  }
  useEffect(() => {
    const handleVisibility = () => {
      if (!audioRef.current) return
      if (document.hidden) {
        audioRef.current.pause()
      } else if (playing) {
        audioRef.current.play()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [playing])


  return (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        pointerEvents: isOpen ? 'none' : 'auto',
        visibility: isOpen ? 'hidden' : 'visible',
      }}>
        <Cover
          onOpen={handleOpen}
          onPlay={handlePlay}
          onReady={() => setCoverReady(true)}
          gusetName={displayName}
        />
      </div>
      <div className="site-layout">

        {/* 左側固定圖片（手機隱藏） */}
        <div className="site-left">
          <img src={weddingPhoto} alt="" className="site-left__img" />
        </div>

        <div className="site-right">
          {coverReady && (<>
            <Hero />
            <WeddingInfo />
            {/* <WeddingHospitality /> */}
            <Gallery />
            <RSVP />
            {/* <TravelGuide /> */}
            <DressGuide />
            <LeaveMessage />
            <Footer />
          </>)}
        </div>
      </div>
      <AudioPlayer playing={playing} setPlaying={setPlaying} audioRef={audioRef} />
    </>
  )
}

export default App
