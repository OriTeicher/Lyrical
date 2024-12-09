interface LyricsModalProps {
  isModalOpen: boolean
  lyrics: string
  onClose: () => void
}

export default function LyricsModal({
  isModalOpen,
  lyrics,
  onClose,
}: LyricsModalProps) {
  if (!isModalOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <dialog
        className="lyrics-modal"
        open
        onClick={(ev) => ev.stopPropagation()}
      >
        <p>{lyrics}</p>
      </dialog>
    </div>
  )
}
