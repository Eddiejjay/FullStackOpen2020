
import React  from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

// const blogStyle = {
//   paddingTop: 10,
//   paddingLeft: 2,
//   border: 'solid',
//   borderWidth: 1,
//   marginBottom: 5
// }
const  SimpleBlog = ({ blog }) => {
  if (!blog) {
    return null
  }

  return (


    <Link to = {`/blogs/${blog.id}`}>
      {blog.title} {blog.author}
    </Link>
  ) }

SimpleBlog.propTypes = {

  blog: PropTypes.object.isRequired
}
export default SimpleBlog