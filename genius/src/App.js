import React from 'react';
import './App.css';
import { fetchAllSongs } from './services/api-helper';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      songs: [],
      songObjs: []
    }
  }

  async componentDidMount() {
    const songs = await fetchAllSongs()
    const splitData = songs.data.split('\n')
    this.setState({ songs: splitData })
  }

  countBlocks = () => {
    let songs = this.state.songs;
    let counter = 0
    let artist = ""
    songs.map((song) => {
      (JSON.parse(song).lyrics_text.split("\n\n")).forEach(() => { counter += 1 })
      artist = JSON.parse(song).primary_artist
      const songObj = {};
      songObj.name = artist
      songObj.numBlocks = counter
      counter = 0
      this.state.songObjs.push(songObj)
    })
  }

  sortSongObjs1 = (a, b) => {
    const artistA = a.name;
    const artistB = b.name;
    let comparison = 0;
    if (artistA > artistB) {
      comparison = 1
    } else if (artistA < artistB) {
      comparison = -1
    }
    return comparison
  }

  sortSongObjs2 = () => {
    console.log(this.state.songObjs.sort(this.sortSongObjs1))
  }

  render() {
    this.countBlocks()
    this.sortSongObjs2()

    return (
      <div className="App">
        {/* {this.state.kendrickSongs.map((song) => (
          <div key={JSON.parse(song).id}>
            <p>{JSON.parse(song).lyrics_text}</p>
          </div>
        ))} */}
      </div>
    );
  }
}

export default App;
