from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

# Configura el driver de Chrome para ignorar errores de SSL
chrome_options = Options()
chrome_options.add_argument("--ignore-certificate-errors")
driver = webdriver.Chrome(options=chrome_options)

try:
    # Abre la página web
    driver.get("https://tarea100.netlify.app/")

    # Espera a que el formulario de registro esté presente
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "register-form"))
    )

    # Interactúa con el formulario de registro
    username_input = driver.find_element(By.ID, "username")
    email_input = driver.find_element(By.ID, "email")
    password_input = driver.find_element(By.ID, "password")
    confirm_password_input = driver.find_element(By.ID, "confirm-password")
    submit_button = driver.find_element(By.ID, "submit-register")

    username_input.send_keys("usuario_prueba")
    email_input.send_keys("prueba@example.com")
    password_input.send_keys("password123")
    confirm_password_input.send_keys("password123")
    time.sleep(5)
    submit_button.click()

    # Espera 5 segundos para que la página procese el formulario
    time.sleep(10)

    # Espera a que el mensaje de registro aparezca
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.ID, "register-message"))
    )

    # Verifica el mensaje de registro
     #register_message_element = driver.find_element(By.ID, "register-message")
     #register_message = register_message_element.text
     #print("Texto del mensaje:", register_message)  # Depuración: Imprime el mensaje
     #print("¿Está visible?", register_message_element.is_displayed())  # Depuración: Verifica visibilidad

    # Ajusta la aserción según el mensaje real
    # assert "Registro exitoso" in register_message, f"Mensaje inesperado: {register_message}"

    # Espera a que el formulario de inicio de sesión esté presente
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "login-form"))
    )

    # Cambia al formulario de inicio de sesión
   # login_button = driver.find_element(By.ID, "submit-login")
    #login_button.click()


    time.sleep(5)
    # Interactúa con el formulario de inicio de sesión
    login_email_input = driver.find_element(By.ID, "login-email")
    login_password_input = driver.find_element(By.ID, "login-password")
    submit_login_button = driver.find_element(By.ID, "submit-login")

    login_email_input.send_keys("prueba@example.com")
    time.sleep(5)
    login_password_input.send_keys("password123")
    time.sleep(5)
    submit_login_button.click()
    time.sleep(5)
    # Espera a que el dashboard esté presente
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "dashboard"))
    )

    # Verifica que el dashboard esté visible
    dashboard = driver.find_element(By.ID, "dashboard")
    assert dashboard.is_displayed()

    # Cierra sesión
    logout_button = driver.find_element(By.ID, "logout-button")
    logout_button.click()
    time.sleep(5)
    # Espera a que el formulario de inicio de sesión esté presente nuevamente
    WebDriverWait(driver, 10).until(
       EC.presence_of_element_located((By.ID, "login-form"))
    )

    print("Todas las interacciones se completaron exitosamente.")

finally:
    # Cierra el navegador
    driver.quit()