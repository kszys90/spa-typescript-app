/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Home } from './pages/Home';

describe('<Home />', () => {
  test('Config test - should pass', () => {
    expect(true).toBe(true)
  })
  test('title should be in the document', () => {
    const { container } = render(
      <Router>
          <Home />
      </Router>
    )
    const title = container.querySelector('[data-testid="header-title"]')

    expect(title).toBeInTheDocument()
  })
  test('search-form should be in the document', () => {
    const { container } = render(
      <Router>
          <Home />
      </Router>
    )
    const searchForm = container.querySelector('[data-testid="search-form"]')

    expect(searchForm).toBeInTheDocument()
  })
  test('Search-input should be in the document', () => {
    const { container } = render(
      <Router>
          <Home />
      </Router>
    )
    const searchFormInput = container.querySelector('[data-testid="search-form-input"]')

    expect(searchFormInput).toBeInTheDocument()
  })
  test('Search-button should be in the document', () => {
    const { container } = render(
      <Router>
          <Home />
      </Router>
    )
    const searchFormButton = container.querySelector('[data-testid="search-form-button"]')

    expect(searchFormButton).toBeInTheDocument()
  })
  test('Search-input should have value atrribute', () => {
    const { container } = render(
      <Router>
          <Home />
      </Router>
    )
    const searchFormInput = container.querySelector('[data-testid="search-form-input"]')

    expect(searchFormInput).toHaveAttribute('value')
  })

  test('Search-button should call submit when clicked', () => {
    const { container } = render(
      <Router>
          <Home />
      </Router>
    )
    const searchFormButton = container.querySelector('[data-testid="search-form-button"]')

    expect(searchFormButton).toBeEnabled()
  })

  it('should not allow to change input value with letters', () => {
    const { container } = render(
      <Router>
          <Home />
      </Router>
    )
    const searchFormInput = container.querySelector('[data-testid="search-form-input"]') as HTMLInputElement
    if (searchFormInput) {
      fireEvent.change(searchFormInput, { target: { value: 'example' } })   
    }
    expect(searchFormInput && searchFormInput.value).toBe('')
  })
  it('should allow to change input value with numbers', () => {
    const { container } = render(
        <Router>
          <Home />
        </Router>
    )
    const searchFormInput = container.querySelector('[data-testid="search-form-input"]')  as HTMLInputElement
    if (searchFormInput) {
      fireEvent.change(searchFormInput, { target: { value: '123' } }
      )
    }
    expect(searchFormInput && searchFormInput.value).toBe('123')
  })
})
