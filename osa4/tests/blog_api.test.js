const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { MONGODB_URI } = require('../utils/config')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Hellurei ja tänään taas tällästa meisinkiä täältä Ylävitun suolta",
    author: "Kalajoen Kickelström ",
    url: "www.Jorma69.tv",
    likes: "10"
  },
  {
    title: "TERSE Seon Keijo taas täältä jänkhältä",
    author: "Ounasvaaran Keisari",
    url: "www.ounasvaarankeisariakakeijo.org",
    likes: "4356"
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(initialBlogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs/')
   
  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    'TERSE Seon Keijo taas täältä jänkhältä')

})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "a valid blog",
    author: "Kalajoen Kickelström ",
    url: "www.Jorma69.tv",
    likes: "10"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(t => t.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('a valid blog')
}
)


test('there is field id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})


test('if likes is empty 0 is given to its value',async ()=> {
  const newBlog = {
    title: "if likes is empty ",
    author: "Kalajoen Kickelström ",
    url: "www.Jorma69.tv",
    likes:""
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const response = await api.get('/api/blogs')
  expect(response.body[2].likes).toBe(0)
})

test('if blog doesnt include title and url, response 400 ba request ', async ()=> {

  const newBlog = {
    author: "Kalajoen Kickelström ",
    likes:"4"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    // .expect('Content-Type', /application\/json/)

})



afterAll(() => {
  mongoose.connection.close()
})