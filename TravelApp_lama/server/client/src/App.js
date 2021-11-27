import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";
import "./app.css";
function App() {
  const myStorage = window.localStorage;
  const [currUser, setCurrUser] = React.useState(myStorage.getItem('user'));
  const [pins, setPins] = React.useState([]);
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
  const [newPlace, setNewPlace] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [viewport, setViewport] = React.useState({
    height: "100vh",
    width: "100vw",
    latitude: 28.6139,
    longitude: 77.209,
    zoom: 8,
  });
  React.useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
      setTitle("");
      setDesc("");
      setRating(1);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrUser(false);
  };
  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAP}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
          onDblClick={(e) => handleAddClick(e)}
          transitionDuration={"200"}
        >
          {pins.length !== 0
            ? pins.map((p) => (
                <>
                  <Marker
                    latitude={p.lat}
                    longitude={p.long}
                    offsetLeft={-viewport.zoom * 3.5}
                    offsetTop={-viewport.zoom * 7}
                  >
                    <Room
                      style={{
                        fontSize: viewport.zoom * 7,
                        color: p.username === currUser ? "tomato" : "green",
                        cursor: "pointer",
                      }}
                      onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                    ></Room>
                  </Marker>
                  {p._id === currentPlaceId && (
                    <Popup
                      latitude={p.lat}
                      longitude={p.long}
                      closeButton={true}
                      closeOnClick={false}
                      onClose={() => setCurrentPlaceId(null)}
                      anchor="left"
                    >
                      <div className="card">
                        <label htmlFor="">Place</label>
                        <h4 className="place">{p.title}</h4>
                        <label htmlFor="">Review</label>
                        <p className="desc">{p.desc}</p>
                        <label htmlFor="">Rating</label>
                        <div className="stars">
                          {Array(p.rating).fill(<Star className="star" />)}
                        </div>
                        <label htmlFor="">Information</label>
                        <span className="username">
                          Created by <b>{p.username}</b>
                        </span>
                        <span className="date">{format(p.createdAt)}</span>
                      </div>
                    </Popup>
                  )}
                </>
              ))
            : null}
          {newPlace && (
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
            >
              <div className="">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    placeholder="Enter a Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="">Review</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Say us something about this place"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                  <label htmlFor="">Rating</label>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button className="submitButton" type="submit">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          )}
          {currUser ? (
            <button className="button logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <div className="buttons">
              <button
                className="button login"
                onClick={() => {
                  setShowLogin(true);
                  setShowRegister(false);
                }}
              >
                Login
              </button>
              <button
                className="button register"
                onClick={() => {
                  setShowRegister(true);
                  setShowLogin(false);
                }}
              >
                Register
              </button>
            </div>
          )}
          {showRegister && <Register setShowRegister={setShowRegister} />}
          {showLogin && (
            <Login
              setShowLogin={setShowLogin}
              myStorage={myStorage}
              setCurrUser={setCurrUser}
            />
          )}
        </ReactMapGL>
      </div>
    </>
  );
}

export default App;
