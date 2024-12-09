import axios from "axios"
import { utilService } from "./util.service"
import { storageService } from "./async-storage.service"
export const lyricsService = {
  fetchLyrics,
  saveLyricsToFavorites,
  getFavoriteSongs,
  removeLyricsFromFavs,
}

export interface LyricsResponse {
  lyrics: string
}

export interface SavedSong {
  _id?: string
  title: string
  artist: string | string[]
  lyrics: string
}

const LYRICS_API_BASE_URL = "https://api.lyrics.ovh/v1"
const LYRICS_DB = "favoritesDB"
async function fetchLyrics(
  artist: string,
  title: string
): Promise<LyricsResponse> {
  try {
    const response = await axios.get<LyricsResponse>(
      `${LYRICS_API_BASE_URL}/${artist}/${title}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching lyrics:", error)
    throw new Error("Failed to fetch lyrics")
  }
}

async function saveLyricsToFavorites(songToSave: SavedSong): Promise<void> {
  try {
    await storageService.post(LYRICS_DB, songToSave)
  } catch (err) {
    console.error("Error saving song:", err)
  }
}

async function getFavoriteSongs(): Promise<SavedSong[] | null | undefined> {
  try {
    return await storageService.query(LYRICS_DB)
  } catch (err) {
    console.error(err)
  }
}
async function removeLyricsFromFavs(
  songToRemoveId: string | undefined
): Promise<void> {
  try {
    if (!songToRemoveId) return
    await storageService.remove(LYRICS_DB, songToRemoveId)
  } catch (err) {
    console.error(err)
  }
}
