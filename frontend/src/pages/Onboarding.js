import "../styles/Onboarding.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    // email: cookies.Email,
    url: "",
    about: "",
    matches: [],
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log("event", event);
    const value =
      // if a user checks on checkbox then retrieve that value from the checkbox otherwise retrieve data from user type in
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;
    console.log("value is: " + value, "name is: " + name);

    //when we recieved data from a user "name and value" then we call setFormData and pass in previous state and update its value. EX: [name]:value
    setFormData((prevState) => ({
      // ...prevState meaning that copy all the prevState and search for [name] and set its value [name]:value
      ...prevState,
      [name]: value,
    }));
    console.log([name]);
  };

  console.log(formData);

  const handleSubmit = async (event) => {
    console.log("submit");
    event.preventDefault();

    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });

      const success = response.status === 200;

      if (success) navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            {/* ********Birthday SECTION************ */}
            <label htmlFor="dob_day">Birthday</label>
            <div className="multiple-input-wrapper">
              <input
                type="number"
                id="dob_day"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                type="number"
                id="dob_month"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                type="number"
                id="dob_year"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            {/* ********GENDER IDENTITY SECTION************ */}
            <label htmlFor="gender">Gender</label>
            <div className="multiple-input-wrapper">
              <input
                type="radio"
                id="man-gender-identity"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                // show check when user checks on man lable
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>

              <input
                type="radio"
                id="woman-gender-identity"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>

              <input
                type="radio"
                id="more-gender-identity"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              type="checkbox"
              id="show-gender"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />

            {/* ********GENDER INTEREST SECTION************ */}

            <label htmlFor="">Show Me</label>
            <div className="multiple-input-wrapper">
              <input
                type="radio"
                id="man-gender-interest"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Man</label>

              <input
                type="radio"
                id="woman-gender-interest"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Woman</label>

              <input
                type="radio"
                id="everyone-gender-interest"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              type="text"
              id="about"
              name="about"
              placeholder="I like long walks.."
              required={true}
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="profile">Profile</label>
            <input
              type="url"
              id="url"
              name="url"
              required={true}
              onChange={handleChange}
            />

            <div className="photo-wrapper">
              {/* Only show profile pictures when form data is exist */}
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
}

export default Onboarding;
