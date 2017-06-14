import React, { Component } from 'react'
import './index.css'

class PlayerCanvas extends Component {
  render() {
    const { selectedItems, action, emotion, skin } = this.props

    const itemsWithEmotion = selectedItems.map(itemId => itemId >= 20000 && itemId <= 29999 ? `${itemId}:${emotion}` : itemId)

    return (
      <div className="canvas">
        <img src={`https://labs.maplestory.io/api/character/center/${skin}/${(itemsWithEmotion.join(',') || 1102039)}/${action}`} alt="character"/>
      </div>
    )
  }
}

export default PlayerCanvas
