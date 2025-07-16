# React + Node.js

Aplicación full stack React en el cliente y Express en el servidor.

## Configuración inicial

1. Instala las dependencias del cliente:
    ```bash
    npm install
    ```
2. Instala las dependencias del servidor:
    ```bash
    cd backend && npm install
    cd ..
    ```
3. Agregue un archivo .env.example para que se base y agrege el propio .evn, ajusta las variables según tu entorno:
    ```bash
    env.example
    ```

## Scripts para correr el proyecto de front y back

-   `npm run dev` – Inicia el cliente con Vite.
-   `npm run dev:server` – Inicia la API Express.
-   `npm run dev:migrate` – Ejecuta la migración de la base de datos.

Ejecuta el servidor y el cliente en terminales separadas.

## Librerías utilizadas

### Frontend

-   React
-   Material UI
-   Formik
-   Yup

### Backend

-   Express
-   cors
-   dotenv
-   joi
-   pg
