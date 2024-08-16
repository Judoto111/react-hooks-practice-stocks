import React from "react";

function Stock({ stock, onBuy, onSell }) {
  const { name, ticker, price, type } = stock;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name} ({ticker})</h5>
        <p className="card-text">Price: ${price}</p>
        <p className="card-text">Type: {type}</p>
        <button className="btn btn-primary" onClick={() => onBuy(stock)}>
          Buy
        </button>
        <button className="btn btn-danger" onClick={() => onSell(stock)}>
          Sell
        </button>
      </div>
    </div>
  );
}

export default Stock;

