import { useState, useEffect } from "react"
import useDebounce from "../custom-hooks/useDebounce"
import { lyricsService } from "../services/lyrics.service"

export default function SearchBar() {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [lyrics, setLyrics] = useState("")

  const debouncedTitle = useDebounce(title, 1500)
  const debouncedArtist = useDebounce(artist, 1500)

  useEffect(() => {
    const fetchLyrics = async () => {
      if (debouncedTitle && debouncedArtist) {
        try {
          const fetchedLyrics = await lyricsService.fetchLyrics(
            debouncedArtist,
            debouncedTitle
          )
          setLyrics(fetchedLyrics.lyrics)
        } catch (error) {
          console.error("Error fetching lyrics:", error)
        }
      }
    }

    fetchLyrics()
  }, [debouncedTitle, debouncedArtist])

  return (
    <>
      <div>
        <input
          className="main-input"
          placeholder="Enter artist's name..."
          value={artist}
          onChange={(ev) => setArtist(ev.target.value)}
        />
        <input
          className="main-input"
          placeholder="Enter song's name..."
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>
      <>
        <article>
          <p>{lyrics || "No lyrics yet... enter both fields"}</p>
        </article>
        <button>Add to favorites</button>
      </>
    </>
  )
}
