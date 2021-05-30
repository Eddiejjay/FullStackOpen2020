import { useSelector } from 'react-redux'
import React from 'react'
import SimpleBlog from './SimpleBlog'
import {
  Link
} from 'react-router-dom'


const AllBlogs = () => {

  const blogs = useSelector(state => state.blogs)


  return(
    <div>


      <ul>
        {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
          <li key = {blog.id}>
            <Link to = {`/blogs/${blog.id}`}>
              <SimpleBlog blog={blog} />
            </Link>
          </li>

        )}
      </ul>




    </div>

  )


}

export default AllBlogs