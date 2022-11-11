import React, { useState, useEffect } from "react";
import { GET_DATA } from "../../graphql/query";
import { useQuery } from "@apollo/client";

const TableData = () => {
  const { data, error, loading } = useQuery(GET_DATA);


  if (error) {
    console.log(error);
  }

  return (
    <div className="container mt-5">
      <table class="table text-white " style={{ backgroundColor: "#0A0112" }}>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Price USD</th>
            <th scope="col">Price BNB</th>
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
                      ? hit.buyAmountInUsd / hit.buyAmount
                      : hit.buyAmountInUsd / hit.sellAmount}
                  </td>
                  <td>{hit.quoteAmount}</td>
                  <td>{hit.sellAmount}</td>
                  <td>{hit.taker.address}</td>
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
  );
};

export default TableData;
