import React from 'react';
import './loading.css';

const LoadingComponent = () => {
  return (
    <div className="card">
      <div className="loader">
        <p>loading</p>
        <div className="words">
          <span className="word">movies</span>
          <span className="word">shows</span>
          <span className="word">series</span>
          <span className="word">anime</span>
          <span className="word">for you</span>
          <span className="word">movies</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
