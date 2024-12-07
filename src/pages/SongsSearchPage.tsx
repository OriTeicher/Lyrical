import { useState, useEffect } from "react"
import useDebounce from "../custom-hooks/useDebounce"
import { lyricsService, SavedSong } from "../services/lyrics.service"
import { ScaleLoader } from "react-spinners"
import SaveLyricsModal from "../cmps/SaveLyricsModal"

export default function SongSearchPage() {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [lyrics, setLyrics] = useState("")
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const debouncedTitle = useDebounce(title, 1500)
  const debouncedArtist = useDebounce(artist, 1500)

  async function fetchLyrics() {
    if (debouncedTitle && debouncedArtist) {
      setLoading(true)
      try {
        const fetchedLyrics = await lyricsService.fetchLyrics(
          debouncedArtist,
          debouncedTitle
        )
        setLyrics(fetchedLyrics.lyrics)
      } catch (error) {
        console.error("Error fetching lyrics:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  async function handleSaveLyrics(songToSave: SavedSong) {
    songToSave.lyrics = lyrics
    await lyricsService.saveLyricsToFavorites(songToSave)
  }

  useEffect(() => {
    fetchLyrics()
  }, [debouncedTitle, debouncedArtist])

  return (
    <>
      <div className="search-container">
        <input
          className="main-input"
          placeholder="Enter artist's name..."
          value={artist}
          onChange={(ev) => {
            setArtist(ev.target.value)
            setLoading(true)
          }}
        />
        <input
          className="main-input"
          placeholder="Enter song's name..."
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value)
            setLoading(true)
          }}
        />
      </div>
      <article className="flex-col justify-center">
        {loading && (title || artist) ? (
          <ScaleLoader color="white" width={20} height={100} />
        ) : (
          <p>
            {lyrics || (
              <h2 className="flex justify-center align-center">
                Search real lyrics to get inspired!
              </h2>
            )}
          </p>
        )}
      </article>
      <button onClick={() => (lyrics ? setIsModalOpen(true) : null)}>
        Add to favorites
      </button>
      <SaveLyricsModal
        isModalOpen={isModalOpen}
        title={title}
        artist={artist}
        onClose={() => setIsModalOpen(false)}
        onSaveLyrics={handleSaveLyrics}
      />
    </>
  )
}
