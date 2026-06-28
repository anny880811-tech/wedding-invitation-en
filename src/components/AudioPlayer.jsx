import { useEffect} from "react"
import bgm from '../music/bgm.mp3'

const AudioPlayer = ({ playing, setPlaying, audioRef }) => {
  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.muted = true
    audioRef.current.play().catch(() => { })

  const unlock = () => {
      if (!audioRef.current) return
      audioRef.current.muted = false
      audioRef.current.play().catch(() => { })
      setPlaying(true)
      document.removeEventListener('click', unlock)
      document.removeEventListener('scroll', unlock)
    }

    document.addEventListener('click', unlock)
    document.addEventListener('scroll', unlock)

    return () => {
      document.removeEventListener('click', unlock)
      document.removeEventListener('scroll', unlock)
    }
  }, [])
  return (<>
    <audio ref={audioRef} loop src={bgm} preload="auto" />
    <button
      className="audio-btn"
      onClick={() => {
        if (playing) {
          audioRef.current?.pause()
        } else {
          audioRef.current?.play()
        }
        setPlaying(!playing)
      }}
    >
      {playing
        ? <i className="bi bi-stop-circle-fill"></i>
        : <i className="bi bi-play-circle-fill"></i>
      }
    </button>
  </>)
}

export default AudioPlayer