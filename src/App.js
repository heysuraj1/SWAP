import React, { useState } from "react";
import { Chart } from "react-charts";

const App = () => {
  const [input1, setInput1] = useState("");

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
              .
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
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png"
                            className="img-fluid"
                            style={{ width: 20, height: 20 }}
                            alt=""
                          />

                          <h6 className="text-white">BNB</h6>
                        </div>
                        <h6 style={{ color: "#7F818A" }} className="mt-3">
                          You Pay
                        </h6>
                      </div>

                      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={35}
                      style={{
                        color: "white",
                        backgroundColor: "#0A0112",
                        padding: 5,
                        borderRadius: 50,
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
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png"
                            className="img-fluid"
                            style={{ width: 20, height: 20 }}
                            alt=""
                          />

                          <h6 className="text-white">BNB</h6>
                        </div>
                        <h6 style={{ color: "#7F818A" }} className="mt-3">
                          You Receive
                        </h6>
                      </div>

                      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
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
                        <h6 style={{ color: "#B9B8B8" }}>GAS Price</h6>
                        <h5 style={{ color: "#B9B8B8" }}>
                          High (204.45 - 273.92 Gwei)
                        </h5>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="container ">
                    <button
                      type="submit"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
