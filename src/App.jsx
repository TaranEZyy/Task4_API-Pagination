import React from 'react';
import "./App.css"
// import PaginatedNews from './components/PaginatedItems';
import Pages from './components/Pages';

function App() {
  return (
    <div className="App">
      <h1>News</h1>
      {/* <PaginatedNews itemsPerPage={3} /> */}
      <Pages/>
    </div>
  );
}

export default App;
