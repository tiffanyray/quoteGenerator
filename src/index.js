import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.sass";

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: "",
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    this.getRandomQuote();
  }

  getRandomNumber(min, max) {
    min = Math.ceil(10900);
    max = Math.floor(11000);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomQuote() {
    fetch(
      `https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&_=${this.getRandomNumber()}`
    )
      .then((response) => {
        if (response.status !== 200) throw error;

        return response.json();
      })
      .then((data) => {
        this.setState({
          content: data[0].content.rendered,
          title: data[0].title.rendered,
          error: null,
        });
      })
      .catch(() => {
        let errorMessage =
          "There was an error with the API. Please try again later.";
        this.setState({
          error: errorMessage,
          content: null,
          title: null,
        });
        console.error(errorMessage);
      });
  }

  render() {
    if (this.state.error) {
      return (
        <div id="main-div">
          <h1>Random Quote</h1>
          <div id="quote-box">
            <div
              id="text"
              dangerouslySetInnerHTML={{ __html: this.state.error }}
            />
            <button id="new-quote" onClick={this.getRandomQuote}>
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return (
      <div id="main-div">
        <h1>Random Quote</h1>
        <div id="quote-box">
          <div
            id="text"
            dangerouslySetInnerHTML={{ __html: this.state.content }}
          />
          <div
            id="author"
            dangerouslySetInnerHTML={{ __html: `- ${this.state.title}` }}
          />
          <button id="new-quote" onClick={this.getRandomQuote}>
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById("root"));
