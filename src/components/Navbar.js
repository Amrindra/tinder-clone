import "../styles/Navbar.css";
// import redLogo from "../images/redLogo.png";
// import whitelogo from "../images/whiteLogo.png";

const Navbar = ({
  minimal,
  authToken,
  setShowModal,
  showModal,
  setIsSignUp
}) => {
  const redLogo = "https://img.icons8.com/color-glass/100/000000/--tinder.png";
  const whitelogo = "https://img.icons8.com/ios/100/000000/--tinder.png";

  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? redLogo : whitelogo} alt="" />
      </div>

      {!authToken && !minimal && (
        <button
          className="nav-login-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};

export default Navbar;
