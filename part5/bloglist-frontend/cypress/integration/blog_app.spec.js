describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    })
    cy.createUser({
      name: 'Another User',
      username: 'another',
      password: 'user'
    })
  })
  it('login form is shown', function() {
    cy.contains('Login')
  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.contains('mluukkai is logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()
      cy.get('html').should('not.contain', 'mluukkai is logged in')
      cy.get('.error').contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })
    it('A blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Title 1')
      cy.get('#author').type('Author 1')
      cy.get('#url').type('http://url.com')
      cy.contains('Create post').click()
      cy.contains('a new blog Title 1 by Author 1 added')
      cy.contains('view').click()
      cy.get('.title').contains('Title 1')
      cy.get('.author').contains('Author 1')
      cy.get('.url').contains('http://url.com')
      cy.get('.likes').contains('0')
    })
    it('An user can like a blog', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Title 1')
      cy.get('#author').type('Author 1')
      cy.get('#url').type('http://url.com')
      cy.contains('Create post').click()
      cy.contains('a new blog Title 1 by Author 1 added')
      cy.contains('view').click()
      cy.get('#likeButton').click()
      cy.get('.likes').contains('0')
    })
    it('the user who created a blog can delete it', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Title 1')
      cy.get('#author').type('Author 1')
      cy.get('#url').type('http://url.com')
      cy.contains('Create post').click()
      cy.contains('a new blog Title 1 by Author 1 added')
      cy.contains('view').click()
      cy.get('#removeButton').click()
      cy.contains('deleted blog')
      cy.get('html').should('not.contain', 'Title 1')
    })

    it('the user who does not created a blog cannot delete it', function() {
      cy.get('#logoutButton').click()
      cy.login({ username: 'another', password: 'user' })
      cy.contains('Create blog').click()
      cy.get('#title').type('Title 1')
      cy.get('#author').type('Author 1')
      cy.get('#url').type('http://url.com')
      cy.contains('Create post').click()
      cy.contains('a new blog Title 1 by Author 1 added')
      cy.contains('view').click()
      cy.get('#removeButton').click()
      cy.contains('deleted blog')
      cy.get('html').should('not.contain', 'Title 1')
    })
    describe('Blog posts', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })

        cy.createBlog({ title: 'title 1', author: 'author 1', url: 'http://url1.com' })
        cy.createBlog({ title: 'title 2', author: 'author 2', url: 'http://url2.com' })
        cy.createBlog({ title: 'title 3', author: 'author 3', url: 'http://url3.com' })
        cy.createBlog({ title: 'title 4', author: 'author 4', url: 'http://url4.com' })
      })
      it('blog exists', function() {
        cy.contains('author 4')
      })
      it('blogs ordered by number of likes', function() {
        cy.get('.title:first').contains('title 4')
        cy.get('.title:last').contains('title 1')
        cy.get('.likes:first').contains('likes 3')
        cy.get('.likes:last').contains('likes 0')

      })
    })
  })
})