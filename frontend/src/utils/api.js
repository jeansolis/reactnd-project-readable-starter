import { normalize, schema } from 'normalizr'

const api = "http://localhost:3001"
//const api = "https://evening-harbor-34965.herokuapp.com"

// Generate a unique token for storing data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addPost = (post) =>
    fetch(`${api}/posts/`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post })
    }).then(res => res.json())