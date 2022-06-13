
import '../css/SearchBar.css'
import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { connect } from 'react-redux'
import numeral from 'numeral'
import _ from 'lodash'
import { setTags, removeTag, searchTags, toggleTag, toggleGeneral, toggleSensitive, toggleQuestionable, toggleExplicit } from '../store'

const SearchBar = function SearchBar(props) {
  const [input, setInput] = useState("")

  const resetInput = () => setInput("")

  const inputProps = {
    value: input,
    onChange: (evt, { newValue }) => {
      setInput(newValue)
    }
  }

  const onSelect = (event, { suggestion }) => {
    const tag = {
      value: suggestion.value,
      positive: true,
      postCount: suggestion.post_count,
    }
    const newTags = [...props.tags, tag]
    props.setTags(newTags)
    resetInput()
  }

  const onFetch = ({ value }) => {
    props.searchTags(value.replace(/ /g, '_'))
  }

  const debouncedOnFetch = _.debounce(onFetch, 125, {
    leading: false,
    trailing: true,
  })

  const ratingOptions = [
    {
      key: 'general',
      toggle: props.toggleGeneral,
    },
    {
      key: 'sensitive',
      toggle: props.toggleSensitive,
    },
    {
      key: 'questionable',
      toggle: props.toggleQuestionable,
    },
    {
      key: 'explicit',
      toggle: props.toggleExplicit,
    },
  ]

  const Tag = ({ tag }) => {
    const tagSignClass = `tag-sign ${tag.positive ? 'positive' : 'negative'}`
    return <div className='tag-container' >
      <div className={tagSignClass} onClick={() => props.toggleTag(tag)} >{tag.positive ? '+' : '-'}</div>
      <div className='tag' onClick={() => props.unsetTag(tag)}>{tag.value}</div>
    </div>
  }

  return (
    <div className='top-bar'>

      <div className='search-bar'>
        <Autosuggest
          suggestions={props.searchedTags}
          onSuggestionsFetchRequested={debouncedOnFetch}
          onSuggestionsClearRequested={props.resetSearchTags}
          onSuggestionSelected={onSelect}
          inputProps={inputProps}
          getSuggestionValue={(tagObj) => {
            return tagObj.value
          }}
          containerProps={{
            className: "search-container"
          }}
          renderSuggestion={tagObj => {
            const amt = numeral(tagObj.post_count).format('0[.]0a')
            const amtStr = `- (${amt})`
            if (tagObj.type === 'tag-alias') {
              return (<div>{tagObj.antecedent} -&gt; {tagObj.label} {amtStr}</div>)
            }
            return (<div>{tagObj.label} {amtStr}</div>)
          }}
        />

        <div className='rating-controller'>
          {
            ratingOptions.map(({ key, toggle }) => {
              const displayValue = key.toUpperCase();
              const value = props.ratingFilters[key];
              const className = 'rating-control ' + (value ? '' : 'disabled');

              return <div key={key} className={className} onClick={toggle}>{displayValue}</div>
            })
          }
        </div>
      </div>



      <div className='tags-bar'>
        {props.tags.map(tag => <Tag key={tag.value} tag={tag} />)}
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
  ratingFilters: state.ratingFilters
})

const mapDispatch = dispatch => ({
  setTags: tags => dispatch(setTags(tags)),
  unsetTag: tag => dispatch(removeTag(tag)),
  toggleTag: tag => dispatch(toggleTag(tag)),
  searchTags: value => dispatch(searchTags(value)),
  resetSearchTags: () => dispatch(searchTags([])),
  toggleGeneral: () => dispatch(toggleGeneral()),
  toggleSensitive: () => dispatch(toggleSensitive()),
  toggleQuestionable: () => dispatch(toggleQuestionable()),
  toggleExplicit: () => dispatch(toggleExplicit()),
})


export default connect(mapState, mapDispatch)(SearchBar)

