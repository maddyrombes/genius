import React, { Component } from 'react'

export default class MostLyricSections extends Component {
  render() {
    return (
      <div>
        <h2>The artists with the most lyric sections <br /> where they are the primary artist.</h2>
        <ul className="mls-list">
          <li className="mls-list-item"><b>Kanye West</b> has <b>545</b> lyric blocks.</li>
          <li className="mls-list-item"><b>Eminem</b> has <b>514</b> lyric blocks.</li>
          <li className="mls-list-item"><b>Drake</b> has <b>413</b> lyric blocks.</li>
          <li className="mls-list-item"><b>Travis Scott</b> has <b>355</b> lyric blocks.</li>
          <li className="mls-list-item"><b>Kendrick Lamar</b> has <b>311</b> lyric blocks.</li>
        </ul>
      </div >
    )
  }
}
