import { FormEvent, useEffect, useState } from "react"
import { SavedSong } from "../services/lyrics.service"

interface SaveLyricsModalProps {
  isModalOpen: boolean
  title: string
  artist: string
  onSaveLyrics: (songToSave: SavedSong) => void
  onClose: () => void
}

export default function SaveLyricsModal({
  isModalOpen,
  title,
  artist,
  onSaveLyrics,
  onClose,
}: SaveLyricsModalProps) {
  const [modalTitle, setModalTitle] = useState(title)
  const [modalArtist, setModalArtist] = useState(artist)

  useEffect(() => {
    setModalTitle(title)
    setModalArtist(artist)
  }, [title, artist])

  function handleSaveLyrics(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const savedSong = { title: modalTitle, artist: modalArtist, lyrics: "" }
    onSaveLyrics(savedSong)
    onClose()
  }

  if (!isModalOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <dialog open onClick={(ev) => ev.stopPropagation()}>
        <form onSubmit={handleSaveLyrics}>
          <h2>Save lyrics to favorites </h2>
          <div className="input-container">
            <label>Song Title: </label>
            <input
              type="text"
              value={modalTitle}
              onChange={(ev) => setModalTitle(ev.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Artist Name:</label>
            <input
              type="text"
              value={modalArtist}
              onChange={(ev) => setModalArtist(ev.target.value)}
            />
          </div>
          <div className="btns-container flex">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
