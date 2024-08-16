// MainContainer.js
import React, { useState, useEffect } from 'react';
import Stock from './Stock';

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching stocks:', error));
  }, []);

  const handleBuy = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const handleSell = (stock) => {
    setPortfolio(portfolio.filter(s => s.id !== stock.id));
  };

  const handleSort = (criteria) => {
    const sortedStocks = [...stocks];
    if (criteria === 'alphabetical') {
      sortedStocks.sort((a, b) => a.ticker.localeCompare(b.ticker));
    } else if (criteria === 'price') {
      sortedStocks.sort((a, b) => a.price - b.price);
    }
    setStocks(sortedStocks);
    setSortOrder(criteria); // Update sortOrder
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredStocks = filterType === 'All' ? stocks : stocks.filter(stock => stock.type === filterType);

  return (
    <main>
      <div>
        <button onClick={() => handleSort('alphabetical')}>Sort Alphabetically</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        <button onClick={() => handleFilter('All')}>Show All</button>
        <button onClick={() => handleFilter('Tech')}>Filter Tech</button>
        <button onClick={() => handleFilter('Finance')}>Filter Finance</button>
      </div>
      <div>
        <p>Current Sort Order: {sortOrder}</p> {/* Display the current sort order */}
        {filteredStocks.map(stock => (
          <Stock
            key={stock.id}
            stock={stock}
            onBuy={handleBuy}
            onSell={handleSell}
          />
        ))}
      </div>
      <div>
        <h2>My Portfolio</h2>
        {portfolio.map(stock => (
          <Stock
            key={stock.id}
            stock={stock}
            onBuy={() => {}}
            onSell={handleSell}
          />
        ))}
      </div>
    </main>
  );
}

export default MainContainer;


