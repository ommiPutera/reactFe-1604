import React, { Component } from 'react'
import Header from '../components/Header';
import { Jumbotron } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="pt-5 px-5 mx-5">
          <Jumbotron>
            <h1 className="display-3">Hello, Selamat Datang!</h1>
            <p className="lead">Ini adalah Home page</p>
            <hr className="my-2" />
          </Jumbotron>
        </div>
      </div>
    )
  }
}

export default Home
