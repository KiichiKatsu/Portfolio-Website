import logo from '../Assets/logo.svg';
import btnIcon from '../Assets/btn-icon.svg';

import '../Styles/Style.css';

function TopNav() {
  return (
    <nav id="TopNav" className="Subtitle2">
      <img src={logo} className="Logo" alt="Logo" />
      <div className="MenuContainer">
        <div className="Availability">
          <img className="StatusIndicator" alt=""/>
          <h5>AVAILABLE</h5>
        </div>
        <button>
          <img src={btnIcon} alt=""/>
          <h5>ABOUT ME</h5>
        </button>
      </div>
    </nav>
  );
}

export default TopNav;