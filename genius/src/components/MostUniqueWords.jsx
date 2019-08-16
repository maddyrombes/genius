import React, { Component } from 'react'

export default class MostUniqueWords extends Component {
  render() {
    return (
      <div>
        <h2>The artists with the most unique words.</h2>
        <ul className="mls-list">
          <li className="mls-list-item"><b>Eminem</b> has used <b>8824</b> unique words.</li>
          <li className="mls-list-item"><b>Lil Wayne</b> has used <b>6782</b> unique words.</li>
          <li className="mls-list-item"><b>Kendrick Lamar</b> has used <b>6737</b> unique words.</li>
          <li className="mls-list-item"><b>Drake</b> has used <b>6270</b> unique words.</li>
          <li className="mls-list-item"><b>Kanye West</b> has used <b>5656</b> unique words.</li>
        </ul>
      </div>
    )
  }
}
