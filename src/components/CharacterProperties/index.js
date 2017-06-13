import React, { Component } from 'react'
import './index.css'
import _ from 'lodash'

class CharacterProperties extends Component {
  render() {
    return (
      <div className='character-properties'>
        <span>Character Properties</span>
        <div className="facial-expression">
          <span>Facial Expression</span>
          <select>
            <option>Default</option>
          </select>
        </div>
        <div className="action">
          <span>Pose / Action</span>
          <select>
            <option>Stand1</option>
            <option>Stand2</option>
          </select>
        </div>
      </div>
    )
  }
}

export default CharacterProperties
