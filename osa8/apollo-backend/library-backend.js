const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const MONGODB_URI = 'mongodb+srv://Jorma:jorma123@hubbeliinosclusteriinos.upe3w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

  type Author {
    name: String!
    bookCount: Int
    born:Int
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String):[Book!]!
    allAuthors:[Author]
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ):Book!
    editAuthor(
      name:String
      setBornTo:Int
    ):Author
  }

`



const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => {
    const books = await Book.find({})
    return books.length},

    authorCount: async () => {
    const authors =await Author.find({})
    return authors.length},
    
    allBooks: async (root, args) => {
      const books = await Book.find({})
      if (args.author && !args.genre) 
        return books.filter(book => book.author.name === args.author)
      if (args.genre && !args.author)
        return books.filter(book => book.genres.includes(args.genre))
      if (args.author && args.genre)
        return books.filter(book => book.author.name === args.author).filter(book => book.genres.includes(args.genre))
      else 
        return books
  },

  allAuthors: async () => {
    const authors = await Author.find({})
    console.log('authors')
   return authors
  }
 },

 


 Mutation: {
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new UserInputError("wrong credentials")
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, JWT_SECRET) }
  },
  createUser: (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

    return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
  },
  addBook: async (root, args, { currentUser }) => {
    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }
    const auth = await Author.findOne({ name: args.author })
    if (!auth) {
      const newAuthor = new Author({name: args.author, born:null})
      try {
        await newAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const book = new Book({ ...args, author: newAuthor.id, id: uuid() })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    } else {
       const book = new Book({ ...args, author:auth.id, id: uuid() })
       try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    return book
  }},

  editAuthor : async (root, args, { currentUser }) => {
    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }
    const author = await Author.findOne({ name: args.name })
    author.born=args.setBornTo
    console.log('updated authir', author)
    try {
      await author.save()
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    }
    return author
  }
}
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req
      ? req.headers.authorization 
      : null
      
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      console.log('decodedtokenid',decodedToken )

      return { currentUser }
    }
  }

})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})