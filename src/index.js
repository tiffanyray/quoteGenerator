import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';


class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      title: ''
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
  } 

  componentDidMount() {
    fetch("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
    .then(response => response.json())
    .then(data => {
      this.setState({
        content: data[0].content.replace(/(<([^>]+)>)/ig,"").replace(/&#8217?;/ig, "'").replace(/&#8220;/ig, '"').replace(/$#8221;/ig, '"'),
        title: data[0].title
      })
    })
  } 

  getRandomQuote() {

    $.ajax({
      type: 'GET',
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      xhrFields: {
        withCredentials: false
      },
      crossDomain: true,
      dataType: 'json',
      async: true,
    //Have to use arrow function in order to bind this kw to getRandomQuote
      success: ( data ) => {
        if (data[0].content && data[0].title) {
          console.log(data);
          this.setState({
            content: data[0].content.replace(/(<([^>]+)>)/ig,"").replace(/&#8217?;/ig, "'"),
            title: data[0].title
          })
        } else {
          return console.error('No quote found');
        }
      },
      cache: false
    } );
  }

  render() {
    return (
      <div id="main-div">
        <h1>Random Quote</h1>
        <div id="quote-box">
          <div id="text">"{this.state.content}"</div>
          <div id="author">- {this.state.title}</div>
          <button id="new-quote" onClick={this.getRandomQuote}>New Quote</button>
          <a id="tweet-quote"></a>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'));