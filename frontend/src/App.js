import Login from './components/login';
import Register from './components/register';
import Home from './components/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import WebsiteInfo from './components/websiteInfo';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<Home/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/info" exact element={<WebsiteInfo/>} />
          <Route path="/website/:address" element={<WebsiteInfo/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
