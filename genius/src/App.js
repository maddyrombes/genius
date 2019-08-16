import React from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import { fetchAllSongs } from './services/api-helper';
import logo from './images/genius-logo.png'
import MostLyricSections from './components/MostLyricSections';
import PerformedMostSections from './components/PerformedMostSections';
import MostUniqueWords from './components/MostUniqueWords';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      songs: [],
      songObjs: [],
      blocks: []
    }
  };

  // gets all songs from jsonl file and sets it in state
  async componentDidMount() {
    const songs = await fetchAllSongs()
    const splitData = songs.data.split('\n')
    this.setState({ songs: splitData })
  };




  // for Part 1 Q1 -- creates object for each artist
  // with count of lyric blocks
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

  // for Part 1 Q1 -- basic sort
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

  // for Part 1 Q1 -- implements sort and 
  // gets rid of duplicates
  reduceSort = () => {
    const sorted = this.state.songObjs.sort(this.sortSongsByBlocks)
    sorted === undefined && (
      console.log(sorted[2])
    )
    const reduced = Array.from(new Set(sorted.map(a => a.name))).map(id => {
      return sorted.find(a => a.name === id)
    })
    // FINAL ANSWER : Q1
    // console.log(reduced)
  };




  // for Part 1 Q2 -- 
  countBlocksSpecificArtists = async () => {
    let songs = this.state.songs;
    let splitBlocks = []
    songs.forEach((song) => {
      let artist = JSON.parse(song).primary_artist
      JSON.parse(song).lyrics_text.split("[").forEach((block) => {
        let songObj = {};
        let lyrics = block.split(": ")[1]
        if (lyrics) {
          let splitLyrics = lyrics.split("]")[1]
          let actualArtist = lyrics.split("]")[0]

          if (actualArtist.includes(", " || "& ")) {
            // console.log(actualArtist.split(/,|&/))
            actualArtist.split(/,|&/).forEach((artist) => {
              songObj.actualArtist = artist
              songObj.lyrics = splitLyrics
            })
          } else {
            songObj.actualArtist = actualArtist
            songObj.lyrics = splitLyrics
          }

        } else {
          songObj.actualArtist = "none"
        }
        songObj.primaryArtist = artist
        splitBlocks.push(songObj)
      })
    });
    // console.log(splitBlocks)

    let objArr = []
    splitBlocks.forEach((block) => {
      if (block.lyrics) {
        let sum = splitBlocks.reduce((acc, val) => {
          return val.actualArtist === block.actualArtist ? acc + 1 : acc
        }, 0)


        let obj = {}
        obj.total = sum
        obj.artist = block.actualArtist

        objArr.push(obj)
      }
    })
    const finalCount = Array.from(new Set(objArr.map(a => a.artist)))
      .map(id => {
        return objArr.find(a => a.artist === id)
      })

    const compare = (a, b) => {
      if (a.total < b.total) {
        return 1;
      }
      if (a.total > b.total) {
        return -1;
      }
      return 0;
    }
    // console.log(finalCount.sort(compare))
  };





  render() {
    this.countBlocks()
    this.reduceSort()
    this.countBlocksSpecificArtists()

    return (
      <div className="App">
        <header>
          <img className="genius-logo" src={logo} alt="genius logo" />
          <nav>
            <li className="nav-item"><Link to="/part1q1" >Part 1 Q1</Link></li>
            <li className="nav-item"><Link to="/part1q2" >Part 1 Q2</Link></li>
            <li className="nav-item"><Link to="/part1q3" >Part 1 Q3</Link></li>
          </nav>
        </header>
        <>
          <Route path="/part1q1" exact render={() => <MostLyricSections />} />
          <Route path="/part1q2" exact render={() => <PerformedMostSections />} />
          <Route path="/part1q3" exact render={() => <MostUniqueWords />} />
        </>
        <footer>
          <p className="author-name">Maddy Rombes</p>
          <ul className="footer-nav">
            <a className="footer-nav-item" href="https://github.com/maddyrombes" target="blank">GitHub</a>
            <a className="footer-nav-item" href="https://www.linkedin.com/in/maddyrombes/" target="blank">LinkedIn</a>
            <a className="footer-nav-item" href="http://maddyrombes.surge.sh" target="blank">Portfolio</a>
          </ul>
        </footer>
      </div>
    );
  }
}

export default App;
