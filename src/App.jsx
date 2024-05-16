import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Main from './component/MainPage';
import Popular from './component/PopularPage';
import NowPlaying from './component/NowPlayingPage';
import TopRated from './component/TopRatedPage';
import UpComing from './component/UpComingPage';
import MovieDetail from './component/MovieDetail';
import NotFound from './component/NotFound';
import SignUp from './component/SignUp';
import Login from './component/LoginPage';


function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="Navbar">
          <div className="UMC">
            <Link to="/"><p>UMC Movie</p></Link>
          </div>
          <Link to="/SignUp"><p>회원가입</p></Link>
          <Link to="/popular"><p>Popular</p></Link>
          <Link to="/NowPlaying"><p>Now Playing</p></Link>
          <Link to="/TopRated"><p>Top Rated</p></Link>
          <Link to="/UpComing"><p>Upcoming</p></Link>
        </div>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/popular/:id" element={<MovieDetail />} />
          <Route path="/NowPlaying" element={<NowPlaying />} />
          <Route path="/NowPlaying/:id" element={<MovieDetail />} />
          <Route path="/TopRated" element={<TopRated />} />
          <Route path="/TopRated/:id" element={<MovieDetail />} />
          <Route path="/UpComing" element={<UpComing />} />
          <Route path="/UpComing/:id" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
        </Routes>

        <footer>
          UMC_3WEEK_PORJECT_PARK SAM RYEONG
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;