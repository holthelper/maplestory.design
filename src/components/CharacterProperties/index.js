import React, { Component } from 'react'
import './index.css'
import _ from 'lodash'

class CharacterProperties extends Component {
  render() {
    return (
      <div className='character-properties'>
        <span>Properties</span>
        <div className="facial-expression">
          <span>Facial Expression</span>
          <select disabled>
            <option>Default</option>
          </select>
        </div>
        <div className="action">
          <span>Pose / Action</span>
          <select disabled>
            <option>Standing</option>
            <option>Standing 2</option>
          </select>
        </div>
        <div className="disclaimer">
          This is currently a prototype and a <b>work in progress</b>. Please provide feedback or report bugs on our <a href="https://discord.gg/D65Grk9">Discord</a>.
        </div>
      </div>
    )
  }
}

export default CharacterProperties
