import { useState } from "react"
import { Link } from "react-router-dom"

export default function AppHeader() {
  const [pages] = useState<string[]>(["Home", "About", "Songs", "Favorites"])
  const [selectedPage, setSelectedPage] = useState<string>("Home") // Default to "Home"

  const handlePageClick = (page: string) => {
    setSelectedPage(page)
  }

  return (
    <nav>
      <h1>LYRICAL</h1>
      <ul className="pages-list">
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${selectedPage === page ? "selected" : ""}`}
          >
            <Link to={page.toLowerCase()} onClick={() => handlePageClick(page)}>
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}