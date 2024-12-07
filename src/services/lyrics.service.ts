import axios from "axios"
import { utilService } from "./util.service"

export const lyricsService = {
  fetchLyrics,
  saveLyricsToFavorites,
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
    console.log("response", response)
    return response.data
  } catch (error) {
    console.error("Error fetching lyrics:", error)
    throw new Error("Failed to fetch lyrics")
  }
}

async function saveLyricsToFavorites(songToSave: SavedSong): Promise<void> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (songToSave._id) throw new Error("song already exists")
    songToSave._id = utilService.makeId()
    const savedSongs = JSON.parse(localStorage.getItem(LYRICS_DB) || "[]")
    const updatedSongs = [...savedSongs, songToSave]
    localStorage.setItem(LYRICS_DB, JSON.stringify(updatedSongs))

    console.log("Song saved successfully:", songToSave)
  } catch (err) {
    console.error("Error saving song:", err)
  }
}
