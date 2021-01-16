import axios from 'axios'
import _ from 'lodash'
import '../css/SearchBar.css'
import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { connect } from 'react-redux'
import { setTags, removeTag } from '../store'


let tags = []
const tagSearch = _.debounce(async ({ value }) => {
  try {
    // so we only want to search the last thing space-delimted
    const texts = value.split(' ')
    const searchText = texts[texts.length - 1].trim()
    if (searchText.length === 0) {
      return
    }

    const { data } = await axios.get(`https://danbooru.donmai.us/autocomplete.json`, {
      params: {
        'search[query]': searchText,
        'search[type]': "tag_query",
        limit: 10,
      }
    })
    console.log({ search: value, tags })
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
  const [input, setInput] = useState("")

  const resetInput = () => setInput("")

  const inputProps = {
    value: input,
    onChange: (evt, { newValue }) => {
      setInput(newValue)
    }
  }

  const onSelect = (event, { suggestionValue }) => {
    const newTags = [...props.tags, suggestionValue]
    props.setTags(newTags)
    resetInput()
  }

  return (
    <div className='search-bar'>
      <Autosuggest
        suggestions={tags}
        onSuggestionsFetchRequested={tagSearch}
        onSuggestionsClearRequested={() => {
          tags = []
        }}
        onSuggestionSelected={onSelect}
        inputProps={inputProps}
        getSuggestionValue={(tagObj) => {
          return tagObj.value
        }}
        containerProps={{
          className: "search-container"
        }}
        renderSuggestion={tagObj => (<div>{tagObj.label}</div>)}
      />
      <div className='tags-bar'>
        {props.tags.map(tag => (<span className='tag' onClick={() => props.unsetTag(tag)}>{tag}</span>))}
      </div>
    </div>
  )
}


const mapState = state => ({
  tags: state.tags,
  page: state.page,
  loadingPics: state.loadingPics,
  hasMore: state.hasPics,
})

const mapDispatch = dispatch => ({
  setTags: tags => dispatch(setTags(tags)),
  unsetTag: tag => dispatch(removeTag(tag))
})


export default connect(mapState, mapDispatch)(SearchBar)

