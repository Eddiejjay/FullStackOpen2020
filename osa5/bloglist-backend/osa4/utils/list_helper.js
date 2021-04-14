
let _ =require('lodash')

const dummy = (blogs) => {
  return 1

}


const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
    .reduce((a,b) => a+b)
  return likes
}



const favoriteBlog = blogs => {
  let favorite = blogs[0]
  blogs.map(blog => {
    if (blog.likes >= favorite.likes) {
      favorite = blog
    }
  })
  const a = { title : favorite.title,
    author : favorite.author,
    likes : favorite.likes}



  return a

}

const mostBlogs = blogs => {

  const blogCountObj = blogs.map(blog => blog.author)
    .reduce((total, value) => {
      if(total[value]){
        total[value]++
      } else{
        total[value] = 1
      }
      return total
    }, {})

 
  const blogCountArrayOfObj = Object.entries(blogCountObj).map((item) => ( {author: item[0], blogs: item[1]} ))
  const sorted = blogCountArrayOfObj.sort((a,b) => b.blogs - a.blogs)
  const authorWithMostBlogs = sorted[0]

  return authorWithMostBlogs

}

const mostLikes = (blogs) => {

  const mapped = blogs.map(({ author, likes }) => ({ author, likes }));

  console.log(mapped)


  const result = {}

  mapped.forEach(author => {
    for (let [key, value] of Object.entries(author)){
      console.log(Object.entries(author))
      console.log('avain',key)
      console.log('value', value)
      if (result[key]) {
        result[key] += value
      }else {
        result[key] = value
      }
       
    }
  
    console.log(result)
  }) 
  console.log(result)
  return result
}


module.exports = { 
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes


}