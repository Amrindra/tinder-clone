import "../styles/Dashboard.css";
import { useEffect, useState } from "react";

import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      // console.log("getUser respoonse", response);

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  const characters = [
    {
      name: "Richard Hendricks",
      url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_27/3489810/210709-pandas-mc-10262.JPG",
    },
    {
      name: "Erlich Bachman",
      url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_27/3489810/210709-pandas-mc-10262.JPG",
    },
    {
      name: "Monica Hall",
      url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_27/3489810/210709-pandas-mc-10262.JPG",
    },
    {
      name: "Jared Dunn",
      url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_27/3489810/210709-pandas-mc-10262.JPG",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_27/3489810/210709-pandas-mc-10262.JPG",
    },
  ];

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="dashboard">
      <ChatContainer />

      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}

          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
