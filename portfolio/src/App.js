import logo from './Assets/logo.svg';
import btnIcon from './Assets/btn-icon.svg';
import './App.css';

function Header() { 
	return (
    <div className="Header rubik-S2">
      <img src={logo} className="Logo" alt="Logo" />
      <div className="Menu">
        <div className="Availability">
          <img className="Status" alt=""/>
          <p>AVAILABLE</p>
        </div>
        <button className="btn-pointer">
          <img src={btnIcon} className="btn-icon" alt=""/>
          ABOUT ME
        </button>
      </div>
    </div>
	);
}

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
