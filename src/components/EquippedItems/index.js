import React, { Component } from 'react'
import './index.css'
import _ from 'lodash'

class EquippedItems extends Component {
  render() {
    const { equippedItems } = this.props
    return (
      <div className='equipped-items'>
        <div className='equipped-items-header'>
          Quick View
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
                <span onClick={this.removeItem.bind(this, item)}><i className="fa fa-times"></i></span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  removeItem(item) {
    this.props.onRemoveItem(item);
  }
}

export default EquippedItems
