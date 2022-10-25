import React, { useState } from "react";
import { Chart } from "react-charts";
import SettingsData from "./Components/SettingsData";

const App = () => {
  const [input1, setInput1] = useState("");
  const [optionOneLogo, setOptionOneLogo] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png"
  );
  const [optionTwoLogo, setOptionTwoLogo] = useState(
    "https://lykacoin.net/pinksale.png"
  );
  const [optionOne, setOptionOne] = useState("BNB");
  const [optionTwo, setOptionTwo] = useState("LYKA");
  const [opone, setOpone] = useState(true);
  const [optwo, setOptwo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const data = React.useMemo(
    () => [
      {
        label: "BNB",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  const handleChangeOne = () => {
    setOptionOneLogo("https://lykacoin.net/pinksale.png");
    setOptionTwoLogo(
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png"
    );
    setOptionOne("LYKA");
    setOptionTwo("BNB");
    setOpone(false);
    setOptwo(true);
  };

  const handleChangeTwo = () => {
    setOptionTwoLogo("https://lykacoin.net/pinksale.png");
    setOptionOneLogo(
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png"
    );
    setOptionTwo("LYKA");
    setOptionOne("BNB");
    setOptwo(false);
    setOpone(true);
  };

  return (
    <>
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ backgroundColor: "#120D20" }}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              PunkPanda
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled">Disabled</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div style={{ borderRadius: 40 }} className="modal-content">
              <div
                style={{ backgroundColor: "#120D20", borderRadius: 30 }}
                className="modal-body p-5"
              >
                <div style={{ textAlign: "right" }}>
                  <svg
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "white", cursor: "pointer" }}
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </div>
                <h3
                  style={{ fontWeight: "bold" }}
                  className="text-center text-white mb-4"
                >
                  Confirm Swap
                </h3>
                <p className="text-center text-white">
                  By clicking approve you are confirming this transaction
                </p>

                <h6 className="text-white">You Pay</h6>

                <div className="row">
                  <div className="col">
                    <h5 className="text-white">6</h5>
                  </div>
                  <div className="col">
                    <h5 className="text-white" style={{ textAlign: "right" }}>
                      BNB
                    </h5>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <hr style={{ color: "white" }} />
                  </div>
                  <div className="col">
                    <div style={{ textAlign: "center" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "white" }}
                        width={26}
                        height={26}
                        fill="currentColor"
                        className="bi bi-arrow-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="col">
                    <hr style={{ color: "white" }} />
                  </div>
                </div>

                <h6 className="text-white mt-3">You Receive</h6>

                <div className="row">
                  <div className="col">
                    <h5 className="text-white">4209.4031327845296</h5>
                  </div>
                  <div className="col">
                    <h5 className="text-white" style={{ textAlign: "right" }}>
                      LYKA
                    </h5>
                  </div>
                </div>

                <p
                  style={{ fontSize: 15 }}
                  className="text-center text-white container mt-5"
                >
                  Output is estimated. You will receive at least
                  4209.4031327845296 PPM or the transition will revert
                </p>

                <div className="container ">
                  <button
                    style={{
                      backgroundColor: "#5D4DA1",
                      width: "100%",
                      padding: 20,
                      borderRadius: 30,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                    className="btn btn-primary"
                  >
                    Confirm Swap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-6 mt-5">
              <div>
                <h4 className="text-white">PPM/BNB</h4>
                <h1 style={{ fontWeight: "bold" }} className="text-white">
                  $0.53
                </h1>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "400px",
                }}
              >
                <Chart data={data} axes={axes} />
              </div>
            </div>
            <div className="col-sm-6 mt-5">
              {showSettings ? (
                <SettingsData setShowSettings={setShowSettings} />
              ) : (
                <div
                  className="container p-5"
                  style={{ backgroundColor: "#120D20" }}
                >
                  <form>
                    <h4
                      style={{ fontSize: 40 }}
                      className="text-center text-white mt-3"
                    >
                      Swap
                    </h4>
                    <div className="form-group m-4">
                      <div
                        style={{
                          padding: 20,
                          backgroundColor: "#0A0112",
                          borderRadius: 40,
                        }}
                      >
                        <div style={{ display: "flex", gap: 15 }}>
                          <div
                            style={{
                              padding: 10,
                              backgroundColor: "#1A132F",
                              borderRadius: 20,
                              display: "flex",
                              gap: 10,
                              paddingTop: 20,
                            }}
                          >
                            <img
                              src={optionOneLogo}
                              className="img-fluid"
                              style={{ width: 20, height: 20 }}
                              alt=""
                            />

                            <h6 className="text-white">{optionOne}</h6>
                          </div>
                          <h6 style={{ color: "#7F818A" }} className="mt-3">
                            You Pay
                          </h6>
                        </div>

                        <div
                          style={{ display: "flex", gap: 10, marginTop: 12 }}
                        >
                          <input
                            onChange={(e) => {
                              setInput1(e.target.value);
                            }}
                            style={{
                              padding: 10,
                              backgroundColor: "#0A0112",
                              border: "none",
                              color: "white",
                              outline: "none",
                              width: "100%",
                            }}
                            type="text"
                            placeholder="Enter BNB"
                          />
                          <div>
                            <h6 className="mt-3" style={{ color: "#69818B" }}>
                              Balance:
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginLeft: 40 }}>
                      {opone ? (
                        <svg
                          onClick={handleChangeOne}
                          xmlns="http://www.w3.org/2000/svg"
                          width={35}
                          style={{
                            color: "white",
                            backgroundColor: "#0A0112",
                            padding: 5,
                            borderRadius: 50,
                            cursor: "pointer",
                          }}
                          height={35}
                          fill="currentColor"
                          className="bi bi-arrow-down-up"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={handleChangeTwo}
                          xmlns="http://www.w3.org/2000/svg"
                          width={35}
                          style={{
                            color: "white",
                            backgroundColor: "#0A0112",
                            padding: 5,
                            borderRadius: 50,
                            cursor: "pointer",
                          }}
                          height={35}
                          fill="currentColor"
                          className="bi bi-arrow-down-up"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="form-group m-4">
                      <div
                        style={{
                          padding: 20,
                          backgroundColor: "#0A0112",
                          borderRadius: 40,
                        }}
                      >
                        <div style={{ display: "flex", gap: 15 }}>
                          <div
                            style={{
                              padding: 10,
                              backgroundColor: "#1A132F",
                              borderRadius: 20,
                              display: "flex",
                              gap: 10,
                              paddingTop: 20,
                            }}
                          >
                            <img
                              src={optionTwoLogo}
                              className="img-fluid"
                              style={{ width: 20, height: 20 }}
                              alt=""
                            />

                            <h6 className="text-white">{optionTwo}</h6>
                          </div>
                          <h6 style={{ color: "#7F818A" }} className="mt-3">
                            You Receive
                          </h6>
                        </div>

                        <div
                          style={{ display: "flex", gap: 10, marginTop: 12 }}
                        >
                          <input
                            onChange={(e) => {
                              setInput1(e.target.value);
                            }}
                            style={{
                              padding: 10,
                              backgroundColor: "#0A0112",
                              border: "none",
                              color: "white",
                              outline: "none",
                              width: "100%",
                            }}
                            type="text"
                            placeholder="Enter BNB"
                            disabled
                            value={0.0}
                          />
                          <div>
                            <h6 className="mt-3" style={{ color: "#69818B" }}>
                              Balance:
                            </h6>
                          </div>
                        </div>
                      </div>
                      {input1.length !== 0 ? (
                        <div
                          style={{
                            backgroundColor: "#1A132F",
                            padding: 20,
                            marginTop: 30,
                            borderRadius: 30,
                          }}
                        >
                          <div className="row">
                            <div className="col">
                              <h6 style={{ color: "#B9B8B8" }}>GAS Price</h6>
                              <h5 style={{ color: "#B9B8B8" }}>
                                High (204.45 - 273.92 Gwei)
                              </h5>
                            </div>
                            <div className="col">
                              <div style={{ textAlign: "right" }}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setShowSettings(true);
                                  }}
                                  style={{ color: "white", cursor: "pointer" }}
                                  width={26}
                                  height={26}
                                  fill="currentColor"
                                  className="bi bi-gear"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </form>
                  <div className="container ">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{
                        backgroundColor: "#5D4DA1",
                        width: "100%",
                        padding: 20,
                        borderRadius: 30,
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                      className="btn btn-primary"
                    >
                      Connect Wallete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
