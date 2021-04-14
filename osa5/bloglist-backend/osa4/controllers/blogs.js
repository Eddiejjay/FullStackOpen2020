const blogsRouter = require('express').Router()
const { result } = require('lodash')
const Blog = require ('../models/blog')
const jwt = require('jsonwebtoken')
const User = require ('../models/user')
const middleware = require ('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user' ,{username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))

})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
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

blogsRouter.delete('/:id' ,middleware.userExtractor, async ( request, response) => {
  const id = request.params.id
  const blogToDelete = await Blog.findById(id)
  const user = request.user


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


module.exports = blogsRouter