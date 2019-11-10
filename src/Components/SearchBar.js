import axios from 'axios'
import _ from 'lodash'
import React, { useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { connect } from 'react-redux'
import { setTags } from '../store'


let tags = []
const tagSearch = _.debounce(async (text) => {
  try {
    // so we only want to search the last thing space-delimted
    const texts = text.split(' ')
    const searchText = texts[texts.length - 1].trim()
    if (searchText.length === 0) {
      return
    }

    const { data } = await axios.get(`https://danbooru.donmai.us/tags/autocomplete.json?search[name_matches]=${searchText}`)
    tags = data
  } catch (err) {
    console.error(err)
    tags = []
  }
}, 250, {
  leading: true,
  trailing: true,
})

const SearchBar = function SearchBar(props) {
  const [input, setInput] = useState('')
  return (
    <div>
      <Autocomplete
        inputProps={{ id: 'tags-autocomplete' }}
        wrapperStyle={{ position: 'relative', display: 'inline-block' }}
        value={input}
        items={tags}
        getItemValue={(item) => item.name}
        onSelect={(value, item) => {
          // and when we select, we want to replace only the last one
          const texts = input.split(' ')
          const lastTexts = texts.slice(0, texts.length - 1)
          const newVal = [...lastTexts, value].join(' ')
          setInput(newVal) // change the input text
          props.setTags(newVal.split(' ')) // actually update the part that matters
          tags = [] // and set tags to be empty
        }}
        onChange={async (event, value) => {
          setInput(value)
          tagSearch(value)
        }}
        renderMenu={children => (
          <div className="menu">
            {children}
          </div>
        )}
        renderItem={(item, isHighlighted) => (
          <div
            className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
            key={item.name}
          >{item.name}
          </div>
        )}
      />
    </div>
  )
}


const mapState = state => ({
  tags: state.tags.join(' '),
  page: state.page,
  loadingPics: state.loadingPics,
  hasMore: state.hasPics,
})

const mapDispatch = dispatch => ({
  setTags: tags => dispatch(setTags(tags)),
})


export default connect(mapState, mapDispatch)(SearchBar)

