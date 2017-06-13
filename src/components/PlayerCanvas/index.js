import React, { Component } from 'react'
import './index.css'

class PlayerCanvas extends Component {
  render() {
    const { selectedItems, action, emotion } = this.props

    const itemsWithEmotion = selectedItems.map(itemId => itemId >= 20000 && itemId <= 29999 ? `${itemId}:${emotion}` : itemId)

    return (
      <div className="canvas">
        <img src={`https://labs.maplestory.io/api/character/center/2000/${(itemsWithEmotion.join(',') || 1102039)}/${action}`} /> :
      </div>
    )
  }
}

export default PlayerCanvas
