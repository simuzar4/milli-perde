import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { FilmDetail } from './pages/FilmDetail'
import { Credits } from './pages/Credits'
import { Films } from './pages/Films'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { People } from './pages/People'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="filmler" element={<Films />} />
          <Route path="film/:id" element={<FilmDetail />} />
          <Route path="menbeler" element={<Credits />} />
          <Route path="rejissorlar" element={<People role="director" />} />
          <Route path="aktyorlar" element={<People role="actor" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
