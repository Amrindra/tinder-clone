import "../styles/Onboarding.css";
import Navbar from "../components/Navbar";

function Onboarding() {
  const handleChange = () => {
    console.log("changed");
  };
  const handleSubmit = () => {
    console.log("submit");
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
              value={""}
              onChange={handleChange}
            />

            <label htmlFor="dob_day">Birthday</label>
            <div className="multiple-input-wrapper">
              <input
                type="number"
                id="dob_day"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={""}
                onChange={handleChange}
              />

              <input
                type="number"
                id="dob_month"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={""}
                onChange={handleChange}
              />

              <input
                type="number"
                id="dob_year"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={""}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="gender">Gender</label>
            <div className="multiple-input-wrapper">
              <input
                type="radio"
                id="man-gender-identity"
                name="gender-identity"
                value="man"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="man-gender-identity">Man</label>

              <input
                type="radio"
                id="woman-gender-identity"
                name="gender-identity"
                value="woman"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="woman-gender-identity">Woman</label>

              <input
                type="radio"
                id="more-gender-identity"
                name="gender-identity"
                value="more"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              type="checkbox"
              id="show-gender"
              name="show-gender"
              onChange={handleChange}
              checked={false}
            />

            <label htmlFor="">Show Me</label>
            <div className="multiple-input-wrapper">
              <input
                type="radio"
                id="man-gender-interest"
                name="gender-interest"
                value="man"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="man-gender-interest">Man</label>

              <input
                type="radio"
                id="woman-gender-interest"
                name="gender-interest"
                value="woman"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="woman-gender-interest">Woman</label>

              <input
                type="radio"
                id="everyone-gender-interest"
                name="gender-interest"
                value="everyone"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="more-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              type="text"
              id="about"
              name="about"
              placeholder="I like long walks.."
              required={true}
              value={""}
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
          </section>
        </form>
      </div>
    </>
  );
}

export default Onboarding;
