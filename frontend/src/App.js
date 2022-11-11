import './App.css';
import Navbar from './General/Navbar';
import Home from './General/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Home />
      </div>
    </div>
  );
}

export default App;
