import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Corona from './pages/Corona';
import DataMahasiswa from './pages/DataMahasiswa';
import Todo from './pages/Todo';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/corona' component={Corona} />
            <Route path='/data-mahasiswa' component={DataMahasiswa} />
            <Route path='/todo' component={Todo} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;