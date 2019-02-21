import React from 'react';
import ReactDOM from 'react-dom';

console.log(`I'm a silly entry point`);

const Index = () => {
    return <div>Hello React!</div>;
  };

ReactDOM.render(<Index />, document.getElementById('root'));