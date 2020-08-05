import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.sass";

class QuoteBox extends React.Component {
  getRandomNumber(min, max) {
    min = Math.ceil(104);
    max = Math.floor(2568);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // apiURL = `https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&_=${this.getRandomNumber()}`

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

  getRandomQuote() {
    fetch(
      `https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&_=${this.getRandomNumber()}`
    )
      .then((response) => {
        console.log("response", response.status);
        if (response.status == 200) {
          console.log("status === 200 true");
          return response.json();
        } else {
          throw error;
        }
      })
      .then((data) => {
        console.log("data", data);
        const howToReplace = (match, string, p1, p2, p3) => {
          console.log("howToReplace::", match, string);
          let parser = new DOMParser();
          console.log("match", match.normalize());
          return "HERE";
        };

        let parser = new DOMParser();

        this.setState({
          content: data[0].content.rendered,
          title: data[0].title.rendered,
        });
      })
      .catch((error) => {
        console.error(
          "There was an error with the API. Please try again later.",
          error
        );
      });
  }

  render() {
    console.log("state content", this.state.content);
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
