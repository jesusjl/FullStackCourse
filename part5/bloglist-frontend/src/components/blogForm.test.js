import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './blogForm'

test('', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Which input field, first?' }
  })
  fireEvent.change(author, {
    target: { value: 'Michael Donovan' }
  })
  fireEvent.change(url, {
    target: { value: 'http://url.org' }
  })

  fireEvent.submit(form)
  /*  console.log(createBlog.mock.calls) */
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Which input field, first?')
  expect(createBlog.mock.calls[0][0].author).toBe('Michael Donovan')
  expect(createBlog.mock.calls[0][0].url).toBe('http://url.org')

})

