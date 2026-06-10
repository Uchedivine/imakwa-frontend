import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GalleryHome from './pages/gallery/GalleryHome'
import WorldCupHome from './pages/worldcup/WorldCupHome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GalleryHome />} />
        <Route path="/worldcup" element={<WorldCupHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App