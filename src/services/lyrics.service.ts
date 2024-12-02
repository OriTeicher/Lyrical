import axios from "axios"

export const lyricsService = {
  fetchLyrics,
}

export interface LyricsResponse {
  lyrics: string
}

const LYRICS_API_BASE_URL = "https://api.lyrics.ovh/v1"

async function fetchLyrics(
  artist: string,
  title: string
): Promise<LyricsResponse> {
  console.log("artist,title", artist, title)
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
