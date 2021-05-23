import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



const user = {
  username: 'Eero',
  name: 'Itse Jorma69',
  id: '606f73df9e7ce8d6aafbec3a'
}
const blog = {
  user : '606f73df9e7ce8d6aafbec3a',
  likes : 6969696969,
  author: 'Jouni Keinänen',
  title:'Olipa kerran ',
  url: 'www.kalashnikov.com'
}

test('when view button pressed, shows also url and likes ', () => {
  const component = render(
    <Blog blog={blog} user = {user} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  //   component.debug()

  expect(component.container).toHaveTextContent('www.kalashnikov.com')
  expect(component.container).toHaveTextContent('6969696969')
  expect(component.container).toHaveTextContent('Olipa kerran')
  expect(component.container).toHaveTextContent('Jouni Keinänen')
})

test('renders blog with only title and author', () => {

  const component = render(
    <Blog blog={blog} user = {user} />
  )
  //   component.debug()


  expect(component.container).not.toHaveTextContent('www.kalashnikov.com')
  expect(component.container).not.toHaveTextContent('6969696969')
  expect(component.container).toHaveTextContent('Olipa kerran')
  expect(component.container).toHaveTextContent('Jouni Keinänen')
})


test('clicking like button twice eventhandler is called twice', () => {

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user = {user} updateLike = {mockHandler} />
  )


  const button2 = component.getByText('view')
  fireEvent.click(button2)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  //component.debug()

  expect(mockHandler.mock.calls).toHaveLength(2)


})