import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('when adding a new blog eventhandler has right parameters', () => {

  const createBlog= jest.fn()
  const setNotificationMessage= jest.fn()
  const component = render(
    <BlogForm createBlog = {createBlog} setNotificationMessage = {setNotificationMessage}  />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Kalassa lapissa' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Eero ja Saku' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.keijonkivekset.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Kalassa lapissa')
  expect(createBlog.mock.calls[0][0].author).toBe('Eero ja Saku' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.keijonkivekset.com')
  //   component.debug()

})