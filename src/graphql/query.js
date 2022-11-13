import { gql } from '@apollo/client';


export const GET_DATA = gql`
query MyQuery {
    ethereum(network: bsc) {
      dexTrades(
        options: {limit: 5, desc: "block.height"}
        exchangeName: {in: ["Pancake", "Pancake v2"]}
        baseCurrency: {is: "0x26844ffd91648e8274598e6e18921a3e5dc14ade"}
        quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
        buyCurrency: {}
        date: {}
        sellCurrency: {}
        tradeAmountUsd: {}
      ) {
        transaction {
          hash
        }
        smartContract {
          address {
            address
          }
          contractType
          currency {
            name
          }
        }
        tradeIndex
        date {
          date
        }
        block {
          height
        }
        buyAmount
        buyAmountInUsd: buyAmount(in: USD)
        buyCurrency {
          symbol
          address
        }
        sellAmount
        sellAmountInUsd: sellAmount(in: USD)
        sellCurrency {
          symbol
          address
        }
        sellAmountInUsd: sellAmount(in: USD)
        tradeAmount(in: USD)
        transaction {
          gasValue
          gasPrice
          gas
        }
        taker {
          address
        }
        quoteAmount(calculate: maximum)
        count(buyAmount: {})
      }
    }
  }
  
`;