import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor() {
    super();

    this.state = {
      news: [{ _id: 1, name: 'news one' }, { _id: 2, name: 'news two' }]
    }

    //if you didn't use arrows for the submitBook
    //this.submitBook = this.submitBook.bind(this);
  }

  componentDidMount() {
    // loadBooks()
    //   .then(resultingJSON => this.setState({books : resultingJSON}))

    this.loadNews()
      .then(news => this.setState({ news }))

    //classic js
    // $.ajax({
    //   action: 'localhost:3001/books',
    // }).done(function(res){
    //   this.setState({books: res})
    // })
  }

  loadNews = () => {
    return fetch("http://localhost:3001/news")
      .then(res => res.json())
  };

  delete = (event) => {
    event.preventDefault();

    alert("delete pressed");
    const idDelete = event.target.getAttribute('data-id');
  };


  submitBook = (event) => {
    event.preventDefault();

    const name = event.target.children[0].value;

    // {name: 'to kill a mockingbird'} 

    //instead of alerting the book name, make a fetch call to the post route in express and submit the book
    fetch("http://localhost:3001/newsinsert", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    }).then(res => res.json())
      .then((res) => {
        this.setState({ books: [...this.state.books, res] })

      });

    //after it's submitted, update books in state of this component

    //11:50
  }

  render() {
    return (
      <div className="App">
        hello world

        {/*make a form here that takes in a book and when you submit the form, alert what they put in there*/}
        <form onSubmit={this.submitStory}>
          <input type="text" placeholder="news story" />

          <input type="submit" value="News Topic" />
        </form>

        <form onSumbit={this.deleteNews}>
          {/* // //delete btton appears  */}
          {this.state.news.map((n) =>
            <p key={n._id}>
              {n._id} <br />
              {n.name}
              <button data-id={n._id} onClick={this.deleteNews}> Delete Story </button>
            </p>
    
                    )}
      </form>
      </div>
        );
      }
    }
  export default App;
  //     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );

