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

  async componentDidMount() {
    const songs = await fetchAllSongs()
    console.log(songs.data)
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
