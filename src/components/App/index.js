import React, { Component } from 'react'
import './index.css'
import PlayerCanvas from '../PlayerCanvas'
import ItemListing from '../ItemListing'
import EquippedItems from '../EquippedItems'
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedItems: {}
    }
  }

  render() {
    const { selectedItems } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <span>Crrio<b>MapleStory Simulator</b></span>
        </div>
        <PlayerCanvas selectedItems={_.values(selectedItems).map(item => item.Id)} />
        <ItemListing onItemSelected={this.userSelectedItem.bind(this)} />
        <EquippedItems equippedItems={selectedItems} onRemoveItem={this.userRemovedItem.bind(this)} />
      </div>
    )
  }

  userSelectedItem (item) {
    let selectedItems = {
      ...this.state.selectedItems,
    }

    selectedItems[item.TypeInfo.SubCategory] = item

    console.log('New Items: ', selectedItems)

    this.setState({
      selectedItems
    })
  }

  userRemovedItem (item) {
    let selectedItems = {
      ...this.state.selectedItems,
    }

    delete selectedItems[item.TypeInfo.SubCategory]

    console.log('New Items: ', selectedItems)

    this.setState({
      selectedItems
    })
  }
}

export default App
