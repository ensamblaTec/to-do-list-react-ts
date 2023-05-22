# Todo APP con Express.js, React-ts, MongoDB, Typescript, Vite...

## Dependendencias:

| Nombre | Descripción |
| ---------- | ------- |
| dotenv | Módulo que carga un archivo .env dentro de process.env |
| express | Framework web para node.js |
| concurrently | Usado para ejecutar varios comandos de forma concurrente |
| eslint | Herramienta para 'buenas prácticas en javascript' |
| jest | Framework para la creación y automatización de Test Unitarios |
| webpack | Es un paquete para la optimización del código (empaquetamiento) |

## Scripts

| Nombre | Parámetros | Descripción |
| ------ | ---------- | ----------- |
| build  | npx tsc    | Traspasar el código de TypeScript a JavaScript |
| start  | node ./build/index.js | Comenzar con el archivo index.js |
| dev    | concurrently \"npx tsc -w\" \"nodemon -q ./build/index.js\" |
| test   | jest | Activar los test usando Jest |

## Variables de entorno del archivo .env

| Nombre | Descripción |
| ------ | ----------- |
| PORT   | El puerto por defecto es 8000 y se puede cambiar |
