import { Routes, Route } from 'react-router-dom';
import { DcScreem } from '../components/dc/DcScreem';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { Navbar } from '../components/ui/NavBar';
import { HeroScreen } from '../components/hero/HeroScreen';

export const DashboardRoutes = () => {
  return (
    <>
        <Navbar />
        <div className='container'>
          <Routes>
              <Route path="/" element={<MarvelScreen />} />
              <Route path="marvel" element={<MarvelScreen />} />
              <Route path="dc" element={<DcScreem />} />
              <Route path="search" element={<SearchScreen />} />
              <Route path="hero" element={<HeroScreen />} />
          </Routes>
        </div>
    </>
  )
}
