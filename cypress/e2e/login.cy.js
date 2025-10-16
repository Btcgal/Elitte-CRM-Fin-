describe('Fluxo de Login e Navegação', () => {
  it('deve permitir que um usuário faça login e navegue para a página de clientes', () => {
    // Passo 1: Visitar a página de login
    cy.visit('/login');

    // Passo 2: Preencher o formulário de login
    // IMPORTANTE: Use o e-mail e a senha que você cadastrou via Insomnia.
    cy.get('input[id="email"]').type('rai.martini@gmail.com');
    cy.get('input[id="password"]').type('1457Melo');

    // Passo 3: Clicar no botão de submissão
    cy.get('button[type="submit"]').click();

    // Passo 4: Verificar se o login foi bem-sucedido e a URL mudou para o dashboard
    cy.url().should('not.include', '/login');
    cy.contains('h1', 'Dashboard').should('be.visible');

    // Passo 5: Navegar para a página de clientes através do menu lateral
    cy.contains('a', 'Clientes').click();

    // Passo 6: Verificar se a página de clientes foi carregada
    cy.url().should('include', '/clients');
    cy.contains('h1', 'Clientes').should('be.visible');
  });
});
