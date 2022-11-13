import React, { useState, useEffect } from "react";
import { GET_DATA } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import axios from "axios";

const TableData = () => {




  useEffect(() => {
    
  try {

    axios.get("https://graphql-to-restapi.vercel.app/api/savingData")
    .then((acc)=>{
      console.log(acc.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    
  } catch (error) {
    console.log(error)
  }
  }, [])
  









  const { data, error, loading } = useQuery(GET_DATA);

  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)


  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }


















  return (
    <div className="container mt-5 ">
      <div class="table-responsive">
      <table  class="table text-white table-responsive" style={{ backgroundColor: "#0A0112",width:"100%" }}>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Price USD</th>
            <th scope="col">Amount BNB</th>
            <th scope="col">Amount LYKA</th>
            <th scope="col">Maker Wallet</th>
            <th scope="col">Transaction HASH</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.ethereum.dexTrades.map((hit) => {
              return (
                <tr key={hit.transaction.hash}>
                  <td>{hit.date.date}</td>
                  <td style={{color:hit.buyCurrency.symbol == "WBNB" ? "green":"red",fontWeight:"bold"}}>{hit.buyCurrency.symbol == "WBNB" ? "Buy" : "Sell"}</td>
                  <td>
                    {hit.buyAmountInUsd / hit.sellAmount == 0
                      ? String(hit.sellAmountInUsd / hit.buyAmount).slice(0,7)
                      : String(hit.buyAmountInUsd / hit.sellAmount).slice(0,7)}
                  </td>
                  <td>{String(hit.quoteAmount).slice(0,7)}</td>
                  
                  <td>{hit.buyCurrency.symbol == "WBNB" ?String(hit.sellAmount).slice(0,7) :String(hit.buyAmount).slice(0,7)}</td>
                  <td> <a style={{textDecoration:"none",color:"white"}} target="__blank" href={`https://bscscan.com/address/${hit.taker.address}`}> {String(hit.taker.address).slice(0,5)}....{String(hit.taker.address).slice(-5)}</a></td>
                  <td>
                    <a
                      target="__blank"
                      href={"https://bscscan.com/tx/" + hit.transaction.hash}
                    >
                      <button className="btn btn-primary">HASH</button>
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TableData;
