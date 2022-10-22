import React from "react";
import { Chart } from "react-charts";

const App = () => {
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
                    <input
                      style={{ padding: 20 }}
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter BNB"
                    />
                  </div>
                  <div className="form-group m-4">
                    <input
                      style={{ padding: 20 }}
                      type="password"
                      className="form-control"
                      placeholder="Enter PPM"
                    />
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
