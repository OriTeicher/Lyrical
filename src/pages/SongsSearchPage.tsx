import { useState, useEffect } from "react"
import useDebounce from "../custom-hooks/useDebounce"
import { lyricsService } from "../services/lyrics.service"
import { ScaleLoader } from "react-spinners"

export default function SongSearchPage() {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [lyrics, setLyrics] = useState("")
  const [loading, setLoading] = useState(false)

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
        setLyrics("Could not fetch lyrics. Please try again.")
      } finally {
        setLoading(false)
      }
    }
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
        {loading ? (
          <ScaleLoader color="white" width={20} height={100} />
        ) : (
          <p>{lyrics || <h2>Search real lyrics to get inspired!</h2>}</p>
        )}
      </article>
      <button>Add to favorites</button>
    </>
  )
}
