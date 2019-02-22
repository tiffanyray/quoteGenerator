import React from 'react';
import ReactDOM from 'react-dom';

console.log(`I'm a silly entry point`);

class Text extends React.Component {
  render() {
    return (
      <div>
        <p>This is text.</p>
      </div>
    )
  }
}

class Author extends React.Component {
  render() {
    return (
      <div>
        <p>Author's name</p>
      </div>
    )
  }
}

class NewQuote extends React.Component {
  render() {
    return (
      <div>
        <button>New Quote</button>
      </div>
    )
  }
}

class TweetQuote extends React.Component {
  render() {
    return (
      <div>
        <button>Tweet Quote</button>
      </div>
    )
  }
}


class QuoteBox extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <Text />
        <Author />
        <NewQuote />
        <TweetQuote />
      </div>
    )
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'));