import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './general/Navbar';
import Home from './homePage/Home';
import Swap from './swap/Swap';
import Confirm from './confirm/Confirm';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/confirm" element={<Confirm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
