import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import { shallow } from "enzyme";
import Blog from './Blog'


describe('<blog />', () => {

  let component

  beforeEach(() => {

    const blog = {
      title: 'Title should display by default',
      author: 'author should display by default',
      url: 'http://urlshouldnotdisplaybydefault.org'
    }

    component = render(
      <Blog blog={blog}/>
    )
  })

  test('component display title by default', () => {

    expect(component.container.querySelector('.title')).not.toBeNull()

  })

  test('component display author by default', () => {

    expect(component.container.querySelector('.author')).not.toBeNull()

  })

  test('component not display url and likes by default', () => {

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })

  test('url and likes are shown when button controlling details has been clicked', () => {

    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

  })
})

test('if the like button is clicked twice the event handler is called twice', () => {

  const blog = {
    title: 'Title should display by default',
    author: 'author should display by default',
    url: 'http://urlshouldnotdisplaybydefault.org'
  }

  const updateBlog = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={updateBlog}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(updateBlog.mock.calls).toHaveLength(2)})

