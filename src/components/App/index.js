import React, { Component } from 'react'
import './index.css'
import PlayerCanvas from '../PlayerCanvas'
import ItemListing from '../ItemListing'
import EquippedItems from '../EquippedItems'
import CharacterProperties from '../CharacterProperties'
import _ from 'lodash'
import IntroModal from '../IntroModal'

class App extends Component {
  constructor(props) {
    super(props)

    let isOpen = (localStorage || {})['hideModal']
    if (isOpen === '' || isOpen === undefined || isOpen === 'undefined')
      isOpen = true

    this.state = {
      selectedItems: JSON.parse((localStorage || [])['selectedItems'] || '{}'),
      action: 'stand1',
      emotion: 'default',
      skin: Number(localStorage['skin']) || 2000,
      isModalOpen: isOpen
    }

    this.updateBannerAdBlur()
  }

  updateBannerAdBlur() {
    const topAd = document.getElementById("top-banner-ad")
    topAd.className = this.state.isModalOpen ? "modal-blur" : "";
  }

  render() {
    const { selectedItems, action, emotion, skin, isModalOpen } = this.state
    this.updateBannerAdBlur()

    return (
      <div className={"App" + (isModalOpen ? ' modal-blur' : '')}>
        <div className="App-header">
          <span className="logo">
            <b>MapleStory:</b> Design<br/>
            <span className="desc"><span className="alpha">Public Alpha</span> A <a href="//crr.io/">Crrio</a> Project</span>
          </span>
        </div>
        <PlayerCanvas
          selectedItems={_.values(selectedItems).map(item => item.Id)}
          action={action}
          emotion={emotion}
          skin={skin} />
        <ItemListing onItemSelected={this.userSelectedItem.bind(this)} />
        <EquippedItems
          equippedItems={selectedItems}
          onRemoveItem={this.userRemovedItem.bind(this)} />
        <CharacterProperties
          equippedItems={selectedItems}
          action={action}
          emotion={emotion}
          skin={skin}
          onChangeAction={this.userChangedAction.bind(this)}
          onChangeEmotion={this.userChangedEmotion.bind(this)}
          onChangeSkin={this.userChangedSkin.bind(this)} />
        <IntroModal
          isOpen={isModalOpen}
          onSetModalOpen={this.setModalOpen.bind(this)}
          />
      </div>
    )
  }

  setModalOpen (isModalOpen) {
    this.setState({ isModalOpen })
  }

  userChangedSkin (skin) {
    this.setState({ skin })
    localStorage['skin'] = skin
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
    this.updateItems(selectedItems)
  }

  userRemovedItem (item) {
    let selectedItems = {
      ...this.state.selectedItems,
    }
    delete selectedItems[item.TypeInfo.SubCategory]
    this.updateItems(selectedItems);
  }

  updateItems (selectedItems) {
    console.log('New Items: ', selectedItems)
    this.setState({
      selectedItems
    })

    localStorage['selectedItems'] = JSON.stringify(selectedItems)
  }
}

export default App
