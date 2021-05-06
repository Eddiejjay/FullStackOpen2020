

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username : 'Ulpukka',
      name : 'Ulriikka Kukkelberg',
      password : 'tassukka123',
      blogs : []
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    // create here a user to backend
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {

    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')



  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Ulpukka')
      cy.get('#password').type('tassukka123')
      cy.get('#login-button').click()
      cy.contains('Ulriikka Kukkelberg logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Eki')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')


    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'Ulpukka', password: 'tassukka123'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('Olipahan mustikkareissu ;)')
      cy.get('#author').type('Salainen viettelys68')
      cy.get('#url').type('www.ulpukanuhkeat.com')
      cy.get('#create-blog').click()
      cy.contains('a new blog Olipahan mustikkareissu ;) by Salainen viettelys68')
      cy.visit('http://localhost:3000')
      cy.contains('Olipahan mustikkareissu ;) Salainen viettelys68')

    })

    it('A blog can be liked', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('Olipahan mustikkareissu ;)')
      cy.get('#author').type('Salainen viettelys68')
      cy.get('#url').type('www.ulpukanuhkeat.com')
      cy.get('#create-blog').click()
      cy.visit('http://localhost:3000')
      cy.get('#view').click()
      cy.get('#like').dblclick()
      cy.reload()
      cy.get('#view').click()
      cy.contains('1 like')


    })

    it.only('Blogs creator can delete blog', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('Olipahan mustikkareissu ;)')
      cy.get('#author').type('Salainen viettelys68')
      cy.get('#url').type('www.ulpukanuhkeat.com')
      cy.get('#create-blog').click()
      cy.visit('http://localhost:3000')
      cy.get('#view').click()
      cy.get("#button-remove").click()
      cy.reload()
      cy.get('html').should('not.contain','Olipahan mustikkareissu ;) Salainen viettelys68')

    })
  })



})




