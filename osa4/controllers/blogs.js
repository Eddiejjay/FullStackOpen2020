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

blogsRouter.delete('/:id' ,async ( request, response) => {
  const id = request.params.id
const deleted = await Blog.findByIdAndRemove(id)
response.status(204).end()
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