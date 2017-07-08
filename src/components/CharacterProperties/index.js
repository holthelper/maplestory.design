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
    const { equippedItems, emotion, action, skin, mercEars } = this.props

    return (
      <div className='character-properties'>
        <span>Properties</span>
        <div className="facial-expression">
          <span>Facial Expression</span>
          <select disabled={!equippedItems.Face} onChange={this.changeEmotion.bind(this)} value={emotion}>
            {
              emotions.map(e => (
                <option value={e} key={e}>{e}</option>
              ))
            }
          </select>
        </div>
        <div className="action">
          <span>Pose / Action</span>
          <select onChange={this.changeAction.bind(this)} value={action}>
            {
              actions.map(a => (
                <option value={a} key={a}>{a}</option>
              ))
            }
          </select>
        </div>
        <div className="skin">
          <span>Skin</span>
          <select onChange={this.changeSkin.bind(this)} value={skin}>
            <option value='2000'>Light</option>
            <option value='2004'>Ashen</option>
            <option value='2010'>Pale Pink</option>
            <option value='2001'>Tanned</option>
            <option value='2003'>Pale</option>
            <option value='2005'>Green</option>
            <option value='2013'>Ghostly</option>
            <option value='2002'>Dark</option>
            <option value='2011'>Clay</option>
          </select>
        </div>
        <div className="merc-ears">
          <span>Mercedes Ears</span>
          <input
            type="checkbox"
            checked={mercEars}
            onChange={this.changeMercEars.bind(this)} />
        </div>
        <div className="disclaimer">
          <p>This project is actively being developed and considered a <b>prototype</b>.</p>
        </div>
      </div>
    )
  }

  changeSkin(e) {
    this.props.onChangeSkin(e.target.value)
  }

  changeEmotion(e) {
    this.props.onChangeEmotion(e.target.value)
  }

  changeAction (e) {
    this.props.onChangeAction(e.target.value)
  }

  changeMercEars(e) {
    this.props.onChangeMercEars(e.target.checked);
  }
}

export default CharacterProperties
