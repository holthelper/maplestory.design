import React, { Component } from 'react'
import './index.css'

class PlayerCanvas extends Component {
  render() {
    const { selectedItems } = this.props
    return (
      <div className="canvas">
        {selectedItems.length ?
          <img src={`https://labs.maplestory.io/api/character/center/2000/${selectedItems.join(',')}`} /> :
          <img src='https://labs.maplestory.io/api/character/base/2000' />
        }
      </div>
    )
  }
}

export default PlayerCanvas
