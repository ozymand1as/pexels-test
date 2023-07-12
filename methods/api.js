import { useEffect, useState } from 'react'
import {AsyncStorage} from 'react-native'

const API_KEY = 'EzOscaUkUDcfE01fwPjy7aIMcIlnS9nerNuVuNVT1gVvo311PC1twr7r'
const API_ENDPOINT = 'https://api.pexels.com/v1/curated'

export const getImages = async (pageUrl) => {
  return fetch(pageUrl ?? API_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: API_KEY
    }
  })
  .then(res => res.json())
  .catch(e => console.log(e.message))
}


export const useFeed = () => {
  //using Map because api sometimes returns duplicate IDs between multiple pages
  const [ photos, setPhotos ] = useState(new Map())
  const [ nextPage, setNextPage ] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCache()
      .then((result) => {
        if (!result) refresh()
      })
  }, [])

  const getCache = async () => {
    const rawCache = await AsyncStorage.getItem('Cache')
    if (!rawCache) return false

    const rehydrated = JSON.parse(rawCache)
    setNextPage(rehydrated.nextPage)
    const updPhotos = new Map()
    rehydrated.photos.forEach(p => updPhotos.set(p.id, p))
    setPhotos(updPhotos)
    return true
  }

  const setCache = async () => {
    await AsyncStorage.setItem('Cache', JSON.stringify({
      nextPage,
      photos: extractPhotos()
    }))
  }

  const getMore = () => {
    if (nextPage) {
      setLoading(true)
      getImages(nextPage)
        .then(json => {
          const updPhotos = new Map(photos)
          json.photos.forEach(p => updPhotos.set(p.id, p))
          setPhotos(updPhotos)
          setNextPage(json.next_page)
          setLoading(false)
          setCache()
        })
    }
  }

  const canGetMore = () => !!nextPage && !loading

  const refresh = () => {
    setLoading(true)
      getImages()
        .then(json => {
          const updPhotos = new Map()
          json.photos.forEach(p => updPhotos.set(p.id, p))
          setPhotos(updPhotos)
          setNextPage(json.next_page)
          setLoading(false)
          setCache()
        })
  }

  const extractPhotos = () => {
    const photosArr = []
    const iterator = photos.values()
    for (const photo of iterator) {
      photosArr.push(photo)
    }
    return photosArr
  }

  return {photos: extractPhotos(photos), canGetMore, getMore, refresh, loading}
}
