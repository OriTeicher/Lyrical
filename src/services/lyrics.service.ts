import axios from "axios"

export const lyricsService = {
  getLyricsBySongTitle,
}

const API_URL = "https://api.lyrics.ovh/v1"

async function getLyricsBySongTitle(title: string) {
  const reqUrl = `${API_URL}/${title}`
  try {
    const res = axios.get(reqUrl)
    console.log("res", res)
  } catch (err) {
    console.error(err)
  }
}
