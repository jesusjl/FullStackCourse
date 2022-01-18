// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

function* setIndex(index) {
  while(index <4) {
    yield index
    index++
  }
}

const iterator = setIndex(0);


Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title,
      author,
      url,
      likes: iterator.next().value
    },
    headers: {
      Authorization: `bearer ${JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/users',
    body: {
      name: name,
      username: username,
      password: password
    }
  })
  cy.visit('http://localhost:3000')
})