const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { MONGODB_URI } = require('../utils/config')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const { CLIEngine } = require('eslint')

let token = 'jesee'

const tokenUser = {
  username: 'Jarmo',
  password: '12345'
}

beforeAll(async () => {
  await api.post('/api/users')
    .send(tokenUser)
  const tokenResult = await api.post('/api/login')
    .send(tokenUser)
  token = tokenResult.body.token

})


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


const initialUsers = [
  {
    username: "Eero",
    name: "Jarmo Pukonen",
    password: "12345"

  },
  {
    username: "Pirkkis55",
    name: "Pirkko Hakkaerainen",
    password: "tuoli"
  
  },
]


describe('Blog tests', ()=> {
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
  
    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)
  })
  
  test('if blog doesnt include title and url, response 400 bad request ', async ()=> {
  
    const newBlog = {
      author: "Kalajoen Kickelström ",
      likes:"4"
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
    
  })
  test('adding new blog is not possible if there is no token', async ()=> {
  

    const newBlog = {
      title: "if likes is empty ",
      author: "Kalajoen Kickelström ",
      url: "www.Jorma69.tv",
      likes:""
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
}
)


//User tests#####################################################################################################

describe('user tests', ()=> { 

  beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
  })

  test('user with too short password is not added ', 
    async () => {
      const newUser = {
        username : "jeeeeeeee",
        name : "Jami Perkele",
        password: "12",
      }

      const response = await api 
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toBe('password is too short, minimum 3')

      const allUsers = await api.get('/api/users')
      expect(allUsers.body).toHaveLength(initialUsers.length)
})


  test('user with password missing is not added ', 
    async () => {
      const newUser = {
        username : "jeeeeeeee",
        name : "hippeli"
      }

      const response = await api 
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toBe('you forget password')

      const allUsers = await api.get('/api/users')
      expect(allUsers.body).toHaveLength(initialUsers.length)

    })

  test('user with username missing is not added ', 
    async () => {
      const newUser = {
        name : "hippeli",
        password: "3984938493"
      }

      const response = await api 
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)


      expect(response.body.error).toBe("User validation failed: username: Path `username` is required.")
      expect(response.body.username).toBeUndefined()

      const allUsers = await api.get('/api/users')
      expect(allUsers.body).toHaveLength(initialUsers.length)



    })
  test('user with too short username is not added ', 
    async () => {
      const newUser = {
        username: "re",
        name : "hippeli",
        password: "3984938493"
      }

      const response = await api 
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toBe("User validation failed: username: Path `username` (`re`) is shorter than the minimum allowed length (3).")

      const allUsers = await api.get('/api/users')
      expect(allUsers.body).toHaveLength(initialUsers.length)

    })

test('user with already added username is not added ', 

    async () => {
      const newUser = {
        username: "Eero",
        name : "hippeli",
        password: "12345"
      }

      const response = await api 
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)


      expect(response.body.error).toBe("User validation failed: username: Error, expected `username` to be unique. Value: `Eero`")

      const allUsers = await api.get('/api/users')
      expect(allUsers.body).toHaveLength(initialUsers.length)

    }

  )})

afterAll(() => {
  mongoose.connection.close()
})