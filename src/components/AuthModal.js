import { useState } from "react";
import "../styles/AuthModal.css";

// passing setShowModal state from the Home component
function AuthModal({ setShowModal, setSignUp, isSignUp }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confrimPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(email, password, confrimPassword);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      //checking to see if password matches with confirmPassowrd
      if (isSignUp && password !== confrimPassword) {
        setError("Passwords do not match!");
      }
      console.log("make a post request our database");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        X
      </div>
      {/* if not user never signup show create account button otherwise show Log in  */}
      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our Privacy Policy.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* if user signing up we need to show confrim password, but if only log in we don't need to show the confirm password */}
        {isSignUp && (
          <input
            type="password-check"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>s
    </div>
  );
}

export default AuthModal;
