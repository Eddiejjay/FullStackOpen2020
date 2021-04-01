const blogsRouter = require('express').Router()
const { result } = require('lodash')
const Blog = require ('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))

// Blog
//   .find({})
//   .then(blogs => {
//     response.json(blogs)
//   })
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  let blog = {}
  if(body.likes === ""){

    blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0})
  } else {
    blog = new Blog(request.body)
  }
  
  if (blog.title === undefined && blog.url === undefined) {
    response.status(400).json()
  }else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }


  // .then(result => {
  //   response.status(201).json(result)
  // })
})

module.exports = blogsRouter