import { BrowserRouter, Routes, Route } from "react-router-dom"
import SongSearchPage from "./pages/SongsSearchPage"
import AppHeader from "./cmps/AppHeader"
import Home from "./pages/HomePage"

function App() {
  return (
    <section className="app-container">
      <BrowserRouter>
        <AppHeader />
        <section className="home-container">
          <Routes>
            <Route path="/" element={<SongSearchPage />} />
            <Route path="/songs" element={<SongSearchPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </section>
      </BrowserRouter>
    </section>
  )
}

export default App
