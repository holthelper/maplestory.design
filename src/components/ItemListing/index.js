import React, { Component } from 'react'
import './index.css'
import axios from 'axios'
import _ from 'lodash'
import LazyLoad from 'react-lazy-load'

const itemListPromise = axios.get('http://localhost:5000/api/item/category/equip');

class ItemListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {},
      categoryNames: {},
      selectedCategory: [],
      search: ''
    }

    itemListPromise.then(response => {
      if(response.status === 200) {
        const categories = _.mapValues(
          _.groupBy(response.data, item => item.TypeInfo.Category),
          items => _.groupBy(items, item => item.TypeInfo.SubCategory)
        );

        const categoryNames = _.mapValues(categories, _.keys);

        this.setState({
          categories,
          categoryNames
        })
      }
    })
  }

  render() {
    const { categoryNames, selectedCategory, search } = this.state

    return (
      <div className='item-listing'>
        <div className='item-listing-header'>
          Gallery <input type="search" value={search} onChange={this.search.bind(this)} />
        </div>
        <div className='item-listing-content'>
          <div className='item-listing-categories'>
          <ul>
          {
            _.map(categoryNames, (subCategories, category) => {
              return (<li key={category} onClick={this.selectPrimaryCategory.bind(this, category)}>{category}
              <ul>
                {
                  subCategories.map(subCategory => <li key={subCategory} onClick={this.selectChildCategory.bind(this, category, subCategory)}>{subCategory}</li>)
                }
              </ul></li>)
            })
          }
          </ul>
          </div>
          <div className='item-listing-icons'>
            {
              selectedCategory.map(item => (
                <LazyLoad height={32} width={32} key={item.Id}>
                  <img src={`https://labs.maplestory.io/api/item/${item.Id}/icon`} onClick={this.selectItem.bind(this, item)} alt={item.Name} />
                </LazyLoad>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

  search(e) {
    this.setState({
      search: e.target.value
    })
  }

  selectPrimaryCategory(primaryCategory, proxy, e) {
    const selectedCategory = _.flatMap(_.values(this.state.categories[primaryCategory], a => a))
    this.selectCategory(selectedCategory)
    proxy.preventDefault()
    proxy.stopPropagation()
  }

  selectChildCategory(primaryCategory, childCategory, proxy, e) {
    const selectedCategory = this.state.categories[primaryCategory][childCategory]
    this.selectCategory(selectedCategory)
    proxy.preventDefault()
    proxy.stopPropagation()
  }

  selectCategory(selectedCategory) {
    this.setState({
      selectedCategory
    })
  }

  selectItem(item){
    this.props.onItemSelected(item)
  }
}

export default ItemListing
