
import '../css/SearchBar.css'
import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { connect } from 'react-redux'
import { setTags, removeTag, searchTags } from '../store'

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

  const onFetch = ({ value }) => {
    props.searchTags(value)
  }

  return (
    <div className='search-bar'>
      <Autosuggest
        suggestions={props.searchedTags}
        onSuggestionsFetchRequested={onFetch}
        onSuggestionsClearRequested={props.resetSearchTags}
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
        {props.tags.map(tag => (<span key={tag} className='tag' onClick={() => props.unsetTag(tag)}>{tag}</span>))}
      </div>
    </div>
  )
}


const mapState = state => ({
  tags: state.tags,
  page: state.page,
  loadingPics: state.loadingPics,
  searchedTags: state.searchTags,
  hasMore: state.hasPics,
})

const mapDispatch = dispatch => ({
  setTags: tags => dispatch(setTags(tags)),
  unsetTag: tag => dispatch(removeTag(tag)),
  searchTags: value => dispatch(searchTags(value)),
  resetSearchTags: () => dispatch(searchTags([]))
})


export default connect(mapState, mapDispatch)(SearchBar)

