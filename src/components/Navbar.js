import "../styles/Navbar.css";

function Navbar({ minimal, authToken }) {
  const redLogo = "https://img.icons8.com/color-glass/100/000000/--tinder.png";
  const whitelogo = "https://img.icons8.com/nolan/100/--tinder.png";

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? redLogo : whitelogo} alt="" />
      </div>

      {!authToken && <button className="nav-button">Log in</button>}
    </nav>
  );
}

export default Navbar;
