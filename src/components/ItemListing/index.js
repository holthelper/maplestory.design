import React, { Component } from 'react'
import './index.css'
import axios from 'axios'
import _ from 'lodash'
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer
} from 'react-virtualized';

const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 32,
  defaultWidth: 32,
  fixedWidth: true
})

const itemListPromise = axios.get('https://labs.maplestory.io/api/item/category/equip');

class ItemListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: {},
      categoryNames: {},
      selectedCategory: null,
      search: '',
      gutterSize: 6,
      columnWidth: 32,
      categoryNameSelected: ''
    }

    this._cache = cellMeasurerCache

    itemListPromise.then(response => {
      if(response.status === 200) {
        const categories = _.mapValues(
          _.groupBy(response.data, item => item.TypeInfo.Category),
          items => _.groupBy(items, item => item.TypeInfo.SubCategory)
        );

        const categoryNames = _.mapValues(categories, _.keys);

        this.setState({
          items: response.data,
          categories,
          categoryNames
        })
      }
    })
  }

  render() {
    const { categoryNames, selectedCategory, items, categoryNameSelected } = this.state
    const search = this.state.search.toLowerCase()

    this.showIcons = !search ? (selectedCategory || items) : items.filter((item, i) => {
      return (item.Name || '').toLowerCase().indexOf(search) !== -1 ||
        item.Id.toString().toLowerCase().indexOf(search) !== -1 ||
        (item.desc || '').toLowerCase().indexOf(search) !== -1
    })

    this.showIcons = this.showIcons.filter(item => item && item.Id)

    return (
      <div className='item-listing'>
        <div className='item-listing-header'>
          Gallery <input type="search" value={search} onChange={this.search.bind(this)} placeholder="Search.."/>
        </div>
        <div className='item-listing-content'>
          <div className='item-listing-categories'>
          <ul>
          {
            _.map(categoryNames, (subCategories, category) => {
              return (<li key={category} onClick={this.selectPrimaryCategory.bind(this, category)}>
              <span className={'category' + (category === categoryNameSelected ? ' active' : '')}>{category}</span>
              <ul>
                {
                  subCategories.map(subCategory => <li
                    key={subCategory}
                    className={subCategory === categoryNameSelected ? 'active' : ''}
                    onClick={this.selectChildCategory.bind(this, category, subCategory)}>
                      {subCategory}
                    </li>)
                }
              </ul></li>)
            })
          }
          </ul>
          </div>
          <div className='item-listing-icons'>
            { this._renderAutoSizer({ height: 32 }) }
          </div>
        </div>
      </div>
    )
  }

  _renderAutoSizer ({ height }) {
    this._height = height || 32

    return (
      <AutoSizer
        onResize={this._onResize.bind(this)}
      >
        {this._renderMasonry.bind(this)}
      </AutoSizer>
    )
  }

  _renderMasonry({ height, width }) {
    this._width = width
    this._height = height

    this._calculateColumnCount()
    this._initCellPositioner()

    return <Masonry
      cellCount={this.showIcons.length - 1}
      cellMeasurerCache={cellMeasurerCache}
      cellPositioner={this._cellPositioner}
      cellRenderer={this.cellRenderer.bind(this)}
      ref={this._setMasonryRef.bind(this)}
      width={width}
      height={this._height}
      />
  }

  _calculateColumnCount () {
    const {
      columnWidth,
      gutterSize
    } = this.state

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize))
  }

  _initCellPositioner () {
    if (typeof this._cellPositioner === 'undefined') {
      const {
        columnWidth,
        gutterSize
      } = this.state

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize
      })
    }
  }

  _onResize ({ height, width }) {
    this._width = width

    this._columnHeights = {}
    this._calculateColumnCount()
    this._resetCellPositioner()
    this._masonry.recomputeCellPositions()
  }

  _resetCellPositioner () {
    const {
      columnWidth,
      gutterSize
    } = this.state

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize
    })
  }

  _setMasonryRef (ref) {
    this._masonry = ref
  }

  cellRenderer ({ index, key, parent, style }) {
    const item = this.showIcons[index]

    if (!item) return

    return (
      <CellMeasurer
        cache={cellMeasurerCache}
        index={index}
        key={item.Id}
        parent={parent}
      >
        <div className="item-img-container" style={{
          ...style,
          height: 32
        }}>
          <img
            src={`https://labs.maplestory.io/api/item/${item.Id}/icon`}
            onClick={this.selectItem.bind(this, item)}
            alt={item.Name}
            title={item.Name} />
        </div>
      </CellMeasurer>
    )
  }

  search(e) {
    this.setState({
      search: e.target.value
    })
  }

  selectPrimaryCategory(primaryCategory, proxy, e) {
    const selectedCategory = _.flatMap(_.values(this.state.categories[primaryCategory], a => a))
    this.selectCategory(selectedCategory, primaryCategory)
    proxy.preventDefault()
    proxy.stopPropagation()
  }

  selectChildCategory(primaryCategory, childCategory, proxy, e) {
    const selectedCategory = this.state.categories[primaryCategory][childCategory]
    this.selectCategory(selectedCategory, childCategory)
    proxy.preventDefault()
    proxy.stopPropagation()
  }

  selectCategory(selectedCategory, categoryNameSelected) {
    console.log(`Selected category: ${categoryNameSelected}`)
    this.setState({
      selectedCategory,
      categoryNameSelected
    })
  }

  selectItem(item){
    this.props.onItemSelected(item)
  }
}

export default ItemListing
