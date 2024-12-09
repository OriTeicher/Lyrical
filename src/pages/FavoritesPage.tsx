import { useEffect, useState } from "react"
import { lyricsService, SavedSong } from "../services/lyrics.service"
import LyricsModal from "../cmps/LyricsModal"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<SavedSong[] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedSong, setSelectedSong] = useState<SavedSong | null>(null)
  useEffect(() => {
    fetchFavorites()
  })

  async function fetchFavorites() {
    try {
      const favorites = await lyricsService.getFavoriteSongs()
      if (favorites) setFavorites(favorites)
    } catch (err) {
      console.error("Error fetching favorite songs:", err)
    }
  }

  if (!favorites) {
    return (
      <>
        <h2 className="fav-header">No favorites yet!</h2>
      </>
    )
  }

  return (
    <>
      <h2 className="fav-header">Your favorites </h2>
      <ul className="favorites-list">
        {favorites.map((favorite) => (
          <li
            onClick={() => {
              setSelectedSong(favorite)
              setIsModalOpen(true)
            }}
          >
            <button
              onClick={(event: any) => {
                event.stopPropagation()
                lyricsService.removeLyricsFromFavs(favorite._id)
              }}
            >
              x
            </button>
            <h3>{favorite.title}</h3>
            <h4>{favorite.artist}</h4>
          </li>
        ))}
      </ul>
      {selectedSong && (
        <LyricsModal
          lyrics={selectedSong.lyrics}
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedSong(null)
          }}
        />
      )}
    </>
  )
}
