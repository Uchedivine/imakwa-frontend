import client from './client'

export const getArtworks = async (params = {}) => {
  const response = await client.get('/artworks', { params })
  return response.data
}

export const getArtwork = async (id) => {
  const response = await client.get(`/artworks/${id}`)
  return response.data
}

export const getArtists = async (params = {}) => {
  const response = await client.get('/artists', { params })
  return response.data
}

export const getArtist = async (id) => {
  const response = await client.get(`/artists/${id}`)
  return response.data
}

export const getCollections = async (params = {}) => {
  const response = await client.get('/collections', { params })
  return response.data
}

export const getCollection = async (id) => {
  const response = await client.get(`/collections/${id}`)
  return response.data
}
