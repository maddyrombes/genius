import React from 'react';
import './App.css';
import { fetchAllSongs } from './services/api-helper';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      songs: []
    }
  }

  componentDidMount() {
    const songs = fetchAllSongs()
    console.log(songs)
  }

  render() {
    return (
      <div className="App">
        <h1>Test</h1>
      </div>
    );
  }
}

export default App;
