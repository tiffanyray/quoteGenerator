import React from 'react';
import ReactDOM from 'react-dom';



// $.ajax({
//   type: 'GET',
//   url: "http://api.forismatic.com/api/1.0/?",
//   xhrFields: {
//     withCredentials: false
//   },
//   crossDomain: true,
//   dataType: 'jsonp',
//   data: "method=getQuote&format=jsonp&lang=en",

//   success: function( data ) {
//     console.log( data );
//   }
// })

class TweetQuote extends React.Component {
  render() {
    return (
      <a id="tweet-quote" >Tweet Quote</a>
    )
  }
}


class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'Heeeeey',
      title: 'Tiff'
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
    //this.END_POINT = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"
  } 

  getRandomQuote(e) {

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
        console.log( data );
        console.log('done');
        if (data[0].content && data[0].title) {
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
      <div id="quote-box">
        <h1>Hello</h1>
        <div id="text">"{this.state.content}"</div>
        <div id="author">{this.state.title}</div>
        <button id="new-quote" onClick={this.getRandomQuote}>New Quote</button>
        <TweetQuote />
      </div>
    )
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'));