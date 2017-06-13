import React, { Component } from 'react'
import './index.css'
import _ from 'lodash'
import axios from 'axios'

class CharacterProperties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actions: ['stand1', 'stand2']
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.equippedItems === this.props.equippedItems) return
    const { equippedItems } = this.props

    const itemIds = _.values(equippedItems).map(item => item.Id)
    axios.get(`https://labs.maplestory.io/api/character/actions/${itemIds.join(',')}`)
      .then(response => this.setState({actions: response.data}))
  }

  render() {
    const { actions } = this.state

    return (
      <div className='character-properties'>
        <span>Properties</span>
        <div className="facial-expression">
          <span>Facial Expression</span>
          <select disabled>
            <option>Default</option>
          </select>
        </div>
        <div className="action">
          <span>Pose / Action</span>
          <select onChange={this.changeAction.bind(this)}>
            {
              actions.map(action => (
                <option value={action}>{action}</option>
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

  changeAction (e) {
    this.props.onChangeAction(e.target.value)
  }
}

export default CharacterProperties
