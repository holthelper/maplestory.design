import React, { Component } from 'react'
import './index.css'
import PlayerCanvas from '../PlayerCanvas'
import ItemListing from '../ItemListing'
import EquippedItems from '../EquippedItems'
import CharacterProperties from '../CharacterProperties'
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedItems: {},
      action: 'stand1',
      emotion: 'default'
    }
  }

  render() {
    const { selectedItems, action, emotion } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <span className="logo">
            <b>MapleStory:</b> Design<br/>
            <span className="desc"><span className="alpha">Public Alpha</span> A <a href="//crr.io/">Crrio</a> Project</span>
          </span>
        </div>
        <PlayerCanvas
          selectedItems={_.values(selectedItems).map(item => item.Id)}
          action={action}
          emotion={emotion} />
        <ItemListing onItemSelected={this.userSelectedItem.bind(this)} />
        <EquippedItems
          equippedItems={selectedItems}
          onRemoveItem={this.userRemovedItem.bind(this)} />
        <CharacterProperties
          equippedItems={selectedItems}
          action={action}
          emotion={emotion}
          onChangeAction={this.userChangedAction.bind(this)}
          onChangeEmotion={this.userChangedEmotion.bind(this)} />
      </div>
    )
  }

  userChangedEmotion (emotion) {
    this.setState({ emotion })
    console.log('Changed emotion: ', emotion)
  }

  userChangedAction (action) {
    this.setState({ action })
    console.log('Changed action: ', action)
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
