import React, { Component } from 'react'
import './index.css'
import _ from 'lodash'
import axios from 'axios'

class CharacterProperties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actions: ['stand1', 'stand2'],
      emotions: [
        'angry',
        'bewildered',
        'blaze',
        'blink',
        'bowing',
        'cheers',
        'chu',
        'cry',
        'dam',
        'default',
        'despair',
        'glitter',
        'hit',
        'hot',
        'hum',
        'love',
        'oops',
        'pain',
        'qBlue',
        'shine',
        'smile',
        'stunned',
        'troubled',
        'vomit',
        'wink'
      ]
    }

    // Populate true action list
    axios.get(`https://labs.maplestory.io/api/character/actions/1040004`)
      .then(response => this.setState({actions: _.sortBy(response.data, a => a)}))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.equippedItems === this.props.equippedItems) return
    const { equippedItems } = this.props

    const itemIds = _.values(equippedItems).map(item => item.Id)
    axios.get(`https://labs.maplestory.io/api/character/actions/${itemIds.join(',')}`)
      .then(response => this.setState({actions: _.sortBy(response.data, a => a)}))
  }

  render() {
    const { actions, emotions } = this.state
    const { equippedItems, emotion, action } = this.props

    return (
      <div className='character-properties'>
        <span>Properties</span>
        <div className="facial-expression">
          <span>Facial Expression</span>
          <select disabled={!equippedItems.Face} onChange={this.changeEmotion.bind(this)} value={emotion}>
            {
              emotions.map(e => (
                <option value={e}>{e}</option>
              ))
            }
          </select>
        </div>
        <div className="action">
          <span>Pose / Action</span>
          <select onChange={this.changeAction.bind(this)} value={action}>
            {
              actions.map(a => (
                <option value={a}>{a}</option>
              ))
            }
          </select>
        </div>
        <div className="disclaimer">
          This is currently a prototype and a <b>work in progress</b>. Please provide feedback or report bugs on our <a href="https://discord.gg/D65Grk9">Discord</a>.
        </div>
      </div>
    )
  }

  changeEmotion(e) {
    this.props.onChangeEmotion(e.target.value);
  }

  changeAction (e) {
    this.props.onChangeAction(e.target.value)
  }
}

export default CharacterProperties
