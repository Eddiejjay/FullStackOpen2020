
import React  from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import styled from 'styled-components'


const Styled = styled.div`
font-family: cursive;
color: black;
background: BurlyWood;
border-style: dotted;
padding: 12px;
margin:12px
`


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

    <Styled>
      <Link to = {`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </Styled>
  ) }

SimpleBlog.propTypes = {

  blog: PropTypes.object.isRequired
}
export default SimpleBlog