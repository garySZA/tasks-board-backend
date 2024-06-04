FROM node:20.10.0-alpine3.19 as dependencies
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:20.10.0-alpine3.19 as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn add -D typescript
RUN yarn build

FROM node:20.10.0-alpine3.19 as production
EXPOSE 3005
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules

CMD [ "node", "dist/app.js" ]