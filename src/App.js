import React from 'react';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'


import './App.css';
import './style.css';



const RANDOM = 'RANDOM';

const newQuote = (quote, author) => {
  return {
    type: RANDOM,
    quote: quote,
    author: author
  }
};

const quoteReducer = (state = {
  quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  author: "Nelson Mandela"
}, action) => {
  switch (action.type) {
    case RANDOM:
      return Object.assign({}, {
        quote: action.quote,
        author: action.author
      });
    default:
      return state;
  }
};

const store = createStore(quoteReducer);

const mapStateToProps = (state) => {
  return { quote: state.quote, author: state.author }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewQuote: (quote, author) => { dispatch(newQuote(quote, author)) }
  }
};



function App() {
  return (
    <Provider store={store}>
      <div className='page'>
        <main>
          <Container />
        </main>
      </div>
    </Provider>
  );
}

class QuoteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotelist: []
    }
    this.handleClick = this.handleClick.bind(this);

  }

  getData() {
    const getDataFromJson = async () => {
      const theData = await fetch('./quotes.json');
      const tttt = await theData.json();
      this.setQuoteList(tttt.quotes);
    }
    getDataFromJson();
  }

  componentDidMount() {
    this.getData();
  }

  setQuoteList(theList) {
    this.setState({
      quotelist: theList
    });
  }

  handleClick() {
    let randomValue = Math.floor(Math.random() * this.state.quotelist.length);
    this.props.submitNewQuote(this.state.quotelist[randomValue].quote, this.state.quotelist[randomValue].author);
  }

  render() {
    return (
      <div id="quote-box">
        <div id="text">
          <p>{this.props.quote}</p>
        </div>
        <div id="author">
          <label>{this.props.author}</label>
        </div>
        <div id="new-quote">
          <button onClick={this.handleClick}>New quote</button>
        </div>
        <div className='tweet-quote'>
          <a href='https://twitter.com/intent/tweet' id="tweet-quote">twitter</a>
        </div>
      </div>
    );
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(QuoteComponent);

export default App;
