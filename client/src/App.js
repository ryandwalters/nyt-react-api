import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      articles : []
    }
  }

  searchNyTimes = (ev) => {
    ev.preventDefault();
    let query = (ev.target.children[0].children[1].value)
    // let numResults = (ev.target.children[1].children[1].value)
    let startDate = (ev.target.children[1].children[1].value)
    let endDate = (ev.target.children[2].children[1].value)

    //make a fetch call to app.get('/articles/:q/:begin_date/:end_date/', function (req, res) {
      
    fetch(`http://localhost:3001/articles/${query}/${startDate}/${endDate}`)
    .then(res => res.json())
    .then((res) => {
      const articles = res.response.docs;
      
      this.setState({articles});
    }); 
  }

  componentDidMount

  

  render (){
    const divStyle = {
      'background-color': '#20315A',
      'color': 'white'
    };

    return (
      <div className="container">

      {/* <!-- Jumbotron for Title --> */}
      <div className="jumbotron" style={divStyle}>
        <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
      </div>
  
      {/* <!-- Row for git@github.com:ryandwalters/nyt-react-api.gitSearching New York Times --> */}
       <div className="row">
        <div className="col-sm-12">
          <br />
          {/* <!-- First panel is for handling the search parameters --> */}
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
            </div>
            <div className="panel-body">
  
              {/* <!-- Here we create an HTML Form for handling the inputs--> */}
              <form onSubmit={this.searchNyTimes}>
  
                {/* <!-- Here we create the text box for capturing the search term--> */}
                <div className="form-group">
                  <label for="search">Search Term:</label>
                  <input type="text" className="form-control" id="search-term" />
                </div>
  
  
                {/* <!-- Here we capture the Start Year Parameter--> */}
                <div className="form-group">
                  <label for="start-year">Start Year:</label>
                  <input type="text" className="form-control" id="start-year" />
                </div>
  
                {/* <!-- Here we capture the End Year Parameter --> */}
                <div className="form-group">
                  <label for="end-year">End Year:</label>
                  <input type="text" className="form-control" id="end-year" />
                </div>
  
                {/* <!-- Here we have our final submit button --> */}
                <button type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search"></i> Search</button> 
                {/* <button type="button" className="btn btn-default" id="clear-all"><i className="fa fa-trash"></i> Clear Results</button> */}

              </form>
            </div>
          </div>
        </div>
      </div> 

      {/* <!-- This row will handle all of the retrieved articles --> */}
      <div className="row">
        <div className="col-sm-12">
          <br />
      
          {/* <!-- This panel will initially be made up of a panel and wells for each of the articles retrieved --> */}
          <div className="panel panel-primary">
      
            {/* <!-- Panel Heading for the retrieved articles box --> */}
            <div className="panel-heading">
              <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
      
            </div>
      
            {/* <!-- This main panel will hold each of the resulting articles --> */}
            <div className="panel-body" id="well-section">
                  { /* <button type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search"></i> Search</button> */ }
                  {this.state.articles.map((art) =>
                    <p>
                      <h3>{art.headline.main} </h3> <br />
                      {art.snippet} <br />
                      {art.web_url} <br />
                      {"Date stamp: " + art.pub_date} 
                      {/* <button onClick={(art) => updateArticle(art)}>update</button> */}
                        
                        {/* updateBook = (art) => { */}
                               {/* alert(id)} */}
                    </p>
                    
                  )}
      
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
          <div className="col-sm-12">
            <br />
      
            {/* <!-- This panel will initially be made up of a panel and wells for each of the articles saved --> */}
            <div className="panel panel-primary">
      
              {/* <!-- Panel Heading for the retrieved articles box --> */}
              <div className="panel-heading">
                <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Articles</strong></h3>
            </div>
      
              {/* <!-- This main panel will hold each of the resulting articles --> */}
              <div className="panel-body" id="well-section">
                  {/* <button type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search"></i> Search</button> */}
      
              </div>
            </div>
          </div>
        </div>
      
      {/* <!-- Footer Region --> */}
      <div className="row">
        <div className="col-sm-12">
      
          {/* <!-- Line Break followed by closing --> */}
          <hr />
          <h5 className="text-center"><small><i className="fa fa-heart"></i></small></h5>
      
        </div>
      </div>
    </div>
    );

    }
  }

export default App;