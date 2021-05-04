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

export default { getAll, setToken, create, addLike, remove }