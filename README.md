# TasksBoard App Backend

1. Clonar el proyecto
```
git clone https://github.com/garySZA/tasks-board-backend.git
```
2. Clonar el archivo __.env.example__ y renombrar a __.env__
3. Instalar las dependencias
```
yarn install
```

## Ejecutar el Stack completo

1. Ejecutar el stack mediante Docker
```
docker compose -f docker-compose-prod.yml up
```
## Ejecutar la aplicación
1. Ejecutar la base de datos
```
docker compose -f docker-compose-dev.yml up
```
2. Ejecutar en modo dev
```
yarn dev
```

## STACK
* Typescript
* Express JS
* Sequelize
* MySQL
