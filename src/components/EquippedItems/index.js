import React, { Component } from 'react'
import './index.css'
import _ from 'lodash'

class EquippedItems extends Component {
  render() {
    const { equippedItems, skinId } = this.props
    return (
      <div className='equipped-items'>
        <div className='equipped-items-header'>
          <span className="equipped-items-title">Quick View</span> <span onClick={this.removeItems.bind(this)} className="btn bg-red text-white right">Remove All</span>
        </div>
        <div className='equipped-items-listing'>
          {
            _.map(equippedItems, item => (
              <div className='equipped-items-item' key={item.Id}>
                <img src={`https://labs.maplestory.io/api/item/${item.Id}/icon`} alt={item.Name} />
                <div className='equipped-items-item-meta'>
                  <div className='equipped-items-item-meta-name'>{item.Name}</div>
                  <div className='equipped-items-item-meta-category'>{item.TypeInfo.SubCategory}</div>
                </div>
                <span onClick={this.removeItem.bind(this, item)} className="btn bg-red text-white right"><i className="fa fa-times"></i></span>
              </div>
            ))
          }
        </div>
        <div className='download-bar'>
          <a href={`https://labs.maplestory.io/api/character/download/${skinId}/${_.map(equippedItems, i => i.Id).join(',')}`} target='_blank'>Download Spritesheet</a>
        </div>
      </div>
    )
  }

  removeItem(item) {
    this.props.onRemoveItem(item);
  }

  removeItems() {
    this.props.onRemoveItems();
  }
}

export default EquippedItems
