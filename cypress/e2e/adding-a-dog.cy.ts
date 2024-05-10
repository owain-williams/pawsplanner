describe('Adding a dog', () => {
  it('shows the dog in the list', () => {
    cy.visit('http://localhost:3000/sign-in', { failOnStatusCode: false });

    // cy.get('[data-testid=signIn]')
    //   .click();

    cy.get('#identifier-field')
      .type('owain+test6@andersdigital.com{enter}');

    cy.get('#password-field')
      .type('AndersD!g!tal1405{enter}');

    cy.get('form').submit()

    cy.wait(3000)

    cy.visit('http://localhost:3000/dashboard/dogs/new', { failOnStatusCode: false });

    cy.get('[data-testid=dogName]')
      .type('Fido');

    cy.get('[data-testid=dogBreed]')
      .type('Golden Retriever');

    cy.get('[data-testid=dogAvatar]')
      .selectFile('public/img/dog.jpeg');

    cy.get('[data-testid=submit]')
      .click();

    cy.contains('Fido');
  })
});