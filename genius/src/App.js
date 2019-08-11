import React from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import { fetchAllSongs } from './services/api-helper';
import MostLyricSections from './components/MostLyricSections';
import PerformedMostSections from './components/PerformedMostSections';
import MostUniqueWords from './components/MostUniqueWords';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      songs: [],
      songObjs: []
    }
  };

  async componentDidMount() {
    const songs = await fetchAllSongs()
    const splitData = songs.data.split('\n')
    this.setState({ songs: splitData })
  };

  countBlocks = () => {
    let songs = this.state.songs;
    let counter = 0;
    let artist = "";
    songs.forEach((song) => {
      (JSON.parse(song).lyrics_text.split("\n\n")).forEach(() => { counter += 1 })

      artist = JSON.parse(song).primary_artist
      let songObj = {};

      let songObjs = this.state.songObjs
      songObjs.forEach((songObject) => {
        if (songObject.name === artist) {
          songObject.numBlocks += counter
        } else {
          songObj.name = artist
          songObj.numBlocks = counter
        }
      })
      counter = 0
      songObjs.push(songObj)
    });
  };

  sortSongsByBlocks = (a, b) => {
    const artistA = a.numBlocks;
    const artistB = b.numBlocks;
    let comparison = 0;
    if (artistA > artistB) {
      comparison = -1
    } else if (artistA < artistB) {
      comparison = 1
    }
    return comparison
  };

  sort = () => {
    let newSortedObjs = this.state.songObjs.sort(this.sortSongsByBlocks)
    console.log(newSortedObjs)
  };


  render() {
    this.countBlocks()
    this.sort()

    return (
      <div className="App">
        <header>
          <h1>Hire Me, Genius!</h1>
          <Link to="/part1q1" >Part 1 Q1</Link>
          <Link to="/part1q2" >Part 1 Q2</Link>
          <Link to="/part1q3" >Part 1 Q3</Link>
        </header>
        <main>
          <Route path="/part1q1" exact render={() => <MostLyricSections />} />
          <Route path="/part1q2" exact render={() => <PerformedMostSections />} />
          <Route path="/part1q3" exact render={() => <MostUniqueWords />} />

        </main>
      </div>
    );
  }
}

export default App;
