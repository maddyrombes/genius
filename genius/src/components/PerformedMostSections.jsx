import React, { Component } from 'react'

export default class PerformedMostSections extends Component {
  render() {
    return (
      <div>
        <h2>The artists who have performed the most lyric sections.</h2>
        <ul className="mls-list">
          <li className="mls-list-item"><b>Drake</b> has performed <b>303</b> lyric blocks.</li>
          <li className="mls-list-item"><b>Lil Wayne</b> has performed <b>257</b> lyric blocks.</li>
          <li className="mls-list-item"><b>Kanye West</b> has performed <b>244</b> lyric blocks.</li>
          <li className="mls-list-item"><b>Young Thug</b> has performed <b>239</b> lyric blocks.</li>
          <li className="mls-list-item"><b>Eminem</b> has performed <b>221</b> lyric blocks.</li>
        </ul>
      </div>
    )
  }
}
