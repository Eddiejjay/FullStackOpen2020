import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {

  const config = {
    headers : { Authorization : token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data

}

const addLike = async (blog, id) => {
  await axios.put(`${baseUrl}/${id}`, blog)
  console.log(blog)

}

const remove = async (id) => {
  const config = {
    headers : { Authorization : token }
  }


  await axios.delete(`${baseUrl}/${id}`,config)
}

const getAllComments = () => {
  const request = axios.get(`${baseUrl}/comments`)
  return request.then(response => response.data)
}

// const getAllBlogsComments = (id) => {
//   const request = axios.get(`${baseUrl}/${id}/comments`)
//   return request.then(response => response.data)
// }



const addComment = async (comment, id) => {

  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data

}

export default { getAll, setToken, create, addLike, remove,  addComment, getAllComments }