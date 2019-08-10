import React from 'react';
import './App.css';
import { fetchAllSongs, stream } from './services/api-helper';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      songs: []
    }
  }

  async componentDidMount() {
    const songs = await fetchAllSongs()
    const splitData = songs.data.split('\n')
    this.setState({ songs: splitData })
  }

  render() {
    return (
      <div className="App">
        {this.state.songs.map((song) => (
          <div>
            <p>{JSON.parse(song).title}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
