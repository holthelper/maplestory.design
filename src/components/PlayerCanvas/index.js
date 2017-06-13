import React, { Component } from 'react'
import './index.css'

class PlayerCanvas extends Component {
  render() {
    const { selectedItems, action } = this.props
    return (
      <div className="canvas">
        <img src={`https://labs.maplestory.io/api/character/center/2000/${(selectedItems.join(',') || 1102039)}/${action}`} /> :
      </div>
    )
  }
}

export default PlayerCanvas
