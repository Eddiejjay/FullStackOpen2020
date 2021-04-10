const blogsRouter = require('express').Router()
const { result } = require('lodash')
const Blog = require ('../models/blog')
const jwt = require('jsonwebtoken')
const User = require ('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user' ,{username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))




})



blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log(request.user)
 
  // if (!request.token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  
  const user = request.user
  
  let blog = {}
  if(body.likes === ""){

    blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: user._id })
  } else {
    blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id })
  }
  
  if (blog.title === undefined && blog.url === undefined) {
    response.status(400).json()
  }else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }

})

blogsRouter.delete('/:id' ,async ( request, response) => {
  const id = request.params.id
  const blogToDelete = await Blog.findById(id)
  const user = request.user

  
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log('onko samat', user.id, 'ja tää ', decodedToken.id)
  
  if (!(user.id.toString() === blogToDelete.user.toString())) {
    return response.status(401).json({ error: 'invalid token' })
  } else {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  }
})



blogsRouter.put('/:id', async (request, response,) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,  { new: true })
  response.json(updatedBlog)
})


// const tokenExtractor = (request, response ,next) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     request.token = authorization.substring(7)
//   }
//   return null
// }




module.exports = blogsRouter