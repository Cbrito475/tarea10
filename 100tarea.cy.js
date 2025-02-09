describe('Pruebas de la web tarea100.netlify.app', () => {
  beforeEach(() => {
    // Visita la página antes de cada prueba
    cy.visit('https://tarea100.netlify.app/');
  });

  it('Debería mostrar el formulario de registro inicialmente', () => {
    // Verifica que el formulario de registro esté visible
    cy.get('#register-form').should('be.visible');
  });

  it('Debería cambiar al formulario de inicio de sesión al hacer clic en "Inicia sesión"', () => {
    // Haz clic en el enlace "Inicia sesión"
    cy.get('#login-button').click().wait(1000); // Espera 1 segundo;

    // Verifica que el formulario de inicio de sesión esté visible
    cy.get('#login-form').should('be.visible').wait(1000); // Espera 1 segundo;
  });

  it('Debería registrar un nuevo usuario correctamente', () => {
    // Rellena el formulario de registro
    cy.get('#username').type('nuevo_usuario').wait(1000); // Espera 1 segundo;
    cy.get('#email').type('nuevo_usuario@example.com').wait(1000); // Espera 1 segundo;
    cy.get('#password').type('password123').wait(1000); // Espera 1 segundo;
    cy.get('#confirm-password').type('password123').wait(1000); // Espera 1 segundo;

    // Haz clic en el botón de registro
    cy.get('#submit-register').click().wait(1000); // Espera 1 segundo;

    // Verifica que se muestre el mensaje de registro exitoso
    cy.get('#register-message').should('contain', 'Registro exitoso').wait(1000); // Espera 1 segundo;
  });

  it('Debería mostrar un error si las contraseñas no coinciden', () => {
    // Rellena el formulario de registro con contraseñas diferentes
    cy.get('#username').type('nuevo_usuario');
    cy.get('#email').type('nuevo_usuario@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirm-password').type('password456');

    // Haz clic en el botón de registro
    cy.get('#submit-register').click();

    // Verifica que se muestre el mensaje de error
    cy.get('#register-message').should('contain', 'Las contraseñas no coinciden');
  });

  it('Debería iniciar sesión correctamente con credenciales válidas', () => {
    // Cambia al formulario de inicio de sesión
    cy.get('#login-button').click();

    // Rellena el formulario de inicio de sesión
    cy.get('#login-email').type('prueba@example.com').wait(1000); // Espera 1 segundo;
    cy.get('#login-password').type('password123').wait(1000); // Espera 1 segundo;

    // Haz clic en el botón de inicio de sesión
    cy.get('#submit-login').click().wait(1000); // Espera 1 segundo;

    // Verifica que el dashboard esté visible
    cy.get('#dashboard').should('be.visible').wait(1000); // Espera 1 segundo;
  });

  it('Debería mostrar un error si las credenciales son incorrectas', () => {
    // Cambia al formulario de inicio de sesión
    cy.get('#login-button').click();

    // Rellena el formulario de inicio de sesión con credenciales incorrectas
    cy.get('#login-email').type('incorrecto@example.com');
    cy.get('#login-password').type('incorrecto');

    // Haz clic en el botón de inicio de sesión
    cy.get('#submit-login').click();

    // Verifica que se muestre el mensaje de error
    cy.get('#login-message').should('contain', 'Credenciales incorrectas');
  });

  it('Debería cerrar sesión y volver al formulario de inicio de sesión', () => {
    // Inicia sesión primero
    cy.get('#login-button').click();
    cy.get('#login-email').type('prueba@example.com');
    cy.get('#login-password').type('password123');
    cy.get('#submit-login').click();

    // Cierra sesión
    cy.get('#logout-button').click();

    // Verifica que el formulario de inicio de sesión esté visible
    cy.get('#login-form').should('be.visible');
  });
});