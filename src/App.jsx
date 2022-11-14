import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useMemo, useState } from "react";
import { Chart } from "react-charts";
import Web3 from "web3";
import { ethers } from "ethers";
import { injected } from "./connector";
import { addresses } from "./contracts";
import { abis } from "./abis";
import {
  getGasPrice,
  getLyakaPrice,
  getSwapPrice,
  swap,
} from "./routerService";
import ConfirmTransactionModal from "./components/ConfirmTransactionModal";
import Settings from "./components/Settings";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import useToast from "./useToast";
import PulseLoader from "react-spinners/PulseLoader";
import LineChart from "./components/LineChart";
import TableData from "./components/TableData/TableData";

const App = () => {
  const { activate, active, account, library } = useWeb3React();
  const [laykaAmount, setLaykaAmount] = useState("");
  const [busdAmount, setBusdAmount] = useState("");
  const [laykaBalance, setLaykaBalance] = useState(0);
  const [busdBalance, setBusdBalance] = useState(0);
  const [showGasPopup, setShowGasPopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [direction, setDirection] = useState(false);
  const [slippage, setSlippage] = useState("1");
  const [gasPrice, setGasPrice] = useState(undefined);
  const [loadingTx, setLoadingTx] = useState(false);
  const [timeFrame, setTimeFrame] = useState(24);
  const [f, setF] = useState("D");
  const [chartData, setChartData] = useState([]);
  const [chartDataLoading, setChartDataLoading] = useState(false);
  const [laykaPrice, setLaykaPrice] = useState(0);
  const [address, setAddress] = useState("")


  const [button1, setButton1] = useState(false)
  const [button2, setButton2] = useState(false)
  const [button3, setButton3] = useState(false)
  const [button4, setButton4] = useState(false)
  // const [chartData, setTempData] = useState([])

  const DECIMALS = 10 ** 18;

  const laykaLogo = "https://lykacoin.net/pinksale.png";
  const busdLogo =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png";

  const { toastError, toastSuccess } = useToast();

  const getBlockData = async (frame) => {
    const blockEndPoint =
      "https://api.thegraph.com/subgraphs/name/pancakeswap/blocks";
    const currentTimeStamp = Math.round(new Date().getTime() / 1000);
    const timeBoforeTime = currentTimeStamp - frame * 3600;
    let qstring = "";
    const inc = {
      24: 3600,
      168: 86400,
      720: 86400,
      8760: 86400,
    };
    for (let i = timeBoforeTime; i < currentTimeStamp; i += inc[frame]) {
      qstring += `t${i}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${i}, timestamp_lt: ${
        i + 600
      } }) { number },`;
    }
    const query = `
      query blocks {
        ${qstring}
      }
    `;
    const result = await axios.post(blockEndPoint, { query });
    return result.data.data;
  };

  const getTokenPriceData = async (frame, tokenAddress) => {
    const subgraphEndpoint =
      "https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2";
    const blockData = await getBlockData(frame);
    let qstring = "";
    for (const k in blockData) {
      const key = k;
      const value = blockData[k][0]["number"];

      qstring += `${key}:token(id:"${tokenAddress}", block: { number: ${value} }) { derivedUSD },`;
    }
    const query = `
      query derivedTokenPriceData {
        ${qstring}
      }
    `;

    const result = await axios.post(subgraphEndpoint, { query });
    return result.data.data;
  };

  useEffect(() => {
    (async () => {
      setChartDataLoading(true);
      const laykaData = await getTokenPriceData(
        timeFrame,
        addresses.LAYKA.toLowerCase()
      );

      const dataList = [];
      for (const k in laykaData) {
        const key = parseInt(k.slice(1));
        const value = parseFloat(laykaData[k]["derivedUSD"]);
        if (timeFrame === 24) {
          const newKey = new Date(key * 1000).toTimeString();
          dataList.push({ time: newKey.slice(0, 5), value: value, tt: key });
        } else if (timeFrame === 24 * 7) {
          const newKey = new Date(key * 1000).toLocaleDateString();
          dataList.push({ time: newKey.slice(0, 5), value: value, tt: key });
        } else if (timeFrame === 24 * 30) {
          const newKey = new Date(key * 1000).toLocaleDateString();
          dataList.push({ time: newKey.slice(0, 5), value: value, tt: key });
        } else {
          const newKey = new Date(key * 1000).toLocaleDateString();
          dataList.push({ time: newKey.slice(0, 5), value: value, tt: key });
        }
        // dataList.push({time: key, value: value})
      }
      const sorted = dataList.sort((a, b) => {
        return a.tt - b.tt;
      });

      let newDataList = sorted.map((d) => ({
        time: d.time,
        value: d.value.toFixed(6),
      }));
      setChartData(newDataList);
      setChartDataLoading(false);
    })();
  }, [timeFrame]);

  useEffect(() => {
    getLyakaPrice().then((resp) => setLaykaPrice(resp));
  }, []);

  useEffect(() => {
    return () => {
      setLaykaAmount("");
      setBusdAmount("");
    };
  }, []);

  useEffect(() => {
    if (active) {
      const laykaContract = loadContract(
        library.provider,
        abis.LAYKA,
        addresses.LAYKA
      );
      laykaContract.methods
        .balanceOf(account)
        .call()
        .then((resp) => setLaykaBalance((resp / DECIMALS).toFixed(4)));

      const busdContract = loadContract(
        library.provider,
        abis.BUSD,
        addresses.BUSD
      );
      busdContract.methods
        .balanceOf(account)
        .call()
        .then((resp) => setBusdBalance((resp / DECIMALS).toFixed(4)));
    }
  }, [active]);

  const loadContract = (provider, abi, address) => {
    const web3 = new Web3(provider);
    return new web3.eth.Contract(abi, address);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState(undefined);

  useEffect(() => {
    if (!direction && !laykaAmount.length) {
      setBusdAmount("");
    } else if (direction && !busdAmount.length) {
      setLaykaAmount("");
    }
  }, [direction, laykaAmount, busdAmount]);

  const getPrice = (value) => {
    !direction ? setLaykaAmount(value) : setBusdAmount(value);
    setShowGasPopup(true);
    if (!value.length) {
      direction ? setLaykaAmount("") : setBusdAmount("");
      setShowGasPopup(false);
    } else {
      setLoading(true);
      getSwapPrice(direction, value, slippage).then((resp) => {
        direction ? setLaykaAmount(resp) : setBusdAmount(resp);
        setLoading(false);
      });
    }
  };

  const swapToken = async () => {
    setLoadingTx(true);
    const value = !direction ? laykaAmount : busdAmount;
    swap(
      direction,
      value,
      library.provider,
      account,
      slippage,
      toastError,
      toastSuccess
    )
      .then((resp) => {
        setTx(resp);
        setLoadingTx(false);
        setTimeout(() => {
          toggleTransactionModal();
        }, 200);
      })
      .catch((e) => {
        setLoadingTx(false);
      });
  };

  const toggleTransactionModal = () => {
    let attr = document.createElement("button");
    attr.setAttribute("data-bs-toggle", "modal");
    attr.setAttribute("data-bs-target", "#exampleModal");
    document.body.appendChild(attr);
    attr.click();
    attr.remove();
  };

  const handleOnclick = () => {
    if (!direction) {
      if (laykaBalance < laykaAmount && active) {
        toastError("Insufficient funds");
      } else {
        !active ? activate(injected) : toggleTransactionModal();
      }
    } else {
      if (busdBalance < busdAmount && active) {
        toastError("Insufficient funds");
      } else {
        !active ? activate(injected) : toggleTransactionModal();
      }
    }
  };

  const handleOpenIt = () =>{

    if(window.ethereum){

      window.ethereum.request({method:'eth_requestAccounts'})
      .then(res=>{
              // Return the address of the wallet
              console.log(res) 
              setAddress(res) 
      })
    }else{
      alert("install metamask extension!!")
    }



  }

  return (
    <>
      <div style={{backgroundColor:"#002758"}}>


        <nav style={{ backgroundColor:"#325A86",backdropFilter:8}} className="navbar navbar-expand-lg navbar-dark   px-0 py-3">
          <div className="container-xl">
            {/* Logo */}
            <a className="navbar-brand" href="#">
              <img
                src="https://www.lykayield.com/images2/logo/logo.png"
                className="h-8"
                alt="..."
              />
            </a>
            {/* Navbar toggle */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Collapse */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
              {/* Nav */}
              <div className="navbar-nav mx-lg-auto"></div>
              {/* Right navigation */}
              <div className="navbar-nav ms-lg-4">
                <a className="nav-item nav-link active" aria-current="page">
                  Home
                </a>
                <a className="nav-item nav-link" href="https://lykacoin.net">
                  About Us
                </a>
                <a
                  className="nav-item nav-link"
                  href="https://lykacoin.net/whitepaper.pdf"
                >
                  WhitePaper
                </a>
                <a
                  className="nav-item nav-link"
                  href="https://bscscan.com/token/0x26844ffd91648e8274598e6e18921a3e5dc14ade"
                >
                  Contract
                </a>
                <a
                  className="nav-item nav-link"
                >
               <div style={{display:"flex",gap:3}}>
                
                  <img style={{width:30,borderRadius:100,height:30,marginTop:-2,position:"absolute",marginRight:8}} className="img-fluid" src="https://lykacoin.net/pinksale.png" alt="" />
                  <p style={{color:"#280D81",fontWeight:"bold",backgroundColor:"#EFF4F5",borderRadius:20,paddingLeft:30,paddingRight:5,}}>BNB SMART CHAIN</p>
               </div>
                </a>
                <a
                  className="nav-item nav-link"
                >
                  {
                    address ? 

                    <button onClick={handleOpenIt} style={{backgroundColor:"#1FC7D4",color:"white",fontWeight:'bolder',borderRadius:10,marginTop:-5}} className="btn">{String(address).slice(0,5)}...{String(address).slice(-3)}</button>

                    :

                    <button onClick={handleOpenIt} style={{backgroundColor:"#1FC7D4",color:"white",fontWeight:'bolder',borderRadius:10,marginTop:-5}} className="btn">Connect Wallet</button>

                  }
                </a>
              </div>
            </div>
          </div>
        </nav>

        <ConfirmTransactionModal
          fromToken={!direction ? "LYKA" : "BUSD"}
          toToken={direction ? "LYKA" : "BUSD"}
          fromValue={!direction ? laykaAmount : busdAmount}
          toValue={direction ? laykaAmount : busdAmount}
          swapToken={swapToken}
          loadingTx={loadingTx}
        />

        <div className="container">
          <div className="row">
            <div className="col-sm-6 mt-5">
              <div>
                <h4 className="text-white">LYKA/BUSD</h4>
                <h1 style={{ fontWeight: "bold" }} className="text-white">
                  ${laykaPrice}
                </h1>
              </div>

              <div style={{backgroundColor:"#EFF4F5",width:"auto",borderRadius:50,width:300,marginBottom:20}}>
                <div style={{textAlign:"center"}}>
                
              <button
              style={{margin:5,backgroundColor:button1 ? "#034eab" :"#212529",borderRadius:50,width:50,color:"white",fontWeight:"bolder"}}
                onClick={() => {
                  setTimeFrame(24);
                  setF("D");
                  setButton1(true)
                  setButton2(false)
                  setButton3(false)
                  setButton4(false)
                }}
                disabled={timeFrame === 24}
              >
                24H
              </button>
              <button
              style={{margin:5,borderRadius:50,width:50,backgroundColor:button2 ? "#034eab" :"#212529",color:"white",fontWeight:"bolder"}}
                onClick={() => {
                  setTimeFrame(24 * 7);
                  setF("W");
                  setButton1(false)
                  setButton2(true)
                  setButton3(false)
                  setButton4(false)
                }}
                disabled={timeFrame === 24 * 7}
              >
                1W
              </button>
              <button
              style={{margin:5,borderRadius:50,width:50,backgroundColor:button3 ? "#034eab" :"#212529",color:"white",fontWeight:"bolder"}}
                onClick={() => {
                  setTimeFrame(24 * 30);
                  setF("M");
                  setButton1(false)
                  setButton2(false)
                  setButton3(true)
                  setButton4(false)
                }}
                disabled={timeFrame === 24 * 30}
              >
                1M
              </button>
              <button
              style={{margin:5,borderRadius:50,width:50,backgroundColor:button4 ? "#034eab" :"#212529",color:"white",fontWeight:"bolder"}}
                onClick={() => {
                  setTimeFrame(24 * 365);
                  setF("Y");
                  setButton1(false)
                  setButton2(false)
                  setButton3(false)
                  setButton4(true)
                }}
                disabled={timeFrame === 24 * 365}
              >
                1Y
              </button>
                </div>


              </div>


              <div
                style={{
                  width: "100%",
                  height: "300px",
                  // backgroundColor:"#345072",
                  color:"white"
                }}
              >
                {chartDataLoading ? (
                  <PulseLoader  style={{color:"white"}} size={10} color={"#ffffff"} />
                ) : ( 
                  <LineChart  chartData={chartData} f={f} />
                )}
              </div>




              <img className="img-fluid mt-2" style={{height:130,width:"100%",marginTop:20}} src="/recharge-banner-1.jpg" alt="" />












            </div>
            <div className="col-sm-6 mt-5">
              {showSettings ? (
                <Settings
                  setShowSettings={setShowSettings}
                  setSlippage={setSlippage}
                  slippage={slippage}
                />
              ) : (
                <div
                  className="container p-1"
                  style={{ backgroundColor: "#345072" ,borderRadius:20}}
                >
                  <form onSubmit={handleSubmit}>
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
                          backgroundColor: "#212529",
                          borderRadius: 40,
                        }}
                      >
                        <div style={{ display: "flex", gap: 15 }}>
                          <div
                            style={{
                              padding: 10,
                              backgroundColor: "#495066",
                              borderRadius: 20,
                              display: "flex",
                              gap: 10,
                              paddingTop: 20,
                            }}
                          >
                            <img
                              src={!direction ? laykaLogo : busdLogo}
                              className="img-fluid"
                              style={{ width: 20, height: 20 }}
                              alt=""
                            />

                            <h6 className="text-white">
                              {!direction ? "LYKA" : "BUSD"}
                            </h6>
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
                              getPrice(e.target.value);
                            }}
                            value={!direction ? laykaAmount : busdAmount}
                            style={{
                              padding: 10,
                              backgroundColor: "#212529",
                              border: "none",
                              color: "white",
                              outline: "none",
                              width: "100%",
                            }}
                            type="number"
                            placeholder="Enter Amount"
                          />
                          <div>
                            <h6 className="mt-3" style={{ color: "#69818B" }}>
                              Balance: {!direction ? laykaBalance : busdBalance}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{ marginLeft: 40, cursor: "pointer",marginTop:-18,marginBottom:-18}}
                      onClick={() => setDirection(!direction)}
                    >
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
                          backgroundColor: "#212529",
                          borderRadius: 40,
                        }}
                      >
                        <div style={{ display: "flex", gap: 15 }}>
                          <div
                            style={{
                              padding: 10,
                              backgroundColor: "#495066",
                              borderRadius: 20,
                              display: "flex",
                              gap: 10,
                              paddingTop: 20,
                            }}
                          >
                            <img
                              src={direction ? laykaLogo : busdLogo}
                              className="img-fluid"
                              style={{ width: 20, height: 20 }}
                              alt=""
                            />

                            <h6 className="text-white">
                              {direction ? "LYKA" : "BUSD"}
                            </h6>
                          </div>
                          <h6 style={{ color: "#7F818A" }} className="mt-3">
                            You Receive
                          </h6>
                        </div>

                        <div
                          style={{ display: "flex", gap: 10, marginTop: 12 }}
                        >
                          {loading ? (
                            "loading"
                          ) : (
                            <input
                              style={{
                                padding: 10,
                                backgroundColor: "#212529",
                                border: "none",
                                color: "white",
                                outline: "none",
                                width: "100%",
                              }}
                              type="text"
                              placeholder="Enter BNB"
                              disabled
                              value={direction ? laykaAmount : busdAmount}
                            />
                          )}
                          <div>
                            <h6 className="mt-3" style={{ color: "#69818B" }}>
                              Balance: {direction ? laykaBalance : busdBalance}
                            </h6>
                          </div>
                        </div>
                      </div>
                      {showGasPopup ? (
                        <div
                          style={{
                            backgroundColor: "#212529",
                            padding: 20,
                            marginTop: 30,
                            borderRadius: 30,
                          }}
                        >
                          <div className="row">
                            <div className="col">
                              <h6 style={{ color: "#B9B8B8" }}>GAS Price</h6>
                              <h5 style={{ color: "#B9B8B8" }}>
                                {gasPrice}
                                High (204.45 - 273.92 Gwei)
                              </h5>
                              <h6 style={{ color: "#B9B8B8" }}>
                                Slippage Tolerance
                              </h6>
                              <h6
                                style={{ color: "#B9B8B8" }}
                              >{`${slippage} %`}</h6>
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
                    <div className="container pb-3">
                      <button
                        type="submit"
                        disabled={
                          active
                            ? !direction
                              ? !laykaAmount.length || loading
                              : !busdAmount.length || loading
                            : false
                        }
                        onClick={() => {
                          handleOnclick();
                        }}
                        style={{
                          backgroundColor: "#28456C",
                          width: "100%",
                          padding: 20,
                          borderRadius: 30,
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                        className="btn btn-primary"
                      >
                        {!active
                          ? "Connect Wallet"
                          : !direction
                          ? !laykaAmount.length
                            ? "Enter Amount"
                            : "Swap"
                          : !busdAmount.length
                          ? "Enter Amount"
                          : "Swap"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        <TableData />

        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />

        <footer className="section bg-footer mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className>
                  <img
                    className="img-fluid"
                    src="https://www.lykayield.com/images2/logo/logo.png"
                    alt=""
                  />
                  <p className="text-white">
                  No registration, No hassle. Trade LykaToken on BNB Smart Chain in second, just by connecting your wallet.


                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                {/* <div className>
          <h6 className="footer-heading text-uppercase text-white">Quick Link</h6>
          <ul className="list-unstyled footer-link mt-4">
            <li><a className="text-white" style={{textDecoration:"none"}} href>Monitoring Grader </a></li>
            <li><a className="text-white" style={{textDecoration:"none"}} href>Video Tutorial</a></li>
            <li><a className="text-white" style={{textDecoration:"none"}} href>Term &amp; Service</a></li>
            <li><a className="text-white" style={{textDecoration:"none"}} href>Zeeko API</a></li>
          </ul>
        </div> */}
              </div>
              <div className="col-lg-2">
                <div className>
                  <h6 className="footer-heading text-uppercase text-white">
                    Quick Link
                  </h6>
                  <ul className="list-unstyled footer-link mt-4">
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-staking"
                      >
                        Lyka Staking
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-yeild"
                      >
                        Lyka Yield
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-swap"
                      >
                        Lyka Swap
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-move"
                      >
                        Lyka Move
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-play"
                      >
                        Lyka Play
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className>
                  <h6 className="footer-heading text-uppercase text-white">
                    Quick Link
                  </h6>
                  <ul className="list-unstyled footer-link mt-4">
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-launchpad"
                      >
                        Lyka Launchpad
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-nft"
                      >
                        Lyka NFT
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-exchange"
                      >
                        Lyka Exchange
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-verse"
                      >
                        Lyka Verse
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        href="https://lykacoin.net/lyka-blockchain"
                      >
                        Lyka Blockchain
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <p className="footer-alt mb-0 f-14 text-white">
              2022 © Lyka Swap, All Rights Reserved
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
