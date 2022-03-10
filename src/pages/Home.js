import "../styles/Home.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import AuthModal from "../components/AuthModal";

function Home() {
  const [showModal, setShowModal] = useState(false);

  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
    setShowModal(!showModal);
  };

  return (
    <div className="home-container">
      <Navbar
        minimal={false}
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
      />

      <div className="home">
        <h1>Swipe Right</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>

        {/* if showModal is true then show the AuthModal component */}
        {showModal && <AuthModal setShowModal={setShowModal} />}
      </div>
    </div>
  );
}

export default Home;
