import client from './client'

export const getArtworks = async (params = {}) => {
  const response = await client.get('/gallery/artworks', { params })
  return response.data
}

export const getArtwork = async (id) => {
  const response = await client.get(`/gallery/artworks/${id}`)
  return response.data
}

export const getArtists = async (params = {}) => {
  const response = await client.get('/gallery/artists', { params })
  return response.data
}

export const getArtist = async (id) => {
  const response = await client.get(`/gallery/artists/${id}`)
  return response.data
}

export const getCollections = async (params = {}) => {
  const response = await client.get('/gallery/collections', { params })
  return response.data
}

export const getCollection = async (id) => {
  const response = await client.get(`/gallery/collections/${id}`)
  return response.data
}
