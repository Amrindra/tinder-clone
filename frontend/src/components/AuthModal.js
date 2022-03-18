import { useState } from "react";
import "../styles/AuthModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// passing setShowModal state from the Home component
function AuthModal({ setShowModal, isSignUp }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confrimPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  console.log(email, password, confrimPassword);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //checking to see if password matches with confirmPassowrd
      if (isSignUp && password !== confrimPassword) {
        setError("Passwords do not match!");
        return;
      }
      // passing email and password to axios which make a post request to the backend database
      //if user isn't signup bring them to signup page otherwise bring them to the login page
      const response = await axios.post(
        `http://localhost:8000/${isSignUp ? "signup" : "login"}`,
        {
          email,
          password,
        }
      );

      //Setting cookie for email, userId, and token which are getting response back from the backend which is "sanitizedEmail, generatedUserId, userId " being returned
      setCookie("Email", response.data.email);
      setCookie("UserId", response.data.userId);
      // setCookie("AuthToken", response.data.token);

      const success = response.status === 201;

      // if authentication is success (provide the correct email and password) and signup then send the user to the onboarding page
      if (success && isSignUp) navigate("/onboarding");
      //if authenticatoiin is success and not signup then navigate to dashboard page
      if (success && !isSignUp) navigate("/dashboard");
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
            type="password"
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
      <h2>GET THE APP</h2>
    </div>
  );
}

export default AuthModal;
