import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AppHeader from "./cmps/AppHeader"

function App() {
  return (
    <section className="app-container">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App
