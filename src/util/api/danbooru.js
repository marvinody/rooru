import qs from 'qs'
import axios from 'axios'


const BASE_DANBOORU_URL = 'https://danbooru.donmai.us'
const DANBOORU_POSTS_URL = [BASE_DANBOORU_URL, 'posts.json'].join('/')
const DANBOORU_TAG_URL = [BASE_DANBOORU_URL, 'autocomplete.json'].join('/')

export const searchPics = async ({ page, tags }) => {
  return axios.get(DANBOORU_POSTS_URL, {
    params: {
      page,
      tags,
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, { encode: false })
    },
  })
}

export const tagSearchWildcard = async ({ searchQuery }) => {
  return await axios.get(DANBOORU_TAG_URL, {
    params: {
      'search[query]': `*${searchQuery}*`,
      'search[type]': "tag_query",
      limit: 10,
    },
  })
}

export const tagSearchExact = async ({ searchQuery }) => {
  return await axios.get(DANBOORU_TAG_URL, {
    params: {
      'search[query]': `${searchQuery}`,
      'search[type]': "tag_query",
      limit: 10,
    },
  })
}

