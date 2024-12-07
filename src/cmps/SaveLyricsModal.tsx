import { useEffect, useState } from "react"

interface SaveLyricsModalProps {
  isModalOpen: boolean
  title: string
  artist: string
  onClose: () => void
}

export default function SaveLyricsModal({
  isModalOpen,
  title,
  artist,
  onClose,
}: SaveLyricsModalProps) {
  const [modalTitle, setModalTitle] = useState(title)
  const [modalArtist, setModalArtist] = useState(artist)

  useEffect(() => {
    setModalTitle(title)
    setModalArtist(artist)
  }, [title, artist])

  if (!isModalOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <dialog open onClick={(ev) => ev.stopPropagation()}>
        <form
          onSubmit={(ev) => {
            ev.preventDefault()
            console.log("Saved:", { modalTitle, modalArtist })
            onClose()
          }}
        >
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
